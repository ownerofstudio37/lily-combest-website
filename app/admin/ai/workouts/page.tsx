"use client"

import { useState } from "react"
import { Plus, Loader2, Copy, Check } from "lucide-react"
import { PlanSection, PlanShell } from "../components/PlanFormatter"

export default function WorkoutsGenerator() {
  const [clientName, setClientName] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("beginner")
  const [goals, setGoals] = useState("")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!clientName || !goals) {
      setError("Please fill in client name and fitness goals")
      return
    }

    setGenerating(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/admin/ai/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, fitnessLevel, goals }),
      })

      if (!response.ok) throw new Error("Failed to generate workout plan")
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
        <h1 className="text-3xl font-bold text-gray-900">Workout Plan Generator</h1>
        <p className="text-gray-600 mt-2">Create customized workout routines for your fitness coaching clients using Gemini 2.5 Flash</p>
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
                  placeholder="e.g., John"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Fitness Level</label>
                <select
                  value={fitnessLevel}
                  onChange={(e) => setFitnessLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Fitness Goals</label>
                <textarea
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g., Build strength, increase endurance, lose weight"
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
                    Generate Workout Plan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="lg:col-span-2">
            <PlanShell
              title={result.title || `Personalized Workout Plan for ${clientName}`}
              subtitle={result.level ? `${String(result.level)} level` : "Formatted for client review and easy copying."}
              actions={
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-white"
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
              }
            >
              <PlanSection title="Assessment" value={result.assessment} />
              <PlanSection title="Weekly Schedule" value={result.weeklySchedule} />
              <PlanSection title="Exercises" value={result.exercises} />
              <PlanSection title="Warm-Up" value={result.warmUp} />
              <PlanSection title="Cool-Down" value={result.coolDown} />
              <PlanSection title="Nutrition" value={result.nutrition} />
              <PlanSection title="Recovery" value={result.recovery} />
              <PlanSection title="Progress Tracking" value={result.tracking} />
              <PlanSection title="Motivation" value={result.motivation} />
              <PlanSection title="Progression" value={result.progression} />
              <PlanSection title="Additional Notes" value={result.notes} />
              <div className="mt-4 space-y-2 flex gap-2">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold">
                  Save as Draft
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-sm font-semibold">
                  Publish
                </button>
              </div>
            </PlanShell>
          </div>
        )}
      </div>
    </div>
  )
}
