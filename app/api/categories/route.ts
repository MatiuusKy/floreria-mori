import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const name = body.name?.toString().trim()
  const slug = body.slug?.toString().trim()

  if (!name) return NextResponse.json({ error: 'El nombre es requerido.' }, { status: 400 })
  if (!slug) return NextResponse.json({ error: 'El slug es requerido.' }, { status: 400 })
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'El slug solo puede contener letras minúsculas, números y guiones.' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin.from('categories').insert({ name, slug }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
