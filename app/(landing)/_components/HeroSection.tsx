import React, { useState, useEffect } from 'react';
import { Play, Timer, Mic, Volume2, CheckCircle2, Maximize2, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter();

  // Demo Pomodoro state for hero mockup
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25:00
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [demoText, setDemoText] = useState(
    "The blank page isn't intimidating when you're equipped with focus. Rite strips away the unnecessary clutter, giving your thoughts the quiet space they need to take form..."
  );
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 1500));
      }, 1000);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isTimerRunning, secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const wordCount = demoText.trim() ? demoText.trim().split(/\s+/).length : 0;

  return (
    <section id="hero-section" className="relative bg-background text-foreground pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2f2d32_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Geometric Balance Badge */}
        <div className="inline-block px-3.5 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm rounded-sm">
          The Sanctuary for Creators
        </div>

        {/* H1 Headline - Geometric Balance tight leading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-4xl mx-auto mb-6">
          Close the tabs.<br className="hidden sm:inline" /> Silence the noise.<br />
          <span className="text-primary">Do your best work.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Rite is the all-in-one productivity suite built for creators, journalists, and planners. A singular, distraction-free space where your ideas finally get the focus they deserve.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button
            id="claim-workspace-hero-cta"
            className="w-full sm:w-auto px-10 py-8 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 group uppercase tracking-wider cursor-pointer"
            onClick={() => router.push('/user')}
          >
            <span>Claim Your Workspace</span>
            <Play className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Micro-copy */}
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground font-mono mb-14">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>No credit card required</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>Setup takes 30 seconds</span>
          </span>
        </div>

        {/* App Interactive Screen Mockup Frame */}
        <div className="relative mx-auto max-w-4xl rounded-2xl bg-foreground p-3 sm:p-4 shadow-2xl border-2 border-foreground text-left text-background transform transition-transform hover:scale-[1.005]">
          {/* Top Bar Window Chrome */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-muted-foreground/40 px-2">
            {/* Traffic lights */}
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="w-3 h-3 rounded-full bg-background/20" />
              <span className="w-3 h-3 rounded-full bg-background/20" />
              <span className="ml-3 text-xs font-mono text-background hidden sm:inline">
                draft_sprint_chapter_1.rite
              </span>
            </div>

            {/* Right Timer Badge (VIVID RED) */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold shadow-inner">
                <Timer className="w-3.5 h-3.5 animate-pulse" />
                <span>POMODORO: {formatTime(secondsLeft)}</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Body */}
          <div className="bg-card text-primary-foreground rounded-xl p-5 sm:p-8 min-h-[300px] flex flex-col justify-between shadow-inner relative">
            {/* Subtle Toolbar inside Editor */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/10 text-xs text-foreground/70 font-mono">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-foreground/70">Focus Mode: Active</span>
                <span className="text-primary font-semibold">{wordCount} words</span>
                <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAudioActive(!isAudioActive)}
                  className={`p-1.5 rounded transition-colors ${isAudioActive ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'
                    }`}
                  title="TTS Audio Preview"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button

                  className="px-2 py-1 bg-primary text-primary-foreground rounded font-semibold text-[11px] hover:bg-primary/90"
                >
                  + Add To-Do
                </button>
              </div>
            </div>

            {/* Editable Draft Preview Area */}
            <div className="flex-1">
              <textarea
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                className="w-full bg-transparent resize-none border-none outline-none font-serif text-lg sm:text-xl text-foreground leading-relaxed placeholder-foreground/40"
                rows={4}
                placeholder="Start typing your ideas here without distractions..."
              />
            </div>

            {/* Bottom App Status Bar */}
            <div className="mt-4 pt-3 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-foreground/60">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Integrated Tasks (3)</span>
                </span>
                <span>Speech-to-Text Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="italic">Click text to edit preview</span>
                <Button
                  onClick={() => router.push('/user')}
                  variant='link'
                  className="text-primary font-bold underline underline-offset-2 hover:text-primary/90 cursor-pointer"
                >
                  Open Full Suite →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
