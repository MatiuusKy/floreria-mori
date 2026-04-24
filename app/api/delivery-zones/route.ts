import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { safeDeliveryZoneFields } from '@/lib/api-fields'
import { validateDeliveryZone } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

// GET is public — used by the storefront delivery page
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('delivery_zones').select('*').order('name')
  if (error) return dbError('delivery-zones', error)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  const validationError = validateDeliveryZone(body)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { data, error } = await auth.admin
    .from('delivery_zones').insert(safeDeliveryZoneFields(body)).select().single()
  if (error) return dbError('delivery-zones', error)
  return NextResponse.json(data, { status: 201 })
}
