import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage, context = "product" } = await req.json()

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Missing text or targetLanguage" }, { status: 400 })
    }

    if (targetLanguage === 'en') {
      return NextResponse.json({ translatedText: text })
    }

    const isArray = Array.isArray(text)
    
    const systemPrompt = `You are a professional translator for a skincare e-commerce platform called MizuCaire. 
    Translate the following ${context} information from English to ${targetLanguage}.
    Maintain a premium, helpful, and professional tone. 
    ${isArray ? 'The input is an ARRAY of objects. Return an ARRAY of objects with the same structure and keys but translated values.' : 'If the input is a JSON object, return a JSON object with the same keys but translated values.'}
    Do not translate brand names if they are proper nouns (e.g., "SKIN1004", "Dr.Ceuracle").
    Return ONLY the translated content, no explanations.`

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `SYSTEM: ${systemPrompt}\n\nCONTENT TO TRANSLATE:\n${typeof text === 'string' ? text : JSON.stringify(text, null, 2)}`,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await res.json()
    if (!res.ok) {
      console.error("Gemini API error:", data)
      return NextResponse.json({ error: data.error?.message || "Translation failed" }, { status: res.status })
    }

    let translatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
    
    // Clean up Markdown if present
    if (translatedContent.includes('```')) {
      translatedContent = translatedContent.replace(/```(json)?/g, '').replace(/```/g, '').trim()
    }

    if (typeof text === 'object') {
      try {
        const parsed = JSON.parse(translatedContent)
        return NextResponse.json({ translatedText: parsed })
      } catch (e) {
        console.error('Failed to parse translated JSON:', translatedContent)
        return NextResponse.json({ translatedText: translatedContent })
      }
    }

    return NextResponse.json({ translatedText: translatedContent })
  } catch (err: any) {
    console.error('Translation Route Error:', err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}
