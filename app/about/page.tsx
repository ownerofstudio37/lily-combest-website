"use client"

import React from 'react'
import { useLocale } from '../components/LocaleProvider'

export default function About() {
  const { t } = useLocale()
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{t('about.title') || 'About Lilly'}</h1>
      
      <p className="text-gray-700 mb-6 text-lg">As a passionate Wellness Consultant serving Houston, Magnolia, and Tomball, Lilly Combest is dedicated to your personal wellness journey. She specializes in creating a truly personalized approach to wellness based on your unique goals. This isn't just another diet or temporary fix; it's a science-backed path to vitality.</p>
      
      <p className="text-gray-700 mb-6">Her mission is to provide a natural wellness strategy through a holistic approach. Lilly helps you understand how your lifestyle impacts your well-being, creating customized meal plans, supplement recommendations, and even skincare advice. Achieve lasting wellness with a plan designed specifically for you.</p>
      
      <p className="text-gray-700 mb-8">If you're in Pinehurst, Spring, or The Woodlands and looking for a consultant focused on holistic wellness, discover how Lilly can guide you.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">What Makes Her Different</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Real-world strategies for busy lifestyles</li>
        <li>No extreme diets or complicated systems</li>
        <li>Sustainable, long-term habit building</li>
        <li>Personalized support tailored to your goals</li>
      </ul>
    </div>
  )
}
