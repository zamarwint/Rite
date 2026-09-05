import { create } from 'zustand'

interface OpenTab {
  documentId: string
  title: string
}

interface NotesTabsState {
  openTabs: OpenTab[]
  activeTabId: string | null
  openTab: (tab: OpenTab) => void
  closeTab: (documentId: string) => void
  setActiveTab: (documentId: string) => void
  renameTab: (documentId: string, title: string) => void
}

export const useNotesTabsStore = create<NotesTabsState>((set, get) => ({
  openTabs: [],
  activeTabId: null,

  openTab: (tab) => {
    const already = get().openTabs.some((t) => t.documentId === tab.documentId)
    set((s) => ({
      openTabs: already ? s.openTabs : [...s.openTabs, tab],
      activeTabId: tab.documentId,
    }))
  },

  closeTab: (documentId) => {
    set((s) => {
      const openTabs = s.openTabs.filter((t) => t.documentId !== documentId)
      const wasActive = s.activeTabId === documentId
      const activeTabId = wasActive
        ? (openTabs[openTabs.length - 1]?.documentId ?? null)
        : s.activeTabId
      return { openTabs, activeTabId }
    })
  },

  setActiveTab: (documentId) => set({ activeTabId: documentId }),

  renameTab: (documentId, title) =>
    set((s) => ({
      openTabs: s.openTabs.map((t) => (t.documentId === documentId ? { ...t, title } : t)),
    })),
}))
