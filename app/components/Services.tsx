import React from 'react'

const services = [
  {
    title: 'One-on-one Wellness Coaching',
    description: 'Personalized coaching to build sustainable habits, nutrition guidance, and accountability.'
  },
  {
    title: 'Nutrition & Meal Planning',
    description: 'Tailored meal plans and practical nutrition advice designed for busy schedules.'
  },
  {
    title: 'Stress & Sleep Coaching',
    description: 'Techniques for stress reduction and better sleep to improve overall wellbeing.'
  },
  {
    title: 'Virtual Workshops',
    description: 'Group programs and workshops focused on practical, evidence-based wellness strategies.'
  }
]

export default function Services(){
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">Support that meets you where you are — clear, practical, and sustainable.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.title} className="p-6 border rounded-lg shadow-sm bg-white">
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-700">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
