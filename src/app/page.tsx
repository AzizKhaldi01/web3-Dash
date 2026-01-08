'use client';

import React, { useState, useEffect } from 'react';
import { PriceTicker } from '@/components/landing/PriceTicker';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { AboutSection } from '@/components/landing/AboutSection';
import { ExchangePreview } from '@/components/landing/ExchangePreview';
import { TradeSection } from '@/components/landing/TradeSection';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { Roadmap } from '@/components/landing/Roadmap';
import { FAQSection } from '@/components/landing/FAQSection';
import { Investors } from '@/components/landing/Investors';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import { BackToTop } from '@/components/landing/BackToTop';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit'] overflow-hidden relative">
      <div className="grain-overlay" />
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#4fffa8] blur-[150px] opacity-10 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#4fffa8] blur-[150px] opacity-10 rounded-full pointer-events-none" />

      <Header
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Hero />

      <PriceTicker />

      <AboutSection />

      <ExchangePreview />

      <TradeSection />

      <FeaturesGrid />

      <Roadmap />

      <FAQSection />

      <Investors />

      <CTASection />

      <Footer />

      <BackToTop scrolled={scrolled} />
    </div>
  );
}
