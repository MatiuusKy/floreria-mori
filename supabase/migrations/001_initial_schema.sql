-- supabase/migrations/001_initial_schema.sql

CREATE TABLE categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  description    TEXT,
  price          NUMERIC(10,2) NOT NULL,
  discount_price NUMERIC(10,2),
  category_id    UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url      TEXT,
  available      BOOLEAN DEFAULT true,
  featured       BOOLEAN DEFAULT false,
  best_seller    BOOLEAN DEFAULT false,
  stock          INTEGER DEFAULT 0,
  variants       JSONB,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE banners (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  subtitle   TEXT,
  cta_text   TEXT,
  cta_url    TEXT,
  active     BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies: public can read, only authenticated can write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Auth write categories" ON categories FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Auth write products" ON products FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read banners" ON banners FOR SELECT USING (true);
CREATE POLICY "Auth write banners" ON banners FOR ALL USING (auth.role() = 'authenticated');
