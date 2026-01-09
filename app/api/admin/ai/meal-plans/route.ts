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

CRITICAL: Return ONLY valid JSON. Use double quotes for all strings. Escape any quotes inside strings with backslash.

Format the response as JSON with this EXACT structure:
{
  "title": "Meal Plan for ${clientName}",
  "duration": "${duration} days",
  "calories": "${calorieTarget}",
  "meals": [
    "Day 1 Breakfast: Oatmeal with berries (350 cal)",
    "Day 1 Lunch: Grilled chicken salad (450 cal)",
    "Day 1 Dinner: Salmon with vegetables (600 cal)"
  ],
  "shoppingList": [
    "Oats",
    "Fresh berries",
    "Chicken breast"
  ],
  "notes": "Meal prep tips and nutrition advice"
}

Return ONLY the JSON object, no markdown formatting, no code blocks, no other text.`
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
    console.log("Calling Gemini API with gemini-2.0-flash...")

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
      console.log("Extracted text from candidates format")
    } else if (result.contents && result.contents[0] && result.contents[0].parts && result.contents[0].parts[0]) {
      generatedText = result.contents[0].parts[0].text
      console.log("Extracted text from contents format")
    } else {
      if (result.error) {
        console.error("Gemini API error response:", result.error)
        throw new Error(`Gemini API error: ${result.error.message}`)
      }
      console.error("Invalid response structure:", JSON.stringify(result).substring(0, 300))
      throw new Error(`Invalid response structure: ${JSON.stringify(result).substring(0, 200)}`)
    }

    console.log("Generated text preview:", generatedText?.substring(0, 200))

    // Clean markdown formatting and common issues
    let cleanedText = generatedText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/\n/g, ' ')  // Replace newlines that might break JSON
      .trim()
    
    if (!cleanedText.startsWith('{')) {
      console.error("Response does not start with JSON:", cleanedText.substring(0, 200))
      throw new Error("API returned non-JSON response. Response: " + (cleanedText.substring(0, 200) || "null"))
    }

    let plan
    try {
      console.log("Cleaned text for parsing:", cleanedText.substring(0, 300))
      plan = JSON.parse(cleanedText)
      console.log("Successfully parsed meal plan JSON")
    } catch (parseError: any) {
      console.error("JSON parse error:", parseError.message)
      console.error("Full cleaned text:", cleanedText)
      throw new Error("Failed to parse API response as JSON: " + parseError.message + ". The AI generated invalid JSON format.")
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
