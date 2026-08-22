'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'

export async function getClaimsData() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()
    if (error || !data?.claims) {
        redirect('/auth/login')
    }
    return data
}

// Non-redirecting version — returns null if the user is not authenticated.
// Safe to use on public pages (e.g. the landing page header).
export async function tryGetClaimsData() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()
    if (error || !data?.claims) {
        return null
    }
    return data
}

export async function isSignedIn() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session) {
        return false
    }

    return true
}