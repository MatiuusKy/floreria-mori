'use client'
import { useState } from 'react'
import { MessageCircle, Share2, MapPin, Clock } from 'lucide-react'

export default function ContactoClient() {
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [message, setMessage] = useState('')

  function buildWhatsApp() {
    const lines: string[] = ['Hola, Florería Mori! 🌸']
    if (name) lines.push(`Mi nombre es ${name}.`)
    if (occasion) lines.push(`Ocasión: ${occasion}`)
    if (message) lines.push(`\n${message}`)
    return `https://wa.me/56929895674?text=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--warm-cream)', padding: '64px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--blush)', color: 'var(--terra)',
            fontSize: '12px', fontWeight: 600, padding: '6px 14px',
            borderRadius: 'var(--radius-pill)', marginBottom: '20px',
            fontFamily: 'var(--font-body)',
          }}>
            💬 Respuesta en minutos
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--mocha)',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            Hablemos y creamos<br />
            <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>el arreglo perfecto</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--gris)',
            lineHeight: 1.8,
          }}>
            Cuéntanos sobre tu ocasión y te ayudamos a elegir el arreglo ideal. Estamos en Peñalolén, Santiago, y atendemos de lunes a sábado.
          </p>
        </div>
      </section>

      {/* Main */}
      <section style={{ background: 'var(--warm-white)', padding: '64px 24px 80px' }}>
        <div
          style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}
          className="contacto-grid"
        >
          {/* Left: form */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-md)',
            padding: '36px 32px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, color: 'var(--mocha)', marginBottom: '6px' }}>
              Cuéntanos tu ocasión
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gris)', marginBottom: '28px', fontWeight: 300 }}>
              Completa el formulario y te abrimos WhatsApp con tu mensaje listo.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Tu nombre</label>
                <input
                  type="text"
                  placeholder="Ej: María González"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>¿Para qué ocasión?</label>
                <select
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  style={{ ...inputStyle, background: 'white' }}
                >
                  <option value="">Selecciona una ocasión</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Matrimonio / Boda">Matrimonio / Boda</option>
                  <option value="Aniversario">Aniversario</option>
                  <option value="Día de la Madre">Día de la Madre</option>
                  <option value="Nacimiento">Nacimiento</option>
                  <option value="Condolencias">Condolencias</option>
                  <option value="Evento corporativo">Evento corporativo</option>
                  <option value="Sin ocasión especial / regalo">Sin ocasión especial / regalo</option>
                  <option value="Otra ocasión">Otra ocasión</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>¿Algo más que quieras contarnos?</label>
                <textarea
                  placeholder="Ej: Necesito un ramo de rosas rojas para el sábado, con entrega a Las Condes..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <a
                href={buildWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '15px 24px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  transition: 'opacity 0.2s',
                }}
                className="wa-form-btn"
              >
                <MessageCircle size={19} />
                Enviar por WhatsApp
              </a>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris-light)', textAlign: 'center', marginTop: '-8px' }}>
                Se abrirá WhatsApp con tu mensaje. No enviamos spam.
              </p>
            </div>
          </div>

          {/* Right: info + map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                icon: <MessageCircle size={22} style={{ color: '#25D366' }} />,
                title: 'WhatsApp',
                value: '+56 9 2989 5674',
                sub: 'Respuesta en minutos',
                href: 'https://wa.me/56929895674',
              },
              {
                icon: <Share2 size={22} style={{ color: '#c13584' }} />,
                title: 'Instagram',
                value: '@floreriamori122012',
                sub: 'Fotos de nuestros arreglos',
                href: 'https://www.instagram.com/floreriamori122012/',
              },
              {
                icon: <MapPin size={22} style={{ color: 'var(--terra)' }} />,
                title: 'Dirección',
                value: 'Av. Grecia 8628',
                sub: 'Peñalolén, Santiago',
                href: undefined as string | undefined,
              },
              {
                icon: <Clock size={22} style={{ color: 'var(--camel)' }} />,
                title: 'Horario',
                value: 'Lun–Vie: 9:00–20:00',
                sub: 'Sáb: 9:00–18:00',
                href: undefined as string | undefined,
              },
            ].map(card => {
              const inner = (
                <>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--warm-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--gris-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>{card.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--mocha)' }}>{card.value}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gris)', fontWeight: 300 }}>{card.sub}</div>
                  </div>
                </>
              )
              const cardStyle: React.CSSProperties = {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'white',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-sm)',
                padding: '18px 20px',
                textDecoration: 'none',
              }
              return card.href ? (
                <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" style={cardStyle} className="contacto-card">
                  {inner}
                </a>
              ) : (
                <div key={card.title} style={cardStyle}>
                  {inner}
                </div>
              )
            })}

            {/* Map */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', height: '200px', marginTop: '4px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.!2d-70.5529!3d-33.4886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d02a6c1d91d1%3A0x4c2cd2c23c3b8a1c!2sPe%C3%B1alol%C3%A9n%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Florería Mori"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wa-form-btn:hover { opacity: 0.9; }
        .contacto-card:hover { box-shadow: var(--shadow-md) !important; transform: translateY(-2px); }
        @media (max-width: 768px) {
          .contacto-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--gris)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1.5px solid rgba(107,62,38,0.15)',
  borderRadius: '10px',
  padding: '10px 14px',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  color: 'var(--mocha)',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}
