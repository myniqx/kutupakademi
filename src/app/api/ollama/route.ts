import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    )
  }

  try {
    const { model, prompt } = await request.json()

    if (!model || !prompt) {
      return NextResponse.json(
        { error: 'Model and prompt are required' },
        { status: 400 }
      )
    }

    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        keep_alive: '30m', // Keep model in memory for 30 minutes
      }),
    })

    if (!ollamaResponse.ok) {
      const error = await ollamaResponse.text()
      return NextResponse.json(
        { error: `Ollama error: ${error}` },
        { status: 500 }
      )
    }

    const data = await ollamaResponse.json()

    return NextResponse.json({
      success: true,
      response: data.response,
    })
  } catch (error) {
    console.error('Ollama API error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to Ollama. Make sure it is running.' },
      { status: 500 }
    )
  }
}
