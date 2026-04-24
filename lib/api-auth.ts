import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

type AuthOk  = { ok: true;  admin: ReturnType<typeof createAdminClient>; userId: string }
type AuthFail = { ok: false; res: NextResponse }

export async function requireAuth(): Promise<AuthOk | AuthFail> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, res: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  return { ok: true, admin: createAdminClient(), userId: user.id }
}
