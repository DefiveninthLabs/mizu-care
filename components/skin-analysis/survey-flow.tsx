"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useI18n } from '@/lib/i18n'

interface SurveyFlowProps {
  onComplete: (answers: Record<string, string>) => void
}

export default function SurveyFlow({ onComplete }: SurveyFlowProps) {
  const { t } = useI18n()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const questions = [
    {
      id: "oiliness",
      question: t('survey.q1'),
      multiSelect: false,
      options: [
        { value: "very_oily", label: t('survey.q1.veryOily'), description: t('survey.q1.veryOilyDesc') },
        { value: "oily", label: t('survey.q1.oily'), description: t('survey.q1.oilyDesc') },
        { value: "balanced", label: t('survey.q1.balanced'), description: t('survey.q1.balancedDesc') },
        { value: "dry", label: t('survey.q1.dry'), description: t('survey.q1.dryDesc') },
        { value: "very_dry", label: t('survey.q1.veryDry'), description: t('survey.q1.veryDryDesc') },
      ],
    },
    {
      id: "sensitivity",
      question: t('survey.q2'),
      multiSelect: false,
      options: [
        { value: "very_sensitive", label: t('survey.q2.verySensitive'), description: t('survey.q2.verySensitiveDesc') },
        { value: "sensitive", label: t('survey.q2.sensitive'), description: t('survey.q2.sensitiveDesc') },
        { value: "not_sensitive", label: t('survey.q2.notSensitive'), description: t('survey.q2.notSensitiveDesc') },
      ],
    },
    {
      id: "hydration",
      question: t('survey.q3'),
      multiSelect: false,
      options: [
        { value: "very_dry", label: t('survey.q3.veryDry'), description: t('survey.q3.veryDryDesc') },
        { value: "dry", label: t('survey.q3.dry'), description: t('survey.q3.dryDesc') },
        { value: "normal", label: t('survey.q3.normal'), description: t('survey.q3.normalDesc') },
        { value: "oily", label: t('survey.q3.oily'), description: t('survey.q3.oilyDesc') },
      ],
    },
    {
      id: "concerns",
      question: t('survey.q4'),
      multiSelect: true,
      options: [
        { value: "acne", label: t('survey.q4.acne') },
        { value: "aging", label: t('survey.q4.aging') },
        { value: "dark_spots", label: t('survey.q4.darkSpots') },
        { value: "redness", label: t('survey.q4.redness') },
        { value: "large_pores", label: t('survey.q4.pores') },
        { value: "dullness", label: t('survey.q4.dullness') },
      ],
    },
    {
      id: "routine",
      question: t('survey.q5'),
      multiSelect: false,
      options: [
        { value: "minimal", label: t('survey.q5.minimal'), description: t('survey.q5.minimalDesc') },
        { value: "basic", label: t('survey.q5.basic'), description: t('survey.q5.basicDesc') },
        { value: "intermediate", label: t('survey.q5.intermediate'), description: t('survey.q5.intermediateDesc') },
        { value: "advanced", label: t('survey.q5.advanced'), description: t('survey.q5.advancedDesc') },
      ],
    },
  ]

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
          {currentQuestion + 1} {t('common.of')} {questions.length}
        </span>
        <div className="w-10" />
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col px-6 py-8">
        <h2 className="text-balance text-2xl font-semibold text-foreground">
          {question.question}
        </h2>
        {question.multiSelect && (
          <p className="mt-2 text-sm text-muted-foreground">
            {t('survey.multiSelectHint')}
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
                  {'description' in option && option.description && (
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
                {t('survey.seeResults')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                {t('common.continue')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
