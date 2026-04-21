import type { Metadata } from 'next'
import ContactoClient from './ContactoClient'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos por WhatsApp o Instagram. Florería Mori en Peñalolén, Santiago. +56 9 2989 5674.',
  alternates: { canonical: 'https://floreriamori.cl/contacto' },
}

export default function ContactoPage() {
  return <ContactoClient />
}
