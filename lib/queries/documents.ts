import { createClient } from "@/lib/client";

// word_count and search_vector are never sent from the client — the
// documents_before_save trigger derives both from `content` server-side.

export async function getDocuments(folderId?: string | null) {
  const supabase = createClient();
  let query = supabase
    .from("documents")
    .select("id, title, folder_id, tags, word_count, is_favorite, updated_at")
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

export async function getDocument(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createDocument(input: {
  title?: string;
  folderId?: string | null;
}) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("documents")
    .insert({
      user_id: userData.user.id,
      title: input.title ?? "Untitled",
      folder_id: input.folderId ?? null,
      content: { type: "doc", content: [] },
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Debounce calls to this from the editor — every save re-runs the
// word-count/search-vector trigger, so avoid firing it on every keystroke.
export async function saveDocumentContent(
  id: string,
  content: Record<string, unknown>,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("documents")
    .update({ content })
    .eq("id", id);
  if (error) throw error;
}

export async function renameDocument(id: string, title: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("documents")
    .update({ title })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteDocument(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("documents")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function searchDocuments(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("id, title, updated_at")
    .is("deleted_at", null)
    .textSearch("search_vector", query, { type: "websearch" });
  if (error) throw error;
  return data;
}
