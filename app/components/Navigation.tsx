"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation(){
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { t } = useLocale()

  const navItems = [
    { id: 'home', label: t('nav.home') || 'Home', href: '/' },
    { id: 'services', label: t('nav.services') || 'Services', href: '/services' },
    { id: 'about', label: t('nav.about') || 'About', href: '/about' },
    { id: 'blog', label: t('nav.blog') || 'Blog', href: '/blog' },
    { id: 'contact', label: t('nav.contact') || 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md' : 'bg-transparent'}`} aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3" aria-label="Lilly Combest - Home">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-primary))] flex items-center justify-center text-white font-semibold">LC</div>
            <span className={`font-semibold ${scrolled ? 'text-slate-900' : 'text-white'}`}>Lilly Combest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <Link key={item.id} href={item.href} className={`text-sm font-medium ${pathname === item.href ? 'text-[rgb(var(--color-primary))]' : scrolled ? 'text-slate-700' : 'text-white'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="ml-2 inline-block bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-md">{t('nav.book') || 'Book'}</Link>
            {/* Language switcher */}
            <div className="ml-4">
              <LanguageToggle />
            </div>
          </div>

          <button className="md:hidden p-2 rounded-md text-slate-700" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white/95 border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map(item => (
              <Link key={item.id} href={item.href} className="py-2 border-b text-slate-800" onClick={() => setIsOpen(false)}>{item.label}</Link>
            ))}
            <Link href="/contact" className="py-2 bg-[rgb(var(--color-primary))] text-white text-center rounded-md">Book</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
