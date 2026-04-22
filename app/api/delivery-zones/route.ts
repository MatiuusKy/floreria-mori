import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { validateDeliveryZone } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('delivery_zones')
    .select('*')
    .order('name')

  if (error) return dbError('delivery-zones', error)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const validationError = validateDeliveryZone(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('delivery_zones')
    .insert({
      name: body.name.toString().trim(),
      reference_price: body.reference_price != null ? Number(body.reference_price) : null,
      active: typeof body.active === 'boolean' ? body.active : true,
    })
    .select()
    .single()

  if (error) return dbError('delivery-zones', error)
  return NextResponse.json(data, { status: 201 })
}
