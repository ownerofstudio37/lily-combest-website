import ServiceDetailPage from '@/app/components/ServiceDetailPage'

export default function VirtualWorkshops() {
  return (
    <ServiceDetailPage
      eyebrow="Groups & teams"
      title="Virtual Wellness Workshops"
      subtitle="Interactive wellness workshops for teams, offices, schools, and community groups that need practical takeaways people can use immediately."
      heroImage="https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1600"
      gallery={[
        'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
        'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
      ]}
      sections={[
        { title: 'Workshop Topics', items: ['Meal prep for busy weeks', 'Sleep optimization and evening routines', 'Stress management and resilience tools', 'Building sustainable habits', 'Simple nutrition basics for better energy'] },
        { title: 'What You Get', items: ['Custom content tailored to your group', 'Interactive presentation with Q&A', 'Actionable takeaways participants can use immediately', 'Digital handouts and resources', 'Virtual delivery through your preferred platform'] },
      ]}
      bestFor={['Corporate wellness programs', 'Community groups and schools', 'Teams wanting practical health education', 'Organizations that need approachable wellness content']}
      ctaTitle="Interested in a workshop?"
      ctaText="Request a consultation and Lilly will help shape a topic around your group’s needs."
      faqs={[
        { question: 'Can workshops be customized for a local organization?', answer: 'Yes. Lilly can tailor topics for teams, schools, community groups, and offices in Pinehurst, The Woodlands, North Houston, and virtual settings.' },
        { question: 'What topics work best for a group?', answer: 'Popular workshop topics include meal prep, stress management, sleep routines, habit building, energy, and realistic wellness for busy schedules.' },
        { question: 'Are workshops medical training?', answer: 'No. Workshops provide wellness education and practical habit support. They are not emergency, diagnostic, or medical treatment.' },
      ]}
    />
  )
}
