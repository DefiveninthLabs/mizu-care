import { NextRequest, NextResponse } from 'next/server'
import { productDb } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || undefined
    const brand = searchParams.get('brand') || undefined
    const type = searchParams.get('type') || undefined

    const products = await productDb.getFiltered(search, brand, type)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, brand, type, image_url } = body

    if (!name || price === undefined || !brand || !type) {
      return NextResponse.json(
        { error: 'Name, price, brand, and type are required' },
        { status: 400 }
      )
    }

    const newProduct = await productDb.create({
      name,
      description,
      price: parseFloat(price),
      brand,
      type,
      image_url,
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
