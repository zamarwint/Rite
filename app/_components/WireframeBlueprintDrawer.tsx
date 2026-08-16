import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Layout, Palette, ArrowRight, Eye, Code2 } from 'lucide-react';
import { WIREFRAME_SPECS } from '@/lib/data/wireframeSpecs';
import { BRAND_COLORS, COLOR_ROLES } from '@/lib/constants/colorPalette';

interface WireframeBlueprintDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: () => void;
}

export const WireframeBlueprintDrawer: React.FC<WireframeBlueprintDrawerProps> = ({
  isOpen,
  onClose,
  onOpenApp,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>(WIREFRAME_SPECS[0].id);

  if (!isOpen) return null;

  const activeSpec = WIREFRAME_SPECS.find((s) => s.id === selectedSection) || WIREFRAME_SPECS[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#2f2d32]/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl h-full bg-[#f2e0d2] text-[#2f2d32] shadow-2xl flex flex-col border-l-4 border-[#2f2d32] overflow-hidden">
        {/* Top Title Bar */}
        <div className="bg-[#2f2d32] text-[#f2e0d2] p-5 flex items-center justify-between border-b border-[#f2e0d2]/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#d42710] text-[#f2e0d2]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl leading-none text-[#f2e0d2]">
                Rite Wireframe Blueprint & Copy Specs
              </h3>
              <p className="text-xs font-mono text-[#f2e0d2]/60 mt-1">
                Top-to-bottom layout, exact hex codes, and persuasive copy breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#d42710] text-[#f2e0d2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section 1: Exact Hex Palette Dictation */}
          <div className="p-5 rounded-2xl bg-[#2f2d32] text-[#f2e0d2] border-2 border-[#2f2d32]">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#d42710] uppercase mb-4">
              <Palette className="w-4 h-4" />
              <span>Exact Color Palette Dictation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#d42710] text-[#f2e0d2] border border-[#f2e0d2]/20">
                <span className="font-bold block">VIVID RED</span>
                <span className="opacity-90">#d42710</span>
                <p className="text-[10px] mt-1 opacity-80 leading-tight">CTAs, active states, timer digits, checkmarks</p>
              </div>

              <div className="p-3 rounded-xl bg-[#2f2d32] text-[#f2e0d2] border border-[#f2e0d2]/20">
                <span className="font-bold block">DARK GREY</span>
                <span className="opacity-90">#2f2d32</span>
                <p className="text-[10px] mt-1 opacity-80 leading-tight">Primary typography, agitation & testimonials background, footer</p>
              </div>

              <div className="p-3 rounded-xl bg-[#f2e0d2] text-[#2f2d32] border border-[#2f2d32]/20">
                <span className="font-bold block">LIGHT ORANGE</span>
                <span className="opacity-90">#f2e0d2</span>
                <p className="text-[10px] mt-1 opacity-80 leading-tight">Paper-like canvas, soft sections, high-contrast dark text</p>
              </div>
            </div>
          </div>

          {/* Section 2: Section Navigator Tabs */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2f2d32]/60 block mb-3">
              Select Section to Inspect:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
              {WIREFRAME_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSection(spec.id)}
                  className={`p-2.5 rounded-lg text-left transition-all font-semibold border ${selectedSection === spec.id
                      ? 'bg-[#d42710] text-[#f2e0d2] border-[#d42710] shadow-md'
                      : 'bg-[#2f2d32]/5 text-[#2f2d32] border-[#2f2d32]/10 hover:border-[#d42710]'
                    }`}
                >
                  {spec.sectionName}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Detailed Spec View for Selected Section */}
          <div className="p-6 rounded-2xl bg-[#f2e0d2] border-2 border-[#2f2d32] shadow-md space-y-6">
            <div className="border-b border-[#2f2d32]/10 pb-4">
              <span className="text-xs font-mono font-bold text-[#d42710] uppercase">
                Section Specification
              </span>
              <h4 className="text-2xl font-serif font-black text-[#2f2d32] mt-1">
                {activeSpec.sectionName}
              </h4>
            </div>

            {/* UI & Design Notes */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase text-[#2f2d32]/70 mb-2">
                UI / Design Notes:
              </h5>
              <ul className="space-y-2 text-sm text-[#2f2d32]/90">
                {activeSpec.designNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d42710] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Persuasive Copy */}
            <div className="p-4 rounded-xl bg-[#2f2d32] text-[#f2e0d2] space-y-3 font-mono text-xs">
              <span className="text-[10px] font-bold text-[#d42710] uppercase block">
                Persuasive Copywriting:
              </span>
              <div>
                <span className="text-[#f2e0d2]/60 block text-[10px]">Headline (H1/H2):</span>
                <p className="font-serif text-base text-[#f2e0d2] font-bold">{activeSpec.headline}</p>
              </div>

              {activeSpec.subHeadline && (
                <div>
                  <span className="text-[#f2e0d2]/60 block text-[10px]">Sub-headline / Body:</span>
                  <p className="text-xs text-[#f2e0d2]/90 font-sans">{activeSpec.subHeadline}</p>
                </div>
              )}

              {activeSpec.ctaText && (
                <div className="pt-2 border-t border-[#f2e0d2]/10 flex items-center justify-between">
                  <span className="text-[#f2e0d2]/60 text-[10px]">CTA Button Text:</span>
                  <span className="px-3 py-1 rounded bg-[#d42710] text-[#f2e0d2] font-bold text-xs">
                    {activeSpec.ctaText}
                  </span>
                </div>
              )}

              {activeSpec.microCopy && (
                <div>
                  <span className="text-[#f2e0d2]/60 block text-[10px]">Micro-copy:</span>
                  <span className="text-[#f2e0d2]/80 italic">{activeSpec.microCopy}</span>
                </div>
              )}
            </div>

            {/* Jump to Page Section Link */}
            <div className="pt-2 flex items-center justify-between">
              <a
                href={`#${activeSpec.id}`}
                onClick={onClose}
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#2f2d32] hover:text-[#d42710]"
              >
                <Eye className="w-4 h-4 text-[#d42710]" />
                <span>Jump to live landing page section</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenApp();
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#d42710] text-[#f2e0d2] font-bold text-xs hover:bg-[#b81f0b] transition-colors"
              >
                <span>Launch Interactive Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
