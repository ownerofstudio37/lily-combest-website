import React from 'react'
import Link from 'next/link'
import LocalBusinessSchema from './LocalBusinessSchema'

export default function Footer(){
  return (
    <footer className="mt-20 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold text-white">Lilly Combest Wellness</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Personalized wellness coaching in Pinehurst, TX for nutrition, energy, stress support, and sustainable healthy habits.
            </p>
            <p className="mt-4 text-sm text-slate-300">
              Email:{' '}
              <a href="mailto:lilly@lillycombest.com" className="text-pink-300 hover:text-pink-200 transition-colors">
                lilly@lillycombest.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Popular Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><Link href="/services/wellness-coaching" className="hover:text-white transition-colors">One-on-one coaching</Link></li>
              <li><Link href="/services/nutrition-meal-planning" className="hover:text-white transition-colors">Nutrition & meal planning</Link></li>
              <li><Link href="/services/workout-motivation-coaching" className="hover:text-white transition-colors">Workout coaching</Link></li>
              <li><Link href="/services/virtual-workshops" className="hover:text-white transition-colors">Virtual workshops</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/login" className="text-pink-300 hover:text-pink-200 transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Lilly Combest. All rights reserved.
        </div>
      </div>

      {/* Structured data for LocalBusiness */}
      <LocalBusinessSchema />
    </footer>
  )
}
