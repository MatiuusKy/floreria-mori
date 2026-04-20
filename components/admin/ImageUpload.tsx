'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'

interface Props {
  currentUrl: string | null
  onUpload: (url: string) => void
}

export default function ImageUpload({ currentUrl, onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side pre-check (server also validates)
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5 MB.')
      return
    }

    setUploading(true)
    setError(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Error al subir imagen')
      } else {
        setPreview(json.url)
        onUpload(json.url)
      }
    } catch {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setUploading(false)
      // Reset input so the same file can be re-selected after error
      e.target.value = ''
    }
  }

  return (
    <div>
      {preview ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          {!uploading && (
            <button
              onClick={() => { setPreview(null); onUpload('') }}
              aria-label="Eliminar imagen"
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <X size={14} className="text-red-500" />
            </button>
          )}
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full aspect-square rounded-xl border-2 border-dashed transition-colors bg-gray-50 ${uploading ? 'border-primary cursor-wait' : 'border-gray-200 cursor-pointer hover:border-primary'}`}>
          {uploading ? (
            <>
              <Loader2 size={24} className="text-primary animate-spin mb-2" />
              <span className="text-sm text-primary font-medium">Subiendo imagen…</span>
            </>
          ) : (
            <>
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Subir imagen</span>
              <span className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP · máx. 5 MB</span>
            </>
          )}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      )}
      {error && <p className="text-xs text-red-500 mt-1" role="alert">{error}</p>}
    </div>
  )
}
