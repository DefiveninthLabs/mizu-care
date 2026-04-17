"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { SkinData, RecommendedProduct } from "@/app/page"
import {
  Droplets,
  Sun,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Zap,
  Layers,
  ShoppingBag,
  Star,
  Send,
  CheckCircle2,
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
                  <span className="text-sm text-muted-foreground">{t('results.skinScore')}</span>
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
            {t('results.metricsTitle')}
          </h3>
          <Card className="mt-4 rounded-xl p-4">
            <div className="space-y-4">
              <MetricBar 
                icon={<Droplets className="h-4 w-4" />}
                label={t('results.metric.hydration')}
                value={analysis.hydration} 
                color="bg-blue-500" 
                t={t}
              />
              <MetricBar 
                icon={<Zap className="h-4 w-4" />}
                label={t('results.metric.oiliness')}
                value={analysis.oiliness} 
                color="bg-yellow-500" 
                t={t}
              />
              <MetricBar 
                icon={<Layers className="h-4 w-4" />}
                label={t('results.metric.texture')}
                value={analysis.texture} 
                color="bg-purple-500" 
                t={t}
              />
              <MetricBar 
                icon={<Sparkles className="h-4 w-4" />}
                label={t('results.metric.clarity')}
                value={analysis.clarity} 
                color="bg-green-500" 
                t={t}
              />
              <MetricBar 
                icon={<Sun className="h-4 w-4" />}
                label={t('results.metric.elasticity')}
                value={analysis.elasticity} 
                color="bg-orange-500" 
                t={t}
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

      {/* Review Form */}
      <div className="mt-8 px-6">
        <ReviewForm />
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
  color,
  t,
}: { 
  icon: React.ReactNode
  label: string
  value: number
  color: string
  t: ReturnType<typeof useI18n>["t"]
}) {
  const getStatusText = (val: number) => {
    if (val >= 80) return t('results.metricStatus.excellent')
    if (val >= 60) return t('results.metricStatus.good')
    if (val >= 40) return t('results.metricStatus.fair')
    return t('results.metricStatus.needsAttention')
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
      <Card className="min-w-[190px] max-w-[190px] shrink-0 overflow-hidden rounded-xl border-border/50 hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative h-32 w-full overflow-hidden bg-linear-to-br from-muted to-muted/50">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="190px"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            </div>
          )}
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground shadow-sm">
              {product.type}
            </span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <p className="mt-0.5 min-h-10 line-clamp-2 text-sm font-medium text-foreground">
            {product.name}
          </p>
          <div className="mt-2">
            <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
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

function ReviewForm() {
  const { t } = useI18n()
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      })

      if (res.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="rounded-2xl p-6 bg-primary/5 border-primary/20">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {t('review.thankYou')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('review.submitted')}
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t('review.title')}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('review.name')}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('review.namePlaceholder')}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>{t('review.rating')}</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">{t('review.comment')}</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('review.commentPlaceholder')}
            rows={3}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isSubmitting || !name.trim() || !comment.trim()}
        >
          {isSubmitting ? (
            t('review.submitting')
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t('review.submit')}
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
