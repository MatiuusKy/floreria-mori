'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1490750967868-88df5691bbf9?w=800&q=80&fit=crop',
    alt: 'Rosas rojas ecuatorianas frescas',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
    alt: 'Ramo de flores de temporada',
  },
  {
    src: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&q=80&fit=crop',
    alt: 'Ramo de novia con flores blancas',
  },
  {
    src: 'https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?w=800&q=80&fit=crop',
    alt: 'Arreglo floral rosado',
  },
  {
    src: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80&fit=crop',
    alt: 'Flores para regalo',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '60% 40% 50% 50% / 50% 55% 45% 55%', overflow: 'hidden' }}
      className="hero-carousel">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '6px',
        zIndex: 10,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Imagen ${i + 1}`}
            style={{
              width: i === current ? '20px' : '7px',
              height: '7px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
