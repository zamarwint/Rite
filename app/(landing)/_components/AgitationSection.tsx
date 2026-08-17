import React, { useState } from 'react';
import { BellOff, Layers, CheckCircle2, ArrowRight, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AgitationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chaotic' | 'rite'>('chaotic');

  return (
    <section id="agitation" className="bg-background text-foreground py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Persuasive Copy */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-6">
              <BellOff className="w-3.5 h-3.5" />
              <span>THE PROBLEM WITH CREATIVE WORKFLOWS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
              You don&apos;t need another app.{' '}
              <span className="text-primary block mt-1">You need a quiet room.</span>
            </h2>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">
              Context switching is the enemy of creativity. Bouncing between a notes app, a task manager, a timer on your phone, and a separate dictation tool drains your mental energy before you write a single meaningful paragraph.
            </p>

            {/* Agitation strike-through points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted-foreground/5 border border-muted-foreground/10 text-primary">
                <XCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="line-through text-muted-foreground font-mono text-sm sm:text-base">
                  15 open tabs & browser distractions
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted-foreground/5 border border-muted-foreground/10 text-primary">
                <XCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="line-through text-muted-foreground font-mono text-sm sm:text-base">
                  Lost to-do lists scattered across apps
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted-foreground/5 border border-muted-foreground/10 text-primary">
                <XCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="line-through text-muted-foreground font-mono text-sm sm:text-base">
                  Endless ping notifications breaking flow
                </span>
              </div>
            </div>

            {/* Key Solution Highlight (VIVID RED) */}
            <div className="p-6 rounded-xl bg-primary text-primary-foreground shadow-xl border border-primary">
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                Rite puts everything you need in one window, and blocks out the rest.
              </h3>
              <p className="text-sm opacity-90">
                Unify note-taking, checklists, Pomodoro timer, and voice dictation in one seamless workspace.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contrast Graphic (Chaotic vs Rite) */}
          <div className="bg-card p-6 rounded-2xl border border-muted-foreground/10 shadow-2xl">
            {/* View Selector Tabs */}
            <div className="flex items-center justify-between mb-6 border-b border-muted-foreground/10 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Compare Work Environments:
              </span>
              <div className="flex items-center bg-background/90 p-1 rounded-lg border border-background">
                <button
                  onClick={() => setActiveTab('chaotic')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'chaotic'
                    ? 'bg-red-950 text-red-200 border border-red-800'
                    : 'text-foreground hover:text-muted-foreground'
                    }`}
                >
                  Typical Chaos
                </button>
                <button
                  onClick={() => setActiveTab('rite')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'rite'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:text-muted-foreground'
                    }`}
                >
                  The Rite Sanctuary
                </button>
              </div>
            </div>

            {/* Display Box */}
            {activeTab === 'chaotic' ? (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-foreground text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between font-bold text-primary">
                    <span className="flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                      <span>Notification (Slack #general)</span>
                    </span>
                    <span className="text-[10px]">Just now</span>
                  </div>
                  <p>&quot;Hey! Did you see the client update email&quot;</p>
                </div>

                <div className="p-4 rounded-lg bg-yellow-950 dark:bg-yellow-950/40 border border-yellow-500/30 text-yellow-200 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between font-bold text-yellow-400">
                    <span>Chrome Warning (24 Tabs)</span>
                    <span className="text-[10px]">High Memory</span>
                  </div>
                  <p>Searching for lost research document from 3 days ago...</p>
                </div>

                <div className="p-4 rounded-lg bg-purple-950 dark:bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between font-bold text-purple-400">
                    <span>Timer App</span>
                    <span className="text-[10px]">App Switcher</span>
                  </div>
                  <p>Timer interrupted by phone notification.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-6 rounded-xl bg-background text-foreground border-2 border-primary/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-background/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span className="font-serif font-bold text-lg">Rite Workspace</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold">
                      FOCUS MODE: ACTIVE
                    </span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed text-foreground">
                    &quot;All notifications silenced. Notes, outline tasks, dictation engine, and sprint timer synced in 1 minimal view.&quot;
                  </p>
                  <div className="flex items-center justify-between pt-2 text-xs font-mono text-muted-foreground/70">
                    <span>Zero Context Switches</span>
                    <span className="text-primary font-bold">100% Flow State</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
