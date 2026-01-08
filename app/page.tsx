import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Services />
      <section className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-gray-700 mb-6">Schedule a free introductory consult with Lily to talk about your wellness goals and how she can help you reach them.</p>
          <a href="/contact" className="inline-block bg-[rgb(var(--color-primary))] text-white px-6 py-3 rounded-lg">Book a free consult</a>
        </div>
      </section>
    </div>
  )
}
