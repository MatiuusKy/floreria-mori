'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Leaf } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
    } else {
      router.push('/admin')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-gray-800">Florería Mori</h1>
          <p className="text-gray-500 text-sm mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Contraseña</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-800 disabled:opacity-50">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
