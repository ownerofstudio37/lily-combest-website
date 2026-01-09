import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(request: NextRequest) {
  try {
    const { data: contacts, error } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(contacts || [])
  } catch (error: any) {
    console.error('Contacts API error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch contacts' }, { status: 500 })
  }
}
