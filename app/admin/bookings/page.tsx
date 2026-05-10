"use client"

import { Calendar } from "lucide-react"

export default function Bookings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings & Calendar</h1>
        <p className="text-gray-600 mt-2">View and manage incoming consultation requests</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          <Calendar size={40} className="mx-auto mb-4 opacity-50" />
          <p>Consultation requests will appear here</p>
          <p className="text-sm mt-2">Clients now request dates via the contact form/email flow</p>
        </div>
      </div>
    </div>
  )
}
