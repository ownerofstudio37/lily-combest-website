"use client"

import React from 'react'
import { useBooking } from '../../components/Booking'
import Link from 'next/link'
import Image from 'next/image'

export default function VirtualWorkshops() {
  const { openBooking } = useBooking()
  
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 section-cream rounded-[2rem]">
      <Link href="/services" className="text-[rgb(var(--color-primary))] mb-6 inline-block">← Back to Services</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Workshops</h1>
      <p className="text-lg text-gray-700 mb-8">Interactive group workshops on wellness topics—perfect for teams, offices, and community groups.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
        ].map((src, i) => (
          <div key={i} className="rounded-2xl overflow-hidden organic-ring">
            <Image src={src} alt={`Workshop wellness image ${i + 1}`} width={500} height={400} className="h-28 md:h-36 w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="prose max-w-none organic-card p-8">
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

        <div className="bg-[rgba(var(--color-primary-light),0.45)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in a workshop?</h2>
          <p className="text-gray-700 mb-6">Let's discuss your group's needs and create a workshop that delivers real value.</p>
          <button onClick={openBooking} className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
            Request a Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
