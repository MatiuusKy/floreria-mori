'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Link as LinkIcon } from 'lucide-react'

interface Props {
  currentUrl: string | null
  onUpload: (url: string) => void
}

type Mode = 'upload' | 'url'

export default function ImageUpload({ currentUrl, onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>('upload')
  const [urlInput, setUrlInput] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

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
      e.target.value = ''
    }
  }

  function handleUrlSubmit() {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    if (!trimmed.startsWith('https://')) {
      setError('Ingresa una URL válida (debe comenzar con https://)')
      return
    }
    setError(null)
    setPreview(trimmed)
    onUpload(trimmed)
    setUrlInput('')
  }

  function handleClear() {
    setPreview(null)
    onUpload('')
    setUrlInput('')
    setError(null)
  }

  return (
    <div>
      {/* Mode tabs */}
      {!preview && (
        <div className="flex gap-1 mb-2">
          <button
            type="button"
            onClick={() => { setMode('upload'); setError(null) }}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              mode === 'upload' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Upload size={12} /> Subir archivo
          </button>
          <button
            type="button"
            onClick={() => { setMode('url'); setError(null) }}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              mode === 'url' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <LinkIcon size={12} /> Pegar URL
          </button>
        </div>
      )}

      {preview ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleClear}
            aria-label="Eliminar imagen"
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <X size={14} className="text-red-500" />
          </button>
        </div>
      ) : mode === 'upload' ? (
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
      ) : (
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 p-4">
            <LinkIcon size={24} className="text-gray-400" />
            <span className="text-sm text-gray-400 text-center">Pega la URL de la imagen</span>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleUrlSubmit())}
              placeholder="https://..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-green-800 disabled:opacity-50"
              disabled={!urlInput.trim()}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1" role="alert">{error}</p>}
    </div>
  )
}
