import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const generateWellnessPlanPrompt = (data: any) => {
  const { clientName, goals, challenges } = data

  return `Create a comprehensive, personalized wellness plan for a client. Generate practical, actionable strategies:

CLIENT: ${clientName}
HEALTH GOALS: ${goals}
CHALLENGES/OBSTACLES: ${challenges}

Design a wellness plan that includes:
1. Assessment summary of their current situation
2. 5-7 specific, measurable wellness goals
3. Daily habits and routines to implement
4. Nutrition guidance aligned with their goals
5. Sleep optimization strategies
6. Stress management techniques
7. Exercise recommendations
8. Progress tracking methods
9. Weekly accountability structure
10. 30-day action plan with milestones

Format as JSON:
{
  "title": "Personalized Wellness Plan for ${clientName}",
  "goals": ["Goal 1", "Goal 2"],
  "dailyHabits": ["Habit 1", "Habit 2"],
  "nutrition": "Nutrition guidance...",
  "sleep": "Sleep strategy...",
  "stress": "Stress management...",
  "exercise": "Exercise plan...",
  "tracking": "How to track progress...",
  "weeklyAccountability": "Weekly check-in structure...",
  "actionPlan": "30-day action plan with milestones...",
  "notes": "Additional wellness tips..."
}

Return ONLY valid JSON, no other text.`
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
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
                text: generateWellnessPlanPrompt(data),
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Gemini API error: ${error}`)
    }

    const result = await response.json()
    
    // Handle both old (contents) and new (candidates) response formats
    let generatedText = null
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
      generatedText = result.candidates[0].content.parts[0].text
    } else if (result.contents && result.contents[0] && result.contents[0].parts && result.contents[0].parts[0]) {
      generatedText = result.contents[0].parts[0].text
    } else {
      if (result.error) throw new Error(`Gemini API error: ${result.error.message}`)
      throw new Error(`Invalid response structure: ${JSON.stringify(result)}`)
    }

    if (!generatedText.trim().startsWith('{')) {
      throw new Error("API returned non-JSON response")
    }

    let plan
    try {
      let cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      cleanedText = cleanedText.replace(/\n/g, ' ')
      plan = JSON.parse(cleanedText)
    } catch (parseError: any) {
      throw new Error("Failed to parse API response as JSON: " + parseError.message)
    }

    return NextResponse.json({ success: true, plan })
  } catch (error: any) {
    console.error("Wellness plan generation error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate wellness plan" },
      { status: 500 }
    )
  }
}
