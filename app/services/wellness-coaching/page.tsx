import ServiceDetailPage from '@/app/components/ServiceDetailPage'

export default function WellnessCoaching() {
  return (
    <ServiceDetailPage
      eyebrow="One-on-one coaching"
      title="Personalized Wellness Coaching"
      subtitle="A calm, practical coaching experience for building better energy, steadier routines, and sustainable healthy habits."
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg"
      gallery={[
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
        'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
      ]}
      sections={[
        { title: 'What You Get', items: ['Customized wellness plan tailored to your lifestyle and goals', 'Weekly accountability calls to keep momentum clear', 'Ongoing adjustments as your schedule, stress, and needs change', 'Evidence-informed strategies for lasting behavior change', 'Resources, templates, and simple tools you can actually use'] },
        { title: 'How It Works', body: 'Start with a free consultation, then Lilly builds a plan around your real life. Check-ins focus on what worked, what felt hard, and what to adjust next.' },
      ]}
      bestFor={['Busy professionals and parents', 'Clients tired of extreme plans', 'People who want accountability without judgment', 'Anyone rebuilding energy, sleep, nutrition, or consistency']}
      ctaTitle="Ready to start your wellness journey?"
      ctaText="Request a free consultation and Lilly will help you decide whether coaching is the right next step."
      faqs={[
        { question: 'Do you offer wellness coaching near Pinehurst and The Woodlands?', answer: 'Yes. Lilly serves Pinehurst, The Woodlands, Tomball, Magnolia, Spring, Conroe, North Houston, and virtual clients across Texas.' },
        { question: 'Is wellness coaching a medical service?', answer: 'No. Wellness coaching supports healthy routines, nutrition habits, movement, sleep, and accountability. It does not diagnose, treat, or replace care from a licensed medical provider.' },
        { question: 'What happens during the first consultation?', answer: 'You will talk through your goals, current routine, stress points, schedule, and what kind of support would feel realistic before choosing a plan.' },
      ]}
    />
  )
}
