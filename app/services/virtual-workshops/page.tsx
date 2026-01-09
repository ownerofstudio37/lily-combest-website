"use client"

import React from 'react'
import { useBooking } from '../../components/Booking'
import Link from 'next/link'

export default function VirtualWorkshops() {
  const { openBooking } = useBooking()
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <Link href="/services" className="text-[rgb(var(--color-primary))] mb-6 inline-block">← Back to Services</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Workshops</h1>
      <p className="text-lg text-gray-700 mb-8">Interactive group workshops on wellness topics—perfect for teams, offices, and community groups.</p>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">Workshop Topics</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li><strong>Meal Prep for Busy Weeks</strong> — Time-saving strategies to eat well without spending hours in the kitchen</li>
          <li><strong>Sleep Optimization</strong> — Practical techniques to improve sleep quality and wake up energized</li>
          <li><strong>Stress Management</strong> — Evidence-based tools for managing daily stress and building resilience</li>
          <li><strong>Building Sustainable Habits</strong> — The science of habit formation and how to make changes that stick</li>
          <li><strong>Nutrition Basics</strong> — Simple, non-restrictive nutrition principles for better energy and health</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Perfect For</h2>
        <p className="text-gray-700 mb-6">Corporate wellness programs, community health initiatives, schools, non-profits, and any group looking to invest in the well-being of their members. Workshops are 60-90 minutes, fully interactive, and tailored to your group's needs.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What You Get</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Custom workshop content tailored to your group's interests</li>
          <li>Interactive presentation with Q&A</li>
          <li>Actionable takeaways participants can use immediately</li>
          <li>Digital handouts and resources</li>
          <li>Virtual delivery via Zoom or your preferred platform</li>
        </ul>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in a workshop?</h2>
          <p className="text-gray-700 mb-6">Let's discuss your group's needs and create a workshop that delivers real value.</p>
          <button onClick={openBooking} className="bg-[rgb(var(--color-primary))] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
