import React from 'react';
import { TESTIMONIALS } from '@/lib/data/wireframeSpecs';
import { Quote, Heart, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="bg-background text-foreground py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-muted-foreground/10 border border-muted-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 text-primary" />
            <span>WALL OF LOVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-foreground">
            Used by creators who finally found their focus.
          </h2>
        </div>

        {/* 3-Column Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-background rounded-2xl p-8 border-2 border-muted-foreground/20 hover:border-primary shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Massive Vivid Red Quote Icon */}
              <div className="absolute top-4 right-4 text-[#d42710]/20 group-hover:text-[#d42710]/40 transition-colors pointer-events-none">
                <Quote className="w-16 h-16" />
              </div>

              {/* Quote text */}
              <div className="relative z-10 mb-8">
                <span className="text-4xl font-serif font-black text-primary block -mb-4">“</span>
                <p className="text-base sm:text-lg text-foreground/90 font-serif leading-relaxed italic">
                  {t.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 pt-4 border-t border-muted-foreground/10 relative z-10">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  width={12}
                  height={12}
                  className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                  referrerPolicy="no-referrer"
                  loading='eager'
                />
                <div>
                  <h4 className="font-bold text-base text-foreground flex items-center space-x-1">
                    <span>{t.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </h4>
                  <p className="text-xs font-mono text-foreground/60">{t.role}</p>
                  {t.publication && (
                    <p className="text-[10px] font-mono text-primary">{t.publication}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
