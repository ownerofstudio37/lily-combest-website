import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Lilly Combest',
  description: 'Privacy policy for Lilly Combest wellness coaching services.',
}

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>
              Lilly Combest ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and any other information you voluntarily provide through contact forms or booking systems.</li>
              <li><strong>Automatic Data:</strong> When you visit our website, we may automatically collect certain technical information such as your IP address, browser type, and pages visited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process your booking requests and manage consultations</li>
              <li>Send you marketing and promotional communications (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Generate analytics data about website usage</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and service providers.
            </p>
            <p>
              We may use third-party service providers to assist us in operating our website and conducting our business, including email services (Resend), booking services (Calendly), and hosting services (Netlify).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <p className="mt-4">
              <strong>Lilly Combest</strong><br />
              Email: <a href="mailto:lilly@lillycombest.com" className="text-[rgb(var(--color-primary))]">lilly@lillycombest.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Policy Updates</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Changes and clarifications will take effect immediately upon their posting to the website.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
