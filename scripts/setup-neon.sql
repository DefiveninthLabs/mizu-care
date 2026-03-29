-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  brand TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with sample data (only if empty)
INSERT INTO products (name, description, price, brand, type, image_url)
SELECT * FROM (VALUES
  ('Hydrating Face Mist', 'Refreshing mist that provides instant hydration throughout the day', 24.99, 'MizuCaire', 'Spray', NULL),
  ('Anti-Aging Night Cream', 'Rich cream that works overnight to reduce fine lines and wrinkles', 54.99, 'MizuCaire', 'Cream', NULL),
  ('Vitamin C Serum', 'Brightening serum with 20% Vitamin C for radiant skin', 39.99, 'GlowLab', 'Serum', NULL),
  ('Gentle Cleansing Foam', 'Soft foam cleanser for sensitive skin types', 18.99, 'PureSkin', 'Cleanser', NULL),
  ('SPF 50 Sunscreen Spray', 'Lightweight spray sunscreen with broad spectrum protection', 29.99, 'SunShield', 'Spray', NULL),
  ('Retinol Night Serum', 'Powerful retinol formula for skin renewal', 49.99, 'GlowLab', 'Serum', NULL),
  ('Moisturizing Body Lotion', 'Deep hydration for soft, smooth skin all day', 22.99, 'PureSkin', 'Lotion', NULL),
  ('Hyaluronic Acid Cream', 'Intense moisture with triple hyaluronic acid complex', 44.99, 'MizuCaire', 'Cream', NULL)
) AS v(name, description, price, brand, type, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
