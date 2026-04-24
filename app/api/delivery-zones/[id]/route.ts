import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { safeDeliveryZoneFields } from '@/lib/api-fields'
import { validateDeliveryZone } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  const validationError = validateDeliveryZone(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { data, error } = await auth.admin
    .from('delivery_zones').update(safeDeliveryZoneFields(body)).eq('id', id).select().single()
  if (error) return dbError('delivery-zones', error)
  return NextResponse.json(data)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const { error } = await auth.admin.from('delivery_zones').delete().eq('id', id)
  if (error) return dbError('delivery-zones', error)
  return NextResponse.json({ ok: true })
}
