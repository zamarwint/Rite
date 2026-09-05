import { DocumentTabs } from '@/components/notes/document-tabs'
import { Editor } from '@/components/notes/editor'

export default function NotesPage() {
  return (
    <div className="flex h-full flex-col">
      <DocumentTabs />
      <div className="flex-1 overflow-auto">
        <Editor />
      </div>
    </div>
  )
}
