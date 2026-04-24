import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { safeProductFields } from '@/lib/api-fields'
import { validateProduct } from '@/lib/validation'
import { generateSlug } from '@/lib/utils'
import { dbError } from '@/lib/api-error'

export async function GET() {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const { data, error } = await auth.admin
    .from('products')
    .select('*, category:categories(id, name, slug)')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return dbError('products GET', error)
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const body = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, id: _id, created_at, ...raw } = body as Record<string, unknown>

  if (!raw.slug && raw.name) raw.slug = generateSlug(raw.name as string)

  const validationError = validateProduct(raw)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { data, error } = await auth.admin.from('products').insert(safeProductFields(raw)).select().single()
  if (error) return dbError('products POST', error)
  return NextResponse.json(data, { status: 201 })
}
