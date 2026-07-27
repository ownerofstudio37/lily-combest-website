import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/adminAuth"

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 })
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Respond with only: {"test": true}',
                },
              ],
            },
          ],
        }),
      }
    )

    const result = await response.json()

    return NextResponse.json({
      status: response.status,
      response: result,
    })
  } catch (error: any) {
    console.error("Test error:", error.message)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
