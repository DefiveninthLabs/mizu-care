"use client"

import { useEffect, useState, useRef } from "react"
import { useI18n } from '@/lib/i18n'
import type { TranslationKeys } from '@/lib/i18n'
import type { RecommendedProduct } from '@/app/page'

interface AnalysisResult {
  skinType: string
  concerns: string[]
  recommendations: string[]
  analysis?: {
    hydration: number
    oiliness: number
    texture: number
    clarity: number
    elasticity: number
  }
  detailedNotes?: string
  recommendedProducts?: RecommendedProduct[]
}

interface ScanningScreenProps {
  image: string | null
  surveyAnswers?: Record<string, string>
  onComplete: (analysisResult?: AnalysisResult) => void
}

export default function ScanningScreen({ image, surveyAnswers, onComplete }: ScanningScreenProps) {
  const { t } = useI18n()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scanLinePosition, setScanLinePosition] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const analysisStarted = useRef(false)

  const scanningStepKeys: (keyof TranslationKeys)[] = [
    'scanning.step.texture',
    'scanning.step.pores',
    'scanning.step.hydration',
    'scanning.step.blemishes',
    'scanning.step.tone',
    'scanning.step.processing',
  ]

  // Start the AI analysis when component mounts
  useEffect(() => {
    if (!image || analysisStarted.current) return
    analysisStarted.current = true

    const analyzeWithAI = async () => {
      try {
        const response = await fetch('/api/analyze-skin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageData: image,
            surveyAnswers: surveyAnswers || {},
          }),
        })

        if (!response.ok) {
          throw new Error('Analysis failed')
        }

        const result = await response.json()
        setAnalysisResult(result)
        setAnalysisComplete(true)
      } catch (err) {
        console.error('Skin analysis error:', err)
        setError('Analysis encountered an issue, using survey-based results')
        setAnalysisComplete(true)
      }
    }

    analyzeWithAI()
  }, [image, surveyAnswers])

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLinePosition((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 50)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // If analysis is complete and we've reached 100%, trigger completion
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(scanInterval)
          
          // Wait for analysis to complete if not done yet
          if (analysisComplete) {
            setTimeout(() => onComplete(analysisResult || undefined), 500)
          }
          return 100
        }
        
        // Slow down progress if analysis isn't complete yet
        if (prev >= 90 && !analysisComplete) {
          return prev + 0.2 // Slow progress
        }
        
        return prev + 1
      })
    }, 60)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < scanningStepKeys.length - 1 ? prev + 1 : prev
      )
    }, 1000)

    return () => {
      clearInterval(scanInterval)
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [analysisComplete, analysisResult, onComplete])

  // Complete when both progress is 100% and analysis is done
  useEffect(() => {
    if (progress >= 100 && analysisComplete) {
      const timeout = setTimeout(() => {
        onComplete(analysisResult || undefined)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [progress, analysisComplete, analysisResult, onComplete])

  return (
    <div className="flex min-h-screen flex-col items-center bg-foreground px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-background">
          {t('scanning.title')}
        </h1>
        <p className="mt-2 text-background/70">
          {t('scanning.subtitle')}
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
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-sm text-background/80">
            {t(scanningStepKeys[currentStep])}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-background/20">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-center text-2xl font-bold text-background">
          {Math.round(progress)}%
        </p>
        
        {error && (
          <p className="mt-2 text-center text-xs text-yellow-400">
            {error}
          </p>
        )}
      </div>

      {/* Analysis Stats */}
      <div className="mt-8 grid w-full max-w-sm grid-cols-3 gap-4">
        <StatBox
          label={t('scanning.stat.texture')}
          value={progress > 30 ? t('scanning.stat.analyzed') : t('scanning.stat.scanning')}
          active={progress <= 30}
        />
        <StatBox
          label={t('scanning.stat.hydration')}
          value={progress > 60 ? t('scanning.stat.analyzed') : t('scanning.stat.scanning')}
          active={progress > 30 && progress <= 60}
        />
        <StatBox
          label={t('scanning.stat.tone')}
          value={progress > 90 ? t('scanning.stat.analyzed') : t('scanning.stat.scanning')}
          active={progress > 60 && progress <= 90}
        />
      </div>

      {/* AI Analysis Indicator */}
      {!analysisComplete && progress > 50 && (
        <div className="mt-6 flex items-center gap-2 text-sm text-background/60">
          <div className="h-3 w-3 animate-spin rounded-full border border-primary border-t-transparent" />
          <span>AI analyzing your skin...</span>
        </div>
      )}
      
      {analysisComplete && analysisResult && (
        <div className="mt-6 flex items-center gap-2 text-sm text-green-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Analysis complete</span>
        </div>
      )}
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
