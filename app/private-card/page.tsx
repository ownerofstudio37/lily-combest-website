import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'
import DigitalCard from './DigitalCard'

export const metadata: Metadata = {
  title: 'Private Card',
  description: 'Private digital business card for Lilly Combest.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function PrivateCardPage() {
  const cardUrl = `${siteConfig.url.replace(/\/$/, '')}/private-card`

  return <DigitalCard cardUrl={cardUrl} />
}
