-- supabase/migrations/002_improvements.sql

-- Delivery zones table
CREATE TABLE delivery_zones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  reference_price TEXT,          -- e.g. "desde $2.000" - free text for flexibility
  active          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read delivery_zones" ON delivery_zones FOR SELECT USING (true);
CREATE POLICY "Auth write delivery_zones" ON delivery_zones FOR ALL USING (auth.role() = 'authenticated');

-- Seed initial zones from hardcoded list
INSERT INTO delivery_zones (name, active) VALUES
  ('Peñalolén', true),
  ('La Florida', true),
  ('Macul', true),
  ('Ñuñoa', true),
  ('Providencia', true),
  ('Las Condes', true),
  ('Vitacura', true),
  ('La Reina', true),
  ('San Joaquín', true),
  ('La Granja', true);

-- New product fields for conversion badges and campaign tracking
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS same_day_delivery BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS limited_stock      BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS campaign_tag       TEXT;
