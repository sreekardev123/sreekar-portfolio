"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import LazyRender from "@/components/LazyRender";

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

const GitHubSection = dynamic(() => import("@/components/sections/GitHubSection"), { 
  ssr: false 
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { 
  ssr: false 
});

const ParticleNetworkSection = dynamic(() => import("@/components/sections/ParticleNetworkSection"), { 
  ssr: false 
});

const Footer = dynamic(() => import("@/components/Footer"), { 
  ssr: false 
});

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { 
  ssr: false 
});

export default function Home() {
  useEffect(() => {
    // Only track once per tab session to avoid double counts on page refreshes
    if (typeof window !== "undefined" && !sessionStorage.getItem("portfolio_visited")) {
      sessionStorage.setItem("portfolio_visited", "true");
      fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.href }),
      }).catch((err) => console.error("Tracking error:", err));
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      {/* Global ambient background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 hero-gradient pointer-events-none" />
      <ParticleBackground />

      <HeroSection />
      
      <LazyRender minHeight="800px">
        <ParticleNetworkSection />
      </LazyRender>
      
      <LazyRender minHeight="1000px">
        <AboutSection />
      </LazyRender>
      
      <LazyRender minHeight="800px">
        <SkillsSection />
      </LazyRender>
      
      <LazyRender minHeight="1200px">
        <ProjectsSection />
      </LazyRender>
      
      <LazyRender minHeight="800px">
        <GitHubSection />
      </LazyRender>
      
      <LazyRender minHeight="800px">
        <ContactSection />
      </LazyRender>
      
      <Footer />
    </main>
  );
}
