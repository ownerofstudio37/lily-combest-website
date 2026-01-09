import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const generateSEOPrompt = (data: any) => {
  const { topic, keyword, tone, wordCount, targetAudience, seoTargets } = data

  return `You are an expert SEO-optimized blog writer for a wellness consultant. Create a high-quality blog post with the following requirements:

TOPIC: ${topic}
PRIMARY KEYWORD: ${keyword}
TARGET ZIP CODE: ${seoTargets.zipCode}
SERVICE RADIUS: ${seoTargets.radius}
CITIES SERVED: ${seoTargets.cities.join(", ")}
TARGET AUDIENCE: ${targetAudience}
TONE: ${tone}
WORD COUNT: ${wordCount} words

REQUIREMENTS:
1. Include the primary keyword naturally 3-5 times throughout the post
2. Use secondary keywords: ${seoTargets.keywords.slice(0, 3).join(", ")}
3. Include references to local areas served: ${seoTargets.cities.join(", ")}
4. Create an engaging, informative post that provides real value
5. Include practical, actionable tips
6. Structure with clear H2 and H3 headings
7. Start with a compelling hook
8. End with a call-to-action mentioning local consultation availability

Output ONLY valid JSON with this exact structure:
{
  "title": "SEO-optimized title with primary keyword",
  "excerpt": "2-3 sentence summary including primary keyword",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "metaDescription": "compelling meta description under 160 chars including primary keyword",
  "content": "<p>Full HTML content...</p>"
}

Do not include any markdown or code blocks. Return ONLY the JSON object.`
}

export async function POST(request: NextRequest) {
  try {
    console.log("Blog writer request received")
    
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not configured")
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add GEMINI_API_KEY to Netlify environment variables." },
        { status: 500 }
      )
    }

    console.log("API key found, parsing request data")
    const data = await request.json()
    console.log("Request data:", { topic: data.topic, keyword: data.keyword, tone: data.tone })

    const prompt = generateSEOPrompt(data)
    console.log("Calling Gemini API...")

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
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
                text: prompt,
              },
            ],
          },
        ],
      }),
    })

    console.log("Gemini response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error response:", { status: response.status, body: errorText })
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log("Gemini response received, parsing...")
    
    if (!result.contents || !result.contents[0] || !result.contents[0].parts || !result.contents[0].parts[0]) {
      console.error("Unexpected Gemini response structure:", JSON.stringify(result))
      throw new Error("Invalid response structure from Gemini API")
    }

    const generatedText = result.contents[0].parts[0].text
    console.log("Generated text received, parsing JSON...")

    // Parse the JSON response
    const content = JSON.parse(generatedText)
    console.log("Blog post generated successfully")

    return NextResponse.json({ success: true, content })
  } catch (error: any) {
    console.error("Blog generation error:", error.message || error)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { error: error.message || "Failed to generate blog post" },
      { status: 500 }
    )
  }
}
