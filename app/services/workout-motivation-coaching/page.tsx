"use client"

import React from 'react'
import { useBooking } from '../../components/Booking'
import Link from 'next/link'

export default function WorkoutMotivationCoaching() {
  const { openBooking } = useBooking()
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <Link href="/services" className="text-[rgb(var(--color-primary))] mb-6 inline-block">← Back to Services</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Workout & Motivation Coaching</h1>
      <p className="text-lg text-gray-700 mb-8">Custom workout plans designed for your goals and fitness level, with weekly accountability to keep you motivated.</p>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">What You Get</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Personalized workout plan created just for you based on your fitness level and goals</li>
          <li>Weekly accountability calls to track progress and keep you motivated</li>
          <li>Exercise modifications for any injuries or limitations</li>
          <li>Guidance on form, technique, and progression</li>
          <li>Flexible plans that adapt to your schedule and available equipment</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
        <p className="text-gray-700 mb-4">Lilly creates a workout plan tailored to your current fitness level, available time, and personal goals. Whether you're just starting out or looking to level up your routine, you'll get clear guidance and ongoing support.</p>
        <p className="text-gray-700 mb-6">Weekly accountability calls ensure you stay on track—discuss challenges, celebrate progress, and adjust your plan as needed. This isn't just a workout program; it's personalized coaching that keeps you motivated for the long haul.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Perfect For</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Anyone who struggles with consistency or motivation</li>
          <li>People who want a plan designed for their specific goals (strength, endurance, weight loss, etc.)</li>
          <li>Busy individuals who need flexible workout options</li>
          <li>Those who want expert guidance and accountability without a gym membership</li>
        </ul>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get moving?</h2>
          <p className="text-gray-700 mb-6">Schedule a free call to discuss your fitness goals and create a custom plan.</p>
          <button onClick={openBooking} className="bg-[rgb(var(--color-primary))] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
