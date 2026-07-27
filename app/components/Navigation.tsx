"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'
import { useBooking } from './Booking'
import LanguageToggle from './LanguageToggle'
import BrandLogo from './BrandLogo'

export default function Navigation(){
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openBooking } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const { t } = useLocale()

  const navItems = [
    { id: 'home', label: t('nav.home') || 'Home', href: '/' },
    { id: 'services', label: t('nav.services') || 'Services', href: '/services' },
    { id: 'about', label: t('nav.about') || 'About', href: '/about' },
    { id: 'blog', label: t('nav.blog') || 'Blog', href: '/blog' },
    { id: 'contact', label: t('nav.contact') || 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 border-b border-[rgba(74,93,63,0.08)] ${scrolled || !isHome ? 'bg-[rgba(245,241,232,0.94)] backdrop-blur-md shadow-sm' : 'bg-[rgba(245,241,232,0.72)] backdrop-blur-md'}`} aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 soft-press" aria-label="Lilly Combest - Home">
            <div className="flex items-center gap-3">
              <BrandLogo width={42} height={42} className="h-10 w-10" />
              <div className="leading-tight">
                <span className="block font-semibold text-[rgb(var(--color-primary-dark))]">Lilly Combest</span>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[rgba(47,60,41,0.72)]">Wellness Coaching</span>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <Link key={item.id} href={item.href} data-active={isActive(item.href)} className={`nav-link text-sm font-medium transition-colors ${isActive(item.href) ? 'text-[rgb(var(--color-primary))]' : 'text-slate-700 hover:text-[rgb(var(--color-primary-dark))]'}`}>
                {item.label}
              </Link>
            ))}
            <button onClick={openBooking} className="soft-press ml-2 inline-block rounded-xl bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary-dark))] px-4 py-2 text-white shadow hover:-translate-y-0.5 hover:shadow-md">{t('nav.book') || 'Request Date'}</button>
            {/* Language switcher */}
            <div className="ml-4">
              <LanguageToggle />
            </div>
          </div>

          <button
            className="soft-press md:hidden p-2 rounded-md text-slate-700 hover:bg-white/70"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t bg-[rgba(245,241,232,0.98)] shadow-lg backdrop-blur">
          <div className="container mx-auto flex max-h-[calc(100vh-4rem)] flex-col gap-2 overflow-y-auto px-4 py-4">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                data-active={isActive(item.href)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${isActive(item.href) ? 'bg-[rgba(var(--color-primary-light),0.7)] text-[rgb(var(--color-primary-dark))]' : 'text-slate-800 hover:bg-[rgba(var(--color-primary-light),0.45)]'}`}
              >
                {item.label}
              </Link>
            ))}
            <button onClick={() => { openBooking(); setIsOpen(false) }} className="btn-primary mt-2 w-full py-3 text-center">{t('nav.book') || 'Request Date'}</button>
            <div className="rounded-2xl bg-white/70 p-2">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
