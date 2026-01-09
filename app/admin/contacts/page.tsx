"use client"

import { useState } from "react"
import { Mail, Phone, Calendar } from "lucide-react"

export default function Contacts() {
  const [contacts, setContacts] = useState([])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
        <p className="text-gray-600 mt-2">View and manage all contact form submissions from your website</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
            <span className="text-sm text-gray-600">No contacts yet</span>
          </div>
        </div>
        <div className="p-8 text-center text-gray-500">
          <Mail size={40} className="mx-auto mb-4 opacity-50" />
          <p>Contact form submissions will appear here</p>
          <p className="text-sm mt-2">Users who fill out the contact form on your website will show up in this list</p>
        </div>
      </div>
    </div>
  )
}
