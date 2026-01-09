"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface BookingContextType {
  isOpen: boolean
  openBooking: () => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <BookingContext.Provider value={{ isOpen, openBooking: () => setIsOpen(true), closeBooking: () => setIsOpen(false) }}>
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
  const { isOpen, closeBooking } = useBooking()
  const CAL_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

  if (!isOpen || !CAL_URL) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold">Schedule a consultation</div>
          <button onClick={closeBooking} aria-label="Close" className="px-3 py-1">✕</button>
        </div>
        <div style={{height: '72vh'}}>
          <iframe src={CAL_URL} title="Calendly" width="100%" height="100%" frameBorder={0} allowFullScreen />
        </div>
      </div>
    </div>
  )
}

export default function Booking(){
  const { openBooking } = useBooking()
  const CAL_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

  if (!CAL_URL) {
    return (
      <a href={`mailto:lilly@lillycombest.com`} className="inline-block bg-[rgb(var(--color-primary))] text-white px-5 py-2 rounded-md">Book a free consult</a>
    )
  }

  return (
    <button onClick={openBooking} className="inline-block bg-[rgb(var(--color-primary))] text-white px-5 py-2 rounded-md">Book a free consult</button>
      )}
    </>
  )
}
