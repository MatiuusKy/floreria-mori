import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { validateCategory } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

// GET is public — used by the storefront catalog filter
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) return dbError('categories', error)
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  const validationError = validateCategory(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { name, slug } = body as { name: string; slug: string }
  const { data, error } = await auth.admin
    .from('categories').insert({ name: name.trim(), slug: slug.trim() }).select().single()
  if (error) return dbError('categories', error)
  return NextResponse.json(data, { status: 201 })
}
