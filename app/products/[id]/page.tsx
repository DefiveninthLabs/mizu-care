"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ShoppingBag, Lightbulb, Tag, Info, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { addToBasket } from "@/lib/basket"

interface Product {
  id: number
  name: string
  description: string | null
  usage_tip: string | null
  price: number
  brand: string
  type: string
  image_url: string | null
  created_at: string
  updated_at: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const typeColors: Record<string, string> = {
  "Spray": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Cream": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "Serum": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "Cleanser": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Toner": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Moisturizer": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "Mask": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  "Oil": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Sunscreen": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "Exfoliant": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { t } = useI18n()
  const [added, setAdded] = useState(false)

  const { data: product, isLoading, error } = useSWR<Product>(
    id ? `/api/products/${id}` : null,
    fetcher
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto flex items-center px-6 py-3">
            <Button variant="ghost" size="icon" className="rounded-full mr-3" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Skeleton className="h-6 w-40" />
          </div>
        </nav>
        <div className="container mx-auto px-6 py-10 max-w-3xl">
          <Skeleton className="h-72 w-full rounded-2xl mb-8" />
          <Skeleton className="h-8 w-2/3 mb-3" />
          <Skeleton className="h-5 w-1/3 mb-6" />
          <Skeleton className="h-24 w-full mb-6" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-xl font-semibold text-foreground">{t('product.notFound')}</p>
        <Button variant="outline" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('product.back')}
        </Button>
      </div>
    )
  }

  const typeColor = typeColors[product.type] || "bg-gray-500/10 text-gray-600"

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground line-clamp-1 max-w-[200px]">
              {product.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/basket">
              <Button variant="outline" size="sm" className="rounded-full">
                Basket
              </Button>
            </Link>
            <span className="text-lg font-bold text-foreground">{Number(product.price).toLocaleString('ru-KZ')} ₸</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Product Image */}
          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground/40">
                <ShoppingBag className="h-20 w-20 mb-3" />
                <span className="text-sm">{product.type}</span>
              </div>
            )}
            {/* Type badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeColor}`}>
                {product.type}
              </span>
            </div>
          </div>

          {/* Title & Brand */}
          <div>
            <p className="text-sm font-semibold text-primary mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-foreground">{Number(product.price).toLocaleString('ru-KZ')} ₸</span>
              <Badge variant="outline" className="rounded-full">
                <Tag className="h-3 w-3 mr-1" />
                {product.brand}
              </Badge>
            </div>
          </div>

          {/* Description */}
          {product.description && (
              <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Info className="h-4 w-4 text-primary" />
                {t('product.description')}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          )}

          {/* Usage Tip */}
          {product.usage_tip && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-2"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Lightbulb className="h-4 w-4" />
                {t('product.usageTip')}
              </div>
              <p className="text-foreground leading-relaxed text-sm">
                {product.usage_tip}
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 rounded-full py-6 text-base font-semibold"
              onClick={() => {
                addToBasket({
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  brand: product.brand,
                  type: product.type,
                  image_url: product.image_url,
                })
                setAdded(true)
                window.setTimeout(() => setAdded(false), 1500)
              }}
            >
              {added ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {t('basket.addedToBasket')}
                </span>
              ) : (
                t('product.addToRoutine')
              )}
            </Button>
            <Button variant="outline" className="rounded-full py-6 px-6" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
