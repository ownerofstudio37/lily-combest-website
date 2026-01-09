import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('meal_plans')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ mealPlans: data })
  } catch (error: any) {
    console.error('Fetch meal plans error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch meal plans' }, { status: 500 })
  }
}
