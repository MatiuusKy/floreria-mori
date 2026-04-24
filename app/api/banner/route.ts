import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { validateBannerTitle } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

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

// GET is public — used by the storefront hero banner
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('banners').select('*').eq('active', true).maybeSingle()
  if (error) return dbError('banner', error)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  const validationError = validateBannerTitle(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const payload = safeFields(body)
  if (payload.active) await auth.admin.from('banners').update({ active: false }).neq('id', 'none')
  const { data, error } = await auth.admin.from('banners').insert(payload).select().single()
  if (error) return dbError('banner', error)
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(request: Request) {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const { id, ...body } = await request.json() as Record<string, unknown>
  if (!id) return NextResponse.json({ error: 'ID requerido.' }, { status: 400 })

  const validationError = validateBannerTitle(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const payload = safeFields(body)
  if (payload.active) await auth.admin.from('banners').update({ active: false }).neq('id', id)
  const { data, error } = await auth.admin.from('banners').update(payload).eq('id', id).select().single()
  if (error) return dbError('banner', error)
  return NextResponse.json(data)
}
