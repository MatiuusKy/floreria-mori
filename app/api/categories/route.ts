import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateCategory } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) return dbError('categories', error)
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const validationError = validateCategory(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { name, slug } = body as { name: string; slug: string }
  const admin = createAdminClient()
  const { data, error } = await admin.from('categories').insert({ name: name.trim(), slug: slug.trim() }).select().single()
  if (error) return dbError('categories', error)
  return NextResponse.json(data, { status: 201 })
}
