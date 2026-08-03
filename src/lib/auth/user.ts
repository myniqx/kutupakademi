import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { SITE_CONFIG } from '@/constants/site'

export function isAllowedAdminEmail(email: string | undefined): boolean {
  if (!email) return false

  const configuredEmails = process.env.ADMIN_EMAILS
    ?.split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)

  const allowedEmails = configuredEmails?.length
    ? configuredEmails
    : [SITE_CONFIG.contact.email.toLowerCase()]

  return allowedEmails.includes(email.toLowerCase())
}

export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user && isAllowedAdminEmail(user.email) ? user : null
}
