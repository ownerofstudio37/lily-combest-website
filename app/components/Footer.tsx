import React from 'react'
import Link from 'next/link'
import LocalBusinessSchema from './LocalBusinessSchema'

export default function Footer(){
  return (
    <footer className="bg-slate-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="md:flex md:justify-between md:items-start">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Lilly Combest</h3>
            <p className="text-sm text-gray-700">Health & wellness coaching in Pinehurst, NC</p>
            <p className="text-sm text-gray-700 mt-3">Email: <a href="mailto:hello@lilycombest.com" className="text-[rgb(var(--color-primary))]">hello@lilycombest.com</a></p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-2">Services</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><Link href="/services/one-on-one">One-on-one coaching</Link></li>
                <li><Link href="/services/nutrition">Nutrition & meal planning</Link></li>
                <li><Link href="/services/workshops">Workshops</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Company</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 text-center">© {new Date().getFullYear()} Lilly Combest. All rights reserved.</div>
      </div>

      {/* Structured data for LocalBusiness */}
      <LocalBusinessSchema />
    </footer>
  )
}
