"use client"

import React from 'react'
import { useBooking } from '../../components/Booking'
import Link from 'next/link'
import Image from 'next/image'
import WaveDivider from '../../components/WaveDivider'

export default function NutritionMealPlanning() {
  const { openBooking } = useBooking()
  
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 section-cream rounded-[2rem]">
      <Link href="/services" className="text-[rgb(var(--color-primary))] mb-6 inline-block">← Back to Services</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Nutrition & Meal Planning</h1>
      <p className="text-lg text-gray-700 mb-8">Evidence-based nutrition strategies without the complexity—realistic eating plans that fit your life.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
          'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/6693654/pexels-photo-6693654.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
        ].map((src, i) => (
          <div key={i} className="rounded-2xl overflow-hidden organic-ring">
            <Image src={src} alt={`Nutrition image ${i + 1}`} width={500} height={400} className="h-28 md:h-36 w-full object-cover" />
          </div>
        ))}
      </div>

      <WaveDivider tone="petal" />

      <div className="prose max-w-none organic-card p-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">What You Get</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Personalized meal plan tailored to your schedule, preferences, and goals</li>
          <li>Weekly accountability calls to review progress and make adjustments</li>
          <li>Simple meal prep strategies for busy weeks</li>
          <li>Grocery lists and recipe ideas</li>
          <li>Education on balanced nutrition without restrictive dieting</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Perfect For</h2>
        <p className="text-gray-700 mb-6">Anyone who wants to eat better but doesn't know where to start. Whether you're managing a health condition, trying to lose weight sustainably, or just want more energy throughout the day, Lilly creates a practical nutrition plan that works for your real life.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What Makes It Different</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>No calorie counting or extreme restrictions</li>
          <li>Flexible plans that adapt to your changing schedule</li>
          <li>Focus on whole foods and sustainable habits</li>
          <li>Ongoing support and accountability to keep you on track</li>
        </ul>

        <div className="bg-[rgba(var(--color-primary-light),0.45)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to transform your nutrition?</h2>
          <p className="text-gray-700 mb-6">Let's talk about your goals and create a meal plan that actually works for you.</p>
          <button onClick={openBooking} className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
            Request Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
