import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateProduct } from '@/lib/validation'
import { generateSlug } from '@/lib/utils'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug)')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, id: _id, created_at, ...payload } = body

  // Auto-generate slug from name if not provided
  if (!payload.slug && payload.name) {
    payload.slug = generateSlug(payload.name)
  }

  const validationError = validateProduct(payload)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const admin = createAdminClient()
  const { data, error } = await admin.from('products').insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
