import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de privacidad — Florería Mori',
  description: 'Política de privacidad y uso de datos de Florería Mori.',
  alternates: { canonical: 'https://floreriamori.cl/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 400, color: 'var(--mocha)', marginBottom: '8px' }}>
        Política de Privacidad
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gris-light)', marginBottom: '40px' }}>
        Última actualización: {new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {[
        {
          title: '1. Información que recopilamos',
          body: `Florería Mori ("nosotros") opera el sitio web floreriamori.cl. Recopilamos los siguientes tipos de información:
• Datos de navegación: páginas visitadas, tiempo en el sitio, dispositivo y navegador. Esto se realiza mediante Google Analytics 4 y Meta Pixel (Facebook).
• Datos de contacto voluntarios: si nos escribes por WhatsApp o completas el formulario de contacto, obtenemos tu nombre y número de teléfono.
No almacenamos información de tarjetas de crédito ni datos bancarios. Todos los pedidos se gestionan directamente por WhatsApp.`,
        },
        {
          title: '2. Uso de cookies y tecnologías de rastreo',
          body: `Utilizamos las siguientes herramientas de análisis:
• Google Analytics 4: mide el tráfico y el comportamiento de los visitantes. Puedes desactivarlo en myaccount.google.com/data-and-privacy.
• Meta Pixel (Facebook): permite medir la efectividad de anuncios en Facebook e Instagram. Puedes gestionarlo en facebook.com/privacy/policies.
Estas herramientas pueden instalar cookies en tu navegador. Puedes rechazar las cookies no esenciales desde la configuración de tu navegador.`,
        },
        {
          title: '3. Finalidad del tratamiento de datos',
          body: `Utilizamos los datos recopilados para:
• Mejorar el contenido y la experiencia del sitio web.
• Medir el alcance de nuestras publicaciones y anuncios en redes sociales.
• Responder a consultas enviadas por WhatsApp o el formulario de contacto.
No vendemos ni cedemos tus datos personales a terceros.`,
        },
        {
          title: '4. Base legal',
          body: `El tratamiento de datos se realiza en conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada de Chile. Al continuar navegando en este sitio, aceptas el uso de cookies de análisis descritas en esta política.`,
        },
        {
          title: '5. Tus derechos',
          body: `De acuerdo con la legislación chilena vigente, tienes derecho a:
• Saber qué datos tenemos sobre ti.
• Solicitar la corrección o eliminación de tus datos.
Para ejercer estos derechos, escríbenos a través de WhatsApp al +56 9 2989 5674.`,
        },
        {
          title: '6. Retención de datos',
          body: `Los datos de Google Analytics se retienen durante 14 meses (configuración estándar de GA4). Los datos de Meta Pixel se rigen por la política de retención de Meta (Facebook). Los mensajes de WhatsApp se conservan mientras sean necesarios para responder tu consulta.`,
        },
        {
          title: '7. Contacto',
          body: `Si tienes preguntas sobre esta política, puedes contactarnos:
• WhatsApp: +56 9 2989 5674
• Dirección: Av. Grecia 8628, Peñalolén, Santiago`,
        },
      ].map(section => (
        <section key={section.title} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--mocha)', marginBottom: '10px' }}>
            {section.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gris)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {section.body}
          </p>
        </section>
      ))}

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(107,62,38,0.1)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--terra)', textDecoration: 'none', fontWeight: 600 }}>
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
