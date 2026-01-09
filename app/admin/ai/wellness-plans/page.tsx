"use client"

import { useState } from "react"
import { Loader2, Plus, Copy, Check } from "lucide-react"

export default function WellnessPlansGenerator() {
  const [clientName, setClientName] = useState("")
  const [goals, setGoals] = useState("")
  const [challenges, setChallenges] = useState("")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!clientName || !goals) {
      setError("Please fill in client name and health goals")
      return
    }

    setGenerating(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/admin/ai/wellness-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, goals, challenges }),
      })

      if (!response.ok) throw new Error("Failed to generate wellness plan")
      const data = await response.json()
      setResult(data.plan)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wellness Plan Generator</h1>
        <p className="text-gray-600 mt-2">Create personalized wellness and lifestyle plans for your clients using Gemini 2.5 Flash</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Sarah"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Health Goals</label>
                <textarea
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g., Improve sleep quality, reduce stress, increase energy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Challenges/Obstacles</label>
                <textarea
                  rows={3}
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="e.g., Busy schedule, limited time for exercise"
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
                disabled={generating}
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
                    Generate Wellness Plan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{result.title}</h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto text-sm text-gray-700">
                {result.goals && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Health Goals:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {Array.isArray(result.goals) ? result.goals.map((goal: string, i: number) => (
                        <li key={i}>{goal}</li>
                      )) : <li>{String(result.goals)}</li>}
                    </ul>
                  </div>
                )}
                {result.dailyHabits && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Daily Habits:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {Array.isArray(result.dailyHabits) ? result.dailyHabits.map((habit: string, i: number) => (
                        <li key={i}>{habit}</li>
                      )) : <li>{String(result.dailyHabits)}</li>}
                    </ul>
                  </div>
                )}
                {result.nutrition && <div><h3 className="font-semibold text-gray-900 mb-1">Nutrition:</h3><p>{typeof result.nutrition === 'string' ? result.nutrition : JSON.stringify(result.nutrition)}</p></div>}
                {result.sleep && <div><h3 className="font-semibold text-gray-900 mb-1">Sleep Optimization:</h3><p>{typeof result.sleep === 'string' ? result.sleep : JSON.stringify(result.sleep)}</p></div>}
                {result.stress && <div><h3 className="font-semibold text-gray-900 mb-1">Stress Management:</h3><p>{typeof result.stress === 'string' ? result.stress : JSON.stringify(result.stress)}</p></div>}
                {result.exercise && <div><h3 className="font-semibold text-gray-900 mb-1">Exercise:</h3><p>{typeof result.exercise === 'string' ? result.exercise : JSON.stringify(result.exercise)}</p></div>}
                {result.tracking && <div><h3 className="font-semibold text-gray-900 mb-1">Progress Tracking:</h3><p>{typeof result.tracking === 'string' ? result.tracking : JSON.stringify(result.tracking)}</p></div>}
                {result.weeklyAccountability && <div><h3 className="font-semibold text-gray-900 mb-1">Weekly Accountability:</h3><p>{typeof result.weeklyAccountability === 'string' ? result.weeklyAccountability : JSON.stringify(result.weeklyAccountability)}</p></div>}
                {result.actionPlan && <div><h3 className="font-semibold text-gray-900 mb-1">30-Day Action Plan:</h3><p>{typeof result.actionPlan === 'string' ? result.actionPlan : JSON.stringify(result.actionPlan)}</p></div>}
                {result.notes && <div><h3 className="font-semibold text-gray-900 mb-1">Additional Notes:</h3><p>{typeof result.notes === 'string' ? result.notes : JSON.stringify(result.notes)}</p></div>}
              </div>

              <div className="mt-4 space-y-2 flex gap-2">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold">
                  Save as Draft
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-sm font-semibold">
                  Publish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
