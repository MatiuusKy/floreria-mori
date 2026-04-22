import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateDeliveryZone } from '@/lib/validation'
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
  const validationError = validateDeliveryZone(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('delivery_zones')
    .update({
      name: body.name.toString().trim(),
      reference_price: body.reference_price != null ? Number(body.reference_price) : null,
      active: typeof body.active === 'boolean' ? body.active : true,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return dbError('delivery-zones', error)
  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { error } = await admin.from('delivery_zones').delete().eq('id', id)
  if (error) return dbError('delivery-zones', error)
  return NextResponse.json({ ok: true })
}
