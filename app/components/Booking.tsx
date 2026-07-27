"use client"

import React, { createContext, useContext, ReactNode } from 'react'

interface BookingContextType {
  openBooking: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const openBooking = () => {
    if (typeof window === 'undefined') return

    const formAnchor = document.getElementById('consultation-request')
    if (formAnchor) {
      formAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
      formAnchor.classList.remove('request-attention')
      window.setTimeout(() => formAnchor.classList.add('request-attention'), 80)
      window.setTimeout(() => formAnchor.classList.remove('request-attention'), 1200)
      window.history.replaceState(null, '', '#consultation-request')
      return
    }

    window.location.href = '/contact#consultation-request'
  }
  
  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used within BookingProvider')
  return context
}

export function BookingModal() {
  // Calendly modal removed. Consultations are now requested through the contact form.
  return null
}

export default function Booking(){
  const { openBooking } = useBooking()

  return (
    <button onClick={openBooking} className="btn-primary">Request a consultation date</button>
  )
}
