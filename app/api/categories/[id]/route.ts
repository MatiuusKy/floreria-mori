import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateCategory } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const validationError = validateCategory(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  // Whitelist only the columns we allow to write
  const { name, slug } = body as { name: string; slug: string }
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('categories')
    .update({ name: name.trim(), slug: slug.trim() })
    .eq('id', id)
    .select()
    .single()
  if (error) return dbError('categories', error)
  return NextResponse.json(data)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { error } = await admin.from('categories').delete().eq('id', id)
  if (error) return dbError('categories', error)
  return NextResponse.json({ success: true })
}
