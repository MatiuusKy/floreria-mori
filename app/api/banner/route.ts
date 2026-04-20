import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateBannerTitle } from '@/lib/validation'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('banners').select('*').eq('active', true).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const validationError = validateBannerTitle(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const admin = createAdminClient()
  if (body.active) {
    await admin.from('banners').update({ active: false }).neq('id', 'none')
  }
  const { data, error } = await admin.from('banners').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, ...body } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID requerido.' }, { status: 400 })
  const validationErrorPut = validateBannerTitle(body)
  if (validationErrorPut) return NextResponse.json({ error: validationErrorPut }, { status: 400 })

  const admin = createAdminClient()
  if (body.active) {
    await admin.from('banners').update({ active: false }).neq('id', id)
  }
  const { data, error } = await admin
    .from('banners').update(body).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
