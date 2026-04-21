-- supabase/migrations/003_product_slugs.sql
-- Add slug column to products for human-readable URLs

ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;

-- Generate slugs from existing product names
-- (strips accents, lowercases, replaces spaces with hyphens)
UPDATE products
SET slug = lower(
  regexp_replace(
    regexp_replace(
      translate(
        name,
        'áàäâãéèëêíìïîóòöôõúùüûñÁÀÄÂÃÉÈËÊÍÌÏÎÓÒÖÔÕÚÙÜÛÑ',
        'aaaaaeeeeiiiiooooouuuunAAAAAEEEEIIIIOOOOOUUUUN'
      ),
      '[^a-zA-Z0-9\s-]', '', 'g'
    ),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- Make duplicate slugs unique by appending a counter
DO $$
DECLARE
  rec RECORD;
  counter INT;
  base_slug TEXT;
BEGIN
  FOR rec IN
    SELECT id, slug FROM products WHERE slug IN (
      SELECT slug FROM products GROUP BY slug HAVING count(*) > 1
    )
    ORDER BY slug, created_at
  LOOP
    base_slug := rec.slug;
    counter := 1;
    -- skip first occurrence
    IF EXISTS (
      SELECT 1 FROM products
      WHERE slug = base_slug AND id < rec.id
    ) THEN
      WHILE EXISTS (SELECT 1 FROM products WHERE slug = base_slug || '-' || counter) LOOP
        counter := counter + 1;
      END LOOP;
      UPDATE products SET slug = base_slug || '-' || counter WHERE id = rec.id;
    END IF;
  END LOOP;
END $$;

-- Now make it required and unique
ALTER TABLE products ALTER COLUMN slug SET NOT NULL;
ALTER TABLE products ADD CONSTRAINT products_slug_unique UNIQUE (slug);
