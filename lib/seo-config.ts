export function generateLocalBusinessSchema(){
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Lilly Combest',
    'description': 'Health & wellness coaching in Pinehurst, TX — one-on-one coaching, nutrition planning, and workshops.',
    'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://lilycombest.com',
    'telephone': '',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Pinehurst',
      'addressRegion': 'TX',
      'addressCountry': 'US'
    },
    'areaServed': ['Pinehurst, TX', 'The Woodlands, TX', 'Spring, TX', 'Houston, TX'],
    'sameAs': []
  }
}
