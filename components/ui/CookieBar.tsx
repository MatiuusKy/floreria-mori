'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'fm_cookie_accepted'

export default function CookieBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="alertdialog"
      aria-label="Aviso de cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'var(--mocha)',
        color: 'rgba(253,248,244,0.85)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
      }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', flex: 1, minWidth: '200px' }}>
        🍪 Este sitio usa cookies de Google Analytics y Meta Pixel para mejorar tu experiencia y medir el tráfico.{' '}
        <Link href="/privacidad" style={{ color: 'var(--camel-light)', textDecoration: 'underline' }}>
          Política de privacidad
        </Link>
      </p>
      <button
        onClick={accept}
        style={{
          background: 'var(--terra)',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 20px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        Aceptar
      </button>
    </div>
  )
}
