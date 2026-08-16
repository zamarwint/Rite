import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardCanvas } from './DashboardCanvas';
import { ProductivityDock } from './ProductivityDock';
import { DashboardArchitectureModal } from './DashboardArchitectureModal';
import { INITIAL_DOCUMENTS, INITIAL_TASKS, INITIAL_FOLDERS } from '@/lib/data/mockDashboardData';
import { DocumentEntry, TaskItem, WorkspaceFolder } from '@/types/types';
import { ArrowLeft, Home, Sliders } from 'lucide-react';

interface DashboardViewProps {
  onReturnHome?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onReturnHome }) => {
  const [documents, setDocuments] = useState<DocumentEntry[]>(() => {
    const saved = localStorage.getItem('rite_dashboard_docs');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [activeDocId, setActiveDocId] = useState<string>(() => {
    return documents[0]?.id || 'doc-1';
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('rite_dashboard_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [folders, setFolders] = useState<WorkspaceFolder[]>(INITIAL_FOLDERS);
  const [activeFolder, setActiveFolder] = useState<string>('all');

  // Sidebar & Dock visibility states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);

  // Audio Tools States
  const [isDictating, setIsDictating] = useState(false);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);

  // Specs Modal State
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('rite_dashboard_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('rite_dashboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘N or Ctrl+N for New Document
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        handleCreateDocument();
      }
      // ⌘B or Ctrl+B for Sidebar toggle
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0] || {
    id: 'doc-fallback',
    title: 'New Document',
    content: '',
    updatedAt: 'Just now',
    folder: 'all',
    tags: [],
    wordCount: 0,
  };

  // Content update handler
  const handleUpdateContent = (newContent: string) => {
    const words = newContent.trim() ? newContent.trim().split(/\s+/).length : 0;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDocId
          ? {
            ...doc,
            content: newContent,
            wordCount: words,
            updatedAt: 'Just now',
          }
          : doc
      )
    );
  };

  // Append text handler (from STT voice dictation)
  const handleAppendText = (appendedText: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === activeDocId) {
          const updatedContent = doc.content ? `${doc.content}${appendedText}` : appendedText.trim();
          const words = updatedContent.trim() ? updatedContent.trim().split(/\s+/).length : 0;
          return {
            ...doc,
            content: updatedContent,
            wordCount: words,
            updatedAt: 'Just now',
          };
        }
        return doc;
      })
    );
  };

  // Title update handler
  const handleUpdateTitle = (newTitle: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDocId
          ? {
            ...doc,
            title: newTitle,
            updatedAt: 'Just now',
          }
          : doc
      )
    );
  };

  // Create new document
  const handleCreateDocument = () => {
    const newDoc: DocumentEntry = {
      id: `doc-${Date.now()}`,
      title: 'Untitled Essay',
      content: '# New Title\n\nBegin typing your thoughts in quiet focus...',
      updatedAt: 'Just now',
      folder: activeFolder === 'all' ? 'essays' : activeFolder,
      tags: ['Draft'],
      wordCount: 9,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
  };

  // Delete document
  const handleDeleteDocument = (id: string) => {
    const remaining = documents.filter((d) => d.id !== id);
    setDocuments(remaining);
    if (activeDocId === id && remaining.length > 0) {
      setActiveDocId(remaining[0].id);
    }
  };

  // Task Handlers
  const handleAddTask = (text: string, priority: 'high' | 'medium' | 'low') => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
      priority,
      documentId: activeDocId,
      dueDate: 'Today',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-[#2f2d32] text-[#f2e0d2]">
      {/* Top Application Control Strip (Visible in Normal Mode) */}
      {!isZenMode && (
        <div className="h-10 bg-[#2f2d32] border-b border-[#f2e0d2]/10 px-4 flex items-center justify-between text-xs font-mono select-none shrink-0 z-40">
          <div className="flex items-center space-x-3">
            {onReturnHome && (
              <button
                onClick={onReturnHome}
                className="flex items-center space-x-1 px-2 py-1 rounded bg-[#f2e0d2]/10 hover:bg-[#f2e0d2]/20 text-[#f2e0d2] transition-colors"
                title="Return to Landing Page"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>
            )}

            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d42710]" />
              <span className="font-bold text-[#f2e0d2]">RITE</span>
              <span className="text-[#f2e0d2]/40">/</span>
              <span className="text-[#d42710] font-semibold">dashboard</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSpecsModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#d42710]/20 hover:bg-[#d42710]/30 text-[#f2e0d2] transition-colors border border-[#d42710]/40"
              title="Inspect UX Architecture Specs"
            >
              <Sliders className="w-3.5 h-3.5 text-[#d42710]" />
              <span className="hidden sm:inline">UI Architecture Specs</span>
            </button>
          </div>
        </div>
      )}

      {/* Main 3-Column Layout Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 1. Left Sidebar */}
        {!isZenMode && (
          <DashboardSidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            documents={documents}
            activeDocId={activeDocId}
            onSelectDocument={(id) => setActiveDocId(id)}
            onCreateDocument={handleCreateDocument}
            onDeleteDocument={handleDeleteDocument}
            activeFolder={activeFolder}
            onSelectFolder={(f) => setActiveFolder(f)}
            folders={folders}
            onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
          />
        )}

        {/* 2. Central Writing Canvas */}
        <DashboardCanvas
          document={activeDoc}
          onUpdateContent={handleUpdateContent}
          onUpdateTitle={handleUpdateTitle}
          isZenMode={isZenMode}
          onToggleZenMode={() => setIsZenMode(!isZenMode)}
          isDictating={isDictating}
          onToggleDictation={() => setIsDictating(!isDictating)}
          isPlayingTTS={isPlayingTTS}
          onToggleTTS={() => setIsPlayingTTS(!isPlayingTTS)}
          onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
        />

        {/* 3. Right Productivity Dock */}
        {!isZenMode && (
          <ProductivityDock
            isDockCollapsed={isDockCollapsed}
            onToggleCollapse={() => setIsDockCollapsed(!isDockCollapsed)}
            document={activeDoc}
            onAppendText={handleAppendText}
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            isDictating={isDictating}
            onToggleDictation={() => setIsDictating(!isDictating)}
            isPlayingTTS={isPlayingTTS}
            onToggleTTS={() => setIsPlayingTTS(!isPlayingTTS)}
          />
        )}
      </div>

      {/* UI Architecture Specs Modal */}
      <DashboardArchitectureModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />
    </div>
  );
};
