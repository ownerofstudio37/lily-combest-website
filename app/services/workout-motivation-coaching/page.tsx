import ServiceDetailPage from '@/app/components/ServiceDetailPage'

export default function WorkoutMotivationCoaching() {
  return (
    <ServiceDetailPage
      eyebrow="Movement & accountability"
      title="Workout & Motivation Coaching"
      subtitle="Custom movement plans and weekly accountability for building consistency without pressure, burnout, or one-size-fits-all routines."
      heroImage="https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=1600"
      gallery={[
        'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
        'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ]}
      sections={[
        { title: 'What You Get', items: ['Personalized workout plan based on your current level', 'Weekly accountability calls to keep you moving', 'Exercise modifications for limitations or injuries', 'Guidance on progression and consistency', 'Flexible plans for home, gym, or minimal equipment'] },
        { title: 'How It Works', body: 'Lilly helps you choose the kind of movement you can repeat, then adjusts the plan as your confidence and capacity grow.' },
      ]}
      bestFor={['Anyone who struggles with consistency', 'Clients restarting after a long break', 'People who want flexible workout options', 'Those who need accountability more than intensity']}
      ctaTitle="Ready to get moving?"
      ctaText="Request a free call to talk through goals, barriers, and a plan that feels doable."
      faqs={[
        { question: 'Do I need a gym membership?', answer: 'No. Plans can be built for home, gym, walking, light equipment, or the resources you already have available.' },
        { question: 'Can the plan be adjusted for my current fitness level?', answer: 'Yes. Movement plans start with your current capacity and can be adjusted for schedule, confidence, limitations, and recovery needs.' },
        { question: 'Is this personal training?', answer: 'This is wellness and accountability coaching for movement consistency. It is not medical care or physical therapy, and injuries should be discussed with a licensed provider.' },
      ]}
    />
  )
}
