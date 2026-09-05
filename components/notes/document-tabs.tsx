'use client'

import { useNotesTabsStore } from '@/store/notes-tabs-store'
import { createDocument } from '@/lib/queries/documents'

export function DocumentTabs() {
  const { openTabs, activeTabId, setActiveTab, closeTab, openTab } = useNotesTabsStore()

  async function handleNewTab() {
    const doc = await createDocument({})
    openTab({ documentId: doc.id, title: doc.title })
  }

  return (
    <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border bg-muted/20 px-2">
      {openTabs.map((tab) => (
        <div
          key={tab.documentId}
          onClick={() => setActiveTab(tab.documentId)}
          className={`group flex cursor-pointer items-center gap-2 rounded-t-md px-3 py-1.5 text-sm ${
            tab.documentId === activeTabId
              ? 'bg-background text-foreground'
              : 'text-muted-foreground hover:bg-accent/40'
          }`}
        >
          <span className="max-w-[140px] truncate">{tab.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeTab(tab.documentId)
            }}
            className="opacity-0 group-hover:opacity-100"
            aria-label={`Close ${tab.title}`}
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={handleNewTab}
        className="ml-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent/40"
        aria-label="New document"
      >
        +
      </button>
    </div>
  )
}
