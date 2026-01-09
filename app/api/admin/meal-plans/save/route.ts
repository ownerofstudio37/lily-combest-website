import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: NextRequest) {
  try {
    const { clientName, plan } = await request.json()

    if (!clientName || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log('Saving meal plan:', {
      clientName,
      title: plan.title,
      duration: typeof plan.duration,
      calories: typeof plan.calories,
    })

    // Ensure meals and shoppingList are properly formatted as JSON strings
    const mealsParsed = typeof plan.meals === 'string' ? plan.meals : JSON.stringify(plan.meals)
    const shoppingListParsed = typeof plan.shoppingList === 'string' ? plan.shoppingList : JSON.stringify(plan.shoppingList)

    const { data, error } = await supabaseAdmin
      .from('meal_plans')
      .insert({
        client_name: clientName,
        title: plan.title,
        duration: String(plan.duration),
        calories: String(plan.calories),
        meals: mealsParsed,
        shopping_list: shoppingListParsed,
        notes: plan.notes || '',
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Meal plan saved successfully')
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Save meal plan error:', error)
    return NextResponse.json({ error: error.message || 'Failed to save meal plan' }, { status: 500 })
  }
}
