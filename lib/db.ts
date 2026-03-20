import Database from 'better-sqlite3';
import path from 'path';

// Database file path - stored in project root
const dbPath = path.join(process.cwd(), 'products.db');

// Create database connection
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    brand TEXT NOT NULL,
    type TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Check if we need to seed with sample data
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };

if (count.count === 0) {
  const insertSample = db.prepare(`
    INSERT INTO products (name, description, price, brand, type, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const sampleProducts = [
    {
      name: 'Hydrating Face Mist',
      description: 'Refreshing mist that provides instant hydration throughout the day',
      price: 24.99,
      brand: 'MizuCaire',
      type: 'Spray',
      image_url: null
    },
    {
      name: 'Anti-Aging Night Cream',
      description: 'Rich cream that works overnight to reduce fine lines and wrinkles',
      price: 54.99,
      brand: 'MizuCaire',
      type: 'Cream',
      image_url: null
    },
    {
      name: 'Vitamin C Serum',
      description: 'Brightening serum with 20% Vitamin C for radiant skin',
      price: 39.99,
      brand: 'GlowLab',
      type: 'Serum',
      image_url: null
    },
    {
      name: 'Gentle Cleansing Foam',
      description: 'Soft foam cleanser for sensitive skin types',
      price: 18.99,
      brand: 'PureSkin',
      type: 'Cleanser',
      image_url: null
    },
    {
      name: 'SPF 50 Sunscreen Spray',
      description: 'Lightweight spray sunscreen with broad spectrum protection',
      price: 29.99,
      brand: 'SunShield',
      type: 'Spray',
      image_url: null
    },
    {
      name: 'Retinol Night Serum',
      description: 'Powerful retinol formula for skin renewal',
      price: 49.99,
      brand: 'GlowLab',
      type: 'Serum',
      image_url: null
    },
    {
      name: 'Moisturizing Body Lotion',
      description: 'Deep hydration for soft, smooth skin all day',
      price: 22.99,
      brand: 'PureSkin',
      type: 'Lotion',
      image_url: null
    },
    {
      name: 'Hyaluronic Acid Cream',
      description: 'Intense moisture with triple hyaluronic acid complex',
      price: 44.99,
      brand: 'MizuCaire',
      type: 'Cream',
      image_url: null
    }
  ];

  const insertMany = db.transaction((products: typeof sampleProducts) => {
    for (const product of products) {
      insertSample.run(
        product.name,
        product.description,
        product.price,
        product.brand,
        product.type,
        product.image_url
      );
    }
  });

  insertMany(sampleProducts);
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  brand: string;
  type: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  brand: string;
  type: string;
  image_url?: string;
}

// Prepared statements for better performance
const statements = {
  getAll: db.prepare('SELECT * FROM products ORDER BY created_at DESC'),
  
  getById: db.prepare('SELECT * FROM products WHERE id = ?'),
  
  getFiltered: db.prepare(`
    SELECT * FROM products 
    WHERE (? IS NULL OR name LIKE ? OR description LIKE ? OR brand LIKE ?)
    AND (? IS NULL OR brand = ?)
    AND (? IS NULL OR type = ?)
    ORDER BY created_at DESC
  `),
  
  getBrands: db.prepare('SELECT DISTINCT brand FROM products ORDER BY brand'),
  
  getTypes: db.prepare('SELECT DISTINCT type FROM products ORDER BY type'),
  
  insert: db.prepare(`
    INSERT INTO products (name, description, price, brand, type, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `),
  
  update: db.prepare(`
    UPDATE products 
    SET name = ?, description = ?, price = ?, brand = ?, type = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  delete: db.prepare('DELETE FROM products WHERE id = ?')
};

export const productDb = {
  getAll(): Product[] {
    return statements.getAll.all() as Product[];
  },

  getById(id: number): Product | undefined {
    return statements.getById.get(id) as Product | undefined;
  },

  getFiltered(search?: string, brand?: string, type?: string): Product[] {
    const searchPattern = search ? `%${search}%` : null;
    return statements.getFiltered.all(
      searchPattern, searchPattern, searchPattern, searchPattern,
      brand || null, brand || null,
      type || null, type || null
    ) as Product[];
  },

  getBrands(): string[] {
    const result = statements.getBrands.all() as { brand: string }[];
    return result.map(r => r.brand);
  },

  getTypes(): string[] {
    const result = statements.getTypes.all() as { type: string }[];
    return result.map(r => r.type);
  },

  create(product: CreateProductInput): Product {
    const result = statements.insert.run(
      product.name,
      product.description || null,
      product.price,
      product.brand,
      product.type,
      product.image_url || null
    );
    return this.getById(result.lastInsertRowid as number)!;
  },

  update(id: number, product: CreateProductInput): Product | undefined {
    const result = statements.update.run(
      product.name,
      product.description || null,
      product.price,
      product.brand,
      product.type,
      product.image_url || null,
      id
    );
    if (result.changes === 0) return undefined;
    return this.getById(id);
  },

  delete(id: number): boolean {
    const result = statements.delete.run(id);
    return result.changes > 0;
  }
};

export default db;
