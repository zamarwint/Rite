import { createClient } from "@/lib/client";
import type { Database, Priority } from "@/types/types";

type Task = Database["public"]["Tables"]["tasks"]["Row"];

// Pass folderId = null explicitly to fetch the "Unfiled" bucket;
// omit it to fetch every active task regardless of folder.
export async function getTasks(folderId?: string | null) {
  const supabase = createClient();
  let query = supabase
    .from("tasks")
    .select("*")
    .is("deleted_at", null)
    .order("position", { ascending: true });

  if (folderId !== undefined) {
    query =
      folderId === null
        ? query.is("folder_id", null)
        : query.eq("folder_id", folderId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTask(input: {
  text: string;
  folderId?: string | null;
  priority?: Priority | null;
  dueDate?: string | null;
}) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userData.user.id,
      text: input.text,
      folder_id: input.folderId ?? null,
      priority: input.priority ?? null,
      due_date: input.dueDate ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleTask(id: string, completed: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", id);
  if (error) throw error;
}

export async function updateTask(
  id: string,
  patch: Partial<
    Pick<Task, "text" | "priority" | "due_date" | "folder_id" | "position">
  >,
) {
  const supabase = createClient();
  const { error } = await supabase.from("tasks").update(patch).eq("id", id);
  if (error) throw error;
}

// Soft delete — the row stays, `deleted_at` marks it as trashed.
export async function deleteTask(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}
