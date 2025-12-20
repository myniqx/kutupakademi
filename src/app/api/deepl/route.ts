import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const apiKey = process.env.DEEPL_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'DeepL API key not configured' },
      { status: 500 }
    )
  }

  try {
    const { text, sourceLang, targetLang } = await request.json()

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'text, sourceLang, and targetLang are required' },
        { status: 400 }
      )
    }

    // DeepL API endpoint (use api-free.deepl.com for free API keys)
    const deeplUrl = apiKey.endsWith(':fx')
      ? 'https://api-free.deepl.com/v2/translate'
      : 'https://api.deepl.com/v2/translate'

    const response = await fetch(deeplUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: sourceLang.toUpperCase(),
        target_lang: targetLang.toUpperCase(),
        preserve_formatting: true,
        tag_handling: 'html', // Helps preserve markdown
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepL API error:', errorText)
      return NextResponse.json(
        { error: `DeepL API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      translatedText: data.translations[0].text,
      detectedSourceLang: data.translations[0].detected_source_language,
    })
  } catch (error) {
    console.error('DeepL translation error:', error)
    return NextResponse.json(
      { error: 'Failed to translate with DeepL' },
      { status: 500 }
    )
  }
}
