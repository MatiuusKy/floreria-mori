import { createClient } from '@/lib/supabase/server'
import BannerForm from '@/components/admin/BannerForm'
import { Banner } from '@/types'

export default async function AdminBannerPage() {
  const supabase = await createClient()
  const { data: banner } = await supabase
    .from('banners').select('*').order('created_at', { ascending: false }).maybeSingle()

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-800 mb-2">Banner de temporada</h1>
      <p className="text-gray-500 text-sm mb-6">
        Muestra un aviso promocional en la parte superior del sitio para fechas especiales.
      </p>
      <BannerForm banner={banner as Banner | null} onSave={() => {}} />
    </div>
  )
}
