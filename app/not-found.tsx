import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4"
      style={{ background: 'var(--warm-white)' }}>

      {/* Animated wilting flower */}
      <div className="wilting-flower" aria-hidden="true">
        <svg viewBox="0 0 120 180" width="160" height="240" xmlns="http://www.w3.org/2000/svg">
          {/* stem */}
          <path className="stem" d="M60 170 Q58 130 60 90" stroke="#4a6741" strokeWidth="4"
            strokeLinecap="round" fill="none" />
          {/* leaf */}
          <path className="leaf" d="M60 130 Q40 115 38 100 Q52 108 60 130Z"
            fill="#7a9e70" />
          {/* petals wilting */}
          <g className="petals">
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#f2d9d0" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#f2d9d0"
              transform="rotate(45 60 70)" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#e0b8ab"
              transform="rotate(90 60 70)" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#e0b8ab"
              transform="rotate(135 60 70)" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#d4a898"
              transform="rotate(180 60 70)" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#d4a898"
              transform="rotate(225 60 70)" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#c89080"
              transform="rotate(270 60 70)" />
            <ellipse cx="60" cy="70" rx="10" ry="22" fill="#c89080"
              transform="rotate(315 60 70)" />
          </g>
          {/* center */}
          <circle cx="60" cy="70" r="10" fill="#c8955a" />
          <circle cx="60" cy="70" r="6" fill="#b5623a" />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center space-y-3 max-w-sm">
        <p className="text-8xl font-bold" style={{ color: 'var(--blush-deep)', fontFamily: 'var(--font-lora)' }}>
          404
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--mocha)', fontFamily: 'var(--font-lora)' }}>
          Esta página se marchitó
        </h1>
        <p className="text-base" style={{ color: 'var(--gris)' }}>
          El enlace que seguiste no existe o fue removido.
        </p>
      </div>

      <Link
        href="/"
        className="px-8 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
        style={{ background: 'var(--terra)', color: '#fff', boxShadow: 'var(--shadow-md)' }}
      >
        Volver al inicio
      </Link>

      <style>{`
        .wilting-flower {
          animation: wilt 3s ease-in-out infinite alternate;
          transform-origin: 60px 170px;
        }
        .petals {
          animation: droop 3s ease-in-out infinite alternate;
          transform-origin: 60px 70px;
        }
        @keyframes wilt {
          0%   { transform: rotate(0deg); }
          40%  { transform: rotate(-6deg); }
          100% { transform: rotate(-18deg); }
        }
        @keyframes droop {
          0%   { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(0.82) translateY(8px); opacity: 0.7; }
        }
      `}</style>
    </main>
  )
}
