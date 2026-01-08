import React from 'react'

export default function Contact(){
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-gray-700 mb-6">To schedule a free consultation with Lily, please email <a href="mailto:hello@lilycombest.com" className="text-[rgb(var(--color-primary))]">hello@lilycombest.com</a> or use the booking link below.</p>
      <a href="/book" className="inline-block bg-[rgb(var(--color-primary))] text-white px-6 py-3 rounded-lg">Book a consult</a>
    </div>
  )
}
