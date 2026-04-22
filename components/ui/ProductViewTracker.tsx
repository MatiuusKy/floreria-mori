'use client'
import { useEffect } from 'react'
import { trackProductView } from '@/lib/analytics'

export default function ProductViewTracker({ name }: { name: string }) {
  useEffect(() => {
    trackProductView(name)
  }, [name])
  return null
}
