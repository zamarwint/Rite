import React from 'react';
import { Feather, FileText, Sparkles, Moon, Sun, Play } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  onOpenApp: () => void;
  onOpenSpecs: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApp,
  onOpenSpecs,
  isFocusMode,
  onToggleFocusMode,
}) => {
  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 transition-colors duration-300 border-b border-[#2f2d32]/10 bg-[#f2e0d2]/90 backdrop-blur-md text-[#2f2d32]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Image
            src="/logos/logo2.svg"
            alt="Logo"
            width={100}
            height={100}
            className='w-20 h-20'
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-black tracking-tight text-[#2f2d32] leading-none">
              Rite<span className="text-[#d42710]">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#2f2d32]/60 font-semibold">
              Distraction-Free Suite
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest text-[#2f2d32]">
          <a
            href="#features"
            className="hover:text-[#d42710] transition-colors py-1 border-b-2 border-transparent hover:border-[#d42710]"
          >
            Features
          </a>
          <a
            href="#agitation"
            className="hover:text-[#d42710] transition-colors py-1 border-b-2 border-transparent hover:border-[#d42710]"
          >
            Methodology
          </a>
          <a
            href="#testimonials"
            className="hover:text-[#d42710] transition-colors py-1 border-b-2 border-transparent hover:border-[#d42710]"
          >
            Wall of Love
          </a>
          <button
            onClick={onOpenSpecs}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#2f2d32]/10 hover:bg-[#2f2d32]/20 text-[#2f2d32] transition-colors border border-[#2f2d32]/10"
            title="Inspect Wireframe & Copy Specs Blueprint"
          >
            <FileText className="w-3.5 h-3.5 text-[#d42710]" />
            <span>Blueprint</span>
          </button>
          <button
            onClick={onOpenApp}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#d42710]/15 hover:bg-[#d42710]/25 text-[#d42710] transition-colors border border-[#d42710]/30"
            title="Open Live /dashboard Application"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d42710] animate-pulse" />
            <span>/dashboard</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Focus Mode toggle in Header */}
          <button
            onClick={onToggleFocusMode}
            className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${isFocusMode
              ? 'bg-[#d42710] text-[#f2e0d2] border-[#d42710] shadow-sm'
              : 'bg-[#2f2d32]/5 text-[#2f2d32] border-[#2f2d32]/20 hover:border-[#d42710]'
              }`}
            title="Toggle Site Focus Mode"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d42710]" />
            <span>{isFocusMode ? 'Focus: ON' : 'Focus Mode'}</span>
          </button>

          {/* Primary CTA */}
          <button
            id="header-cta-button"
            onClick={onOpenApp}
            className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Writing Free</span>
          </button>
        </div>
      </div>
    </header>
  );
};
