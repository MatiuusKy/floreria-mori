import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

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

  const name = payload.name?.toString().trim()
  if (!name) return NextResponse.json({ error: 'El nombre es requerido.' }, { status: 400 })

  const price = Number(payload.price)
  if (!payload.price || isNaN(price) || price < 0) {
    return NextResponse.json({ error: 'El precio debe ser un número válido.' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin.from('products').insert({ ...payload, name }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
