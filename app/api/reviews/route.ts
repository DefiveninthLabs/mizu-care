import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const reviews = await sql`
      SELECT id, author_name, rating, comment, created_at 
      FROM reviews 
      ORDER BY created_at DESC 
    `
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { author_name, rating, comment } = await request.json()

    if (!author_name || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO reviews (author_name, rating, comment)
      VALUES (${author_name}, ${rating}, ${comment})
      RETURNING id, author_name, rating, comment, created_at
    `

    // Update stats
    await sql`
      UPDATE scan_stats 
      SET total_ratings = total_ratings + 1,
          ratings_sum = ratings_sum + ${rating},
          updated_at = NOW()
      WHERE id = 1
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
