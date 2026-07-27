import { NextRequest, NextResponse } from "next/server"
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!isSupabaseAdminConfigured) {
      return NextResponse.json({ contacts: [], warning: 'Supabase is not configured.' })
    }

    const { data: contacts, error } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts:', error)
      return NextResponse.json({ contacts: [], warning: `Contacts table is not reachable: ${error.message}` })
    }

    return NextResponse.json({ contacts: contacts || [] })
  } catch (error: any) {
    console.error('Contacts API error:', error)
    return NextResponse.json({ contacts: [], warning: error.message || 'Failed to fetch contacts' })
  }
}
