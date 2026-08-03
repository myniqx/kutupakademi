import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SITE_CONFIG } from '@/constants/site'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean)
  const dashboardIndex = pathSegments.indexOf('dashboard')
  const isProtectedDashboardPath =
    dashboardIndex !== -1 && dashboardIndex < pathSegments.length - 1
  const configuredAdminEmails = process.env.ADMIN_EMAILS
    ?.split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
  const allowedAdminEmails = configuredAdminEmails?.length
    ? configuredAdminEmails
    : [SITE_CONFIG.contact.email.toLowerCase()]
  const isAdmin = Boolean(user?.email && allowedAdminEmails.includes(user.email.toLowerCase()))

  if (
    !isAdmin &&
    isProtectedDashboardPath
  ) {
    const url = request.nextUrl.clone()
    url.pathname = pathSegments[0] === 'en' ? '/en/dashboard' : '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
