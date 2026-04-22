'use client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      title="Cerrar sesión"
      className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-colors mt-auto"
    >
      <LogOut size={18} />
    </button>
  )
}
