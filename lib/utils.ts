export function formatPrice(amount: number): string {
  return '$' + amount.toLocaleString('es-CL')
}

export function generateSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // remove special chars first (before space→hyphen)
    .replace(/\s+/g, '-')           // collapse spaces into hyphens
    .replace(/-+/g, '-')            // collapse consecutive hyphens
    .replace(/^-|-$/g, '')          // strip leading/trailing hyphens
}
