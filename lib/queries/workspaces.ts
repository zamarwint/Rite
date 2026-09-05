import { createClient } from '@/lib/supabase/client'

export async function getWorkspaces() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createWorkspace(name: string) {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('workspaces')
    .insert({ user_id: userData.user.id, name })
    .select()
    .single()

  if (error) throw error
  return data
}
