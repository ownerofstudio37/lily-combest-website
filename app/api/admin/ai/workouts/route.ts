import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

const generateWorkoutPlanPrompt = (data: any) => {
  const { clientName, fitnessLevel, goals } = data

  return `Create a detailed, personalized workout plan for a fitness coaching client:

CLIENT: ${clientName}
FITNESS LEVEL: ${fitnessLevel}
FITNESS GOALS: ${goals}

Design a comprehensive workout plan that includes:
1. Assessment of their current fitness level and goals
2. Weekly workout schedule (6-week plan)
3. Specific exercises for each day with sets and reps
4. Warm-up and cool-down routines
5. Form tips and modifications for each exercise
6. Rest and recovery guidelines
7. Nutrition support for their fitness goals
8. Progress tracking metrics
9. Motivation and accountability strategies
10. How to scale the program as they progress

Format as JSON:
{
  "title": "Personalized Workout Plan for ${clientName}",
  "level": "${fitnessLevel}",
  "assessment": "Fitness assessment...",
  "weeklySchedule": ["Monday: ...", "Tuesday: ..."],
  "exercises": ["Exercise 1: sets x reps, form tips", "Exercise 2: ..."],
  "warmUp": "Warm-up routine...",
  "coolDown": "Cool-down routine...",
  "nutrition": "Nutrition guidance for fitness goals...",
  "recovery": "Rest and recovery guidelines...",
  "tracking": "How to track progress...",
  "motivation": "Motivation and accountability structure...",
  "progression": "How to progress over time...",
  "notes": "Additional workout tips..."
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
                text: generateWorkoutPlanPrompt(data),
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
    const generatedText = result.contents[0].parts[0].text
    const plan = JSON.parse(generatedText)

    return NextResponse.json({ success: true, plan })
  } catch (error: any) {
    console.error("Workout plan generation error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate workout plan" },
      { status: 500 }
    )
  }
}
