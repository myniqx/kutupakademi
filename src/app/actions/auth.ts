'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedUser, isAllowedAdminEmail } from '@/lib/auth/user'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAllowedAdminEmail(user.email)) {
    await supabase.auth.signOut()
    return { error: 'Bu hesap yönetim paneline yetkili değil.' }
  }

  revalidatePath('/dashboard', 'page')
  return { success: true }
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'page')
  return { success: true }
}

export async function getUser() {
  return getAuthenticatedUser()
}
