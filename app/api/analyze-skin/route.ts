import { generateText, Output } from "ai"
import { z } from "zod"
import { productDb, type Product } from "@/lib/db"

const SKIN_ANALYSIS_MODEL =
  process.env.SKIN_ANALYSIS_MODEL || "google/gemini-2.5-flash"
const localeSchema = z.enum(["en", "ru", "kz"])

const localeInstructions: Record<z.infer<typeof localeSchema>, string> = {
  en: "English",
  ru: "Russian",
  kz: "Kazakh",
}

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
  recommendedProductIds: z.array(z.number()).min(0).max(6),
})

// Minimal product info for AI (no image_url, timestamps)
type MinimalProduct = {
  id: number
  name: string
  brand: string
  type: string
  description: string | null
}

function getMinimalProducts(products: Product[]): MinimalProduct[] {
  return products.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    type: p.type,
    description: p.description,
  }))
}

export async function POST(req: Request) {
  const requestId = `skin-analysis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  try {
    const requestBody = await req.json()
    const imageData: string | undefined = requestBody?.imageData
    const surveyAnswers = requestBody?.surveyAnswers
    const localeParse = localeSchema.safeParse(requestBody?.locale)
    const userLocale: z.infer<typeof localeSchema> = localeParse.success
      ? localeParse.data
      : "en"
    const responseLanguage = localeInstructions[userLocale]
    console.info(`[${requestId}] Received skin analysis request`, {
      hasImage: Boolean(imageData),
      surveyKeys: surveyAnswers ? Object.keys(surveyAnswers) : [],
    })

    // Fetch all products from DB
    let allProducts: Product[] = []
    try {
      allProducts = await productDb.getAll()
    } catch (dbErr) {
      console.error("Failed to fetch products:", dbErr)
    }

    const minimalProducts = getMinimalProducts(allProducts)

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

    const productListForAI = minimalProducts.length > 0 
      ? `\n\nAvailable products in our database (select the most suitable ones by their ID):
${JSON.stringify(minimalProducts, null, 0)}`
      : ""

    const prompt = `You are an expert dermatologist AI. Analyze this facial skin image and provide a detailed skin analysis.
Use a direct, tough-love tone. Do not sugarcoat obvious skin issues. Be honest, slightly exaggerated for motivation, but never insulting.
The user interface language is ${userLocale}. You MUST write all client-facing text fields in ${responseLanguage}.
Apply this language rule to: concerns, recommendations, and detailedNotes.
Do not translate skinType values; keep skinType strictly one of: Oily, Dry, Combination, Sensitive, Normal.

Survey answers from the user:
- Oiliness level: ${surveyAnswers?.oiliness || "not specified"}
- Sensitivity level: ${surveyAnswers?.sensitivity || "not specified"}  
- Hydration level: ${surveyAnswers?.hydration || "not specified"}
- Concerns: ${surveyAnswers?.concerns || "none specified"}
- Current routine: ${surveyAnswers?.routine || "not specified"}

Based on the image analysis AND the survey answers, provide a comprehensive skin assessment.

For skinType: Choose from Oily, Dry, Combination, Sensitive, or Normal based on what you observe.

For concerns: Be specific based on what you see (e.g., "Visible pores on T-zone", "Mild dehydration lines", "Uneven skin tone", "Light acne scarring"). 
Use stronger language when issues are visible (for example "noticeable dehydration", "clearly congested pores", "dull and tired skin"). List 1-5 concerns.

For recommendations: Provide 3-5 actionable skincare advice tailored to the observed conditions. Keep recommendations practical and urgent in tone.

For analysis scores (0-100): Rate each metric based on what you observe:
- hydration: How well-hydrated the skin appears
- oiliness: Amount of visible oil/sebum
- texture: Smoothness and evenness of skin texture
- clarity: Clearness and absence of blemishes
- elasticity: Skin firmness and youthful appearance

For detailedNotes: A brief 1-2 sentence summary of the skin condition observed.
The note should sound frank and corrective, like a dermatologist giving a reality check.

For recommendedProductIds: Select up to 6 product IDs from our database that would be most beneficial for this skin type and concerns. Choose products that address the specific issues you identified.${productListForAI}`

    let output: z.infer<typeof skinAnalysisSchema> | undefined
    try {
      const aiResult = await generateText({
        model: SKIN_ANALYSIS_MODEL,
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
              mediaType,
              },
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
      })
      output = aiResult.output
      console.info(`[${requestId}] AI call succeeded`, {
        model: SKIN_ANALYSIS_MODEL,
        hasOutput: Boolean(output),
        recommendedProductIdsCount: output?.recommendedProductIds?.length ?? 0,
      })
    } catch (aiError: unknown) {
      const err = aiError instanceof Error ? aiError : new Error(String(aiError))
      console.error(`[${requestId}] AI call failed, using fallback`, {
        model: SKIN_ANALYSIS_MODEL,
        message: err.message,
        name: err.name,
        stack: err.stack,
        cause: err.cause,
      })
      return Response.json(getFallbackAnalysis(surveyAnswers || {}, allProducts))
    }

    if (!output) {
      console.warn(`[${requestId}] AI returned no output, using fallback`)
      return Response.json(getFallbackAnalysis(surveyAnswers, allProducts))
    }

    // Get full product details for recommended IDs
    const recommendedProducts = output.recommendedProductIds
      .map(id => allProducts.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined)

    return Response.json({
      ...output,
      recommendedProducts,
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    const errorName = err instanceof Error ? err.name : "UnknownError"
    const errorStack = err instanceof Error ? err.stack : undefined
    const errorCause = err instanceof Error ? err.cause : undefined
    console.error(`[${requestId}] Skin analysis route error, using fallback`, {
      message: errorMessage,
      name: errorName,
      stack: errorStack,
      cause: errorCause,
    })
    
    // Try to extract survey answers for fallback
    let allProducts: Product[] = []
    try {
      allProducts = await productDb.getAll()
    } catch {
      // Ignore DB error in fallback
    }

    try {
      const { surveyAnswers } = await req.clone().json()
      return Response.json(getFallbackAnalysis(surveyAnswers || {}, allProducts))
    } catch {
      return Response.json(getFallbackAnalysis({}, allProducts))
    }
  }
}

function getFallbackAnalysis(surveyAnswers: Record<string, string>, products: Product[]) {
  const oiliness = surveyAnswers?.oiliness || "balanced"
  const sensitivity = surveyAnswers?.sensitivity || "not_sensitive"
  const hydration = surveyAnswers?.hydration || "normal"
  const concerns = surveyAnswers?.concerns?.split(",") || []

  let skinType: "Oily" | "Dry" | "Combination" | "Sensitive" | "Normal" = "Normal"
  const skinConcerns: string[] = []

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

  // Fallback: pick random products based on skin type keywords
  const typeKeywords: Record<string, string[]> = {
    Oily: ["Cleanser", "Toner", "Serum"],
    Dry: ["Moisturizer", "Cream", "Oil", "Serum"],
    Combination: ["Cleanser", "Moisturizer", "Serum"],
    Sensitive: ["Cream", "Serum", "Moisturizer"],
    Normal: ["Serum", "Moisturizer", "Sunscreen"],
  }

  const keywords = typeKeywords[skinType] || typeKeywords.Normal
  const recommendedProducts = products
    .filter(p => keywords.some(k => 
      p.type.toLowerCase().includes(k.toLowerCase()) || 
      p.name.toLowerCase().includes(k.toLowerCase())
    ))
    .slice(0, 4)

  // If not enough products matched, just take first few
  if (recommendedProducts.length < 4) {
    const remaining = products
      .filter(p => !recommendedProducts.includes(p))
      .slice(0, 4 - recommendedProducts.length)
    recommendedProducts.push(...remaining)
  }

  return {
    skinType,
    concerns: skinConcerns.length > 0 ? skinConcerns : ["Healthy skin balance"],
    recommendations: baseRecs[skinType] || baseRecs.Normal,
    analysis: analysisScores[skinType] || analysisScores.Normal,
    detailedNotes: `Based on your survey responses, your skin appears ${skinType.toLowerCase()} with ${skinConcerns[0]?.toLowerCase() || "visible imbalance"}. Your routine likely needs stronger consistency and targeted treatment to avoid worsening these issues.`,
    recommendedProductIds: recommendedProducts.map(p => p.id),
    recommendedProducts,
  }
}
