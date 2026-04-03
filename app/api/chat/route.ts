import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { system, message } = await req.json()

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
                  text: `SYSTEM: ${system}\n\nUSER: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      console.error(data)
      return NextResponse.json(
        { error: data.error?.message },
        { status: res.status }
      )
    }

    const content =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

    return NextResponse.json({ content })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    )
  }
}