"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { SkinData, RecommendedProduct } from "@/app/page"
import {
  Droplets,
  Sun,
  Sparkles,
  RefreshCw,
  Share2,
  ChevronRight,
  Zap,
  Layers,
  ShoppingBag,
} from "lucide-react"
import { useI18n } from '@/lib/i18n'
import Image from "next/image"
import Link from "next/link"

interface ResultsScreenProps {
  skinData: SkinData
  onRestart: () => void
}

// Format price from "10990.00" to "10 990 ₸"
function formatPrice(price: string): string {
  const num = parseFloat(price)
  if (isNaN(num)) return price
  // Format with space as thousands separator and tenge symbol
  const formatted = Math.round(num).toLocaleString('ru-KZ').replace(/,/g, ' ')
  return `${formatted} ₸`
}

export default function ResultsScreen({ skinData, onRestart }: ResultsScreenProps) {
  const { t } = useI18n()
  const { skinType, concerns, recommendations, analysis, detailedNotes, recommendedProducts } = skinData

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

  const skinTypeTipKeys: Record<string, string> = {
    Oily: 'results.tip.oily',
    Dry: 'results.tip.dry',
    Combination: 'results.tip.combination',
    Sensitive: 'results.tip.sensitive',
    Normal: 'results.tip.normal',
  }

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

  // Calculate overall skin score from analysis
  const overallScore = analysis 
    ? Math.round((analysis.hydration + analysis.texture + analysis.clarity + analysis.elasticity) / 4)
    : null

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
              {overallScore !== null && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Skin Score:</span>
                  <span className={`text-lg font-bold ${overallScore >= 70 ? 'text-green-500' : overallScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {overallScore}/100
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* AI Detailed Notes */}
          {detailedNotes && (
            <p className="mt-4 text-pretty text-muted-foreground italic border-l-2 border-primary/30 pl-3">
              {detailedNotes}
            </p>
          )}
          
          {!detailedNotes && (
            <p className="mt-4 text-pretty text-muted-foreground">
              {t(tipKey as Parameters<typeof t>[0])}
            </p>
          )}

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

      {/* AI Analysis Metrics */}
      {analysis && (
        <div className="mt-8 px-6">
          <h3 className="text-lg font-semibold text-foreground">
            Skin Analysis Metrics
          </h3>
          <Card className="mt-4 rounded-xl p-4">
            <div className="space-y-4">
              <MetricBar 
                icon={<Droplets className="h-4 w-4" />}
                label="Hydration" 
                value={analysis.hydration} 
                color="bg-blue-500" 
              />
              <MetricBar 
                icon={<Zap className="h-4 w-4" />}
                label="Oiliness" 
                value={analysis.oiliness} 
                color="bg-yellow-500" 
              />
              <MetricBar 
                icon={<Layers className="h-4 w-4" />}
                label="Texture" 
                value={analysis.texture} 
                color="bg-purple-500" 
              />
              <MetricBar 
                icon={<Sparkles className="h-4 w-4" />}
                label="Clarity" 
                value={analysis.clarity} 
                color="bg-green-500" 
              />
              <MetricBar 
                icon={<Sun className="h-4 w-4" />}
                label="Elasticity" 
                value={analysis.elasticity} 
                color="bg-orange-500" 
              />
            </div>
          </Card>
        </div>
      )}

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

      {/* Product Recommendations from DB */}
      {recommendedProducts && recommendedProducts.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between px-6">
            <h3 className="text-lg font-semibold text-foreground">
              {t('results.products')}
            </h3>
            <Link href="/products">
              <Button variant="link" className="text-primary">
                {t('results.seeAll')} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-4 flex gap-4 overflow-x-auto px-6 pb-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

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

function MetricBar({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode
  label: string
  value: number
  color: string 
}) {
  const getStatusText = (val: number) => {
    if (val >= 80) return "Excellent"
    if (val >= 60) return "Good"
    if (val >= 40) return "Fair"
    return "Needs attention"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{getStatusText(value)}</span>
          <span className="text-sm font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: RecommendedProduct }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="min-w-[180px] max-w-[180px] shrink-0 overflow-hidden rounded-xl hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative h-28 w-full bg-secondary">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-2"
              sizes="180px"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <p className="mt-0.5 line-clamp-2 text-sm font-medium text-foreground min-h-[2.5rem]">
            {product.name}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              {product.type}
            </span>
          </div>
        </div>
      </Card>
    </Link>
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
