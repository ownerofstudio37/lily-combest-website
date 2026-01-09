import { NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail, plan } = await request.json()

    if (!clientName || !clientEmail || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Format meals list
    const mealsHTML = plan.meals.map((meal: string) => `<li style="margin: 8px 0;">${meal}</li>`).join('')
    
    // Format shopping list
    const shoppingHTML = plan.shoppingList.map((item: string) => `<li style="margin: 4px 0;">☐ ${item}</li>`).join('')

    await resend.emails.send({
      from: 'Lilly Combest Wellness <hello@hello.lillycombest.com>',
      to: clientEmail,
      subject: `Your Personalized Meal Plan - ${plan.title}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { color: #e91e8c; }
              h2 { color: #333; margin-top: 24px; }
              .info { background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0; }
              .notes { background: #e3f2fd; padding: 16px; border-radius: 8px; border-left: 4px solid #2196f3; }
              ul { padding-left: 24px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${plan.title}</h1>
              <p>Hi ${clientName},</p>
              <p>I've created a personalized meal plan just for you! Here's what I've prepared:</p>
              
              <div class="info">
                <strong>Duration:</strong> ${plan.duration}<br>
                <strong>Daily Calorie Target:</strong> ${plan.calories}
              </div>

              <h2>🍽️ Your Meals</h2>
              <ul>${mealsHTML}</ul>

              <h2>🛒 Shopping List</h2>
              <ul style="list-style: none; padding-left: 0;">${shoppingHTML}</ul>

              <div class="notes">
                <h2 style="margin-top: 0;">📝 Important Notes</h2>
                <p>${plan.notes}</p>
              </div>

              <p style="margin-top: 32px;">If you have any questions or need adjustments to your meal plan, please don't hesitate to reach out!</p>

              <p>Warm regards,<br>
              Lilly Combest<br>
              Wellness Consultant</p>

              <p style="font-size: 12px; color: #666; margin-top: 24px;">
                📧 <a href="mailto:lilly@lillycombest.com">lilly@lillycombest.com</a><br>
                🌐 <a href="https://lillycombest.com">lillycombest.com</a>
              </p>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Send meal plan error:', error)
    return NextResponse.json({ error: error.message || 'Failed to send meal plan' }, { status: 500 })
  }
}
