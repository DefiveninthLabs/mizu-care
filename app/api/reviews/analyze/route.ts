import { generateText } from "ai"
import { neon } from "@neondatabase/serverless"
import { NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

const REVIEW_ANALYSIS_MODEL =
  process.env.REVIEW_ANALYSIS_MODEL || "google/gemini-2.5-flash"

type Period = "1d" | "1w" | "1m" | "3m" | "6m"
type Locale = "en" | "ru" | "kz"

const PERIOD_TO_MS: Record<Period, number> = {
  "1d": 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
  "1m": 30 * 24 * 60 * 60 * 1000,
  "3m": 90 * 24 * 60 * 60 * 1000,
  "6m": 180 * 24 * 60 * 60 * 1000,
}

const PERIOD_LABELS: Record<Period, string> = {
  "1d": "last 1 day",
  "1w": "last 1 week",
  "1m": "last 1 month",
  "3m": "last 3 months",
  "6m": "last 6 months",
}

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ru: "Russian",
  kz: "Kazakh",
}

interface ReviewRow {
  id: number
  author_name: string
  rating: number
  comment: string
  created_at: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const period = (body?.period || "1m") as Period
    const locale = (body?.locale || "en") as Locale

    if (!PERIOD_TO_MS[period]) {
      return NextResponse.json({ error: "Invalid period" }, { status: 400 })
    }

    const safeLocale: Locale = ["en", "ru", "kz"].includes(locale)
      ? locale
      : "en"
    const cutoffDate = new Date(Date.now() - PERIOD_TO_MS[period])

    const reviews = await sql`
      SELECT id, author_name, rating, comment, created_at
      FROM reviews
      WHERE created_at >= ${cutoffDate.toISOString()}
      ORDER BY created_at DESC
    ` as ReviewRow[]

    if (reviews.length === 0) {
      return NextResponse.json({
        summary: "",
        reviewsCount: 0,
        period,
      })
    }

    const reviewPayload = reviews.map((r) => ({
      rating: r.rating,
      comment: r.comment,
      created_at: r.created_at,
    }))

    const prompt = `You are an analyst for skincare product feedback.
Summarize user feedback for ${PERIOD_LABELS[period]} based on the review data below.

Requirements:
- Write output in ${LOCALE_LABELS[safeLocale]}.
- Keep it concise and useful for product decisions.
- Include:
  1) Overall sentiment in one sentence
  2) Top positive themes (2-4 bullets)
  3) Top negative themes / pain points (2-4 bullets)
  4) Actionable next steps (2-4 bullets)
- Be faithful to the provided reviews only.

Reviews JSON:
${JSON.stringify(reviewPayload)}`

    const result = await generateText({
      model: REVIEW_ANALYSIS_MODEL,
      prompt,
    })

    return NextResponse.json({
      summary: result.text,
      reviewsCount: reviews.length,
      period,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("Error analyzing reviews:", message)
    return NextResponse.json(
      { error: "Failed to analyze reviews" },
      { status: 500 }
    )
  }
}
