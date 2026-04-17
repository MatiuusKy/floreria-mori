// types/index.ts

export interface Variant {
  name: string   // "Pequeño" | "Mediano" | "Grande"
  price: number
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  discount_price: number | null
  category_id: string | null
  image_url: string | null
  available: boolean
  featured: boolean
  best_seller: boolean
  stock: number
  variants: Variant[] | null
  created_at: string
  category?: Category
}

export interface Banner {
  id: string
  title: string
  subtitle: string | null
  cta_text: string | null
  cta_url: string | null
  active: boolean
  created_at: string
}

export interface DashboardStats {
  totalProducts: number
  totalCategories: number
  featuredCount: number
  outOfStockCount: number
}
