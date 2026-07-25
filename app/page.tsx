'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/portfolio/loading-screen';
import CustomCursor from '@/components/portfolio/custom-cursor';
import SmoothScroll from '@/components/portfolio/smooth-scroll';
import Navbar from '@/components/portfolio/navbar';
import HeroSection from '@/components/portfolio/hero-section';
import AboutSection from '@/components/portfolio/about-section';
import SkillsSection from '@/components/portfolio/skills-section';
import ProjectsSection from '@/components/portfolio/projects-section';
import TimelineSection from '@/components/portfolio/timeline-section';
import CertificatesSection from '@/components/portfolio/certificates-section';
import ResearchSection from '@/components/portfolio/research-section';
import ContactSection from '@/components/portfolio/contact-section';
import Footer from '@/components/portfolio/footer';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <TimelineSection />
          <CertificatesSection />
          <ResearchSection />
          <ContactSection />
        </main>
        <Footer />
      </SmoothScroll>
      <Toaster position="bottom-right" />
    </>
  );
}
