"use client"

import { Settings, BarChart3, Shield } from "lucide-react"

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Advanced Settings</h1>
        <p className="text-gray-600 mt-2">Performance monitoring, security settings, and technical configuration</p>
      </div>

      <div className="space-y-6">
        {/* Performance Monitoring */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center gap-4 mb-6">
            <BarChart3 className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Site Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Page Load Speed</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">1.2s</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Lighthouse Score</p>
                <p className="text-2xl font-bold text-green-600 mt-2">92/100</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Detailed Analytics
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Security & API Keys</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Gemini API Key</p>
              <p className="text-sm text-gray-600 mt-1">Status: ✓ Connected</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Resend Email API</p>
              <p className="text-sm text-gray-600 mt-1">Status: ✓ Domain Verified</p>
            </div>
            <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition">
              Manage Environment Variables
            </button>
          </div>
        </div>

        {/* Deployment Settings */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center gap-4 mb-6">
            <Settings className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Deployment & Backups</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">Last Deploy</p>
              <p className="text-sm text-gray-600 mt-1">Today at 2:34 PM</p>
            </div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              View Deployment History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
