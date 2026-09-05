import { FEATURE_CARDS } from '@/lib/data/wireframeSpecs';
import { PenTool, CheckSquare, Timer, Mic, ArrowUpRight, Sparkles, Volume2 } from 'lucide-react';

export const FeaturesSection = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool className="w-8 h-8" />;
      case 'CheckSquare':
        return <CheckSquare className="w-8 h-8" />;
      case 'Timer':
        return <Timer className="w-8 h-8" />;
      case 'Mic':
        return <Mic className="w-8 h-8" />;
      default:
        return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <section id="features" className="bg-background text-foreground py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-muted-foreground/5 border border-muted-foreground/15 text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>CORE SUITE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-foreground tracking-tight">
            Built for the <span className="text-primary underline decoration-foreground/30">flow state.</span>
          </h2>
          <p className="text-lg text-foreground/80 mt-4 font-normal">
            Four specialized creation engines working as one cohesive environment.
          </p>
        </div>

        {/* 2x2 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.id}
              className="group relative bg-backgrond rounded-2xl p-8 border-2 border-foreground shadow-md hover:shadow-xl hover:border-primary transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-foreground text-background group-hover:bg-primary group-hover:text-background flex items-center justify-center transition-colors duration-300 shadow-sm">
                    {getIcon(card.iconName)}
                  </div>
                  {card.badge && (
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-foreground/10 text-foreground group-hover:bg-foreground/10 group-hover:text-primary transition-colors">
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Subtitle / Feature Title */}
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary mb-2">
                  {card.title}
                </p>

                {/* Main Headline (H3) */}
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {card.headline}
                </h3>

                {/* Body copy */}
                <p className="text-foreground/80 text-base leading-relaxed mb-6 font-normal">
                  {card.body}
                </p>
              </div>

              {/* Bottom Interactive Trigger Link */}
              <div className="pt-4 border-t border-foreground/10 flex items-center justify-between text-xs font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                <span>Test {card.title} Interactive Demo</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
