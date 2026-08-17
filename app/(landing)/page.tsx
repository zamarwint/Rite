'use client';

import { useState } from 'react';
import { Header } from './_components/Header';
import { HeroSection } from './_components/HeroSection';
import { SocialProofSection } from './_components/SocialProofSection';
import { AgitationSection } from './_components/AgitationSection';
import { FeaturesSection } from './_components/FeaturesSection';
import { InteractiveFocusSection } from './_components/InteractiveFocusSection';
import { TestimonialsSection } from './_components/TestimonialsSection';
import { BottomCTA } from './_components/BottomCTA';
import { Footer } from './_components/Footer';
import { InteractiveEditorModal } from './_components/InteractiveEditorModal';

export default function LandingPage() {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeFeatureForModal, setActiveFeatureForModal] = useState<string>('notes');
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);

  const handleOpenAppWithFeature = (featureId: string) => {
    setActiveFeatureForModal(featureId);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#d42710] selection:text-[#f2e0d2] ${isFocusModeActive ? 'bg-[#2f2d32] text-[#f2e0d2]' : 'bg-[#f2e0d2] text-[#2f2d32]'
        }`}
    >
      {/* Sticky Header */}
      <Header
        isFocusMode={isFocusModeActive}
        onToggleFocusMode={() => setIsFocusModeActive(!isFocusModeActive)}
      />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Social Proof Authority Strip */}
      <SocialProofSection />

      {/* 4. Problem Agitation Section */}
      <AgitationSection />

      {/* 5. Core Features Grid */}
      <FeaturesSection onOpenAppWithFeature={handleOpenAppWithFeature} />

      {/* 6. Interactive Focus Section (The Magic Moment) */}
      <InteractiveFocusSection
        isFocusActive={isFocusModeActive}
        onToggleFocus={() => setIsFocusModeActive(!isFocusModeActive)}
      />

      {/* 7. Wall of Love Testimonials */}
      <TestimonialsSection />

      {/* 8. Bottom CTA Hook */}
      <BottomCTA />

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
