'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

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
    setUploading(true)
    setError(null)

    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const json = await res.json()

    if (!res.ok) {
      setError(json.error ?? 'Error al subir imagen')
    } else {
      setPreview(json.url)
      onUpload(json.url)
    }
    setUploading(false)
  }

  return (
    <div>
      {preview ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button onClick={() => { setPreview(null); onUpload('') }}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50">
            <X size={14} className="text-red-500" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-primary transition-colors bg-gray-50">
          <Upload size={24} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-400">{uploading ? 'Subiendo...' : 'Subir imagen'}</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
