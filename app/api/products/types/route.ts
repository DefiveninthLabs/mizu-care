import { NextResponse } from 'next/server'
import { productDb } from '@/lib/db'

export async function GET() {
  try {
    const types = await productDb.getTypes()
    return NextResponse.json(types)
  } catch (error) {
    console.error('Failed to fetch types:', error)
    return NextResponse.json({ error: 'Failed to fetch types' }, { status: 500 })
  }
}
