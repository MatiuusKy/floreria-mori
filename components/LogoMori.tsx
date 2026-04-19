export function LogoMori({ showText = true }: { showText?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Flower SVG mark */}
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* 5 petals */}
        <ellipse cx="19" cy="8"  rx="4.5" ry="8" fill="#b5623a" opacity="0.9" transform="rotate(0 19 19)" />
        <ellipse cx="19" cy="8"  rx="4.5" ry="8" fill="#b5623a" opacity="0.75" transform="rotate(72 19 19)" />
        <ellipse cx="19" cy="8"  rx="4.5" ry="8" fill="#b5623a" opacity="0.75" transform="rotate(144 19 19)" />
        <ellipse cx="19" cy="8"  rx="4.5" ry="8" fill="#b5623a" opacity="0.75" transform="rotate(216 19 19)" />
        <ellipse cx="19" cy="8"  rx="4.5" ry="8" fill="#b5623a" opacity="0.9" transform="rotate(288 19 19)" />
        {/* Center */}
        <circle cx="19" cy="19" r="5.5" fill="#e4c08a" />
        <circle cx="19" cy="19" r="3" fill="#c8955a" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '18px',
            fontWeight: 500,
            color: 'var(--mocha)',
            letterSpacing: '-0.2px',
          }}>
            Florería Mori
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9.5px',
            fontWeight: 500,
            color: 'var(--gris)',
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}>
            Peñalolén · Desde 2012
          </span>
        </div>
      )}
    </div>
  )
}
