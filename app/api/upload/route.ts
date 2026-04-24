import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { rateLimit } from '@/lib/rate-limit'
import { MAX_UPLOAD_BYTES } from '@/lib/validation'
import { dbError } from '@/lib/api-error'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const
type AllowedMime = typeof ALLOWED_MIME_TYPES[number]

const MIME_TO_EXT: Record<AllowedMime, string> = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
  'image/gif':  'gif',
}

// Detect actual file type from magic bytes — cannot be spoofed by the client
function detectMagicMime(buf: Buffer): AllowedMime | null {
  if (buf.length < 12) return null
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return 'image/jpeg'
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return 'image/png'
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'image/gif'
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp'
  return null
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.ok) return auth.res

  const { allowed } = rateLimit(`upload:${auth.userId}`, { limit: 20, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiadas subidas. Espera un momento antes de intentarlo de nuevo.' },
      { status: 429 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No se proporcionó ningún archivo.' }, { status: 400 })
  if (file.size === 0) return NextResponse.json({ error: 'El archivo está vacío.' }, { status: 400 })
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'La imagen no puede superar 5 MB.' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const detectedMime = detectMagicMime(buffer)
  if (!detectedMime) {
    return NextResponse.json({ error: 'Solo se permiten imágenes JPG, PNG, WEBP o GIF.' }, { status: 400 })
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${MIME_TO_EXT[detectedMime]}`
  const { error } = await auth.admin.storage
    .from('product-images').upload(filename, buffer, { contentType: detectedMime, upsert: false })
  if (error) return dbError('upload', error)

  const { data: { publicUrl } } = auth.admin.storage.from('product-images').getPublicUrl(filename)
  return NextResponse.json({ url: publicUrl }, { status: 201 })
}
