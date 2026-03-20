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
    {
      name: "Oil-Free Gel Cleanser",
      brand: "CeraVe",
      type: "Cleanser",
      price: "$15",
      rating: 4.7,
      image: "/products/cleanser.jpg",
    },
    {
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      type: "Serum",
      price: "$6",
      rating: 4.5,
      image: "/products/serum.jpg",
    },
    {
      name: "Ultra-Light Daily Moisturizer",
      brand: "Neutrogena",
      type: "Moisturizer",
      price: "$12",
      rating: 4.3,
      image: "/products/moisturizer.jpg",
    },
    {
      name: "Clear Skin Sunscreen SPF 50",
      brand: "La Roche-Posay",
      type: "Sunscreen",
      price: "$35",
      rating: 4.8,
      image: "/products/sunscreen.jpg",
    },
  ],
  Dry: [
    {
      name: "Hydrating Cream Cleanser",
      brand: "CeraVe",
      type: "Cleanser",
      price: "$16",
      rating: 4.8,
      image: "/products/cleanser.jpg",
    },
    {
      name: "Hyaluronic Acid 2% + B5",
      brand: "The Ordinary",
      type: "Serum",
      price: "$8",
      rating: 4.6,
      image: "/products/serum.jpg",
    },
    {
      name: "Moisturizing Cream",
      brand: "CeraVe",
      type: "Moisturizer",
      price: "$19",
      rating: 4.9,
      image: "/products/moisturizer.jpg",
    },
    {
      name: "Cicaplast Baume B5",
      brand: "La Roche-Posay",
      type: "Treatment",
      price: "$16",
      rating: 4.7,
      image: "/products/treatment.jpg",
    },
  ],
  Combination: [
    {
      name: "Gentle Foaming Cleanser",
      brand: "CeraVe",
      type: "Cleanser",
      price: "$15",
      rating: 4.6,
      image: "/products/cleanser.jpg",
    },
    {
      name: "Alpha Arbutin 2% + HA",
      brand: "The Ordinary",
      type: "Serum",
      price: "$9",
      rating: 4.4,
      image: "/products/serum.jpg",
    },
    {
      name: "PM Facial Moisturizing Lotion",
      brand: "CeraVe",
      type: "Moisturizer",
      price: "$14",
      rating: 4.7,
      image: "/products/moisturizer.jpg",
    },
    {
      name: "Anthelios Mineral SPF 50",
      brand: "La Roche-Posay",
      type: "Sunscreen",
      price: "$34",
      rating: 4.5,
      image: "/products/sunscreen.jpg",
    },
  ],
  Sensitive: [
    {
      name: "Toleriane Dermo-Cleanser",
      brand: "La Roche-Posay",
      type: "Cleanser",
      price: "$26",
      rating: 4.8,
      image: "/products/cleanser.jpg",
    },
    {
      name: "Centella Sensitive Serum",
      brand: "COSRX",
      type: "Serum",
      price: "$24",
      rating: 4.5,
      image: "/products/serum.jpg",
    },
    {
      name: "Toleriane Ultra Cream",
      brand: "La Roche-Posay",
      type: "Moisturizer",
      price: "$32",
      rating: 4.9,
      image: "/products/moisturizer.jpg",
    },
    {
      name: "Mineral Sunscreen SPF 50",
      brand: "EltaMD",
      type: "Sunscreen",
      price: "$41",
      rating: 4.8,
      image: "/products/sunscreen.jpg",
    },
  ],
  Normal: [
    {
      name: "Hydrating Facial Cleanser",
      brand: "CeraVe",
      type: "Cleanser",
      price: "$15",
      rating: 4.7,
      image: "/products/cleanser.jpg",
    },
    {
      name: "Vitamin C Suspension 23%",
      brand: "The Ordinary",
      type: "Serum",
      price: "$6",
      rating: 4.3,
      image: "/products/serum.jpg",
    },
    {
      name: "Daily Moisturizing Lotion",
      brand: "CeraVe",
      type: "Moisturizer",
      price: "$14",
      rating: 4.8,
      image: "/products/moisturizer.jpg",
    },
    {
      name: "UV Clear SPF 46",
      brand: "EltaMD",
      type: "Sunscreen",
      price: "$39",
      rating: 4.7,
      image: "/products/sunscreen.jpg",
    },
  ],
}

const skinTypeInfo: Record<string, { color: string; icon: React.ReactNode; tip: string }> = {
  Oily: {
    color: "bg-primary/10 text-primary",
    icon: <Droplets className="h-6 w-6" />,
    tip: "Focus on oil control and gentle cleansing without stripping your skin.",
  },
  Dry: {
    color: "bg-accent text-accent-foreground",
    icon: <Sun className="h-6 w-6" />,
    tip: "Prioritize hydration and moisture-locking ingredients like ceramides.",
  },
  Combination: {
    color: "bg-secondary text-secondary-foreground",
    icon: <Sparkles className="h-6 w-6" />,
    tip: "Balance is key - use targeted treatments for different zones.",
  },
  Sensitive: {
    color: "bg-primary/15 text-primary",
    icon: <Sparkles className="h-6 w-6" />,
    tip: "Gentle, fragrance-free products are your best friends.",
  },
  Normal: {
    color: "bg-primary/10 text-primary",
    icon: <Sparkles className="h-6 w-6" />,
    tip: "Maintain your healthy skin with preventative care.",
  },
}

export default function ResultsScreen({ skinData, onRestart }: ResultsScreenProps) {
  const { skinType, concerns, recommendations } = skinData
  const products = productRecommendations[skinType] || productRecommendations.Normal
  const typeInfo = skinTypeInfo[skinType] || skinTypeInfo.Normal

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-primary px-6 pb-20 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary-foreground">
            Your Results
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
            <div className={`rounded-xl p-3 ${typeInfo.color}`}>
              {typeInfo.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Your Skin Type</p>
              <h2 className="text-2xl font-bold text-foreground">{skinType}</h2>
            </div>
          </div>
          <p className="mt-4 text-pretty text-muted-foreground">
            {typeInfo.tip}
          </p>

          {/* Concerns */}
          <div className="mt-6">
            <p className="text-sm font-medium text-foreground">Key Findings</p>
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
          Skincare Tips
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
            Recommended Products
          </h3>
          <Button variant="link" className="text-primary">
            See all <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 flex gap-4 overflow-x-auto px-6 pb-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      {/* Daily Routine */}
      <div className="mt-8 px-6">
        <h3 className="text-lg font-semibold text-foreground">
          Your Daily Routine
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <RoutineCard
            title="Morning"
            steps={["Cleanser", "Serum", "Moisturizer", "Sunscreen"]}
          />
          <RoutineCard
            title="Evening"
            steps={["Cleanser", "Treatment", "Serum", "Moisturizer"]}
          />
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
          Start New Analysis
        </Button>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
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
