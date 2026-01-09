import { Resend } from 'resend'

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

    // Send email via Resend
    const data = await resend.emails.send({
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

    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (error: any) {
    console.error('Resend error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Failed to send email' }), { status: 500 })
  }
}
