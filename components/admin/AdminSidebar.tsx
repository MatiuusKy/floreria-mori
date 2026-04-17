'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, Tag, Megaphone, Leaf } from 'lucide-react'

const NAV = [
  { href: '/admin', icon: Package, label: 'Productos', exact: true },
  { href: '/admin/categorias', icon: Tag, label: 'Categorías' },
  { href: '/admin/banner', icon: Megaphone, label: 'Banner' },
]

export default function AdminSidebar() {
  const path = usePathname()

  return (
    <aside className="w-14 bg-admin-dark flex flex-col items-center py-4 gap-2 shrink-0">
      <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center mb-4">
        <Leaf size={20} className="text-white" />
      </div>
      {NAV.map(({ href, icon: Icon, label, exact }) => {
        const active = exact ? path === href : path.startsWith(href)
        return (
          <Link key={href} href={href} title={label}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              active ? 'bg-white/15 text-white' : 'text-white/40 hover:bg-white/10 hover:text-white'
            }`}>
            <Icon size={18} />
          </Link>
        )
      })}
    </aside>
  )
}
