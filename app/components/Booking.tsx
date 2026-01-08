"use client"

import React from 'react'

export default function Booking(){
  const CAL_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''
  const [open, setOpen] = React.useState(false)

  if (!CAL_URL) {
    return (
      <a href={`mailto:lilly@lillycombest.com`} className="inline-block bg-[rgb(var(--color-primary))] text-white px-5 py-2 rounded-md">Book a free consult</a>
    )
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-block bg-[rgb(var(--color-primary))] text-white px-5 py-2 rounded-md">Book a free consult</button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="font-semibold">Schedule a consultation</div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="px-3 py-1">✕</button>
            </div>
            <div style={{height: '72vh'}}>
              <iframe src={CAL_URL} title="Calendly" width="100%" height="100%" frameBorder={0} allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
