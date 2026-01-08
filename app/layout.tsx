import './globals.css'
import React from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { LocaleProvider } from './components/LocaleProvider'

export const metadata = {
  title: 'Lilly Combest — Health & Wellness (Pinehurst, NC)',
  description: 'Personalized wellness coaching, nutrition guidance, and lifestyle support from Lilly Combest in Pinehurst, NC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Locale provider wraps site to provide translations */}
        <LocaleProvider>
          <Navigation />

          <main id="main" className="min-h-screen pt-16">
            {children}
          </main>

          <Footer />
        </LocaleProvider>
      </body>
    </html>
  )
}
