"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { SkinData } from "@/app/page"
import {
  Droplets,
  Sun,
  Sparkles,
  RefreshCw,
  Share2,
  ChevronRight,
  Star,
} from "lucide-react"
import { useI18n } from '@/lib/i18n'

interface ResultsScreenProps {
  skinData: SkinData
  onRestart: () => void
}

type Product = {
  name: string
  brand: string
  type: string
  price: string
  rating: number
  image: string
}

const productRecommendations: Record<string, Product[]> = {
  Oily: [
    { name: "Oil-Free Gel Cleanser", brand: "CeraVe", type: "Cleanser", price: "$15", rating: 4.7, image: "/products/cleanser.jpg" },
    { name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", type: "Serum", price: "$6", rating: 4.5, image: "/products/serum.jpg" },
    { name: "Ultra-Light Daily Moisturizer", brand: "Neutrogena", type: "Moisturizer", price: "$12", rating: 4.3, image: "/products/moisturizer.jpg" },
    { name: "Clear Skin Sunscreen SPF 50", brand: "La Roche-Posay", type: "Sunscreen", price: "$35", rating: 4.8, image: "/products/sunscreen.jpg" },
  ],
  Dry: [
    { name: "Hydrating Cream Cleanser", brand: "CeraVe", type: "Cleanser", price: "$16", rating: 4.8, image: "/products/cleanser.jpg" },
    { name: "Hyaluronic Acid 2% + B5", brand: "The Ordinary", type: "Serum", price: "$8", rating: 4.6, image: "/products/serum.jpg" },
    { name: "Moisturizing Cream", brand: "CeraVe", type: "Moisturizer", price: "$19", rating: 4.9, image: "/products/moisturizer.jpg" },
    { name: "Cicaplast Baume B5", brand: "La Roche-Posay", type: "Treatment", price: "$16", rating: 4.7, image: "/products/treatment.jpg" },
  ],
  Combination: [
    { name: "Gentle Foaming Cleanser", brand: "CeraVe", type: "Cleanser", price: "$15", rating: 4.6, image: "/products/cleanser.jpg" },
    { name: "Alpha Arbutin 2% + HA", brand: "The Ordinary", type: "Serum", price: "$9", rating: 4.4, image: "/products/serum.jpg" },
    { name: "PM Facial Moisturizing Lotion", brand: "CeraVe", type: "Moisturizer", price: "$14", rating: 4.7, image: "/products/moisturizer.jpg" },
    { name: "Anthelios Mineral SPF 50", brand: "La Roche-Posay", type: "Sunscreen", price: "$34", rating: 4.5, image: "/products/sunscreen.jpg" },
  ],
  Sensitive: [
    { name: "Toleriane Dermo-Cleanser", brand: "La Roche-Posay", type: "Cleanser", price: "$26", rating: 4.8, image: "/products/cleanser.jpg" },
    { name: "Centella Sensitive Serum", brand: "COSRX", type: "Serum", price: "$24", rating: 4.5, image: "/products/serum.jpg" },
    { name: "Toleriane Ultra Cream", brand: "La Roche-Posay", type: "Moisturizer", price: "$32", rating: 4.9, image: "/products/moisturizer.jpg" },
    { name: "Mineral Sunscreen SPF 50", brand: "EltaMD", type: "Sunscreen", price: "$41", rating: 4.8, image: "/products/sunscreen.jpg" },
  ],
  Normal: [
    { name: "Hydrating Facial Cleanser", brand: "CeraVe", type: "Cleanser", price: "$15", rating: 4.7, image: "/products/cleanser.jpg" },
    { name: "Vitamin C Suspension 23%", brand: "The Ordinary", type: "Serum", price: "$6", rating: 4.3, image: "/products/serum.jpg" },
    { name: "Daily Moisturizing Lotion", brand: "CeraVe", type: "Moisturizer", price: "$14", rating: 4.8, image: "/products/moisturizer.jpg" },
    { name: "UV Clear SPF 46", brand: "EltaMD", type: "Sunscreen", price: "$39", rating: 4.7, image: "/products/sunscreen.jpg" },
  ],
}

export default function ResultsScreen({ skinData, onRestart }: ResultsScreenProps) {
  const { t } = useI18n()
  const { skinType, concerns, recommendations } = skinData
  const products = productRecommendations[skinType] || productRecommendations.Normal

  const skinTypeColors: Record<string, string> = {
    Oily: "bg-primary/10 text-primary",
    Dry: "bg-accent text-accent-foreground",
    Combination: "bg-secondary text-secondary-foreground",
    Sensitive: "bg-primary/15 text-primary",
    Normal: "bg-primary/10 text-primary",
  }

  const skinTypeIcons: Record<string, React.ReactNode> = {
    Oily: <Droplets className="h-6 w-6" />,
    Dry: <Sun className="h-6 w-6" />,
    Combination: <Sparkles className="h-6 w-6" />,
    Sensitive: <Sparkles className="h-6 w-6" />,
    Normal: <Sparkles className="h-6 w-6" />,
  }

  const skinTypeTipKeys: Record<string, keyof ReturnType<typeof useI18n>['t'] extends (key: infer K) => string ? K : never, string> = {
    Oily: 'results.tip.oily',
    Dry: 'results.tip.dry',
    Combination: 'results.tip.combination',
    Sensitive: 'results.tip.sensitive',
    Normal: 'results.tip.normal',
  } as any

  const skinTypeNameKeys: Record<string, string> = {
    Oily: t('results.skinType.oily'),
    Dry: t('results.skinType.dry'),
    Combination: t('results.skinType.combination'),
    Sensitive: t('results.skinType.sensitive'),
    Normal: t('results.skinType.normal'),
  }

  const tipKey = skinTypeTipKeys[skinType] || 'results.tip.normal'
  const color = skinTypeColors[skinType] || skinTypeColors.Normal
  const icon = skinTypeIcons[skinType] || skinTypeIcons.Normal
  const skinTypeName = skinTypeNameKeys[skinType] || skinType

  const routineSteps = {
    morning: ["Cleanser", "Serum", "Moisturizer", "Sunscreen"],
    evening: ["Cleanser", "Treatment", "Serum", "Moisturizer"],
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-primary px-6 pb-20 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary-foreground">
            {t('results.title')}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Skin Type Card */}
      <div className="-mt-12 px-6">
        <Card className="overflow-hidden rounded-2xl bg-card p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className={`rounded-xl p-3 ${color}`}>
              {icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{t('results.skinType')}</p>
              <h2 className="text-2xl font-bold text-foreground">{skinTypeName}</h2>
            </div>
          </div>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t(tipKey as any)}
          </p>

          {/* Concerns */}
          <div className="mt-6">
            <p className="text-sm font-medium text-foreground">{t('results.keyFindings')}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {concerns.map((concern, index) => (
                <span
                  key={index}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {concern}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="mt-8 px-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t('results.tips')}
        </h3>
        <div className="mt-4 space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-card p-4"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {index + 1}
              </div>
              <p className="text-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="mt-8">
        <div className="flex items-center justify-between px-6">
          <h3 className="text-lg font-semibold text-foreground">
            {t('results.products')}
          </h3>
          <Button variant="link" className="text-primary">
            {t('results.seeAll')} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 flex gap-4 overflow-x-auto px-6 pb-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} addLabel={t('results.addToRoutine')} />
          ))}
        </div>
      </div>

      {/* Daily Routine */}
      <div className="mt-8 px-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t('results.routine.title')}
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <RoutineCard title={t('results.routine.morning')} steps={routineSteps.morning} />
          <RoutineCard title={t('results.routine.evening')} steps={routineSteps.evening} />
        </div>
      </div>

      {/* Restart Button */}
      <div className="mt-8 px-6">
        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="w-full rounded-full"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('results.restart')}
        </Button>
      </div>
    </div>
  )
}

function ProductCard({ product, addLabel }: { product: Product; addLabel: string }) {
  return (
    <Card className="min-w-[160px] shrink-0 overflow-hidden rounded-xl">
      <div className="flex h-24 items-center justify-center bg-secondary">
        <Sparkles className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <p className="mt-0.5 line-clamp-2 text-sm font-medium text-foreground">
          {product.name}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-foreground">{product.price}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
        </div>
      </div>
    </Card>
  )
}

function RoutineCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <Card className="rounded-xl p-4">
      <h4 className="font-medium text-foreground">{title}</h4>
      <ol className="mt-3 space-y-2">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </Card>
  )
}
