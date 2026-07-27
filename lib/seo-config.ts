export function generateLocalBusinessSchema(){
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Lilly Combest',
    'description': 'Personalized wellness coaching in Pinehurst, TX for nutrition, movement, sleep, stress support, and sustainable healthy habits.',
    'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://lillycombest.com',
    'email': 'lilly@lillycombest.com',
    'priceRange': '$$',
    'knowsAbout': ['Wellness coaching', 'Nutrition habits', 'Meal planning', 'Sleep routines', 'Stress support', 'Movement accountability'],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Pinehurst',
      'addressRegion': 'TX',
      'addressCountry': 'US'
    },
    'areaServed': ['Pinehurst, TX', 'The Woodlands, TX', 'Magnolia, TX', 'Tomball, TX', 'Spring, TX', 'Conroe, TX', 'North Houston, TX', 'Greater Houston, TX'],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Wellness coaching services',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'One-on-one Wellness Coaching' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Nutrition & Meal Planning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Workout & Motivation Coaching' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Virtual Wellness Workshops' } }
      ]
    }
  }

  return schema
}
