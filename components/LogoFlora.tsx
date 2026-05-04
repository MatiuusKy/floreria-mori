export function LogoFlora({ showText = true, inverted = false }: { showText?: boolean; inverted?: boolean }) {
  const textColor = inverted ? 'white' : 'var(--charcoal)'
  const subColor = inverted ? 'rgba(255,255,255,0.55)' : 'var(--gris-soft)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Fleur-de-lis SVG mark */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Central petal */}
        <ellipse cx="18" cy="10" rx="4" ry="9" fill="#7A2F6B" opacity="0.95" />
        {/* Left petal */}
        <ellipse cx="18" cy="10" rx="3.5" ry="8" fill="#9B4A8A" opacity="0.8" transform="rotate(-38 18 18)" />
        {/* Right petal */}
        <ellipse cx="18" cy="10" rx="3.5" ry="8" fill="#9B4A8A" opacity="0.8" transform="rotate(38 18 18)" />
        {/* Bottom left */}
        <ellipse cx="18" cy="10" rx="3" ry="7" fill="#7A2F6B" opacity="0.55" transform="rotate(-75 18 18)" />
        {/* Bottom right */}
        <ellipse cx="18" cy="10" rx="3" ry="7" fill="#7A2F6B" opacity="0.55" transform="rotate(75 18 18)" />
        {/* Gold center */}
        <circle cx="18" cy="18" r="4.5" fill="#C9A96E" />
        <circle cx="18" cy="18" r="2.5" fill="#E8D5AA" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: 500,
            color: textColor,
            letterSpacing: '0.3px',
          }}>
            Flora Boutique
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            fontWeight: 500,
            color: subColor,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: '3px',
          }}>
            Floristería · Santiago
          </span>
        </div>
      )}
    </div>
  )
}
