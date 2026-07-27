import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { NextRequest } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const limited = checkRateLimit(req, 'contact', { limit: 5, windowMs: 10 * 60 * 1000 })
  if (limited) return limited

  try {
    if (!process.env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service is not configured' }), { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.length > 120 || message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Invalid contact form values' }), { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Save to CRM database
    const { error: dbError } = await supabaseAdmin
      .from('contacts')
      .insert({
        name,
        email,
        message,
      })

    if (dbError) {
      console.error('Database error saving contact:', dbError)
      // Continue to send email even if DB save fails
    }

    // Send notification email to Lilly
    await resend.emails.send({
      from: 'hello@hello.lillycombest.com',
      to: 'lilly@lillycombest.com',
      replyTo: email,
      subject: `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    // Send confirmation email to submitter
    await resend.emails.send({
      from: 'Lilly Combest Wellness <hello@hello.lillycombest.com>',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Thank you for contacting me, ${safeName}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to explore my <a href="https://lillycombest.com/blog">blog</a> for wellness tips and insights.</p>
        <br>
        <p><strong>Your message:</strong></p>
        <p style="padding: 12px; background: #f5f5f5; border-left: 3px solid #e91e8c; margin: 16px 0;">${safeMessage}</p>
        <br>
        <p>Warm regards,<br>Lilly Combest<br>Wellness Consultant</p>
        <p style="font-size: 12px; color: #666;">📧 <a href="mailto:lilly@lillycombest.com">lilly@lillycombest.com</a><br>🌐 <a href="https://lillycombest.com">lillycombest.com</a></p>
      `,
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Failed to process contact form' }), { status: 500 })
  }
}
