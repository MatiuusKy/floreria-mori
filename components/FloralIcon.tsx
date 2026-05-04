// components/FloralIcon.tsx
interface FloralIconProps {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

export default function FloralIcon({
  size = 48,
  color = 'currentColor',
  strokeWidth = 1,
  className = '',
}: FloralIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Círculo exterior */}
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth={strokeWidth} />
      {/* Pétalo superior */}
      <path d="M40 38 C40 38 36 28 40 20 C44 28 40 38 40 38Z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
      {/* Pétalo derecho */}
      <path d="M40 38 C40 38 50 34 57 37 C50 43 40 38 40 38Z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
      {/* Pétalo inferior */}
      <path d="M40 38 C40 38 44 48 40 56 C36 48 40 38 40 38Z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
      {/* Pétalo izquierdo */}
      <path d="M40 38 C40 38 30 34 23 37 C30 43 40 38 40 38Z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
      {/* Pétalo superior-derecho */}
      <path d="M40 38 C40 38 47 30 54 29 C53 36 40 38 40 38Z" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" strokeLinejoin="round" />
      {/* Pétalo superior-izquierdo */}
      <path d="M40 38 C40 38 33 30 26 29 C27 36 40 38 40 38Z" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" strokeLinejoin="round" />
      {/* Centro */}
      <circle cx="40" cy="38" r="2.5" stroke={color} strokeWidth={strokeWidth * 0.8} />
    </svg>
  )
}
