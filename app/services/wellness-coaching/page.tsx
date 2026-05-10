"use client"

import React from 'react'
import { useBooking } from '../../components/Booking'
import Link from 'next/link'
import Image from 'next/image'

export default function WellnessCoaching() {
  const { openBooking } = useBooking()
  
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 section-petal rounded-[2rem]">
      <Link href="/services" className="text-[rgb(var(--color-primary))] mb-6 inline-block">← Back to Services</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">One-on-One Wellness Coaching</h1>
      <p className="text-lg text-gray-700 mb-8">Personalized guidance to help you build sustainable habits that transform your health and well-being.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
          'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
        ].map((src, i) => (
          <div key={i} className="rounded-2xl overflow-hidden organic-ring">
            <Image src={src} alt={`Wellness coaching image ${i + 1}`} width={500} height={400} className="h-28 md:h-36 w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="prose max-w-none organic-card p-8">
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
          <li>Request a free introductory consultation to discuss your goals</li>
          <li>Lilly creates a personalized plan based on your needs and lifestyle</li>
          <li>Weekly check-ins to track progress, celebrate wins, and adjust as needed</li>
          <li>Ongoing support via email and messaging between sessions</li>
        </ol>

        <div className="bg-[rgba(var(--color-primary-light),0.45)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start your wellness journey?</h2>
          <p className="text-gray-700 mb-6">Request a free 30-minute call to learn more and see if we're a good fit.</p>
          <button onClick={openBooking} className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
            Request Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
