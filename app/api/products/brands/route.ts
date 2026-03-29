import { NextResponse } from 'next/server'
import { productDb } from '@/lib/db'

export async function GET() {
  try {
    const brands = await productDb.getBrands()
    return NextResponse.json(brands)
  } catch (error) {
    console.error('Failed to fetch brands:', error)
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
  }
}
