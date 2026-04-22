import { NextResponse } from 'next/server'

interface SupabaseError { code?: string; message: string }

// PostgreSQL / PostgREST error codes → user-friendly messages
const FRIENDLY: Record<string, string> = {
  '23505': 'Ya existe un registro con ese valor (ej: slug duplicado).',
  '23503': 'No se puede completar: referencia a un registro inexistente.',
  '23502': 'Faltan campos requeridos.',
  '22P02': 'Formato de ID inválido.',
  'PGRST116': 'Registro no encontrado.',
}

export function dbError(
  label: string,
  error: SupabaseError,
  defaultStatus = 500
): NextResponse {
  console.error(`[API ${label}]`, error.code ?? 'no-code', error.message)
  const friendly = error.code ? FRIENDLY[error.code] : undefined
  const status = error.code === 'PGRST116' ? 404 : defaultStatus
  return NextResponse.json(
    { error: friendly ?? 'Error interno del servidor. Intenta de nuevo.' },
    { status }
  )
}
