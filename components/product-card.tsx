"use client"

import { Product } from "@/lib/db"
import { useTranslatedProduct } from "@/hooks/use-translated-product"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Lightbulb } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { addToBasket } from "@/lib/basket"

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

interface ProductCardProps {
  product: Product
  isAdded: boolean
  onAdd: () => void
}

export function ProductCard({ product: initialProduct, isAdded, onAdd }: ProductCardProps) {
  const { t } = useI18n()
  const { product, isTranslating } = useTranslatedProduct(initialProduct)
  
  // Use translated product if available, otherwise fallback to initial
  const p = product || initialProduct

  return (
    <Link href={`/products/${p.id}`} className="block h-full">
      <Card className={`p-0 group overflow-hidden border-border/50 hover:shadow-elevated hover:border-primary/30 transition-all duration-300 h-full flex flex-col cursor-pointer ${isTranslating ? 'opacity-70' : ''}`}>
        {/* Product Image */}
        <div className="relative h-64 bg-linear-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
          {p.image_url ? (
            <Image 
              src={p.image_url} 
              alt={p.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground/50">
              <ShoppingBag className="h-12 w-12 mb-2" />
              <span className="text-xs">{p.type}</span>
            </div>
          )}
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[initialProduct.type] || 'bg-gray-500/10 text-gray-600'}`}>
              {p.type}
            </span>
          </div>
          {isTranslating && (
            <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] flex items-center justify-center">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-xs font-medium text-primary mb-1">{p.brand}</p>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {p.name}
            </h3>
            {p.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {p.description}
              </p>
            )}
            {/* Usage Tip */}
            {p.usage_tip && (
              <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2 mb-3">
                <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                  {p.usage_tip}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
            <span className="text-lg font-bold text-foreground">
              {Number(p.price).toLocaleString('ru-KZ')} ₸
            </span>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onAdd()
              }}
            >
              {isAdded ? t('common.added') : t('products.addToRoutine')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
