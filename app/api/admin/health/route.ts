import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

const envChecks = [
  ['ADMIN_PASSWORD', 'Admin password'],
  ['ADMIN_SESSION_SECRET', 'Session signing secret'],
  ['NEXT_PUBLIC_SUPABASE_URL', 'Supabase URL'],
  ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Supabase public key'],
  ['SUPABASE_SERVICE_ROLE_KEY', 'Supabase service role'],
  ['RESEND_API_KEY', 'Resend email'],
  ['GEMINI_API_KEY', 'Gemini AI'],
  ['NEXT_PUBLIC_CALENDLY_URL', 'Calendly booking'],
] as const

async function checkTable(table: string) {
  if (!isSupabaseAdminConfigured) {
    return { table, ok: false, message: 'Supabase environment variables are not configured.' }
  }

  const { error } = await supabaseAdmin
    .from(table)
    .select('*', { count: 'exact', head: true })

  return {
    table,
    ok: !error,
    message: error?.message || 'Reachable',
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const env = envChecks.map(([key, label]) => ({
    key,
    label,
    ok: Boolean(process.env[key]),
    required: key !== 'ADMIN_SESSION_SECRET',
  }))

  const tables = await Promise.all(['contacts', 'blog_posts', 'meal_plans', 'bookings'].map(checkTable))

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    env,
    services: {
      supabase: isSupabaseAdminConfigured,
      resend: Boolean(process.env.RESEND_API_KEY),
      gemini: Boolean(process.env.GEMINI_API_KEY),
      calendly: Boolean(process.env.NEXT_PUBLIC_CALENDLY_URL),
    },
    tables,
  })
}
