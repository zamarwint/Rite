import { createClient } from "@/lib/client";

export async function getFolders(workspaceId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createFolder(input: {
  workspaceId: string;
  name: string;
  parentFolderId?: string | null;
  iconColor?: string;
}) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("folders")
    .insert({
      user_id: userData.user.id,
      workspace_id: input.workspaceId,
      name: input.name,
      parent_folder_id: input.parentFolderId ?? null,
      icon_color: input.iconColor,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function renameFolder(id: string, name: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("folders")
    .update({ name })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteFolder(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("folders")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}
