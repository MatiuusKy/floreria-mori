import Image from 'next/image'

type LogoVariant = 'full-image' | 'text-svg' | 'icon-only'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  height?: number
}

export default function LogoFloraBoutique({ variant = 'text-svg', className = '', height = 44 }: LogoProps) {
  // full-image: usa el JPEG del logo sobre fondos oscuros (footer)
  if (variant === 'full-image') {
    return (
      <Image
        src="/images/logo-flora-boutique.jpeg"
        alt="Flora Boutique"
        width={height}
        height={height}
        className={className}
        style={{ height, width: 'auto', objectFit: 'contain' }}
        unoptimized
      />
    )
  }

  // icon-only: lirio SVG simplificado — para favicon, splash
  if (variant === 'icon-only') {
    const size = height ?? 32
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Lirio simplificado — tallo */}
        <line x1="16" y1="28" x2="16" y2="18" stroke="#580A2D" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Pétalo central */}
        <path d="M16 18 C16 18 12 13 12 8 C12 4.5 14 3 16 3 C18 3 20 4.5 20 8 C20 13 16 18 16 18Z" stroke="#580A2D" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        {/* Pétalo izquierdo */}
        <path d="M16 14 C16 14 10 12 7 8 C5.5 5.5 6.5 3.5 8 3.5 C10 3.5 13 6 16 14Z" stroke="#580A2D" strokeWidth="1.1" fill="none" strokeLinejoin="round"/>
        {/* Pétalo derecho */}
        <path d="M16 14 C16 14 22 12 25 8 C26.5 5.5 25.5 3.5 24 3.5 C22 3.5 19 6 16 14Z" stroke="#580A2D" strokeWidth="1.1" fill="none" strokeLinejoin="round"/>
        {/* Hojas */}
        <path d="M16 22 C16 22 12 21 10 23" stroke="#580A2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M16 22 C16 22 20 21 22 23" stroke="#580A2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>
    )
  }

  // text-svg (default): "Flora" Playfair serif + "BOUTIQUE" versales — para navbar sobre fondo claro
  const svgWidth = Math.round(height * 3.2)
  const floraSize = Math.round(height * 0.72)
  const boutiqueSize = Math.round(height * 0.22)
  const midY = Math.round(height * 0.62)
  const bottomY = Math.round(height * 0.88)
  const lineY = Math.round(height * 0.97)
  const lineX1 = Math.round(svgWidth * 0.28)
  const lineX2 = Math.round(svgWidth * 0.72)
  const romboCx = Math.round(svgWidth * 0.76)
  const romboSize = Math.round(height * 0.12)

  return (
    <svg
      width={svgWidth}
      height={height}
      viewBox={`0 0 ${svgWidth} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Flora Boutique"
    >
      {/* "Flora" en Playfair Display serif */}
      <text
        x={svgWidth / 2}
        y={midY}
        textAnchor="middle"
        fill="#580A2D"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize={floraSize}
        fontWeight="400"
        fontStyle="normal"
      >
        Flora
      </text>
      {/* "BOUTIQUE" en Playfair Display serif, versales */}
      <text
        x={svgWidth / 2 - romboSize}
        y={bottomY}
        textAnchor="middle"
        fill="#580A2D"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize={boutiqueSize}
        fontWeight="400"
        letterSpacing="4"
      >
        BOUTIQUE
      </text>
      {/* Rombo ✦ a la derecha de BOUTIQUE */}
      <text
        x={romboCx}
        y={bottomY}
        textAnchor="middle"
        fill="#C9A0B8"
        fontSize={romboSize}
        fontFamily="serif"
      >
        ✦
      </text>
      {/* Línea ornamental fina debajo de BOUTIQUE */}
      <line
        x1={lineX1}
        y1={lineY}
        x2={lineX2}
        y2={lineY}
        stroke="#C9A0B8"
        strokeWidth="0.5"
      />
    </svg>
  )
}
