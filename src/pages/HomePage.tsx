import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Hero } from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { ConcernFinder } from '../components/home/ConcernFinder';
import { ServicesSection } from '../components/home/ServicesSection';
import { ErgonomicHubSection } from '../components/home/ErgonomicHubSection';
import { DoctorProfileSection } from '../components/home/DoctorProfileSection';
import { FirstVisitProcess } from '../components/home/FirstVisitProcess';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { FAQSection } from '../components/home/FAQSection';
import { LocationSection } from '../components/home/LocationSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Dr Hashi Chiropractic | Best Chiropractor in Electronic City, Bangalore"
        description="Top-rated chiropractic care & spinal wellness by Dr Shinto Thomas in Electronic City, Bangalore. Gentle adjustments for back pain, neck pain, sciatica, and posture correction."
      />
      <main>
        <Hero />
        <TrustBar />
        <ConcernFinder />
        <ServicesSection />
        <ErgonomicHubSection />
        <DoctorProfileSection />
        <FirstVisitProcess />
        <ReviewsSection />
        <FAQSection />
        <LocationSection />
      </main>
    </>
  );
};
