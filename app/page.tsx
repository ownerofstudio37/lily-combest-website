import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import { CheckCircle, Heart, Clock, Target, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Services />

      {/* Why Choose Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-yellow-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Me?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">I understand what it's like to feel overwhelmed. My approach is practical, sustainable, and built around your real life — not perfection.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heart className="text-pink-500 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Personalized Approach</h3>
              <p className="text-gray-600">No cookie-cutter plans. Every client gets a custom wellness strategy designed specifically for their lifestyle, goals, and challenges.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="text-pink-500 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Results-Focused</h3>
              <p className="text-gray-600">We focus on sustainable habits that create lasting change — not quick fixes that fade away in a few weeks.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="text-pink-500 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
              <p className="text-gray-600">Get regular check-ins, accountability, and adjustments as your life changes. You're never doing this alone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Getting started is simple. Here's what to expect when you work with me.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Book a Free Consult</h3>
              <p className="text-sm text-gray-600">We'll talk about your goals, challenges, and what you're looking for in a wellness coach.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Create Your Plan</h3>
              <p className="text-sm text-gray-600">Together, we'll build a personalized wellness roadmap tailored to your unique needs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Take Action</h3>
              <p className="text-sm text-gray-600">Start implementing changes with ongoing guidance, support, and accountability.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-semibold mb-2">See Results</h3>
              <p className="text-sm text-gray-600">Track progress, celebrate wins, and adjust as needed to keep moving toward your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Get</h2>
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
              'Adjustments as your needs change'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-gray-700">See what people are saying about working with me.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} className="text-yellow-400 fill-yellow-400" size={20} />)}
              </div>
              <p className="text-gray-700 mb-4">"Lilly helped me completely transform my relationship with food and exercise. I've lost 30 pounds and feel better than I have in years!"</p>
              <p className="font-semibold">— Sarah M.</p>
              <p className="text-sm text-gray-500">Pinehurst, TX</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} className="text-yellow-400 fill-yellow-400" size={20} />)}
              </div>
              <p className="text-gray-700 mb-4">"As a busy mom, I thought I'd never have time for myself. Lilly showed me how to prioritize my health without sacrificing family time."</p>
              <p className="font-semibold">— Jennifer L.</p>
              <p className="text-sm text-gray-500">The Woodlands, TX</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} className="text-yellow-400 fill-yellow-400" size={20} />)}
              </div>
              <p className="text-gray-700 mb-4">"Working with Lilly has been life-changing. My energy is up, my stress is down, and I finally feel like I'm in control of my health."</p>
              <p className="font-semibold">— Michael T.</p>
              <p className="text-sm text-gray-500">Houston, TX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Serving Pinehurst, The Woodlands & Greater Houston</h2>
          <p className="text-gray-700 mb-6">I provide personalized wellness coaching to clients throughout the 77362 area and beyond. Whether you prefer in-person sessions or virtual coaching, I'm here to support your health journey.</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Pinehurst', 'The Woodlands', 'Tomball', 'Magnolia', 'Spring', 'Conroe', 'Houston'].map(city => (
              <span key={city} className="bg-white px-4 py-2 rounded-full shadow-sm">{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-gray-700 mb-8">Schedule a free introductory consult with me to talk about your wellness goals and how I can help you reach them. No pressure, no sales pitch — just an honest conversation about your health.</p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:shadow-xl transition">Book Your Free Consult</a>
          <p className="text-sm text-gray-500 mt-4">📍 Proudly serving Pinehurst, TX 77362 and surrounding areas</p>
        </div>
      </section>
    </div>
  )
}
