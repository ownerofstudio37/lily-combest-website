import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Lily Combest — Health & Wellness (Pinehurst, NC)',
  description: 'Personalized wellness coaching, nutrition guidance, and lifestyle support from Lily Combest in Pinehurst, NC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        <main id="main" className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
