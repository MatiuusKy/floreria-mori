'use client'

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react'
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
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1)
        setScrollProgress(newProgress)
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true) }
        else if (newProgress < 0.75) setShowContent(false)
      }
    }

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY)

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return
      const deltaY = touchStartY - e.touches[0].clientY
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const factor = deltaY < 0 ? 0.008 : 0.005
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1)
        setScrollProgress(newProgress)
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true) }
        else if (newProgress < 0.75) setShowContent(false)
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

  const mediaW = 280 + scrollProgress * (isMobile ? 600 : 1200)
  const mediaH = 280 + scrollProgress * (isMobile ? 180 : 380)
  const slideX = scrollProgress * (isMobile ? 170 : 140)

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Fondo — collage de flores */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Flores Flora Boutique"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Imagen central — logo */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${mediaW}px`,
                  height: `${mediaH}px`,
                  maxWidth: '92vw',
                  maxHeight: '82vh',
                  boxShadow: '0 0 60px rgba(0,0,0,0.4)',
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={mediaSrc}
                    alt="Flora Boutique"
                    fill
                    className="object-cover"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 0.5 - scrollProgress * 0.4 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>

              {/* Títulos que se separan al scroll */}
              <div className="flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col mix-blend-difference">
                <motion.h1
                  className="font-heading font-light tracking-[0.15em] text-white"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    transform: `translateX(-${slideX}vw)`,
                  }}
                >
                  Flora
                </motion.h1>
                <motion.h1
                  className="font-heading font-light tracking-[0.3em] uppercase text-white"
                  style={{
                    fontSize: 'clamp(1rem, 3vw, 2rem)',
                    transform: `translateX(${slideX}vw)`,
                  }}
                >
                  Boutique
                </motion.h1>
              </div>

              {/* Hint de scroll */}
              <motion.p
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[11px] uppercase tracking-[0.3em] text-white/70"
                animate={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                Desliza para explorar
              </motion.p>
            </div>

            {/* Contenido que aparece tras la expansión */}
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
