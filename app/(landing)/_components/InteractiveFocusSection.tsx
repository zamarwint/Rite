import React, { useState } from 'react';
import { Power, Sparkles, Volume2, VolumeX, Moon, Sun, Lock } from 'lucide-react';

interface InteractiveFocusSectionProps {
  isFocusActive: boolean;
  onToggleFocus: () => void;
}

export const InteractiveFocusSection: React.FC<InteractiveFocusSectionProps> = ({
  isFocusActive,
  onToggleFocus,
}) => {
  const [isAmbientAudioOn, setIsAmbientAudioOn] = useState(false);

  return (
    <section
      id="interactive-focus"
      className={`py-24 md:py-32 transition-colors duration-700 relative overflow-hidden text-center text-foreground ${isFocusActive ? 'bg-background' : 'bg-background'
        }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag */}
        <div
          className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-6 border ${isFocusActive
            ? 'bg-primary/20 border-primary text-primary'
            : 'bg-muted-foreground/10 border-muted-foreground/20 text-muted-foreground'
            }`}
        >
          <Sparkles className="w-4 h-4 text-primary animate-spin" />
          <span>THE MAGIC MOMENT DEMO</span>
        </div>

        {/* H2 */}
        <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight mb-4">
          Enter Hyper-Focus with a single click.
        </h2>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-80 mb-12 font-normal">
          See what it feels like to silence the digital noise. Hit the switch.
        </p>

        {/* Massive Interactive Toggle Control */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <button
            id="hyper-focus-toggle-button"
            onClick={onToggleFocus}
            className={`relative group w-64 sm:w-80 h-24 sm:h-28 rounded-full p-2.5 transition-all duration-500 shadow-2xl flex items-center border-4 ${isFocusActive
              ? 'bg-primary border-background/30 text-foreground'
              : 'bg-background border-background/30 text-foreground'
              }`}
          >
            {/* Sliding Knob */}
            <div
              className={`w-20 sm:w-24 h-20 sm:h-22 rounded-full bg-[#f2e0d2] text-[#2f2d32] flex items-center justify-center font-bold text-lg shadow-lg transform transition-transform duration-500 ${isFocusActive ? 'translate-x-[150px] sm:translate-x-[200px] bg-[#f2e0d2] text-[#d42710]' : 'translate-x-0'
                }`}
            >
              <Power className={`w-8 h-8 ${isFocusActive ? 'text-[#d42710]' : 'text-[#2f2d32]'} cursor-pointer`} />
            </div>

            {/* Label text inside track */}
            <div className="absolute inset-0 flex items-center justify-between px-8 text-sm sm:text-base font-mono font-bold tracking-widest pointer-events-none">
              <span className={isFocusActive ? 'opacity-40' : 'opacity-100 text-[#f2e0d2]'}>
                OFF
              </span>
              <span className={isFocusActive ? 'opacity-100 text-[#f2e0d2] font-black' : 'opacity-40'}>
                ON
              </span>
            </div>
          </button>

          {/* Toggle Status Label */}
          <span className="font-mono text-xs uppercase tracking-widest font-bold opacity-70">
            Focus Mode [{isFocusActive ? 'ON' : 'OFF'}]
          </span>

          {/* Hidden Message that Appears when Toggled ON */}
          {isFocusActive && (
            <div className="mt-8 p-6 rounded-2xl bg-background/10 border-2 border-primary text-foreground max-w-lg mx-auto animate-fadeIn shadow-2xl">
              <p className="font-serif text-2xl font-bold text-primary mb-2">
                Ahh, much better.
              </p>
              <p className="text-base text-foreground/90 font-normal">
                This is what writing in Rite feels like. Zero notifications, zero browser tabs, pure flow.
              </p>
              <div className="mt-4 pt-4 border-t border-muted-foreground/20 flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsAmbientAudioOn(!isAmbientAudioOn)}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary text-foreground text-xs font-mono font-bold hover:bg-[#b81f0b] transition-colors"
                >
                  {isAmbientAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAmbientAudioOn ? 'Ambient Cafe Audio: ON' : 'Enable Soothing Rain Audio'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
