-- supabase/migrations/002_improvements.sql

-- Delivery zones table
CREATE TABLE IF NOT EXISTS delivery_zones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL UNIQUE,
  reference_price TEXT,
  active          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'delivery_zones' AND policyname = 'Public read delivery_zones'
  ) THEN
    CREATE POLICY "Public read delivery_zones" ON delivery_zones FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'delivery_zones' AND policyname = 'Auth write delivery_zones'
  ) THEN
    CREATE POLICY "Auth write delivery_zones" ON delivery_zones FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Seed initial zones (idempotent — UNIQUE constraint on name + ON CONFLICT DO NOTHING)
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
  ('La Granja', true)
ON CONFLICT (name) DO NOTHING;

-- New product fields for conversion badges and campaign tracking
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS same_day_delivery BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS limited_stock      BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS campaign_tag       TEXT;
