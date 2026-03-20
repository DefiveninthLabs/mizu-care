"use client"

import { useEffect, useState } from "react"

interface ScanningScreenProps {
  image: string | null
  onComplete: () => void
}

const scanningSteps = [
  "Analyzing skin texture...",
  "Detecting pore size...",
  "Measuring hydration levels...",
  "Checking for blemishes...",
  "Evaluating skin tone...",
  "Processing results...",
]

export default function ScanningScreen({ image, onComplete }: ScanningScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scanLinePosition, setScanLinePosition] = useState(0)

  useEffect(() => {
    // Animate scan line
    const scanInterval = setInterval(() => {
      setScanLinePosition((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 50)

    // Progress and steps
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(scanInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1
      })
    }, 60)

    // Update current step
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < scanningSteps.length - 1 ? prev + 1 : prev
      )
    }, 1000)

    return () => {
      clearInterval(scanInterval)
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [onComplete])

  return (
    <div className="flex min-h-screen flex-col items-center bg-foreground px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-background">
          Analyzing Your Skin
        </h1>
        <p className="mt-2 text-background/70">
          Please wait while we process your photo
        </p>
      </div>

      {/* Image with Scanning Effect */}
      <div className="relative mt-8 overflow-hidden rounded-3xl">
        {image && (
          <div className="relative h-80 w-64">
            <img
              src={image}
              alt="Your face"
              className="h-full w-full object-cover"
            />

            {/* Scan Line */}
            <div
              className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_4px] shadow-primary transition-all duration-100"
              style={{ top: `${scanLinePosition}%` }}
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-30">
              <svg className="h-full w-full">
                <defs>
                  <pattern
                    id="grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Corner Brackets */}
            <div className="absolute left-2 top-2 h-8 w-8 border-l-2 border-t-2 border-primary" />
            <div className="absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 border-primary" />
            <div className="absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 border-primary" />

            {/* Data Points Animation */}
            <DataPoint x="20%" y="25%" delay={0} />
            <DataPoint x="80%" y="25%" delay={0.2} />
            <DataPoint x="50%" y="45%" delay={0.4} />
            <DataPoint x="30%" y="60%" delay={0.6} />
            <DataPoint x="70%" y="60%" delay={0.8} />
            <DataPoint x="50%" y="75%" delay={1} />
          </div>
        )}
      </div>

      {/* Progress Section */}
      <div className="mt-12 w-full max-w-sm">
        {/* Current Step */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-sm text-background/80">
            {scanningSteps[currentStep]}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 overflow-hidden rounded-full bg-background/20">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="mt-3 text-center text-2xl font-bold text-background">
          {progress}%
        </p>
      </div>

      {/* Analysis Stats */}
      <div className="mt-8 grid w-full max-w-sm grid-cols-3 gap-4">
        <StatBox
          label="Texture"
          value={progress > 30 ? "Analyzed" : "Scanning"}
          active={progress <= 30}
        />
        <StatBox
          label="Hydration"
          value={progress > 60 ? "Analyzed" : "Scanning"}
          active={progress > 30 && progress <= 60}
        />
        <StatBox
          label="Tone"
          value={progress > 90 ? "Analyzed" : "Scanning"}
          active={progress > 60 && progress <= 90}
        />
      </div>
    </div>
  )
}

function DataPoint({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <div
      className="absolute h-3 w-3"
      style={{ left: x, top: y, animationDelay: `${delay}s` }}
    >
      <div className="animate-ping h-full w-full rounded-full bg-primary opacity-75" />
      <div className="absolute inset-0 rounded-full bg-primary" />
    </div>
  )
}

function StatBox({
  label,
  value,
  active,
}: {
  label: string
  value: string
  active: boolean
}) {
  return (
    <div
      className={`rounded-xl p-3 text-center transition-colors ${
        active ? "bg-primary/20" : "bg-background/10"
      }`}
    >
      <p className="text-xs text-background/60">{label}</p>
      <p
        className={`mt-1 text-xs font-medium ${
          active ? "text-primary" : "text-background"
        }`}
      >
        {value}
      </p>
    </div>
  )
}
