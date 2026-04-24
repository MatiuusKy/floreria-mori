import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { validateCategory } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  const validationError = validateCategory(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { name, slug } = body as { name: string; slug: string }
  const { data, error } = await auth.admin
    .from('categories').update({ name: name.trim(), slug: slug.trim() }).eq('id', id).select().single()
  if (error) return dbError('categories', error)
  return NextResponse.json(data)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const { error } = await auth.admin.from('categories').delete().eq('id', id)
  if (error) return dbError('categories', error)
  return NextResponse.json({ success: true })
}
