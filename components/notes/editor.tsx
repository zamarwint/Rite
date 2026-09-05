'use client'

import { useNotesTabsStore } from '@/store/notes-tabs-store'

// This is a placeholder. Wire up @tiptap/react here:
//   const editor = useEditor({ extensions: [StarterKit], content, onUpdate: debounced saveDocumentContent })
// Keep content stored as Tiptap JSON (not HTML) so it matches the `documents.content`
// jsonb column and the word_count/search_vector trigger in the migration.
export function Editor() {
  const activeTabId = useNotesTabsStore((s) => s.activeTabId)

  if (!activeTabId) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Open a document to start writing.
      </div>
    )
  }

  return (
    <div className="p-8">
      <p className="text-sm text-muted-foreground">Editor for document {activeTabId} goes here.</p>
    </div>
  )
}
