"use client"

import { Calendar } from "lucide-react"

export default function Bookings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings & Calendar</h1>
        <p className="text-gray-600 mt-2">View and manage all Calendly bookings synced from your schedule</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          <Calendar size={40} className="mx-auto mb-4 opacity-50" />
          <p>Bookings will appear here</p>
          <p className="text-sm mt-2">Calendly bookings will be synced to this dashboard</p>
        </div>
      </div>
    </div>
  )
}
