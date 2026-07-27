import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Image from 'next/image'
import { CheckCircle, Star } from 'lucide-react'

// Wave sits absolutely at bottom of its parent `relative` section.
// `fill` should match the NEXT section's background color.
function Wave({ fill, flip }: { fill: string; flip?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={`block w-full h-[72px]${flip ? ' scale-x-[-1]' : ''}`}
      >
        <path d="M0,36 C320,72 640,0 960,36 C1120,54 1300,20 1440,40 L1440,72 L0,72 Z" fill={fill} />
      </svg>
    </div>
  )
}

export default function HomePage() {
  const holisticGallery = [
    { src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg', title: 'Personalized Coaching', caption: 'Concierge wellness support designed around your real routine.' },
    { src: 'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Mindful Meditation', caption: 'Nervous-system tools to help you reset and recover.' },
    { src: 'https://images.pexels.com/photos/6693654/pexels-photo-6693654.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Smart Supplement Support', caption: 'Practical supplement guidance based on your goals.' },
    { src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg', title: 'Nourishing Meals', caption: 'Balanced nutrition that feels elevated and sustainable.' },
    { src: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Yoga & Movement', caption: 'Low-pressure movement that builds consistency.' },
    { src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg', title: 'Restorative Recovery', caption: 'Better sleep habits for stronger energy and focus.' },
  ]

  return (
    <main className="overflow-x-hidden">
      {/* Hero handles its own bottom wave → exits to cream */}
      <Hero />

      {/* ── CREAM: Services + Inspiration Gallery ─────────────────────────────── */}
      <section className="relative bg-[rgb(245,241,232)] pb-28">
        <Services />

        <div className="max-w-6xl mx-auto px-4 pt-2 pb-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[rgb(var(--color-ink))]">Holistic Lifestyle Inspiration</h2>
            <p className="mt-2 text-gray-600">A curated visual direction with healthy food, meditation, movement, supplements, and your featured images.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {holisticGallery.map((photo) => (
              <article key={photo.title} className="organic-card overflow-hidden hover:shadow-md transition">
                <div className="h-48 overflow-hidden">
                  <Image src={photo.src} alt={photo.title} width={700} height={500} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{photo.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{photo.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Wave out → dark green */}
        <Wave fill="rgb(47,60,41)" />
      </section>

      {/* ── DARK GREEN: Premium Approach ──────────────────────────────────────── */}
      <section className="relative bg-[rgb(47,60,41)] text-[rgb(244,232,237)] py-20 pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">A Premium, Real-Life Approach</h2>
            <p className="text-[rgba(244,232,237,0.85)] max-w-2xl mx-auto">No extremes. No all-or-nothing plans. Just proven wellness strategy tailored to your season of life.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Personalized Strategy', text: 'Your plan is custom-built around your schedule, goals, and stress load.' },
              { title: 'Sustainable Results', text: 'We build habits that work long-term, not short-term crash cycles.' },
              { title: 'Support + Accountability', text: 'Consistent guidance so you stay clear, consistent, and supported.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[rgba(244,232,237,0.1)] p-6 border border-[rgba(244,232,237,0.18)]">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[rgba(244,232,237,0.85)]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              'Best for clients who want practical habit support, not a rigid program.',
              'Helpful for busy parents, professionals, and clients restarting after burnout.',
              'Designed for Pinehurst, The Woodlands, North Houston, and virtual Texas clients.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[rgba(244,232,237,0.16)] bg-[rgba(244,232,237,0.08)] p-5 text-sm leading-6 text-[rgba(244,232,237,0.84)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Wave out → petal pink */}
        <Wave fill="rgb(244,232,237)" flip />
      </section>

      {/* ── PETAL PINK: How It Works ──────────────────────────────────────────── */}
      <section className="relative bg-[rgb(244,232,237)] py-20 pb-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[rgb(var(--color-ink))]">How It Works</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Getting started is simple. Here&apos;s what to expect when you work with me.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '1', title: 'Request a Free Consult', body: 'Send your preferred dates and goals, and Lilly will confirm the best consultation time.' },
              { n: '2', title: 'Create Your Plan', body: 'Together, we\'ll build a personalized wellness roadmap tailored to your unique needs.' },
              { n: '3', title: 'Take Action', body: 'Start implementing changes with ongoing guidance, support, and accountability.' },
              { n: '4', title: 'See Results', body: 'Track progress, celebrate wins, and adjust as needed to keep moving toward your goals.' },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary-dark))] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{step.n}</div>
                <h3 className="font-semibold mb-2 text-[rgb(var(--color-ink))]">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave out → mint green */}
        <Wave fill="rgb(220,232,199)" />
      </section>

      {/* ── MINT GREEN: What You'll Get ───────────────────────────────────────── */}
      <section className="relative bg-[rgb(220,232,199)] py-20 pb-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[rgb(var(--color-ink))]">What You&apos;ll Get</h2>
            <p className="text-gray-700">When you work with me, you get more than just advice — you get a partner in your wellness journey.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Customized meal plans that fit your lifestyle',
              'One-on-one coaching sessions',
              'Weekly accountability check-ins',
              'Stress management strategies',
              'Sleep optimization guidance',
              'Ongoing support via email',
              'Progress tracking tools',
              'Adjustments as your needs change',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 organic-card p-4">
                <CheckCircle className="text-[rgb(var(--color-primary))] flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave out → cream */}
        <Wave fill="rgb(245,241,232)" flip />
      </section>

      {/* ── CREAM: Testimonials ───────────────────────────────────────────────── */}
      <section className="relative bg-[rgb(245,241,232)] py-20 pb-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[rgb(var(--color-ink))]">Client Success Stories</h2>
            <p className="text-gray-700">See what people are saying about working with me.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: 'Lilly helped me completely transform my relationship with food and exercise. I\'ve lost 30 pounds and feel better than I have in years!', name: 'Sarah M.', city: 'Pinehurst, TX' },
              { quote: 'As a busy mom, I thought I\'d never have time for myself. Lilly showed me how to prioritize my health without sacrificing family time.', name: 'Jennifer L.', city: 'The Woodlands, TX' },
              { quote: 'Working with Lilly has been life-changing. My energy is up, my stress is down, and I finally feel like I\'m in control of my health.', name: 'Michael T.', city: 'Houston, TX' },
            ].map((r) => (
              <div key={r.name} className="organic-card p-6">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(n => <Star key={n} className="text-[rgb(var(--color-secondary-dark))] fill-[rgb(var(--color-secondary-dark))]" size={18} />)}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{r.quote}&rdquo;</p>
                <p className="font-semibold text-[rgb(var(--color-ink))]">— {r.name}</p>
                <p className="text-sm text-gray-500">{r.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave out → dark green */}
        <Wave fill="rgb(47,60,41)" />
      </section>

      {/* ── DARK GREEN: Local SEO + CTA ───────────────────────────────────────── */}
      <section className="bg-[rgb(47,60,41)] text-[rgb(244,232,237)] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Serving Pinehurst, The Woodlands & Greater Houston</h2>
          <p className="text-[rgba(244,232,237,0.85)] mb-8">Personalized wellness coaching throughout the 77362 area and beyond — in-person or virtual.</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Pinehurst', 'The Woodlands', 'Tomball', 'Magnolia', 'Spring', 'Conroe', 'North Houston', 'Greater Houston'].map(city => (
              <span key={city} className="px-4 py-2 rounded-full bg-[rgba(244,232,237,0.12)] border border-[rgba(244,232,237,0.2)] text-[rgb(244,232,237)]">{city}</span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-[rgba(244,232,237,0.72)]">Wellness coaching is educational and supportive. It does not diagnose, treat, or replace medical care.</p>
        </div>

        <div className="max-w-2xl mx-auto px-4 text-center border-t border-[rgba(244,232,237,0.15)] pt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-[rgba(244,232,237,0.85)] mb-8">Request a free introductory consult. No pressure, no sales pitch — just an honest conversation about your health.</p>
          <a href="/contact#consultation-request" className="inline-block bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-primary-dark))] font-bold px-8 py-4 rounded-full text-base hover:brightness-105 transition">Request Your Free Consult</a>
          <p className="text-sm text-[rgba(244,232,237,0.65)] mt-5">📍 Proudly serving Pinehurst, TX 77362 and surrounding areas</p>
        </div>
      </section>
    </main>
  )
}
