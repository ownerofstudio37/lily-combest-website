import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { LocaleProvider } from './components/LocaleProvider'
import { BookingProvider } from './components/Booking'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `${siteConfig.name} — Wellness Coach`,
  description: siteConfig.description,
  generator: 'Next.js',
  keywords: ['wellness', 'coaching', 'nutrition', 'sleep', 'health', 'Pinehurst', 'NC'],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Wellness Coach`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Wellness Coach`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Booking provider manages booking modal state globally */}
        <BookingProvider>
          {/* Locale provider wraps site to provide translations */}
          <LocaleProvider>
            <Navigation />

            <main id="main" className="min-h-screen pt-16">
              {children}
            </main>

            <Footer />
          </LocaleProvider>
        </BookingProvider>
      </body>
    </html>
  )
}
