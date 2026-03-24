"use client"

import React from 'react'
import { useLocale } from './LocaleProvider' 
import { HeartPulse, Salad, MoonStar, Users } from 'lucide-react'

export default function Services(){
  const { t } = useLocale()
  const title = t('services.title') || 'Services'
  const desc = t('services.desc') || 'Support that meets you where you are — clear, practical, and sustainable.'
  const list = (t('services.list') && JSON.parse(JSON.stringify(t('services.list')))) || [
    'One-on-one Wellness Coaching',
    'Nutrition & Meal Planning',
    'Stress & Sleep Coaching',
    'Virtual Workshops'
  ]

  const cards = [
    {
      title: list[0] || 'One-on-one Wellness Coaching',
      description: 'Custom support to improve daily routines, energy, and healthy consistency.',
      icon: HeartPulse,
    },
    {
      title: list[1] || 'Nutrition & Meal Planning',
      description: 'Simple, realistic meal strategies that fit your schedule and goals.',
      icon: Salad,
    },
    {
      title: list[2] || 'Stress & Sleep Coaching',
      description: 'Practical systems to reduce overwhelm and improve restorative sleep.',
      icon: MoonStar,
    },
    {
      title: list[3] || 'Virtual Workshops',
      description: 'Interactive sessions for teams or groups focused on sustainable wellness.',
      icon: Users,
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">{desc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon
            return (
            <div key={card.title} className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
              <div className="mb-4 inline-flex rounded-lg bg-pink-100 p-2 text-pink-700">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">{card.title}</h3>
              <p className="text-sm text-gray-700">{card.description}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
