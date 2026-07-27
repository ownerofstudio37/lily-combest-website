import ServiceDetailPage from '@/app/components/ServiceDetailPage'

export default function NutritionMealPlanning() {
  return (
    <ServiceDetailPage
      eyebrow="Nutrition support"
      title="Nutrition & Meal Planning"
      subtitle="Evidence-based nutrition strategy without the complexity: realistic meals, smart prep, and flexible routines that fit your life."
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg"
      gallery={[
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/6693654/pexels-photo-6693654.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
      ]}
      sections={[
        { title: 'What You Get', items: ['Personalized meal plan for your schedule, preferences, and goals', 'Weekly accountability calls to review progress', 'Simple meal prep strategies for busy weeks', 'Grocery lists and recipe ideas', 'Balanced nutrition education without restrictive dieting'] },
        { title: 'What Makes It Different', body: 'The goal is not a perfect meal plan. The goal is a repeatable food rhythm you can keep using when life gets full.' },
      ]}
      bestFor={['People who want to eat better but feel stuck', 'Busy families and professionals', 'Clients wanting more steady energy', 'Anyone who dislikes restrictive dieting']}
      ctaTitle="Ready to simplify nutrition?"
      ctaText="Request a free consultation and Lilly will help map the first practical step."
      faqs={[
        { question: 'Are meal plans customized?', answer: 'Yes. Meal planning is built around your preferences, schedule, goals, cooking comfort, and family needs so it feels usable during a normal week.' },
        { question: 'Do I have to follow a strict diet?', answer: 'No. The focus is sustainable structure, balanced meals, and practical choices, not restrictive dieting or all-or-nothing food rules.' },
        { question: 'Can nutrition coaching be virtual?', answer: 'Yes. Lilly works with local clients around Pinehurst and The Woodlands as well as virtual clients who want realistic nutrition support.' },
      ]}
    />
  )
}
