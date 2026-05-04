'use client'
import { useEffect, useState } from 'react'

const MESSAGES = [
  'Despacho mismo día · Pedidos antes de las 15:00 hrs',
  'Flores seleccionadas cada mañana · Zona Oriente y más',
  'Diseños únicos para cada ocasión · Escríbenos por WhatsApp',
]

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-burgundy h-9 flex items-center justify-center overflow-hidden">
      <p
        className="text-white font-body text-xs uppercase tracking-[0.15em] transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {MESSAGES[idx]}
      </p>
    </div>
  )
}
