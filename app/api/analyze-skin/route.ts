import { generateText, Output } from "ai"
import { z } from "zod"

const skinAnalysisSchema = z.object({
  skinType: z.enum(["Oily", "Dry", "Combination", "Sensitive", "Normal"]),
  concerns: z.array(z.string()).min(1).max(5),
  recommendations: z.array(z.string()).min(3).max(5),
  analysis: z.object({
    hydration: z.number().min(0).max(100),
    oiliness: z.number().min(0).max(100),
    texture: z.number().min(0).max(100),
    clarity: z.number().min(0).max(100),
    elasticity: z.number().min(0).max(100),
  }),
  detailedNotes: z.string(),
})

export async function POST(req: Request) {
  try {
    const { imageData, surveyAnswers } = await req.json()

    if (!imageData) {
      return Response.json(
        { error: "No image data provided" },
        { status: 400 }
      )
    }

    // Extract base64 data from data URL
    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!base64Match) {
      return Response.json(
        { error: "Invalid image data format" },
        { status: 400 }
      )
    }
    
    const mediaType = `image/${base64Match[1]}` as "image/jpeg" | "image/png" | "image/gif" | "image/webp"
    const base64Data = base64Match[2]

    const prompt = `You are an expert dermatologist AI. Analyze this facial skin image and provide a detailed skin analysis.

Survey answers from the user:
- Oiliness level: ${surveyAnswers?.oiliness || "not specified"}
- Sensitivity level: ${surveyAnswers?.sensitivity || "not specified"}  
- Hydration level: ${surveyAnswers?.hydration || "not specified"}
- Concerns: ${surveyAnswers?.concerns || "none specified"}
- Current routine: ${surveyAnswers?.routine || "not specified"}

Based on the image analysis AND the survey answers, provide a comprehensive skin assessment.

For skinType: Choose from Oily, Dry, Combination, Sensitive, or Normal based on what you observe.

For concerns: Be specific based on what you see (e.g., "Visible pores on T-zone", "Mild dehydration lines", "Uneven skin tone", "Light acne scarring"). List 1-5 concerns.

For recommendations: Provide 3-5 actionable skincare advice tailored to the observed conditions.

For analysis scores (0-100): Rate each metric based on what you observe:
- hydration: How well-hydrated the skin appears
- oiliness: Amount of visible oil/sebum
- texture: Smoothness and evenness of skin texture
- clarity: Clearness and absence of blemishes
- elasticity: Skin firmness and youthful appearance

For detailedNotes: A brief 1-2 sentence summary of the skin condition observed.`

    const { output } = await generateText({
      model: "google/gemini-3-flash",
      output: Output.object({
        schema: skinAnalysisSchema,
      }),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: base64Data,
              mimeType: mediaType,
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    })

    if (!output) {
      // Return fallback if AI doesn't return structured output
      return Response.json(getFallbackAnalysis(surveyAnswers))
    }

    return Response.json(output)
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    console.error("Skin analysis error:", errorMessage)
    
    // Try to extract survey answers for fallback
    try {
      const { surveyAnswers } = await req.clone().json()
      return Response.json(getFallbackAnalysis(surveyAnswers || {}))
    } catch {
      return Response.json(getFallbackAnalysis({}))
    }
  }
}

function getFallbackAnalysis(surveyAnswers: Record<string, string>) {
  const oiliness = surveyAnswers?.oiliness || "balanced"
  const sensitivity = surveyAnswers?.sensitivity || "not_sensitive"
  const hydration = surveyAnswers?.hydration || "normal"
  const concerns = surveyAnswers?.concerns?.split(",") || []

  let skinType: "Oily" | "Dry" | "Combination" | "Sensitive" | "Normal" = "Normal"
  const skinConcerns: string[] = []
  const recommendations: string[] = []

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

  if (concerns.includes("acne")) skinConcerns.push("Acne-prone skin")
  if (concerns.includes("aging")) skinConcerns.push("Fine lines and aging signs")
  if (concerns.includes("dark_spots")) skinConcerns.push("Hyperpigmentation")
  if (concerns.includes("redness")) skinConcerns.push("Redness and irritation")
  if (concerns.includes("large_pores")) skinConcerns.push("Enlarged pores")
  if (concerns.includes("dullness")) skinConcerns.push("Dull, tired-looking skin")

  const baseRecs: Record<string, string[]> = {
    Oily: [
      "Use a gentle foaming cleanser twice daily",
      "Apply oil-free, non-comedogenic moisturizer",
      "Include niacinamide serum to control sebum",
      "Use clay masks weekly to deep clean pores",
    ],
    Dry: [
      "Use a hydrating cream cleanser",
      "Layer hydrating serums with hyaluronic acid",
      "Apply rich moisturizer with ceramides",
      "Use facial oils at night for extra nourishment",
    ],
    Combination: [
      "Use a balanced gel cleanser",
      "Apply lightweight moisturizer all over",
      "Use targeted treatments for different zones",
      "Balance with gentle exfoliation weekly",
    ],
    Sensitive: [
      "Use fragrance-free gentle cleansers",
      "Apply soothing products with centella",
      "Avoid harsh active ingredients",
      "Always use mineral sunscreen SPF 50+",
    ],
    Normal: [
      "Maintain with gentle cleanser",
      "Use antioxidant serums for protection",
      "Apply broad-spectrum sunscreen daily",
      "Incorporate retinol for prevention",
    ],
  }

  const analysisScores = {
    Oily: { hydration: 70, oiliness: 80, texture: 65, clarity: 60, elasticity: 75 },
    Dry: { hydration: 40, oiliness: 25, texture: 55, clarity: 70, elasticity: 60 },
    Combination: { hydration: 55, oiliness: 65, texture: 60, clarity: 65, elasticity: 70 },
    Sensitive: { hydration: 50, oiliness: 40, texture: 55, clarity: 55, elasticity: 65 },
    Normal: { hydration: 75, oiliness: 50, texture: 80, clarity: 80, elasticity: 78 },
  }

  return {
    skinType,
    concerns: skinConcerns.length > 0 ? skinConcerns : ["Healthy skin balance"],
    recommendations: baseRecs[skinType] || baseRecs.Normal,
    analysis: analysisScores[skinType] || analysisScores.Normal,
    detailedNotes: `Based on your survey responses, your skin appears to be ${skinType.toLowerCase()} type with ${skinConcerns[0]?.toLowerCase() || "balanced characteristics"}.`,
  }
}
