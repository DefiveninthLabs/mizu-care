"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

interface SurveyFlowProps {
  onComplete: (answers: Record<string, string>) => void
}

type Question = {
  id: string
  question: string
  options: { value: string; label: string; description?: string }[]
  multiSelect?: boolean
}

const questions: Question[] = [
  {
    id: "oiliness",
    question: "How does your skin feel a few hours after cleansing?",
    options: [
      { value: "very_oily", label: "Very Oily", description: "Shiny all over" },
      { value: "oily", label: "Somewhat Oily", description: "Oily in T-zone" },
      { value: "balanced", label: "Balanced", description: "Neither oily nor dry" },
      { value: "dry", label: "A Bit Dry", description: "Feels tight in some areas" },
      { value: "very_dry", label: "Very Dry", description: "Tight and flaky" },
    ],
  },
  {
    id: "sensitivity",
    question: "How does your skin react to new products?",
    options: [
      { value: "very_sensitive", label: "Very Sensitive", description: "Burns or stings easily" },
      { value: "sensitive", label: "Somewhat Sensitive", description: "Occasional reactions" },
      { value: "not_sensitive", label: "Not Sensitive", description: "Rarely reacts" },
    ],
  },
  {
    id: "hydration",
    question: "How would you describe your skin's hydration?",
    options: [
      { value: "very_dry", label: "Very Dehydrated", description: "Constantly needs moisture" },
      { value: "dry", label: "Often Dry", description: "Needs regular moisturizing" },
      { value: "normal", label: "Well Hydrated", description: "Moisture balanced" },
      { value: "oily", label: "Overly Hydrated", description: "Can skip moisturizer" },
    ],
  },
  {
    id: "concerns",
    question: "What are your main skin concerns?",
    multiSelect: true,
    options: [
      { value: "acne", label: "Acne & Breakouts" },
      { value: "aging", label: "Fine Lines & Wrinkles" },
      { value: "dark_spots", label: "Dark Spots & Uneven Tone" },
      { value: "redness", label: "Redness & Irritation" },
      { value: "large_pores", label: "Large Pores" },
      { value: "dullness", label: "Dullness & Lack of Glow" },
    ],
  },
  {
    id: "routine",
    question: "What's your current skincare routine like?",
    options: [
      { value: "minimal", label: "Minimal", description: "Just cleanser and maybe moisturizer" },
      { value: "basic", label: "Basic", description: "Cleanser, moisturizer, sunscreen" },
      { value: "intermediate", label: "Intermediate", description: "Including serums and treatments" },
      { value: "advanced", label: "Advanced", description: "Multiple products and steps" },
    ],
  },
]

export default function SurveyFlow({ onComplete }: SurveyFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleSelect = (value: string) => {
    if (question.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      )
    } else {
      setAnswers((prev) => ({ ...prev, [question.id]: value }))
      // Auto advance after brief delay
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1)
        }
      }, 300)
    }
  }

  const handleNext = () => {
    if (question.multiSelect) {
      setAnswers((prev) => ({
        ...prev,
        [question.id]: selectedOptions.join(","),
      }))
      setSelectedOptions([])
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      const finalAnswers = question.multiSelect
        ? { ...answers, [question.id]: selectedOptions.join(",") }
        : answers
      onComplete(finalAnswers)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedOptions([])
    }
  }

  const isAnswered = question.multiSelect
    ? selectedOptions.length > 0
    : answers[question.id] !== undefined

  const isLast = currentQuestion === questions.length - 1

  return (
    <div className="flex min-h-screen flex-col bg-[#eef0f1]">
      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className="text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentQuestion + 1} of {questions.length}
        </span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col px-6 py-8">
        <h2 className="text-balance text-2xl font-semibold text-foreground">
          {question.question}
        </h2>
        {question.multiSelect && (
          <p className="mt-2 text-sm text-muted-foreground">
            Select all that apply
          </p>
        )}

        {/* Options */}
        <div className="mt-8 space-y-3">
          {question.options.map((option) => {
            const isSelected = question.multiSelect
              ? selectedOptions.includes(option.value)
              : answers[question.id] === option.value

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? "border-[#c7d9e5] bg-primary/5"
                    : "border-[#c7d9e5] bg-card hover:border-primary/50"
                }`}
              >
                <div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  {option.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  )}
                </div>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      {(question.multiSelect || isLast) && (
        <div className="p-6">
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            size="lg"
            className="w-full rounded-full py-6"
          >
            {isLast ? (
              <>
                See My Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
