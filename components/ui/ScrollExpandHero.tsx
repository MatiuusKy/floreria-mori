'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

interface ScrollExpandHeroProps {
  mediaSrc: string
  bgImageSrc: string
  bgImageMobileSrc?: string
  children?: ReactNode
}

export default function ScrollExpandHero({
  mediaSrc,
  bgImageSrc,
  bgImageMobileSrc,
  children,
}: ScrollExpandHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Si el usuario prefiere menos movimiento, saltamos la animación
  useEffect(() => {
    if (prefersReducedMotion) {
      setScrollProgress(1)
      setMediaFullyExpanded(true)
      setShowContent(true)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const next = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1)
        setScrollProgress(next)
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true) }
        else if (next < 0.75) setShowContent(false)
      }
    }

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY)

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return
      const delta = touchStartY - e.touches[0].clientY
      if (mediaFullyExpanded && delta < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const next = Math.min(Math.max(scrollProgress + delta * (delta < 0 ? 0.008 : 0.005), 0), 1)
        setScrollProgress(next)
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true) }
        else if (next < 0.75) setShowContent(false)
        setTouchStartY(e.touches[0].clientY)
      }
    }

    const handleTouchEnd = () => setTouchStartY(0)
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0) }

    window.addEventListener('wheel', handleWheel as EventListener, { passive: false })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchstart', handleTouchStart as EventListener, { passive: false })
    window.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel as EventListener)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart as EventListener)
      window.removeEventListener('touchmove', handleTouchMove as EventListener)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY, prefersReducedMotion])

  // Tamaño del logo: viewport-relativo para escalar bien en cualquier pantalla.
  // Interpolamos de ~22% → 100% del viewport usando clamp para evitar saltos bruscos.
  const pctW = 22 + scrollProgress * 80   // 22vw → 102vw (se clampea a 100)
  const pctH = 22 + scrollProgress * 80   // 22vh → 102vh (se clampea a 100)
  const logoW = `clamp(160px, ${pctW}vw, 100vw)`
  const logoH = `clamp(160px, ${pctH}dvh, 100dvh)`

  // Bordes del card: se suavizan gradualmente con el scroll
  const logoRadius = `${Math.max(0, (1 - scrollProgress) * 20)}px`

  // Fondo: desaparece gradualmente mientras el logo expande
  const bgOpacity = 1 - scrollProgress * 0.65

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden"
      // touch-action: none evita el delay de 300ms y conflictos con el gesture handler
      style={{ touchAction: mediaFullyExpanded ? 'auto' : 'none' }}
    >
      <section
        className="relative flex flex-col items-center justify-start min-h-[100dvh]"
        aria-label="Sección de bienvenida Flora Boutique"
      >
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/*
            Fondos: usamos TWO imágenes con CSS responsive para evitar el
            hydration flash que ocurre cuando JS aún no sabe si es mobile o desktop.
            - mobile  (<md): fondo_banner_mobile.jpeg (portrait 9:16) — sin JS
            - desktop (≥md): fondo_banner.jpeg       (landscape 16:9) — sin JS
          */}
          <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{
              backgroundColor: '#1a0a10',
              opacity: bgOpacity,
              transition: 'opacity 0.15s linear',
            }}
            aria-hidden="true"
          >
            {/* Desktop: 16:9 — solo visible en md+ */}
            <Image
              src={bgImageSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center hidden md:block"
              priority
            />

            {/* Mobile: 9:16 — solo visible debajo de md */}
            {bgImageMobileSrc && (
              <Image
                src={bgImageMobileSrc}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center block md:hidden"
                priority
              />
            )}
          </div>

          <div className="relative z-10 w-full flex flex-col items-center justify-start">
            <div className="flex items-center justify-center w-full h-[100dvh] relative">

              {/* Card del logo: escala viewport-relativa, sin saltos */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: logoW,
                  height: logoH,
                  transition: 'none',
                  backgroundColor: '#ffffff',
                  borderRadius: logoRadius,
                  overflow: 'hidden',
                  boxShadow: scrollProgress > 0.95
                    ? 'none'
                    : `0 ${12 - scrollProgress * 12}px ${60 - scrollProgress * 60}px rgba(0,0,0,${0.35 - scrollProgress * 0.35})`,
                }}
                role="img"
                aria-label="Logo Flora Boutique"
              >
                {/* Padding interior: desaparece al llegar a fullscreen */}
                <div
                  style={{
                    position: 'absolute',
                    inset: `${Math.max(0, (1 - scrollProgress) * 12)}%`,
                  }}
                >
                  <Image
                    src={mediaSrc}
                    alt="Flora Boutique"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Hint de scroll: desaparece al primer movimiento */}
              <motion.p
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[11px] uppercase tracking-[0.3em] text-white/80 whitespace-nowrap select-none"
                animate={{ opacity: scrollProgress > 0.06 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                Desliza para explorar
              </motion.p>
            </div>

            {/* Contenido post-expansión: pointer-events desactivado mientras invisible */}
            <motion.section
              className="flex flex-col w-full px-6 py-16 sm:px-10 md:px-16 lg:py-24 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              style={{ pointerEvents: showContent ? 'auto' : 'none' }}
              aria-hidden={!showContent}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  )
}
