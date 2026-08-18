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
import { OrganizationSwitcher, UserButton, UserProfile } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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
          <UserButton />

          <Button
            onClick={onToggleCollapse}
            variant='outline'
            className="p-2 rounded-lg text-[#f2e0d2]/60 hover:text-[#f2e0d2] hover:bg-[#f2e0d2]/10 transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Center Icons Navigation */}
        <div className="flex flex-col items-center space-y-3">
          <Button
            onClick={() => onSelectFolder('all')}
            variant={activeFolder === 'all' ? 'default' : 'outline'}
            className="p-2.5 rounded-lg transition-colors"
            title="All Documents"
          >
            <FileText className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => onSelectFolder('essays')}
            variant={activeFolder === 'essays' ? 'default' : 'outline'}
            className="p-2.5 rounded-lg transition-colors"
            title="Essays"
          >
            <BookOpen className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => onSelectFolder('journalism')}
            variant={activeFolder === 'journalism' ? 'default' : 'outline'}
            className="p-2.5 rounded-lg transition-colors"
            title="Investigative Desk"
          >
            <Compass className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => onSelectFolder('newsletter')}
            variant={activeFolder === 'newsletter' ? 'default' : 'outline'}
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
            className="w-10 h-10 rounded-full bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
            title="New Entry (⌘N)"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            onClick={onOpenSpecsModal}
            variant='outline'
            className="p-2 rounded-lg text-[#f2e0d2]/40 hover:text-[#d42710] transition-colors"
            title="UI Architecture Blueprint"
          >
            <Sliders className="w-4 h-4" />
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 sm:w-72 bg-[#2f2d32] text-foreground flex flex-col justify-between border-r border-[#f2e0d2]/10 transition-all duration-300 z-30 shrink-0 select-none h-full overflow-hidden">
      {/* 1. TOP: User Profile & Workspace Selector */}
      <div className="p-4 border-b border-[#f2e0d2]/10 text-foreground flex flex-col items-start">
        <div className='flex items-center gap-2'>
          <UserButton />
          <span className='text-sm'>Profile</span>
        </div>
        <Separator className='my-3' />
        <OrganizationSwitcher
        />
      </div>

      {/* Quick Search */}
      <div className="mt-3 relative px-3">
        <Search className="w-3.5 h-3.5 absolute left-6 top-1/2 -translate-y-1/2 text-[#f2e0d2]/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search drafts (⌘K)..."
          className="w-full bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#f2e0d2] placeholder-[#f2e0d2]/40 focus:outline-none focus:border-[#d42710] font-sans"
        />
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
            <Button
              onClick={() => onSelectFolder('all')}
              variant={activeFolder === 'all' ? 'default' : 'outline'}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors`}
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4" />
                <span>All Documents</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">{documents.length}</span>
            </Button>

            <Button
              onClick={() => onSelectFolder('essays')}
              variant={activeFolder === 'essays' ? 'default' : 'outline'}
              className='w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors'
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Essays & Longform</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === 'essays').length}
              </span>
            </Button>

            <Button
              onClick={() => onSelectFolder('journalism')}
              variant={activeFolder === 'journalism' ? 'default' : 'outline'}
              className='w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors'
            >
              <div className="flex items-center space-x-2.5">
                <Compass className="w-4 h-4" />
                <span>Investigative Desk</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === 'journalism').length}
              </span>
            </Button>

            <Button
              onClick={() => onSelectFolder('newsletter')}
              variant={activeFolder === 'newsletter' ? 'default' : 'outline'}
              className='w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors'
            >
              <div className="flex items-center space-x-2.5">
                <Send className="w-4 h-4" />
                <span>Weekly Dispatch</span>
              </div>
              <span className="font-mono text-[10px] opacity-70">
                {documents.filter((d) => d.folder === 'newsletter').length}
              </span>
            </Button>
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
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDocument(doc.id);
                    }}
                    variant='outline'
                    className={`p-1 rounded opacity-0 group-hover:opacity-100 hover:text-[#d42710] transition-opacity ${isActive ? 'text-[#2f2d32]/60' : 'text-[#f2e0d2]/40'
                      }`}
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
      <div className="p-3 border-t border-[#f2e0d2]/10 space-y-2 bg-[#2f2d32]">
        <Button
          onClick={onCreateDocument}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry (⌘N)</span>
        </Button>

        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#f2e0d2]/60">
          <Button
            onClick={onToggleCollapse}
            variant='outline'
            className="flex items-center space-x-1 p-1 rounded hover:bg-[#f2e0d2]/10 text-[#f2e0d2]/70 hover:text-[#f2e0d2] transition-colors"
            title="Collapse Sidebar (⌘B)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Collapse</span>
          </Button>
        </div>
      </div>
    </aside >
  );
};
