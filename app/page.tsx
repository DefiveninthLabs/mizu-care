"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/skin-analysis/welcome-screen"
import HomeScreen from '@/components/skin-analysis/home'
import CameraCapture from "@/components/skin-analysis/camera-capture"
import ScanningScreen from "@/components/skin-analysis/scanning-screen"
import SurveyFlow from "@/components/skin-analysis/survey-flow"
import ResultsScreen from "@/components/skin-analysis/results-screen"

export type SkinData = {
  image: string | null
  surveyAnswers: Record<string, string>
  skinType: string
  concerns: string[]
  recommendations: string[]
}

export type AppScreen =
  | "home"
  | "welcome"
  | "camera"
  | "scanning"
  | "survey"
  | "results"

export default function SkinAnalysisApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home")
  const [skinData, setSkinData] = useState<SkinData>({
    image: null,
    surveyAnswers: {},
    skinType: "",
    concerns: [],
    recommendations: [],
  })

  const handleStartAnalysis = () => {
    setCurrentScreen("camera")
  }

  const handlePhotoCapture = (imageData: string) => {
    setSkinData((prev) => ({ ...prev, image: imageData }))
    setCurrentScreen("scanning")
  }

  const handleScanningComplete = () => {
    setCurrentScreen("survey")
  }

  const handleSurveyComplete = (answers: Record<string, string>) => {
    const { skinType, concerns, recommendations } = analyzeSkin(answers)
    setSkinData((prev) => ({
      ...prev,
      surveyAnswers: answers,
      skinType,
      concerns,
      recommendations,
    }))
    setCurrentScreen("results")
  }

  const handleRestart = () => {
  setSkinData({
    image: null,
    surveyAnswers: {},
    skinType: "",
    concerns: [],
    recommendations: [],
  })
  setCurrentScreen("home")
}

  return (
    <main className="min-h-screen bg-[#eef0f1]">
      {currentScreen === "home" && (
        <HomeScreen onStart={() => setCurrentScreen("welcome")} />
      )}
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={handleStartAnalysis} />
      )}
      {currentScreen === "camera" && (
        <CameraCapture
          onCapture={handlePhotoCapture}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}
      {currentScreen === "scanning" && (
        <ScanningScreen
          image={skinData.image}
          onComplete={handleScanningComplete}
        />
      )}
      {currentScreen === "survey" && (
        <SurveyFlow onComplete={handleSurveyComplete} />
      )}
      {currentScreen === "results" && (
        <ResultsScreen skinData={skinData} onRestart={handleRestart} />
      )}
    </main>
  )
}

function analyzeSkin(answers: Record<string, string>): {
  skinType: string
  concerns: string[]
  recommendations: string[]
} {
  const oiliness = answers.oiliness || "balanced"
  const sensitivity = answers.sensitivity || "not_sensitive"
  const hydration = answers.hydration || "normal"
  const concerns = answers.concerns?.split(",") || []

  let skinType = "Normal"
  const skinConcerns: string[] = []
  const recommendations: string[] = []

  // Determine skin type
  if (oiliness === "very_oily" || oiliness === "oily") {
    if (hydration === "dry" || hydration === "very_dry") {
      skinType = "Combination"
      skinConcerns.push("Combination skin with oily T-zone")
    } else {
      skinType = "Oily"
      skinConcerns.push("Excess sebum production")
    }
  } else if (hydration === "dry" || hydration === "very_dry") {
    skinType = "Dry"
    skinConcerns.push("Lack of natural moisture")
  } else if (sensitivity === "very_sensitive" || sensitivity === "sensitive") {
    skinType = "Sensitive"
    skinConcerns.push("Reactive skin barrier")
  }

  // Add concerns based on survey
  if (concerns.includes("acne")) {
    skinConcerns.push("Acne-prone skin")
  }
  if (concerns.includes("aging")) {
    skinConcerns.push("Fine lines and aging signs")
  }
  if (concerns.includes("dark_spots")) {
    skinConcerns.push("Hyperpigmentation")
  }
  if (concerns.includes("redness")) {
    skinConcerns.push("Redness and irritation")
  }

  // Generate recommendations
  if (skinType === "Oily") {
    recommendations.push(
      "Use a gentle foaming cleanser twice daily",
      "Apply oil-free, non-comedogenic moisturizer",
      "Include niacinamide serum to control sebum",
      "Use clay masks weekly to deep clean pores"
    )
  } else if (skinType === "Dry") {
    recommendations.push(
      "Use a hydrating cream cleanser",
      "Layer hydrating serums with hyaluronic acid",
      "Apply rich moisturizer with ceramides",
      "Use facial oils at night for extra nourishment"
    )
  } else if (skinType === "Combination") {
    recommendations.push(
      "Use a balanced gel cleanser",
      "Apply lightweight moisturizer all over",
      "Use targeted treatments for different zones",
      "Balance with gentle exfoliation weekly"
    )
  } else if (skinType === "Sensitive") {
    recommendations.push(
      "Use fragrance-free gentle cleansers",
      "Apply soothing products with centella",
      "Avoid harsh active ingredients",
      "Always use mineral sunscreen SPF 50+"
    )
  } else {
    recommendations.push(
      "Maintain with gentle cleanser",
      "Use antioxidant serums for protection",
      "Apply broad-spectrum sunscreen daily",
      "Incorporate retinol for prevention"
    )
  }

  return {
    skinType,
    concerns: skinConcerns.length > 0 ? skinConcerns : ["Healthy skin balance"],
    recommendations,
  }
}
