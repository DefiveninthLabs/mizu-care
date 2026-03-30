import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export interface Product {
  id: number
  name: string
  description: string | null
  usage_tip: string | null
  price: number
  brand: string
  type: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface CreateProductInput {
  name: string
  description?: string | null
  usage_tip?: string | null
  price: number
  brand: string
  type: string
  image_url?: string | null
}

export const productDb = {
  async getAll(): Promise<Product[]> {
    return await sql`SELECT * FROM products ORDER BY created_at DESC` as Product[]
  },

  async getById(id: number): Promise<Product | undefined> {
    const rows = await sql`SELECT * FROM products WHERE id = ${id}` as Product[]
    return rows[0]
  },

  async getFiltered(
    search?: string,
    brand?: string,
    type?: string
  ): Promise<Product[]> {

    const conditions: string[] = []
    const values: any[] = []

    // 👇 индекс параметров
    let i = 1

    if (search) {
      conditions.push(`
      (name ILIKE $${i}
       OR description ILIKE $${i}
       OR brand ILIKE $${i})
    `)
      values.push(`%${search}%`)
      i++
    }

    if (brand) {
      conditions.push(`brand = $${i}`)
      values.push(brand)
      i++
    }

    if (type) {
      conditions.push(`type = $${i}`)
      values.push(type)
      i++
    }

    let query = `
    SELECT * FROM products
  `

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    query += ` ORDER BY created_at DESC`

    return await sql(query, values) as Product[]
  },

  async getBrands(): Promise<string[]> {
    const rows = await sql`SELECT DISTINCT brand FROM products ORDER BY brand` as { brand: string }[]
    return rows.map(r => r.brand)
  },

  async getTypes(): Promise<string[]> {
    const rows = await sql`SELECT DISTINCT type FROM products ORDER BY type` as { type: string }[]
    return rows.map(r => r.type)
  },

  async create(product: CreateProductInput): Promise<Product> {
    const rows = await sql`
      INSERT INTO products (name, description, usage_tip, price, brand, type, image_url)
      VALUES (${product.name}, ${product.description ?? null}, ${product.usage_tip ?? null}, ${product.price}, ${product.brand}, ${product.type}, ${product.image_url ?? null})
      RETURNING *
    ` as Product[]
    return rows[0]
  },

  async update(id: number, product: CreateProductInput): Promise<Product | undefined> {
    const rows = await sql`
      UPDATE products
      SET name = ${product.name},
          description = ${product.description ?? null},
          usage_tip = ${product.usage_tip ?? null},
          price = ${product.price},
          brand = ${product.brand},
          type = ${product.type},
          image_url = ${product.image_url ?? null},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    ` as Product[]
    return rows[0]
  },

  async delete(id: number): Promise<boolean> {
    const rows = await sql`DELETE FROM products WHERE id = ${id} RETURNING id` as { id: number }[]
    return rows.length > 0
  },
}
