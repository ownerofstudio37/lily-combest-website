import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'
import DigitalCard from './DigitalCard'

export const metadata: Metadata = {
  title: 'Digital Card',
  description: 'Digital business card for Lilly Combest.',
}

export default function PrivateCardPage() {
  const cardUrl = `${siteConfig.url.replace(/\/$/, '')}/private-card`

  return <DigitalCard cardUrl={cardUrl} />
}
