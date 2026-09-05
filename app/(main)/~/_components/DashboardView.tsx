"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardCanvas } from "./DashboardCanvas";
import { ProductivityDock } from "./ProductivityDock";
import { DashboardArchitectureModal } from "./DashboardArchitectureModal";
import {
  INITIAL_DOCUMENTS,
  INITIAL_TASKS,
  INITIAL_FOLDERS,
} from "@/lib/data/mockDashboardData";
import {
  DocumentEntry,
  SupabaseClaims,
  TaskItem,
  WorkspaceFolder,
} from "@/types/types";
import { ArrowLeft, Home, Sliders } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { LogoState } from "@/app/_components/LogoStates";

interface DashboardViewProps {
  data: SupabaseClaims;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [documents, setDocuments] = useState<DocumentEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rite_dashboard_docs");
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    }
    return INITIAL_DOCUMENTS;
  });

  const [activeDocId, setActiveDocId] = useState<string>(() => {
    return documents[0]?.id || "doc-1";
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rite_dashboard_tasks");
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    }
    return INITIAL_TASKS;
  });

  const [folders, setFolders] = useState<WorkspaceFolder[]>(INITIAL_FOLDERS);
  const [activeFolder, setActiveFolder] = useState<string>("all");

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
    localStorage.setItem("rite_dashboard_docs", JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem("rite_dashboard_tasks", JSON.stringify(tasks));
  }, [tasks]);

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
              updatedAt: "Just now",
            }
          : doc,
      ),
    );
  };

  // Append text handler (from STT voice dictation)
  const handleAppendText = (appendedText: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === activeDocId) {
          const updatedContent = doc.content
            ? `${doc.content}${appendedText}`
            : appendedText.trim();
          const words = updatedContent.trim()
            ? updatedContent.trim().split(/\s+/).length
            : 0;
          return {
            ...doc,
            content: updatedContent,
            wordCount: words,
            updatedAt: "Just now",
          };
        }
        return doc;
      }),
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
              updatedAt: "Just now",
            }
          : doc,
      ),
    );
  };

  // Create new document
  const handleCreateDocument = useCallback(() => {
    const newDoc: DocumentEntry = {
      id: `doc-${Date.now()}`,
      title: "Untitled Essay",
      content: "# New Title\n\nBegin typing your thoughts in quiet focus...",
      updatedAt: "Just now",
      folder: activeFolder === "all" ? "essays" : activeFolder,
      tags: ["Draft"],
      wordCount: 9,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
  }, [activeFolder]);

  // Delete document
  const handleDeleteDocument = (id: string) => {
    const remaining = documents.filter((d) => d.id !== id);
    setDocuments(remaining);
    if (activeDocId === id && remaining.length > 0) {
      setActiveDocId(remaining[0].id);
    }
  };

  // Task Handlers
  const handleAddTask = (text: string, priority: "high" | "medium" | "low") => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
      priority,
      documentId: activeDocId,
      dueDate: "Today",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘N or Ctrl+N for New Document
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleCreateDocument();
      }
      // ⌘B or Ctrl+B for Sidebar toggle
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCreateDocument]);

  const activeDoc = documents.find((d) => d.id === activeDocId) ||
    documents[0] || {
      id: "doc-fallback",
      title: "New Document",
      content: "",
      updatedAt: "Just now",
      folder: "all",
      tags: [],
      wordCount: 0,
    };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-background text-foreground">
      {/* Top Application Control Strip (Visible in Normal Mode) */}
      {!isZenMode && (
        <div className="h-10 bg-background border-b border-border px-4 flex items-center justify-between text-xs font-mono shrink-0 z-40">
          <div
            className="flex items-center space-x-1.5 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <LogoState size={"size-5"} />
            <span className="font-bold text-foreground">RITE</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary font-semibold">dashboard</span>
          </div>

          <div className="flex items-center space-x-3 select-none">
            <button
              onClick={() => setIsSpecsModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-background/20 hover:bg-background/30 text-foreground transition-colors border border-primary/40"
              title="Inspect UX Architecture Specs"
            >
              <Sliders className="w-3.5 h-3.5 text-primary" />
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
            data={data}
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
      </div>

      {/* UI Architecture Specs Modal */}
      <DashboardArchitectureModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />
    </div>
  );
};
