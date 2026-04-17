import { DashboardStats } from '@/types'

export default function StatsRow({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: 'Productos', value: stats.totalProducts, color: 'text-gray-800' },
    { label: 'Categorías', value: stats.totalCategories, color: 'text-gray-800' },
    { label: 'Destacados', value: stats.featuredCount, color: 'text-primary' },
    { label: 'Sin stock', value: stats.outOfStockCount, color: 'text-red-600' },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(c => (
        <div key={c.label} className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{c.label}</p>
          <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  )
}
