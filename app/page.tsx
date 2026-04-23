"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load components with SSR disabled to prevent AOS hydration mismatches
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { 
  ssr: false 
});

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), { 
  ssr: false 
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { 
  ssr: false 
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { 
  ssr: false 
});

const Footer = dynamic(() => import("@/components/Footer"), { 
  ssr: false 
});

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { 
  ssr: false 
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      {/* Global ambient background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 hero-gradient pointer-events-none" />
      <ParticleBackground />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
