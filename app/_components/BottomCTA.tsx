import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

interface BottomCTAProps {
  onOpenApp: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenApp }) => {
  return (
    <section id="bottom-cta" className="bg-[#d42710] text-[#f2e0d2] py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background graphic ring */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#2f2d32]/10 pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#f2e0d2]/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block px-3.5 py-1.5 bg-[#2f2d32] text-[#f2e0d2] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 rounded-sm">
          READY TO RECLAIM FOCUS?
        </div>

        {/* H2 */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f2e0d2] leading-tight mb-6">
          Stop managing your writing.{' '}
          <span className="block underline decoration-[#2f2d32] underline-offset-8 mt-2">
            Start actually writing.
          </span>
        </h2>

        {/* Body */}
        <p className="text-lg sm:text-xl text-[#f2e0d2]/90 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Join thousands of creators who have reclaimed their attention and banished writer's block. Your most productive session is one click away.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            id="bottom-final-cta-button"
            onClick={onOpenApp}
            className="w-full sm:w-auto px-10 py-4 rounded-sm bg-[#2f2d32] hover:bg-[#f2e0d2] text-[#f2e0d2] hover:text-[#2f2d32] font-bold uppercase tracking-widest text-sm shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 group border-2 border-[#2f2d32]"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Micro-copy */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#f2e0d2]/80 pt-2">
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>14 days free</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>Cancel anytime</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>No obligations</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
