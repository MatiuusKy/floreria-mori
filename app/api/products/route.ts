import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateProduct } from '@/lib/validation'
import { generateSlug } from '@/lib/utils'
import { dbError } from '@/lib/api-error'

// Whitelist the DB columns we allow to write
function safeProductFields(src: Record<string, unknown>) {
  return {
    slug:              typeof src.slug        === 'string'  ? src.slug        : undefined,
    name:              typeof src.name        === 'string'  ? src.name        : undefined,
    description:       typeof src.description === 'string'  ? src.description : null,
    price:             Number(src.price),
    discount_price:    src.discount_price != null            ? Number(src.discount_price) : null,
    category_id:       typeof src.category_id === 'string'  ? src.category_id : null,
    image_url:         typeof src.image_url  === 'string'   ? src.image_url   : null,
    available:         typeof src.available  === 'boolean'  ? src.available   : true,
    featured:          typeof src.featured   === 'boolean'  ? src.featured    : false,
    best_seller:       typeof src.best_seller === 'boolean' ? src.best_seller  : false,
    stock:             src.stock != null                     ? Number(src.stock) : 0,
    variants:          Array.isArray(src.variants) && src.variants.length > 0 ? src.variants : null,
    same_day_delivery: typeof src.same_day_delivery === 'boolean' ? src.same_day_delivery : false,
    limited_stock:     typeof src.limited_stock     === 'boolean' ? src.limited_stock     : false,
    campaign_tag:      typeof src.campaign_tag      === 'string'  ? src.campaign_tag      : null,
  }
}

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug)')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return dbError('products GET', error)
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, id: _id, created_at, ...raw } = body as Record<string, unknown>

  if (!raw.slug && raw.name) {
    raw.slug = generateSlug(raw.name as string)
  }

  const validationError = validateProduct(raw)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const payload = safeProductFields(raw)
  const admin = createAdminClient()
  const { data, error } = await admin.from('products').insert(payload).select().single()
  if (error) return dbError('products POST', error)
  return NextResponse.json(data, { status: 201 })
}
