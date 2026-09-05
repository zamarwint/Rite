import React, { useState } from "react";
import {
  FileText,
  CheckSquare,
  BookOpen,
  Compass,
  Send,
  Archive,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  Star,
  Search,
  Sparkles,
  LogOut,
  FolderPlus,
  Trash2,
  Sliders,
  User,
} from "lucide-react";
import {
  DocumentEntry,
  SupabaseClaims,
  WorkspaceFolder,
} from "@/types/ts-types";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import UserDropdown from "../../(auth)/_components/UserDropdown";

import { PersistentTimerBadge } from "@/components/shell/persistent-timer-badge";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PANELS = [
  { href: "/~/notes", label: "Notes" },
  { href: "/~/tasks", label: "Tasks" },
  { href: "/~/timer", label: "Timer" },
  { href: "/~/tts", label: "Text to speech" },
  { href: "/~/stt", label: "Speech to text" },
] as const;

interface DashboardSidebarProps {
  data: SupabaseClaims;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  documents: DocumentEntry[];
  activeDocId: string;
  onSelectDocument: (id: string) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  activeFolder: string;
  onSelectFolder: (folderId: string) => void;
  folders: WorkspaceFolder[];
  onOpenSpecsModal: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  data,
  isCollapsed,
  onToggleCollapse,
  documents,
  activeDocId,
  onSelectDocument,
  onCreateDocument,
  onDeleteDocument,
  activeFolder,
  onSelectFolder,
  folders,
  onOpenSpecsModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();

  const filteredDocs = documents.filter((doc) => {
    const matchesFolder =
      activeFolder === "all" ||
      (activeFolder === "favorites"
        ? doc.isFavorite
        : doc.folder === activeFolder);
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-background text-foreground flex flex-col items-center justify-between py-5 border-r border-border transition-all duration-300 z-30 shrink-0 select-none">
        {/* Top Logo & Expand */}
        <div className="flex flex-col items-center space-y-4">
          {/* USERS */}
          <div className="flex items-center justify-start gap-2 w-full text-foreground">
            <UserDropdown data={data} full={false} small={true} />
          </div>

          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Center Icons Navigation */}
        <div className="flex flex-col items-center space-y-3">
          <Button
            onClick={() => onSelectFolder("all")}
            variant={activeFolder === "all" ? "default" : "ghost"}
            className="p-2.5 rounded-lg transition-colors"
            title="All Documents"
          >
            <FileText className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => onSelectFolder("essays")}
            variant={activeFolder === "essays" ? "default" : "ghost"}
            className="p-2.5 rounded-lg transition-colors"
            title="Essays"
          >
            <BookOpen className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => onSelectFolder("journalism")}
            variant={activeFolder === "journalism" ? "default" : "ghost"}
            className="p-2.5 rounded-lg transition-colors"
            title="Investigative Desk"
          >
            <Compass className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => onSelectFolder("newsletter")}
            variant={activeFolder === "newsletter" ? "default" : "ghost"}
            className="p-2.5 rounded-lg transition-colors"
            title="Newsletter"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Bottom Quick Action */}
        <div className="flex flex-col items-center space-y-3">
          <Button
            onClick={onCreateDocument}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
            title="New Entry (⌘N)"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 sm:w-72 bg-background text-foreground flex flex-col justify-between border-r border-border transition-all duration-300 z-30 shrink-0 select-none h-full overflow-hidden">
      {/* 1. TOP: User Profile & Workspace Selector */}
      <div className="p-4 text-foreground flex flex-col items-start">
        <div className="flex items-center justify-between size-full">
          <UserDropdown data={data} full={true} small={false} />
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative p-3 border-y border-border">
        <InputGroup className="max-w-full">
          <InputGroupInput
            className="rounded-lg"
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end"></InputGroupAddon>
        </InputGroup>
      </div>

      {/* 2. CENTER: Folder Categories & Document List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Navigation Categories */}

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Navigation
            </span>
          </div>
          {PANELS.map((panel) => {
            const active = pathname?.startsWith(panel.href);
            return (
              <Link
                key={panel.href}
                href={panel.href}
                className={`rounded-md px-3 py-2 text-sm ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {panel.label}
              </Link>
            );
          })}
        </div>

        {/* Shows and controls the timer regardless of which panel is active. */}
        <div className="mt-auto">
          <PersistentTimerBadge />
        </div>

        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Workspace Views
            </span>
          </div>
          <div className="space-y-0.5 font-sans text-xs">
            <Button
              onClick={() => onSelectFolder("all")}
              variant={activeFolder === "all" ? "default" : "ghost"}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors`}
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4" />
                <span>All Documents</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.length}
              </span>
            </Button>

            <Button
              onClick={() => onSelectFolder("essays")}
              variant={activeFolder === "essays" ? "default" : "ghost"}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Essays & Longform</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === "essays").length}
              </span>
            </Button>

            <Button
              onClick={() => onSelectFolder("journalism")}
              variant={activeFolder === "journalism" ? "default" : "ghost"}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Compass className="w-4 h-4" />
                <span>Investigative Desk</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === "journalism").length}
              </span>
            </Button>

            <Button
              onClick={() => onSelectFolder("newsletter")}
              variant={activeFolder === "newsletter" ? "default" : "ghost"}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Send className="w-4 h-4" />
                <span>Weekly Dispatch</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === "newsletter").length}
              </span>
            </Button>
          </div>
        </div>

        {/* Documents in Current View */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Active Drafts ({filteredDocs.length})
            </span>
          </div>

          <div className="space-y-1">
            {filteredDocs.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <div
                  key={doc.id}
                  onClick={() => onSelectDocument(doc.id)}
                  className={`group relative flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border ${
                    isActive
                      ? "bg-foreground text-background border-foreground font-medium shadow-md"
                      : "bg-transparent text-foreground border-transparent hover:bg-background/5 hover:text-foreground"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center space-x-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      <p className="text-xs font-serif font-bold truncate leading-snug">
                        {doc.title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono opacity-70">
                      <span>{doc.updatedAt}</span>
                      <span>•</span>
                      <span>{doc.wordCount.toString()} words</span>
                    </div>
                  </div>

                  {/* Delete / options */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDocument(doc.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "",
                      isActive
                        ? "bg-transparent hover:bg-foreground text-transparent hover:text-primary"
                        : "bg-transparent hover:bg-background text-transparent hover:text-primary",
                    )}
                    title="Delete Draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM: New Entry CTA & Sidebar Collapse Toggle */}
      <div className="p-3 border-t border-border space-y-2">
        <Button
          onClick={onCreateDocument}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry (⌘N)</span>
        </Button>

        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-muted-foreground">
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            className="flex items-center space-x-1 p-1 rounded hover:bg-background/10 hover:text-foreground transition-colors"
            title="Collapse Sidebar (⌘B)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Collapse</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
