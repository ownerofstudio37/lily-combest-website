"use client"

import { useState } from "react"
import { Loader2, Plus, X } from "lucide-react"

interface MealPlan {
  title: string
  duration: string
  calories: string
  meals: string[]
  shoppingList: string[]
  notes: string
}

export default function MealPlansGenerator() {
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [mealPreference, setMealPreference] = useState("balanced")
  const [duration, setDuration] = useState("7")
  const [calorieTarget, setCalorieTarget] = useState("2000")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleGenerate = async () => {
    if (!clientName.trim()) {
      setError("Please enter client name")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/admin/ai/meal-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          dietaryRestrictions,
          mealPreference,
          duration: Number(duration),
          calorieTarget: Number(calorieTarget),
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate meal plan")
      }
      
      setGeneratedPlan(data.plan)
    } catch (err: any) {
      console.error("Meal plan error:", err)
      setError(err.message || "Failed to generate meal plan")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedPlan) return
    
    setSaving(true)
    setError("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/admin/meal-plans/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          plan: generatedPlan,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save meal plan")
      }

      setSuccessMessage("Meal plan saved successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to save meal plan")
    } finally {
      setSaving(false)
    }
  }

  const handleSendToClient = async () => {
    if (!generatedPlan || !clientEmail) {
      setError("Please provide client email address")
      return
    }
    
    setSending(true)
    setError("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/admin/meal-plans/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          plan: generatedPlan,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send meal plan")
      }

      setSuccessMessage("Meal plan sent to client successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to send meal plan")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meal Plan Generator</h1>
        <p className="text-gray-600 mt-2">Create personalized, customized meal plans for your clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Client Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Sarah Johnson"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Client Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="7">7 days</option>
                <option value="14">2 weeks</option>
                <option value="21">3 weeks</option>
                <option value="30">1 month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Meal Preference</label>
              <select
                value={mealPreference}
                onChange={(e) => setMealPreference(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="balanced">Balanced</option>
                <option value="high-protein">High Protein</option>
                <option value="low-carb">Low Carb</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="keto">Keto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Calorie Target</label>
              <input
                type="number"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Dietary Restrictions</label>
              <textarea
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="e.g., Gluten-free, nut allergy, dairy-free"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating || !clientName.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Generate Meal Plan
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!generatedPlan ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              <p>Personalized meal plan will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900">{generatedPlan.title}</h2>
                <p className="text-gray-600 mt-2">
                  {generatedPlan.duration} | {generatedPlan.calories} calories/day
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Meals</h3>
                <div className="space-y-3">
                  {generatedPlan.meals.map((meal, idx) => (
                    <div key={idx} className="border-l-4 border-pink-500 pl-4 py-2">
                      {meal}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Shopping List</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {generatedPlan.shoppingList.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      ☐ {item}
                    </li
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-white border border-gray-300 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Plan"}
                </button>
                <button 
                  onClick={handleSendToClient}
                  disabled={sending || !clientEmail}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send to Client"}
                </button>
              </div>

              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {successMessage}
                </div>
              )}className="font-semibold text-blue-900 mb-2">Notes</h3>
                <p className="text-blue-800 text-sm">{generatedPlan.notes}</p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-white border border-gray-300 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition">
                  Save Plan
                </button>
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition">
                  Send to Client
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
