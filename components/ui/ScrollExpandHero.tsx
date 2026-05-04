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

  // Logo: escala de pequeño → llena exactamente la imagen de fondo (16:9)
  // Con object-contain el ancho real de la imagen es min(100vw, 177.78dvh)
  // así el logo nunca sobresale de los bordes del collage.
  const pct = 22 + scrollProgress * 80  // 22% → 102% (clampeado)
  const f = (pct / 100).toFixed(4)
  const imgW = 'min(100vw, 177.78dvh)'   // ancho real de imagen 16:9 con object-contain
  const imgH = 'min(56.25vw, 100dvh)'    // alto  real de imagen 16:9 con object-contain
  const logoW = `clamp(160px, calc(${f} * ${imgW}), ${imgW})`
  const logoH = `clamp(160px, calc(${f} * ${imgH}), ${imgH})`

  const bgOpacity = 1 - scrollProgress * 0.65

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden"
      style={{ touchAction: mediaFullyExpanded ? 'auto' : 'none' }}
    >
      <section
        className="relative flex flex-col items-center justify-start w-full"
        aria-label="Sección de bienvenida Flora Boutique"
      >
        <div
          className="relative w-full flex flex-col items-center"
          style={{ minHeight: '100dvh' }}
        >
          {/* Capa de fondo */}
          <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ backgroundColor: '#1a0a10', opacity: bgOpacity, transition: 'opacity 0.15s linear' }}
            aria-hidden="true"
          >
            <Image
              src={bgImageSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-contain object-top hidden md:block"
              priority
            />
            {bgImageMobileSrc && (
              <Image
                src={bgImageMobileSrc}
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-top block md:hidden"
                priority
              />
            )}
          </div>

          {/* Contenido del hero */}
          <div className="relative z-10 w-full flex flex-col items-center justify-start">

            {/* Área de animación scroll — altura = hero */}
            <div
              className="flex items-center justify-center w-full relative"
              style={{ minHeight: '100dvh' }}
            >

              {/* Logo flotante sobre el collage */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: logoW,
                  height: logoH,
                  transition: 'none',
                }}
                role="img"
                aria-label="Logo Flora Boutique"
              >
                <Image
                  src={mediaSrc}
                  alt="Flora Boutique"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Hint de scroll */}
              <motion.p
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[11px] uppercase tracking-[0.3em] text-white/80 whitespace-nowrap select-none"
                animate={{ opacity: scrollProgress > 0.06 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                Desliza para explorar
              </motion.p>
            </div>

            {/* Contenido post-expansión */}
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
