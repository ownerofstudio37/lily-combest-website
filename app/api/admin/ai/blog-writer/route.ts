import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const generateSEOPrompt = (data: any) => {
  const { topic, keyword, tone, wordCount, targetAudience, seoTargets } = data

  return `You are an expert SEO-optimized blog writer for a wellness consultant. Create a high-quality blog post.

TOPIC: ${topic}
KEYWORD: ${keyword}
TARGET: ${seoTargets.zipCode} zip code, ${seoTargets.radius}
CITIES: ${seoTargets.cities.join(", ")}
AUDIENCE: ${targetAudience}
TONE: ${tone}
WORDS: ${wordCount}

Include: primary keyword 3-5 times, secondary keywords, local area references, H2/H3 headings, CTA.

RESPOND WITH ONLY VALID JSON - NO OTHER TEXT:
{
  "title": "Title with keyword",
  "excerpt": "2-3 sentence summary",
  "keywords": ["kw1", "kw2", "kw3"],
  "metaDescription": "SEO description under 160 chars",
  "content": "<p>HTML content here</p>"
}`
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
    console.log("Gemini response received, structure:", JSON.stringify(result, null, 2))
    
    // Handle both old (contents) and new (candidates) response formats
    let generatedText = null
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
      generatedText = result.candidates[0].content.parts[0].text
    } else if (result.contents && result.contents[0] && result.contents[0].parts && result.contents[0].parts[0]) {
      generatedText = result.contents[0].parts[0].text
    } else {
      console.error("Unexpected Gemini response structure. Full response:", JSON.stringify(result, null, 2))
      
      // Check if it's an error response
      if (result.error) {
        throw new Error(`Gemini API error: ${result.error.message || JSON.stringify(result.error)}`)
      }
      
      throw new Error(`Invalid response structure from Gemini API. Response: ${JSON.stringify(result)}`)
    }

    const generatedText = result.contents[0].parts[0].text
    console.log("Generated text received (length:", generatedText.length, "), parsing JSON...")
    
    // Validate that it looks like JSON before parsing
    if (!generatedText.trim().startsWith('{')) {
      console.error("Response is not JSON, content starts with:", generatedText.substring(0, 100))
      throw new Error("API returned non-JSON response. Response: " + generatedText.substring(0, 200))
    }

    // Parse the JSON response
    let content
    try {
      // Remove markdown code blocks if present
      let cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      content = JSON.parse(cleanedText)
    } catch (parseError: any) {
      console.error("JSON parse error:", parseError.message)
      console.error("Raw text:", generatedText.substring(0, 500))
      throw new Error("Failed to parse API response as JSON: " + parseError.message + ". Response: " + generatedText.substring(0, 200))
    }
    console.log("Blog post generated successfully")

    return NextResponse.json({ success: true, content })
