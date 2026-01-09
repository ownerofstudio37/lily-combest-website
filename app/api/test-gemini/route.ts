import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY

  console.log("Test endpoint called")
  console.log("API key exists:", !!GEMINI_API_KEY)
  console.log("API key first 10 chars:", GEMINI_API_KEY?.substring(0, 10) + "***")

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 })
  }

  try {
    console.log("Making test request to Gemini API...")
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

    console.log("Response status:", response.status)
    const result = await response.json()
    console.log("Response structure:", JSON.stringify(result, null, 2))

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
