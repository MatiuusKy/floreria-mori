'use client'
import { useState, useEffect, useRef } from 'react'

const REVIEWS = [
  {
    text: 'Llegaron hermosas y súper frescas. El arreglo superó todas mis expectativas, mamá quedó encantada.',
    name: 'VALENTINA M.',
    platform: 'Google Reviews',
  },
  {
    text: 'Pedí flores para el día de la madre y llegaron puntual con un packaging increíble. Las volvería a pedir sin dudarlo.',
    name: 'CAROLINA R.',
    platform: 'Google Reviews',
  },
  {
    text: 'Excelente servicio. Me ayudaron a armar un arreglo personalizado y quedó exactamente como lo imaginé.',
    name: 'ANDREA L.',
    platform: 'Google Reviews',
  },
  {
    text: 'Flora Boutique tiene un nivel de detalle que no he visto en otra floristería. Cada pétalo importa.',
    name: 'DANIELA S.',
    platform: 'Instagram',
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A96E" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hovered = useRef(false)

  const goTo = (idx: number) => {
    setOpacity(0)
    setTimeout(() => {
      setCurrent(idx)
      setOpacity(1)
    }, 300)
  }

  useEffect(() => {
    const next = () => {
      if (hovered.current) return
      goTo((current + 1) % REVIEWS.length)
    }
    timer.current = setTimeout(next, 5000)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [current])

  const review = REVIEWS[current]

  return (
    <section className="mt-0 bg-cream-deep py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body uppercase tracking-[0.35em] text-xs text-gris-soft mb-2">
            Lo que dicen nuestras clientas
          </p>
          <h2
            className="font-heading font-light"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Flores que enamoran
          </h2>
        </div>

        {/* Review */}
        <div
          className="max-w-lg mx-auto text-center"
          style={{ transition: 'opacity 0.3s ease', opacity }}
          onMouseEnter={() => { hovered.current = true }}
          onMouseLeave={() => { hovered.current = false }}
        >
          {/* Estrellas */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </div>

          {/* Texto en itálica (única excepción permitida en este sistema) */}
          <blockquote
            className="font-heading font-light italic text-charcoal leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}
          >
            "{review.text}"
          </blockquote>

          <p className="font-body text-xs uppercase tracking-[0.25em] text-gris-soft mt-6">
            {review.name}
          </p>
          <p className="font-body text-[10px] text-gris-soft/60 mt-1">
            {review.platform}
          </p>
        </div>

        {/* Dots de navegación */}
        <div className="flex justify-center gap-2 mt-10">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Reseña ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === current ? 'bg-burgundy' : 'bg-muted/25'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
