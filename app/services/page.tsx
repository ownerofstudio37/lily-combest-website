"use client"

import React from 'react'
import Link from 'next/link'
import { useLocale } from '../components/LocaleProvider'
import { useBooking } from '../components/Booking'

export default function Services() {
  const { t } = useLocale()
  const { openBooking } = useBooking()
  
  const services = [
    {
      title: 'One-on-One Wellness Coaching',
      description: 'Personalized guidance to help you build sustainable habits. Perfect for clients who want customized support for their unique lifestyle and goals.',
      href: '/services/wellness-coaching'
    },
    {
      title: 'Nutrition & Meal Planning',
      description: 'Evidence-based nutrition strategies without the complexity. Lilly helps you create a realistic eating plan that fits your schedule and preferences.',
      href: '/services/nutrition-meal-planning'
    },
    {
      title: 'Workout & Motivation Coaching',
      description: 'Custom workout plans tailored to your goals and fitness level. Includes weekly accountability calls to keep you motivated and on track.',
      href: '/services/workout-motivation-coaching'
    },
    {
      title: 'Virtual Workshops',
      description: 'Group workshops on topics like meal prep, sleep optimization, and stress management. Great for teams, offices, or community groups.',
      href: '/services/virtual-workshops'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title') || 'Services'}</h1>
      <p className="text-lg text-gray-700 mb-12">{t('services.desc') || 'Support that meets you where you are — clear, practical, and sustainable.'}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {services.map((service, idx) => (
          <Link key={idx} href={service.href} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[rgb(var(--color-primary))] transition block">
            <h2 className="text-xl font-semibold mb-3 text-slate-900">{service.title}</h2>
            <p className="text-gray-700 mb-3">{service.description}</p>
            <span className="text-[rgb(var(--color-primary))] font-medium text-sm">Learn more →</span>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-700 mb-6">Schedule a free 30-minute introductory call to discuss your wellness goals and how Lilly can help.</p>
        <button onClick={openBooking} className="bg-[rgb(var(--color-primary))] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition">
          {t('section.book') || 'Book a free consult'}
        </button>
      </div>
    </div>
  )
}
