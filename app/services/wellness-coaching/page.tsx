"use client"

import React from 'react'
import { useBooking } from '../../components/Booking'
import Link from 'next/link'

export default function WellnessCoaching() {
  const { openBooking } = useBooking()
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <Link href="/services" className="text-[rgb(var(--color-primary))] mb-6 inline-block">← Back to Services</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">One-on-One Wellness Coaching</h1>
      <p className="text-lg text-gray-700 mb-8">Personalized guidance to help you build sustainable habits that transform your health and well-being.</p>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">What You Get</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Customized wellness plan tailored to your unique lifestyle and goals</li>
          <li>Weekly accountability calls to keep you motivated and on track</li>
          <li>Ongoing support and adjustments as you progress</li>
          <li>Evidence-based strategies for lasting behavior change</li>
          <li>Access to resources, templates, and tools</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Perfect For</h2>
        <p className="text-gray-700 mb-6">Busy professionals, parents, and anyone looking to build healthier habits without extreme diets or complicated systems. Whether you want better energy, improved nutrition, or sustainable lifestyle changes, this coaching provides the personalized support you need.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-8">
          <li>Book a free introductory consultation to discuss your goals</li>
          <li>Lilly creates a personalized plan based on your needs and lifestyle</li>
          <li>Weekly check-ins to track progress, celebrate wins, and adjust as needed</li>
          <li>Ongoing support via email and messaging between sessions</li>
        </ol>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start your wellness journey?</h2>
          <p className="text-gray-700 mb-6">Schedule a free 30-minute call to learn more and see if we're a good fit.</p>
          <button onClick={openBooking} className="bg-[rgb(var(--color-primary))] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
