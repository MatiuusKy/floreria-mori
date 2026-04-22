import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateBannerTitle } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

// Explicitly whitelist the columns we allow to write
function safeFields(body: Record<string, unknown>) {
  const { title, subtitle, cta_text, cta_url, active } = body
  return {
    title:    typeof title    === 'string' ? title.trim()    : '',
    subtitle: typeof subtitle === 'string' ? subtitle.trim() : '',
    cta_text: typeof cta_text === 'string' ? cta_text.trim() : '',
    cta_url:  typeof cta_url  === 'string' ? cta_url.trim()  : '',
    active:   Boolean(active),
  }
}

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('banners').select('*').eq('active', true).maybeSingle()
  if (error) return dbError('banner', error)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const validationError = validateBannerTitle(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const payload = safeFields(body)
  const admin = createAdminClient()
  if (payload.active) {
    await admin.from('banners').update({ active: false }).neq('id', 'none')
  }
  const { data, error } = await admin.from('banners').insert(payload).select().single()
  if (error) return dbError('banner', error)
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rawBody = await request.json()
  const { id, ...body } = rawBody
  if (!id) return NextResponse.json({ error: 'ID requerido.' }, { status: 400 })

  const validationErrorPut = validateBannerTitle(body)
  if (validationErrorPut) return NextResponse.json({ error: validationErrorPut }, { status: 400 })

  const payload = safeFields(body)
  const admin = createAdminClient()
  if (payload.active) {
    await admin.from('banners').update({ active: false }).neq('id', id)
  }
  const { data, error } = await admin
    .from('banners').update(payload).eq('id', id).select().single()
  if (error) return dbError('banner', error)
  return NextResponse.json(data)
}
