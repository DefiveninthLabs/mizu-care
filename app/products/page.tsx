"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X, Package, ArrowLeft, Filter, ShoppingBag, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { addToBasket, readBasket } from "@/lib/basket"

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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
}

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

export default function ProductsPage() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [basketIds, setBasketIds] = useState<Set<number>>(() => new Set())
  
  const { data: products, isLoading } = useSWR<Product[]>('/api/products', fetcher)
  const { data: brands } = useSWR<string[]>('/api/products/brands', fetcher)
  const { data: types } = useSWR<string[]>('/api/products/types', fetcher)

  useEffect(() => {
    const refresh = () => {
      const ids = new Set(readBasket().map((item) => item.id))
      setBasketIds(ids)
    }

    refresh()
    window.addEventListener("storage", refresh)
    return () => window.removeEventListener("storage", refresh)
  }, [])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    
    return products.filter(product => {
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesBrand = selectedBrand === "" || product.brand === selectedBrand
      const matchesType = selectedType === "" || product.type === selectedType
      
      return matchesSearch && matchesBrand && matchesType
    })
  }, [products, searchQuery, selectedBrand, selectedType])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrand("")
    setSelectedType("")
  }

  const hasActiveFilters = searchQuery || selectedBrand || selectedType

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Image src="/icon-white.png" alt="MizuCaire" className="w-6 h-6 object-contain" width={24} height={24} />
              </div>
              <span className="text-xl font-bold text-foreground font-display">{t('products.title')}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? t('products.product') : t('products.products')}
            </span>
            <Link href="/basket">
              <Button variant="outline" size="sm" className="rounded-full">
                <ShoppingBag className="h-4 w-4 mr-1" />
                Basket
              </Button>
            </Link>
            <LanguageSwitcher variant="minimal" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-6 rounded-full bg-card border-border/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>{t('products.filters')}</span>
            </div>
            
            <Select value={selectedBrand || "all"} onValueChange={(val) => setSelectedBrand(val === "all" ? "" : val)}>
              <SelectTrigger className="w-[160px] rounded-full">
                <SelectValue placeholder={t('products.allBrands')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('products.allBrands')}</SelectItem>
                {brands?.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType || "all"} onValueChange={(val) => setSelectedType(val === "all" ? "" : val)}>
              <SelectTrigger className="w-[160px] rounded-full">
                <SelectValue placeholder={t('products.allTypes')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('products.allTypes')}</SelectItem>
                {types?.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                {t('products.clearAll')}
              </Button>
            )}
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {t('products.searchLabel')} &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedBrand && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {t('products.brandLabel')} {selectedBrand}
                  <button onClick={() => setSelectedBrand("")} className="ml-2 hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedType && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {t('products.typeLabel')} {selectedType}
                  <button onClick={() => setSelectedType("")} className="ml-2 hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2 mb-4" />
                  <div className="h-6 bg-muted rounded w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div key={product.id} custom={i} variants={fadeUp}>
                <Link href={`/products/${product.id}`} className="block h-full">
                  <Card className="p-0 group overflow-hidden border-border/50 hover:shadow-elevated hover:border-primary/30 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    {/* Product Image */}
                    <div className="relative h-64 bg-linear-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <Image 
                          src={product.image_url} 
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground/50">
                          <ShoppingBag className="h-12 w-12 mb-2" />
                          <span className="text-xs">{product.type}</span>
                        </div>
                      )}
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[product.type] || 'bg-gray-500/10 text-gray-600'}`}>
                          {product.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-primary mb-1">{product.brand}</p>
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {product.description}
                          </p>
                        )}
                        {/* Usage Tip */}
                        {product.usage_tip && (
                          <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2 mb-3">
                            <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                              {product.usage_tip}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                        <span className="text-lg font-bold text-foreground">
                          {Number(product.price).toLocaleString('ru-KZ')} ₸
                        </span>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const next = addToBasket({
                              id: product.id,
                              name: product.name,
                              price: Number(product.price),
                              brand: product.brand,
                              type: product.type,
                              image_url: product.image_url,
                            })
                            setBasketIds(new Set(next.map((item) => item.id)))
                          }}
                        >
                          {basketIds.has(product.id) ? t('common.added') : t('products.addToRoutine')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('products.noProducts')}</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? t('products.noProductsFiltered')
                : t('products.noProducts')}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="rounded-full">
                {t('products.clearFilters')}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
