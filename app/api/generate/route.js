import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const systemPrompt = `You are a flashcard creator. Take the provided text and create exactly 10 flashcards from it.
Both front and back should be one sentence long.
Return ONLY a valid JSON object in this exact format (no additional text):
{
  "flashcards": [
    {
      "front": "Question or term",
      "back": "Answer or definition"
    }
  ]
}`

export async function POST(req) {
  try {
    const data = await req.text()

    // Validate input
    if (!data || data.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide text to generate flashcards' },
        { status: 400 }
      )
    }

    if (data.length > 5000) {
      return NextResponse.json(
        { error: 'Text is too long. Please limit to 5000 characters.' },
        { status: 400 }
      )
    }

    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `${systemPrompt}\n\nText to create flashcards from:\n${data}\n\nJSON response:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text().trim()

    // Extract JSON from response (may be wrapped in markdown)
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/g, '')
    }

    // Sometimes the model adds extra text, try to extract just the JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      text = jsonMatch[0]
    }

    // Parse the JSON response
    const flashcards = JSON.parse(text)

    // Validate response structure
    if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
      throw new Error('Invalid response format from AI')
    }

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  } catch (error) {
    console.error('Error generating flashcards:', error)

    // Handle specific errors
    if (error.message?.includes('API') || error.message?.includes('key')) {
      return NextResponse.json(
        { error: 'API error. Please check your Gemini API configuration.' },
        { status: 500 }
      )
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to generate flashcards. Please try again.' },
      { status: 500 }
    )
  }
}
