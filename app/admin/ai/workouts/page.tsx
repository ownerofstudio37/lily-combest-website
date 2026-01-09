"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export default function WorkoutsGenerator() {
  const [clientName, setClientName] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("beginner")
  const [goals, setGoals] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Workout Plan Generator</h1>
        <p className="text-gray-600 mt-2">Create customized workout routines for your fitness coaching clients</p>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Client Name</label>
              <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Fitness Level</label>
              <select value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Fitness Goals</label>
              <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <Plus size={18} />
              Generate Workout Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
