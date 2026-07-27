export function generateLocalBusinessSchema(){
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Lilly Combest',
    'description': 'Health & wellness coaching in Pinehurst, TX — one-on-one coaching, nutrition planning, and workshops.',
    'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://lillycombest.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Pinehurst',
      'addressRegion': 'TX',
      'addressCountry': 'US'
    },
    'areaServed': ['Pinehurst, TX', 'The Woodlands, TX', 'Magnolia, TX', 'Tomball, TX', 'Spring, TX', 'Conroe, TX', 'North Houston, TX', 'Greater Houston, TX']
  }

  return schema
}
