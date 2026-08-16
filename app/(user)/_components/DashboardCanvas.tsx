import React, { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Type,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  Sparkles,
  Eye,
  Clock,
  FileCheck,
  Share2,
  Download,
  Copy,
  Check,
  Volume2,
  Mic,
  Sliders,
  Bookmark,
} from 'lucide-react';
import { DocumentEntry } from '@/types/types';

interface DashboardCanvasProps {
  document: DocumentEntry;
  onUpdateContent: (newContent: string) => void;
  onUpdateTitle: (newTitle: string) => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  isDictating: boolean;
  onToggleDictation: () => void;
  isPlayingTTS: boolean;
  onToggleTTS: () => void;
  onOpenSpecsModal: () => void;
}

export const DashboardCanvas: React.FC<DashboardCanvasProps> = ({
  document,
  onUpdateContent,
  onUpdateTitle,
  isZenMode,
  onToggleZenMode,
  isDictating,
  onToggleDictation,
  isPlayingTTS,
  onToggleTTS,
  onOpenSpecsModal,
}) => {
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copied, setCopied] = useState(false);
  const [showExitZenPrompt, setShowExitZenPrompt] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = document.content.trim() ? document.content.trim().split(/\s+/).length : 0;
  const charCount = document.content.length;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  // Handle keyboard shortcuts (ESC to exit Zen Mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZenMode) {
        onToggleZenMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode, onToggleZenMode]);

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(document.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Formatting insert helper
  const insertFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selected = document.content.substring(start, end);
    const before = document.content.substring(0, start);
    const after = document.content.substring(end);

    const newContent = `${before}${prefix}${selected || 'text'}${suffix}${after}`;
    onUpdateContent(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + prefix.length,
          start + prefix.length + (selected.length || 4)
        );
      }
    }, 50);
  };

  // Font family and sizing classes
  const getFontClass = () => {
    switch (fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-serif';
    }
  };

  const getSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-xl leading-relaxed';
      case 'huge':
        return 'text-2xl leading-loose';
      default:
        return 'text-lg leading-relaxed';
    }
  };

  return (
    <main
      className={`relative flex-1 flex flex-col h-full overflow-hidden transition-all duration-500 ${isZenMode
          ? 'bg-[#f2e0d2] text-[#2f2d32] fixed inset-0 z-50 p-6 sm:p-12'
          : 'bg-[#f2e0d2] text-[#2f2d32]'
        }`}
      onMouseMove={() => {
        if (isZenMode) {
          setShowExitZenPrompt(true);
        }
      }}
      onMouseLeave={() => {
        if (isZenMode) {
          setShowExitZenPrompt(false);
        }
      }}
    >
      {/* Zen Mode Floating Exit Pill */}
      {isZenMode && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center space-x-3 transition-opacity duration-300 ${showExitZenPrompt ? 'opacity-100' : 'opacity-30 hover:opacity-100'
            }`}
        >
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#2f2d32] text-[#f2e0d2] shadow-2xl border border-[#f2e0d2]/20 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#d42710] animate-pulse" />
            <span className="font-bold">ZEN MODE ACTIVE</span>
            <span className="text-[#f2e0d2]/60">(Press ESC to return)</span>
          </div>

          <button
            onClick={onToggleZenMode}
            className="p-2 rounded-full bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] shadow-lg transition-transform hover:scale-105"
            title="Exit Zen Mode (ESC)"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. TOP HEADER & METRICS BAR (Hidden in Zen Mode) */}
      {!isZenMode && (
        <header className="h-16 px-6 border-b border-[#2f2d32]/10 bg-[#f2e0d2]/80 backdrop-blur-sm flex items-center justify-between z-20 shrink-0">
          {/* Left: Document Title Input */}
          <div className="flex items-center space-x-3 flex-1 max-w-xl">
            <div className="w-2 h-2 rounded-full bg-[#d42710]" />
            <input
              type="text"
              value={document.title}
              onChange={(e) => onUpdateTitle(e.target.value)}
              className="bg-transparent font-serif font-bold text-lg text-[#2f2d32] border-b border-transparent hover:border-[#2f2d32]/20 focus:border-[#d42710] outline-none w-full transition-colors"
              placeholder="Untitled Document..."
            />
          </div>

          {/* Center / Right: Metrics & Controls */}
          <div className="flex items-center space-x-4">
            {/* Live Metrics */}
            <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-[#2f2d32]/70">
              <span className="font-bold text-[#d42710]">{wordCount} WORDS</span>
              <span>{charCount} CHARS</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>~{readingTimeMin} MIN READ</span>
              </span>
            </div>

            {/* Typography Controls Dropdown / Buttons */}
            <div className="flex items-center bg-[#2f2d32]/5 p-1 rounded-lg border border-[#2f2d32]/10">
              <button
                onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : fontFamily === 'sans' ? 'mono' : 'serif')}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold text-[#2f2d32] hover:bg-[#2f2d32]/10 transition-colors flex items-center space-x-1"
                title="Cycle Font: Serif / Sans / Mono"
              >
                <Type className="w-3.5 h-3.5 text-[#d42710]" />
                <span className="uppercase text-[10px]">{fontFamily}</span>
              </button>

              <button
                onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'huge' : 'normal')}
                className="px-2 py-1 rounded text-xs font-mono font-semibold text-[#2f2d32] hover:bg-[#2f2d32]/10 transition-colors"
                title="Font Size: Normal / Large / Huge"
              >
                <span className="text-[10px] uppercase font-bold">{fontSize[0]}</span>
              </button>
            </div>

            {/* Actions: Copy, Zen Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
                title="Copy Text to Clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-[#d42710]" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                id="zen-mode-toggle-button"
                onClick={onToggleZenMode}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#2f2d32] hover:bg-[#d42710] text-[#f2e0d2] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
                title="Enter Zen Mode (Full Screen Distraction-Free)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Zen Mode</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 2. SUBTLE FORMATTING TOOLBAR (Hidden in Zen Mode) */}
      {!isZenMode && (
        <div className="px-6 py-2 border-b border-[#2f2d32]/5 flex items-center justify-between text-xs font-mono text-[#2f2d32]/70 bg-[#f2e0d2]/40">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => insertFormatting('# ', '')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Heading 1"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('### ', '')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('> ', '')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Blockquote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('- ', '')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('`', '`')}
              className="p-1.5 rounded hover:bg-[#2f2d32]/10 text-[#2f2d32] transition-colors"
              title="Inline Code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            {isDictating && (
              <span className="flex items-center space-x-1 text-[#d42710] font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#d42710]" />
                <span>Dictating live into draft...</span>
              </span>
            )}
            <span className="flex items-center space-x-1 opacity-70">
              <FileCheck className="w-3 h-3 text-[#d42710]" />
              <span>Auto-saved to local memory</span>
            </span>
          </div>
        </div>
      )}

      {/* 3. MAIN WRITING CANVAS (The Sanctuary) */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-20 py-8 sm:py-12 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col">
          {/* Document Title Header for Zen Mode / Document Header */}
          {isZenMode && (
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2f2d32] mb-8 pb-4 border-b border-[#2f2d32]/10">
              {document.title}
            </h1>
          )}

          {/* Hyper-Focus Rich TextArea Canvas */}
          <textarea
            ref={textareaRef}
            value={document.content}
            onChange={(e) => onUpdateContent(e.target.value)}
            className={`w-full flex-1 bg-transparent resize-none border-none outline-none text-[#2f2d32] placeholder-[#2f2d32]/30 selection:bg-[#d42710] selection:text-[#f2e0d2] ${getFontClass()} ${getSizeClass()}`}
            placeholder="Close the tabs. Silence the noise. Begin typing your thoughts here..."
            spellCheck="true"
            autoFocus
          />
        </div>
      </div>

      {/* 4. BOTTOM STATUS BAR (Hidden in Zen Mode) */}
      {!isZenMode && (
        <footer className="h-9 px-6 bg-[#2f2d32]/5 border-t border-[#2f2d32]/10 flex items-center justify-between text-[11px] font-mono text-[#2f2d32]/60 shrink-0">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d42710]" />
              <span>CANVAS: ACTIVE DRAFT</span>
            </span>
            <span className="hidden sm:inline">UTF-8 • MARKDOWN SUPPORTED</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenSpecsModal}
              className="text-[#2f2d32] hover:text-[#d42710] font-bold transition-colors"
            >
              Inspect /dashboard Architecture →
            </button>
          </div>
        </footer>
      )}
    </main>
  );
};
