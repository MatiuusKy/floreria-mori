import { Product } from '@/types'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
  emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage = 'No hay productos disponibles.' }: Props) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 16px', color: 'var(--gris)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌿</div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '8px', color: 'var(--mocha)' }}>
          {emptyMessage}
        </p>
        <a
          href="https://wa.me/56929895674"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '16px',
            background: 'var(--terra)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
          }}
        >
          💬 Consultar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }} className="products-grid">
      {products.map((p, index) => (
        <ProductCard key={p.id} product={p} priority={index < 3} />
      ))}
    </div>
  )
}
