"use client"

import { useState, useEffect } from "react"
import { Calendar, User, TrendingUp } from "lucide-react"

interface MealPlan {
  id: string
  client_name: string
  title: string
  duration: number
  calories: number
  meals: string[]
  shopping_list: string[]
  notes: string
  created_at: string
}

export default function SavedMealPlans() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null)

  useEffect(() => {
    fetchMealPlans()
  }, [])

  const fetchMealPlans = async () => {
    try {
      const response = await fetch("/api/admin/meal-plans")
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch meal plans")
      }
      
      setMealPlans(data.mealPlans || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading saved meal plans...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Meal Plans</h1>
        <p className="text-gray-600 mt-2">View and manage all client meal plans</p>
      </div>

      {mealPlans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <p>No saved meal plans yet. Create one from the Meal Plan Generator!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPlan(selectedPlan?.id === plan.id ? null : plan)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{plan.title}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {plan.client_name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {plan.duration} days
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={16} />
                        {plan.calories} cal/day
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(plan.created_at).toLocaleDateString()}
                  </div>
                </div>

                {selectedPlan?.id === plan.id && (
                  <div className="mt-6 pt-6 border-t space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Meals</h3>
                      <div className="space-y-2">
                        {plan.meals.map((meal, idx) => (
                          <div key={idx} className="border-l-4 border-pink-500 pl-4 py-2 text-gray-700">
                            {meal}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Shopping List</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {plan.shopping_list.map((item, idx) => (
                          <li key={idx} className="text-gray-700">
                            ☐ {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.notes && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                        <p className="text-gray-700">{plan.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
