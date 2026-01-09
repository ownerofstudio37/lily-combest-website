import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const generateMealPlanPrompt = (data: any) => {
  const { clientName, dietaryRestrictions, mealPreference, duration, calorieTarget } = data

  return `Generate a detailed, personalized meal plan with the following requirements:

CLIENT: ${clientName}
DURATION: ${duration} days
CALORIE TARGET: ${calorieTarget} calories per day
MEAL PREFERENCE: ${mealPreference}
DIETARY RESTRICTIONS: ${dietaryRestrictions || "None"}

Create a comprehensive meal plan that:
1. Includes breakfast, lunch, dinner, and 1-2 snacks per day
2. Includes specific meal names with brief descriptions
3. Respects all dietary restrictions
4. Meets the calorie target
5. Provides a complete shopping list
6. Includes helpful nutrition tips

Format the response as JSON with this structure:
{
  "title": "Meal Plan for ${clientName}",
  "duration": "${duration} days",
  "calories": "${calorieTarget}",
  "meals": ["Day 1 Breakfast: ...", "Day 1 Lunch: ..."],
  "shoppingList": ["Item 1", "Item 2"],
  "notes": "Helpful tips and prep advice"
}

Return ONLY valid JSON, no other text.`
}

export async function POST(request: NextRequest) {
  try {
    console.log("Meal plan generation request received")
    
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not configured")
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add GEMINI_API_KEY to environment variables." },
        { status: 500 }
      )
    }

    console.log("API key found, parsing request data")
    const data = await request.json()
    console.log("Request data:", { clientName: data.clientName, duration: data.duration, calorieTarget: data.calorieTarget })

    const prompt = generateMealPlanPrompt(data)
    console.log("Calling Gemini API with gemini-1.5-flash...")

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
                text: prompt,
              },
            ],
          },
        ],
      }),
    })

    console.log("Gemini API response status:", response.status)
    const result = await response.json()
    console.log("Gemini API response:", JSON.stringify(result).substring(0, 500))

    // Handle both old (contents) and new (candidates) response formats
    let generatedText = null
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
      generatedText = result.candidates[0].content.parts[0].text
    } else if (result.contents && result.contents[0] && result.contents[0].parts && result.contents[0].parts[0]) {
      generatedText = result.contents[0].parts[0].text
    } else {
      if (result.error) {
        console.error("Gemini API error response:", result.error)
        throw new Error(`Gemini API error: ${result.error.message}`)
      }
      console.error("Invalid response structure:", result)
      throw new Error(`Invalid response structure: ${JSON.stringify(result)}`)
    }

    if (!generatedText.trim().startsWith('{')) {
      console.error("Response does not start with JSON:", generatedText.substring(0, 200))
      throw new Error("API returned non-JSON response. Response: " + generatedText.substring(0, 200))
    }

    let plan
    try {
      let cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      plan = JSON.parse(cleanedText)
    } catch (parseError: any) {
      console.error("JSON parse error:", parseError.message, "Text:", generatedText.substring(0, 300))
      throw new Error("Failed to parse API response as JSON: " + parseError.message)
    }

    console.log("Meal plan generated successfully")
    return NextResponse.json({ success: true, plan })
  } catch (error: any) {
    console.error("Meal plan generation error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate meal plan" },
      { status: 500 }
    )
  }
}
