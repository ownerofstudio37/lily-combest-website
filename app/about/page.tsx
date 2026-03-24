"use client"

import React from 'react'
import { useLocale } from '../components/LocaleProvider'
import Image from 'next/image'

export default function About() {
  const { t } = useLocale()
  
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{t('about.title') || 'About Lilly'}</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <p className="text-gray-700 mb-5 text-lg leading-relaxed">As a passionate Wellness Consultant serving Pinehurst, The Woodlands, and Greater Houston, Lilly Combest helps clients build healthy routines that feel realistic and sustainable.</p>
          <p className="text-gray-700 mb-5 leading-relaxed">Her approach blends nutrition, movement, sleep, and stress support into one personalized strategy. No extreme plans. No all-or-nothing mindset. Just practical changes that fit your real life.</p>
          <p className="text-gray-700 leading-relaxed">If you're looking for a local wellness coach in Texas who focuses on long-term progress, Lilly can guide you with accountability and support at each step.</p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200">
          <Image
            src="https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Wellness coaching session focused on nutrition and healthy habits"
            width={900}
            height={1100}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">What Makes Her Different</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Real-world strategies for busy lifestyles</li>
          <li>No extreme diets or complicated systems</li>
          <li>Sustainable, long-term habit building</li>
          <li>Personalized support tailored to your goals</li>
        </ul>
      </div>
    </div>
  )
}
