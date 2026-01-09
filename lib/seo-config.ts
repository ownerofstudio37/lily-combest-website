export function generateLocalBusinessSchema(){
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Lilly Combest',
    'description': 'Health & wellness coaching in Pinehurst, TX — one-on-one coaching, nutrition planning, and workshops.',
    'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://lilycombest.com',
    'telephone': '',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Pinehurst',
      'addressRegion': 'NC',
      'addressCountry': 'US'
    },
    'areaServed': 'Pinehurst, TX',
    'sameAs': []
  }
}
