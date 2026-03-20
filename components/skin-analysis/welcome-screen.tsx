"use client"

import { Button } from "@/components/ui/button"
import { Camera, ClipboardList, Award } from "lucide-react"
import Image from 'next/image'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 py-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <Image alt='l' src={'/icon-white.png'} width={50} height={50} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          MizuCaire
        </h1>
        <p className="mt-2 text-muted-foreground">
          AI-Powered Skin Analysis
        </p>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-balance text-2xl font-semibold text-foreground">
          Discover Your Perfect Skincare Routine
        </h2>
        <p className="mt-4 max-w-sm text-pretty text-muted-foreground">
          Take a quick photo and answer a few questions to get personalized
          skincare recommendations tailored just for you.
        </p>
      </div>

      {/* Features */}
      <div className="w-full max-w-sm space-y-3">
        <FeatureItem
          icon={<Camera className="h-5 w-5" />}
          title="Face Scan"
          description="Quick AI analysis of your skin"
        />
        <FeatureItem
          icon={<ClipboardList className="h-5 w-5" />}
          title="Smart Survey"
          description="Understand your skin concerns"
        />
        <FeatureItem
          icon={<Award className="h-5 w-5" />}
          title="Personalized Results"
          description="Get tailored product recommendations"
        />
      </div>

      {/* CTA */}
      <div className="w-full max-w-sm">
        <Button
          onClick={onStart}
          size="lg"
          className="w-full rounded-full py-6 text-lg font-medium"
        >
          Start Analysis
        </Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Your photos are processed locally and never stored
        </p>
      </div>
    </div>
  )
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c7d9e5] text-accent-foreground">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
