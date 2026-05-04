'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ScrollExpandHeroProps {
  mediaSrc: string
  bgImageSrc: string
  children?: ReactNode
}

export default function ScrollExpandHero({
  mediaSrc,
  bgImageSrc,
  children,
}: ScrollExpandHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
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
  }, [scrollProgress, mediaFullyExpanded, touchStartY])

  // Logo se expande de pequeño → pantalla completa
  // w: 300px → 100vw | h: 300px → 100dvh
  const logoWpx = 300 + scrollProgress * (isMobile ? 450 : 900)
  const logoHpx = 300 + scrollProgress * (isMobile ? 350 : 650)
  // Al llegar a 1 el logo cubre todo — sin maxWidth/maxHeight para que llegue a fullscreen
  const isFullscreen = scrollProgress >= 0.98

  // Fondo: permanece visible todo el tiempo (solo oscurece levemente al expandir)
  const bgOpacity = 1 - scrollProgress * 0.5  // 1 → 0.5, nunca desaparece del todo

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Fondo — collage completo, siempre visible */}
          <div
            className="absolute inset-0 z-0"
            style={{ opacity: bgOpacity, transition: 'opacity 0.1s linear' }}
          >
            <Image
              src={bgImageSrc}
              alt="Flores Flora Boutique"
              fill
              className="object-contain object-center"
              style={{ background: '#1a0a10' }}
              priority
            />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center justify-start">
            <div className="flex items-center justify-center w-full h-[100dvh] relative">

              {/* Logo expandible — sin texto encima */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isFullscreen ? '100vw' : `${logoWpx}px`,
                  height: isFullscreen ? '100dvh' : `${logoHpx}px`,
                  maxWidth: isFullscreen ? '100vw' : '90vw',
                  maxHeight: isFullscreen ? '100dvh' : '80vh',
                  transition: 'none',
                  boxShadow: isFullscreen ? 'none' : '0 8px 60px rgba(0,0,0,0.5)',
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

              {/* Hint de scroll — desaparece al empezar */}
              <motion.p
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[11px] uppercase tracking-[0.3em] text-white/70 whitespace-nowrap"
                animate={{ opacity: scrollProgress > 0.08 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Desliza para explorar
              </motion.p>
            </div>

            {/* Contenido que aparece tras expansión completa */}
            <motion.section
              className="flex flex-col w-full px-8 py-16 md:px-16 lg:py-24 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  )
}
