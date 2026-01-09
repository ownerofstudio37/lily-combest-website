"use client"

import { TrendingUp } from "lucide-react"

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-2">Track site traffic, user behavior, and conversion metrics</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="text-pink-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Visitors</p>
            <p className="text-2xl font-bold text-pink-600 mt-2">0</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Booking Clicks</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">0</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Contact Submissions</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">0</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-6">
          Set up Google Analytics or Plausible to view detailed traffic insights
        </p>
      </div>
    </div>
  )
}
