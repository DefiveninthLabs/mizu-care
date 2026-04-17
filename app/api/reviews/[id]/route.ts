import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reviewId = Number(id)

    if (!Number.isFinite(reviewId)) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 })
    }

    const existing = await sql`
      SELECT id, rating
      FROM reviews
      WHERE id = ${reviewId}
      LIMIT 1
    ` as { id: number; rating: number }[]

    if (existing.length === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    const rating = existing[0].rating

    await sql`
      DELETE FROM reviews
      WHERE id = ${reviewId}
    `

    await sql`
      UPDATE scan_stats
      SET total_ratings = GREATEST(total_ratings - 1, 0),
          ratings_sum = GREATEST(ratings_sum - ${rating}, 0),
          updated_at = NOW()
      WHERE id = 1
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting review:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
