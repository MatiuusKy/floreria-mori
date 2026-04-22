import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
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
  // WEBP: RIFF????WEBP
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp'
  return null
}

export async function POST(request: Request) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Rate limit: 20 uploads per minute per user
  const { allowed } = rateLimit(`upload:${user.id}`, { limit: 20, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiadas subidas. Espera un momento antes de intentarlo de nuevo.' },
      { status: 429 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No se proporcionó ningún archivo.' }, { status: 400 })

  const MAX_FILE_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'La imagen no puede superar 5 MB.' }, { status: 400 })
  }
  if (file.size === 0) {
    return NextResponse.json({ error: 'El archivo está vacío.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Validate via magic bytes — client-provided Content-Type is untrusted
  const detectedMime = detectMagicMime(buffer)
  if (!detectedMime) {
    return NextResponse.json(
      { error: 'Solo se permiten imágenes JPG, PNG, WEBP o GIF.' },
      { status: 400 }
    )
  }

  const ext = MIME_TO_EXT[detectedMime]
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const admin = createAdminClient()
  const { error } = await admin.storage
    .from('product-images')
    .upload(filename, buffer, { contentType: detectedMime, upsert: false })

  if (error) return dbError('upload', error)

  const { data: { publicUrl } } = admin.storage
    .from('product-images')
    .getPublicUrl(filename)

  return NextResponse.json({ url: publicUrl }, { status: 201 })
}
