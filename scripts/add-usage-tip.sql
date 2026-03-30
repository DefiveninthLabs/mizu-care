-- Add usage_tip column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS usage_tip TEXT;

-- Update existing seed rows with sample usage tips
UPDATE products SET usage_tip = 'Mist onto face from 20–30 cm away throughout the day. Great for oily skin — keeps freshness without adding heaviness.' WHERE name = 'Hydrating Face Mist';
UPDATE products SET usage_tip = 'Apply a pea-sized amount to cleansed face and neck before bed. Best for dry or combination skin.' WHERE name = 'Anti-Aging Night Cream';
UPDATE products SET usage_tip = 'Press 2–3 drops onto clean skin in the morning. Avoid direct sunlight after application. Ideal for dull or uneven skin tone.' WHERE name = 'Vitamin C Serum';
UPDATE products SET usage_tip = 'Massage gently onto wet face, rinse with lukewarm water. Safe for sensitive skin — use morning and night.' WHERE name = 'Gentle Cleansing Foam';
UPDATE products SET usage_tip = 'Shake well. Spray evenly 15 cm from skin 15 minutes before sun exposure. Reapply every 2 hours outdoors.' WHERE name = 'SPF 50 Sunscreen Spray';
UPDATE products SET usage_tip = 'Apply 2–3 drops to face at night only. Start 2–3 times per week, increase gradually. Avoid eye area.' WHERE name = 'Retinol Night Serum';
UPDATE products SET usage_tip = 'Smooth onto body after showering while skin is slightly damp to lock in moisture. Use daily.' WHERE name = 'Moisturizing Body Lotion';
UPDATE products SET usage_tip = 'Layer under moisturizer morning and night. Stick to the skin — press in, don''t rub. Perfect for dry or dehydrated skin.' WHERE name = 'Hyaluronic Acid Cream';
