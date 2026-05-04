'use client'
import { useState, useEffect } from 'react'

const MESSAGES = [
  'Despacho el mismo día · Compras antes de las 15:00 hrs',
  'Flores seleccionadas cada mañana · Zona Oriente y más',
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % MESSAGES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      background: 'var(--violet-brand)',
      color: 'white',
      fontSize: '12px',
      letterSpacing: '0.5px',
      textAlign: 'center',
      padding: '9px 24px',
      fontFamily: 'var(--font-body)',
    }}>
      <span style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'inline-block',
      }}>
        {MESSAGES[current]}
      </span>
    </div>
  )
}
