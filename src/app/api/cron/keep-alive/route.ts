import { NextRequest, NextResponse } from 'next/server'
import { getBlogs } from '@/app/actions/blog'

export async function GET(request: NextRequest) {
  try {
    // Verify request is from Vercel Cron
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.error('[Keep-Alive Cron] Unauthorized access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Execute database query to keep Supabase active
    const startTime = Date.now()
    const blogs = await getBlogs()
    const duration = Date.now() - startTime

    console.log('[Keep-Alive Cron] Successfully executed', {
      timestamp: new Date().toISOString(),
      blogsCount: blogs.length,
      duration: `${duration}ms`,
    })

    return NextResponse.json({
      success: true,
      message: 'Database keep-alive query executed',
      timestamp: new Date().toISOString(),
      blogsCount: blogs.length,
      duration: `${duration}ms`,
    })
  } catch (error) {
    console.error('[Keep-Alive Cron] Failed to execute', {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
