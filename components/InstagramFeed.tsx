import FloralIcon from '@/components/FloralIcon'

const PLACEHOLDER_POSTS = [
  { id: 1, alt: 'Arreglo floral 1', src: '/images/ig-1.jpg' },
  { id: 2, alt: 'Ramo de rosas 2', src: '/images/ig-2.jpg' },
  { id: 3, alt: 'Flores en caja 3', src: '/images/ig-3.jpg' },
  { id: 4, alt: 'Arreglo primaveral 4', src: '/images/ig-4.jpg' },
  { id: 5, alt: 'Ramos personalizados 5', src: '/images/ig-5.jpg' },
  { id: 6, alt: 'Flores preservadas 6', src: '/images/ig-6.jpg' },
]

function InstagramPostIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
    </svg>
  )
}

export default function InstagramFeed() {
  return (
    <section className="bg-white-warm py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <FloralIcon size={36} color="#580A2D" strokeWidth={1} />
          <h2 className="font-heading font-normal text-center text-charcoal mt-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            Síguenos en Instagram
          </h2>
          <a
            href="https://instagram.com/floraboutique.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-burgundy mt-2 hover:text-burgundy-hover transition-colors"
          >
            @floraboutique.cl
          </a>
        </div>

        {/* Grid 3 columnas */}
        <div className="grid grid-cols-3 gap-2">
          {PLACEHOLDER_POSTS.map(post => (
            <a
              key={post.id}
              href="https://instagram.com/floraboutique.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden block group"
            >
              <div
                className="w-full h-full"
                style={{ background: `hsl(${340 + post.id * 5}, ${30 + post.id * 3}%, ${88 - post.id * 2}%)` }}
                role="img"
                aria-label={post.alt}
              />
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-burgundy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramPostIcon />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="https://instagram.com/floraboutique.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-10 py-3.5 rounded-none font-body uppercase tracking-[0.2em] text-xs font-medium transition-colors duration-300"
          >
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
