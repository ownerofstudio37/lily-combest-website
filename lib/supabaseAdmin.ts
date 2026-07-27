import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseServiceKey)

export const supabaseAdmin = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseServiceKey || 'missing-service-role-key',
{
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
