'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const ITEMS = [
  {
    id: 'rosas',
    title: 'Rosas Ecuatorianas',
    description: 'Las más frescas y duraderas, ideales para declarar amor o sorprender en cualquier ocasión especial.',
    href: '/catalogo?categoria=amor',
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691bbf9?w=1080&q=80&fit=crop',
  },
  {
    id: 'cumpleanos',
    title: 'Ramos de Cumpleaños',
    description: 'Colores vivos y arreglos únicos para que ese día sea aún más memorable.',
    href: '/catalogo?categoria=cumpleanos',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080&q=80&fit=crop',
  },
  {
    id: 'bodas',
    title: 'Ramos de Novia',
    description: 'Diseños elegantes y románticos para el día más especial de su vida.',
    href: '/catalogo?categoria=eventos',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1080&q=80&fit=crop',
  },
  {
    id: 'arreglos',
    title: 'Arreglos Florales',
    description: 'Canastos, centros de mesa y arreglos creativos para todo tipo de evento.',
    href: '/catalogo',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1080&q=80&fit=crop',
  },
  {
    id: 'primavera',
    title: 'Flores de Temporada',
    description: 'Lo mejor de cada estación, seleccionado cada mañana directamente del mercado.',
    href: '/catalogo',
    image: 'https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?w=1080&q=80&fit=crop',
  },
]

export default function FlowerGallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    update()
    carouselApi.on('select', update)
    return () => { carouselApi.off('select', update) }
  }, [carouselApi])

  return (
    <section style={{ background: 'var(--warm-cream)', padding: '72px 0' }}>
      {/* Header */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Nuestros arreglos
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: 'var(--mocha)', lineHeight: 1.2 }}>
              Flores para cada momento
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'var(--gris)', maxWidth: '480px' }}>
              Arreglos únicos preparados con flores frescas, seleccionadas cada mañana en Florería Mori.
            </p>
          </div>

          {/* Desktop nav arrows */}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Anterior"
              style={{
                width: '44px', height: '44px',
                borderRadius: '50%',
                border: '1.5px solid var(--blush-deep)',
                background: canScrollPrev ? 'var(--terra)' : 'transparent',
                color: canScrollPrev ? 'white' : 'var(--gris-light)',
                cursor: canScrollPrev ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Siguiente"
              style={{
                width: '44px', height: '44px',
                borderRadius: '50%',
                border: '1.5px solid var(--blush-deep)',
                background: canScrollNext ? 'var(--terra)' : 'transparent',
                color: canScrollNext ? 'white' : 'var(--gris-light)',
                cursor: canScrollNext ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width carousel */}
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{ dragFree: true, align: 'start' }}
        >
          <CarouselContent style={{ marginLeft: 'max(24px, calc(50vw - 620px + 24px))' }}>
            {ITEMS.map((item) => (
              <CarouselItem key={item.id} style={{ maxWidth: '420px', paddingLeft: '20px', flexShrink: 0 }}>
                <a
                  href={item.href}
                  style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden' }}
                  className="flower-card"
                >
                  <div style={{
                    position: 'relative',
                    height: '520px',
                    overflow: 'hidden',
                    borderRadius: '16px',
                  }}>
                    {/* Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'transform 0.4s ease',
                      }}
                      className="flower-card-img"
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 20%, rgba(107,62,38,0.3) 60%, rgba(107,62,38,0.85) 100%)',
                    }} />
                    {/* Text */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '32px',
                      color: 'white',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '22px',
                        fontWeight: 500,
                        marginBottom: '10px',
                        lineHeight: 1.2,
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        opacity: 0.85,
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {item.description}
                      </p>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        opacity: 0.9,
                      }}>
                        Ver arreglos <ArrowRight size={15} style={{ transition: 'transform 0.2s' }} className="arrow-icon" />
                      </span>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
        {ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => carouselApi?.scrollTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            style={{
              width: i === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === currentSlide ? 'var(--terra)' : 'var(--blush-deep)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        .flower-card:hover .flower-card-img { transform: scale(1.06); }
        .flower-card:hover .arrow-icon { transform: translateX(4px); }
      `}</style>
    </section>
  )
}
