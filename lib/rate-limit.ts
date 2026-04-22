// Simple in-memory sliding-window rate limiter.
// NOTE: In Vercel's serverless environment each function instance has its own
// memory, so this limits per-instance rather than globally. For strict global
// rate limiting use Upstash Redis + @upstash/ratelimit.

interface Entry { count: number; resetAt: number }
const store = new Map<string, Entry>()

export function rateLimit(
  key: string,
  { limit = 10, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    // Prune old entries occasionally to avoid unbounded memory growth
    if (store.size > 5_000) {
      for (const [k, v] of store) {
        if (now > v.resetAt) store.delete(k)
      }
    }
    return { allowed: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count }
}
