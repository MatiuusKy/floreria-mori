import { createClient } from '@/lib/supabase/server'
import StatsRow from '@/components/admin/StatsRow'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: total }, { count: cats }, { count: featured }, { count: outOfStock }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('stock', 0).eq('available', false),
  ])

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <StatsRow stats={{
        totalProducts: total ?? 0,
        totalCategories: cats ?? 0,
        featuredCount: featured ?? 0,
        outOfStockCount: outOfStock ?? 0,
      }} />
      <p className="text-gray-400 text-sm">Usa el menú lateral para gestionar productos, categorías y el banner de temporada.</p>
    </div>
  )
}
