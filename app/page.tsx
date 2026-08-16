'use client';

import React, { useState, useEffect } from 'react';
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
import { WireframeBlueprintDrawer } from './_components/WireframeBlueprintDrawer';
import { DashboardView } from './(user)/_components/DashboardView';
import { usePathname } from 'next/navigation';

export default function LandingPage() {
  const pathname = usePathname();

  const [currentRoute, setCurrentRoute] = useState<'landing' | 'dashboard'>(() => {
    return pathname === '/dashboard' ? 'dashboard' : 'landing';
  });
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeFeatureForModal, setActiveFeatureForModal] = useState<string>('notes');
  const [isSpecsDrawerOpen, setIsSpecsDrawerOpen] = useState(false);
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);

  // Hash route listener
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/dashboard' || window.location.pathname === '/dashboard') {
        setCurrentRoute('dashboard');
      } else if (window.location.hash === '#/' || window.location.hash === '') {
        setCurrentRoute('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToDashboard = () => {
    window.location.hash = '#/dashboard';
    setCurrentRoute('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    window.location.hash = '#/';
    setCurrentRoute('landing');
  };

  const handleOpenAppWithFeature = (featureId: string) => {
    setActiveFeatureForModal(featureId);
    navigateToDashboard();
  };

  // If on /dashboard route, render full Dashboard view
  if (currentRoute === 'dashboard') {
    return <DashboardView onReturnHome={navigateToLanding} />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#d42710] selection:text-[#f2e0d2] ${isFocusModeActive ? 'bg-[#2f2d32] text-[#f2e0d2]' : 'bg-[#f2e0d2] text-[#2f2d32]'
        }`}
    >
      {/* Sticky Header */}
      <Header
        onOpenApp={navigateToDashboard}
        onOpenSpecs={() => setIsSpecsDrawerOpen(true)}
        isFocusMode={isFocusModeActive}
        onToggleFocusMode={() => setIsFocusModeActive(!isFocusModeActive)}
      />

      {/* 2. Hero Section */}
      <HeroSection onOpenApp={navigateToDashboard} />

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
      <BottomCTA onOpenApp={navigateToDashboard} />

      {/* 9. Footer */}
      <Footer
        onOpenSpecs={() => setIsSpecsDrawerOpen(true)}
        onOpenApp={navigateToDashboard}
      />

      {/* Interactive App Suite Sandbox Modal */}
      <InteractiveEditorModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialFeature={activeFeatureForModal}
      />

      {/* Wireframe Blueprint & Copy Specs Drawer */}
      <WireframeBlueprintDrawer
        isOpen={isSpecsDrawerOpen}
        onClose={() => setIsSpecsDrawerOpen(false)}
        onOpenApp={navigateToDashboard}
      />
    </div>
  );
}
