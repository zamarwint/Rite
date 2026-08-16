import React, { useState } from 'react';
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
} from 'lucide-react';
import { DocumentEntry, WorkspaceFolder } from '@/types/types';

interface DashboardSidebarProps {
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesFolder =
      activeFolder === 'all' ||
      (activeFolder === 'favorites' ? doc.isFavorite : doc.folder === activeFolder);
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-[#2f2d32] text-[#f2e0d2] flex flex-col items-center justify-between py-5 border-r border-[#f2e0d2]/10 transition-all duration-300 z-30 shrink-0 select-none">
        {/* Top Logo & Expand */}
        <div className="flex flex-col items-center space-y-4">
          <div
            onClick={onToggleCollapse}
            className="w-10 h-10 rounded-lg bg-[#f2e0d2] text-[#2f2d32] flex items-center justify-center font-serif font-black text-lg cursor-pointer hover:bg-[#d42710] hover:text-[#f2e0d2] transition-colors shadow-sm"
            title="Expand Sidebar (⌘B)"
          >
            R<span className="text-[#d42710] group-hover:text-[#f2e0d2]">.</span>
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-[#f2e0d2]/60 hover:text-[#f2e0d2] hover:bg-[#f2e0d2]/10 transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Icons Navigation */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={() => onSelectFolder('all')}
            className={`p-2.5 rounded-lg transition-colors ${activeFolder === 'all'
                ? 'bg-[#d42710] text-[#f2e0d2]'
                : 'text-[#f2e0d2]/60 hover:text-[#f2e0d2] hover:bg-[#f2e0d2]/10'
              }`}
            title="All Documents"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectFolder('essays')}
            className={`p-2.5 rounded-lg transition-colors ${activeFolder === 'essays'
                ? 'bg-[#d42710] text-[#f2e0d2]'
                : 'text-[#f2e0d2]/60 hover:text-[#f2e0d2] hover:bg-[#f2e0d2]/10'
              }`}
            title="Essays"
          >
            <BookOpen className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectFolder('journalism')}
            className={`p-2.5 rounded-lg transition-colors ${activeFolder === 'journalism'
                ? 'bg-[#d42710] text-[#f2e0d2]'
                : 'text-[#f2e0d2]/60 hover:text-[#f2e0d2] hover:bg-[#f2e0d2]/10'
              }`}
            title="Investigative Desk"
          >
            <Compass className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectFolder('newsletter')}
            className={`p-2.5 rounded-lg transition-colors ${activeFolder === 'newsletter'
                ? 'bg-[#d42710] text-[#f2e0d2]'
                : 'text-[#f2e0d2]/60 hover:text-[#f2e0d2] hover:bg-[#f2e0d2]/10'
              }`}
            title="Newsletter"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Quick Action */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={onCreateDocument}
            className="w-10 h-10 rounded-full bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
            title="New Entry (⌘N)"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenSpecsModal}
            className="p-2 rounded-lg text-[#f2e0d2]/40 hover:text-[#d42710] transition-colors"
            title="UI Architecture Blueprint"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 sm:w-72 bg-[#2f2d32] text-[#f2e0d2] flex flex-col justify-between border-r border-[#f2e0d2]/10 transition-all duration-300 z-30 shrink-0 select-none h-full overflow-hidden">
      {/* 1. TOP: User Profile & Workspace Selector */}
      <div className="p-4 border-b border-[#f2e0d2]/10">
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-[#f2e0d2]/5 hover:bg-[#f2e0d2]/10 transition-colors border border-[#f2e0d2]/10 group text-left"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-[#d42710] text-[#f2e0d2] font-serif font-black flex items-center justify-center shrink-0 shadow-sm">
                R
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-sm text-[#f2e0d2] truncate">Elena Rostova</span>
                </div>
                <span className="text-[10px] font-mono text-[#f2e0d2]/60 uppercase tracking-wider block truncate">
                  Investigative Desk
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#f2e0d2]/60 group-hover:text-[#f2e0d2] shrink-0 ml-1" />
          </button>

          {/* Profile / Workspace Settings Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#2f2d32] border-2 border-[#f2e0d2]/20 rounded-xl shadow-2xl p-2 z-50 text-xs font-mono animate-fadeIn space-y-1">
              <div className="px-2 py-1.5 text-[10px] text-[#f2e0d2]/50 uppercase tracking-widest border-b border-[#f2e0d2]/10">
                Active Workspace
              </div>
              <button
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg bg-[#d42710]/20 text-[#f2e0d2] font-semibold"
              >
                <span>🖋️ Investigative Desk</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d42710]" />
              </button>
              <button
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#f2e0d2]/10 text-[#f2e0d2]/80"
              >
                <span>📚 Novel Manuscript</span>
              </button>
              <div className="border-t border-[#f2e0d2]/10 pt-1 mt-1">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenSpecsModal();
                  }}
                  className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-[#f2e0d2]/10 text-[#f2e0d2]/90"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#d42710]" />
                  <span>UI Architecture Specs</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Search */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#f2e0d2]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drafts (⌘K)..."
            className="w-full bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#f2e0d2] placeholder-[#f2e0d2]/40 focus:outline-none focus:border-[#d42710] font-sans"
          />
        </div>
      </div>

      {/* 2. CENTER: Folder Categories & Document List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Navigation Categories */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f2e0d2]/50">
              Workspace Views
            </span>
          </div>
          <div className="space-y-0.5 font-sans text-xs">
            <button
              onClick={() => onSelectFolder('all')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${activeFolder === 'all'
                  ? 'bg-[#d42710] text-[#f2e0d2] font-bold shadow-sm'
                  : 'text-[#f2e0d2]/80 hover:bg-[#f2e0d2]/10 hover:text-[#f2e0d2]'
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4" />
                <span>All Documents</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">{documents.length}</span>
            </button>

            <button
              onClick={() => onSelectFolder('essays')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${activeFolder === 'essays'
                  ? 'bg-[#d42710] text-[#f2e0d2] font-bold shadow-sm'
                  : 'text-[#f2e0d2]/80 hover:bg-[#f2e0d2]/10 hover:text-[#f2e0d2]'
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Essays & Longform</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === 'essays').length}
              </span>
            </button>

            <button
              onClick={() => onSelectFolder('journalism')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${activeFolder === 'journalism'
                  ? 'bg-[#d42710] text-[#f2e0d2] font-bold shadow-sm'
                  : 'text-[#f2e0d2]/80 hover:bg-[#f2e0d2]/10 hover:text-[#f2e0d2]'
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <Compass className="w-4 h-4" />
                <span>Investigative Desk</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === 'journalism').length}
              </span>
            </button>

            <button
              onClick={() => onSelectFolder('newsletter')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${activeFolder === 'newsletter'
                  ? 'bg-[#d42710] text-[#f2e0d2] font-bold shadow-sm'
                  : 'text-[#f2e0d2]/80 hover:bg-[#f2e0d2]/10 hover:text-[#f2e0d2]'
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <Send className="w-4 h-4" />
                <span>Weekly Dispatch</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === 'newsletter').length}
              </span>
            </button>
          </div>
        </div>

        {/* Documents in Current View */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f2e0d2]/50">
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
                  className={`group relative flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border ${isActive
                      ? 'bg-[#f2e0d2] text-[#2f2d32] border-[#f2e0d2] font-medium shadow-md'
                      : 'bg-transparent text-[#f2e0d2]/80 border-transparent hover:bg-[#f2e0d2]/5 hover:text-[#f2e0d2]'
                    }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center space-x-1.5">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d42710] shrink-0" />}
                      <p className="text-xs font-serif font-bold truncate leading-snug">{doc.title}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono opacity-70">
                      <span>{doc.updatedAt}</span>
                      <span>•</span>
                      <span>{doc.wordCount} words</span>
                    </div>
                  </div>

                  {/* Delete / options */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDocument(doc.id);
                    }}
                    className={`p-1 rounded opacity-0 group-hover:opacity-100 hover:text-[#d42710] transition-opacity ${isActive ? 'text-[#2f2d32]/60' : 'text-[#f2e0d2]/40'
                      }`}
                    title="Delete Draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM: New Entry CTA & Sidebar Collapse Toggle */}
      <div className="p-3 border-t border-[#f2e0d2]/10 space-y-2 bg-[#2f2d32]">
        <button
          onClick={onCreateDocument}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry (⌘N)</span>
        </button>

        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#f2e0d2]/60">
          <button
            onClick={onOpenSpecsModal}
            className="hover:text-[#d42710] transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-[#d42710]" />
            <span>Architecture Specs</span>
          </button>

          <button
            onClick={onToggleCollapse}
            className="flex items-center space-x-1 p-1 rounded hover:bg-[#f2e0d2]/10 text-[#f2e0d2]/70 hover:text-[#f2e0d2] transition-colors"
            title="Collapse Sidebar (⌘B)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Collapse</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
