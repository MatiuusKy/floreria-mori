import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { safeProductFields } from '@/lib/api-fields'
import { validateProduct } from '@/lib/validation'
import { generateSlug } from '@/lib/utils'
import { dbError } from '@/lib/api-error'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, id: _id, created_at, ...raw } = body as Record<string, unknown>

  if (raw.name && !raw.slug) raw.slug = generateSlug(raw.name as string)

  const validationError = validateProduct(raw)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { data, error } = await auth.admin
    .from('products').update(safeProductFields(raw)).eq('id', id).select().single()
  if (error) return dbError('products PUT', error)
  return NextResponse.json(data)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const { error } = await auth.admin.from('products').delete().eq('id', id)
  if (error) return dbError('products DELETE', error)
  return NextResponse.json({ success: true })
}
