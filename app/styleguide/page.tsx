"use client"

import React from 'react'

export default function Styleguide(){
  const options = [
    { id: 'logo', src: '/logo.svg', name: 'Primary badge' },
    { id: 'logo-badge', src: '/logo-badge.svg', name: 'Badge only' },
    { id: 'logo-badge-word', src: '/logo-badge-word.svg', name: 'Badge + Word' },
    { id: 'logo-wordmark', src: '/logo-wordmark.svg', name: 'Wordmark' },
  ]

  const setLogo = (src: string) => {
    localStorage.setItem('brandLogo', src)
    // small page refresh to make Navigation update in this simple implementation
    window.location.reload()
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Styleguide & Logo Variants</h1>
      <p className="mb-6 text-gray-700">Choose a logo variant to preview and set as the site logo (selection persists in your browser).</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map(o => (
          <div key={o.id} className="p-4 border rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={o.src} alt={o.name} width={96} height={96} className="w-24 h-24 object-contain" />
              <div>
                <div className="font-semibold">{o.name}</div>
                <div className="text-sm text-gray-600">{o.src}</div>
              </div>
            </div>
            <div>
              <button className="bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-md" onClick={() => setLogo(o.src)}>Use</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
