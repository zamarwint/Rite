import React from 'react';

export const SocialProofSection: React.FC = () => {
  const platforms = [
    { name: 'Substack', desc: 'Newsletter Creators' },
    { name: 'Medium', desc: 'Top Writers' },
    { name: 'The New York Times', desc: 'Journalists' },
    { name: 'Ghost', desc: 'Independent Publishers' },
    { name: 'Patreon', desc: 'Creative Authors' },
  ];

  return (
    <section id="social-proof-section" className="bg-[#f2e0d2] text-[#2f2d32] py-10 border-y border-[#2f2d32]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-mono font-bold tracking-widest text-[#2f2d32]/60 uppercase mb-6">
          Loved by focused creators at:
        </p>

        {/* Horizontal Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group cursor-default transition-all duration-300 transform hover:scale-105"
            >
              <span className="font-serif font-black text-xl sm:text-2xl text-[#2f2d32]/40 group-hover:text-[#2f2d32] transition-colors tracking-tight">
                {platform.name}
              </span>
              <span className="text-[10px] font-mono text-[#2f2d32]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                {platform.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
