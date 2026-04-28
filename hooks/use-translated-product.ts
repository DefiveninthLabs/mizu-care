"use client"

import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '@/lib/i18n'
import { Product } from '@/lib/db'

// Cache structure: { [locale]: { [productId]: translatedProduct } }
const STORAGE_KEY = 'mizucaire.translationCache'

function getPersistedCache(): Record<string, Record<number, any>> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function persistCache(cache: Record<string, Record<number, any>>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch (e) {
    console.error('Failed to persist translation cache:', e)
  }
}

const translationCache: Record<string, Record<number, any>> = getPersistedCache()

// Batching logic
let pendingProducts: { product: Product; resolve: (p: Product) => void; reject: (e: any) => void }[] = []
let batchTimer: NodeJS.Timeout | null = null
const BATCH_SIZE = 10
const BATCH_DELAY = 150 // ms to wait for more products

async function processBatch(locale: string) {
  if (pendingProducts.length === 0) return

  const currentBatch = pendingProducts.splice(0, BATCH_SIZE)
  const productsToTranslate = currentBatch.map(item => ({
    id: item.product.id,
    name: item.product.name,
    description: item.product.description,
    usage_tip: item.product.usage_tip,
    type: item.product.type
  }))

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: productsToTranslate,
        targetLanguage: locale,
        context: 'product'
      })
    })

    if (!res.ok) throw new Error('Batch translation failed')

    const data = await res.json()
    const translatedResults = data.translatedText as any[]

    if (!Array.isArray(translatedResults)) throw new Error('Invalid translation response')

    // Update cache and resolve promises
    if (!translationCache[locale]) translationCache[locale] = {}

    currentBatch.forEach((item, index) => {
      const translatedFields = translatedResults[index]
      const fullyTranslated = { ...item.product, ...translatedFields }
      
      translationCache[locale][item.product.id] = fullyTranslated
      item.resolve(fullyTranslated as Product)
    })

    persistCache(translationCache)
  } catch (error) {
    console.error('Batch translation error:', error)
    currentBatch.forEach(item => item.reject(error))
  }

  // If more are pending, process next batch
  if (pendingProducts.length > 0) {
    processBatch(locale)
  }
}

function queueForTranslation(product: Product, locale: string): Promise<Product> {
  return new Promise((resolve, reject) => {
    pendingProducts.push({ product, resolve, reject })
    
    if (batchTimer) clearTimeout(batchTimer)
    
    if (pendingProducts.length >= BATCH_SIZE) {
      processBatch(locale)
    } else {
      batchTimer = setTimeout(() => processBatch(locale), BATCH_DELAY)
    }
  })
}

export function useTranslatedProduct(product: Product | undefined) {
  const { locale } = useI18n()
  const [translatedProduct, setTranslatedProduct] = useState<Product | undefined>(product)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    if (!product || locale === 'en') {
      setTranslatedProduct(product)
      return
    }

    // Check cache
    if (translationCache[locale]?.[product.id]) {
      setTranslatedProduct(translationCache[locale][product.id])
      return
    }

    let isMounted = true
    setIsTranslating(true)

    queueForTranslation(product, locale)
      .then(translated => {
        if (isMounted) setTranslatedProduct(translated)
      })
      .catch(() => {
        if (isMounted) setTranslatedProduct(product)
      })
      .finally(() => {
        if (isMounted) setIsTranslating(false)
      })

    return () => { isMounted = false }
  }, [product?.id, locale])

  return { product: translatedProduct, isTranslating }
}

export function useTranslatedProducts(products: Product[]) {
  const { locale } = useI18n()
  const [translatedProducts, setTranslatedProducts] = useState<Product[]>(products)

  useEffect(() => {
    if (!products.length || locale === 'en') {
      setTranslatedProducts(products)
      return
    }
    
    // Check which ones are already cached
    const currentTranslated = products.map(p => translationCache[locale]?.[p.id] || p)
    setTranslatedProducts(currentTranslated)

    // Trigger individual translations for those not in cache
    // The useTranslatedProduct hook in individual cards will handle the queuing
  }, [products, locale])

  return { products: translatedProducts }
}
