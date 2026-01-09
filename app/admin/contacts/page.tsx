"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Calendar } from "lucide-react"

interface Contact {
  id: number
  name: string
  email: string
  message: string
  source?: string
  created_at: string
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

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
            <span className="text-sm text-gray-600">
              {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
            </span>
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <p>Loading...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Mail size={40} className="mx-auto mb-4 opacity-50" />
            <p>Contact form submissions will appear here</p>
            <p className="text-sm mt-2">Users who fill out the contact form on your website will show up in this list</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <a href={`mailto:${contact.email}`} className="text-pink-600 hover:text-pink-700 text-sm">
                      {contact.email}
                    </a>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(contact.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{contact.message}</p>
                {contact.source && (
                  <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {contact.source}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
