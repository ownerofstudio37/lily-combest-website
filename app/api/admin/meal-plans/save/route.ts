import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: NextRequest) {
  try {
    const { clientName, plan } = await request.json()

    if (!clientName || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('meal_plans')
      .insert({
        client_name: clientName,
        title: plan.title,
        duration: plan.duration,
        calories: plan.calories,
        meals: plan.meals,
        shopping_list: plan.shoppingList,
        notes: plan.notes,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Save meal plan error:', error)
    return NextResponse.json({ error: error.message || 'Failed to save meal plan' }, { status: 500 })
  }
}
