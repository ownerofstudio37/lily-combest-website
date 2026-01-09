import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

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
      reply_to: email,
      subject: `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Send confirmation email to submitter
    await resend.emails.send({
      from: 'Lilly Combest Wellness <hello@hello.lillycombest.com>',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Thank you for contacting me, ${name}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to explore my <a href="https://lillycombest.com/blog">blog</a> for wellness tips and insights.</p>
        <br>
        <p><strong>Your message:</strong></p>
        <p style="padding: 12px; background: #f5f5f5; border-left: 3px solid #e91e8c; margin: 16px 0;">${message.replace(/\n/g, '<br>')}</p>
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
