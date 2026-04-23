"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const roles = [
  "Junior Software Engineer",
  "Full Stack Developer",
  "React Specialist",
  "Node.js Developer",
];

const floatingIcons = [
  { 
    name: "Next.js", 
    x: -120, y: -150, delay: 0, 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-4.704 6.72h1.536l5.474 7.644c.038.053.076.106.115.158v-7.802h1.44v9.6h-1.536l-5.485-7.659c-.035-.049-.071-.097-.107-.145v7.804h-1.437v-9.6zm10.74 0h1.44v3.12h3.12v1.44h-3.12v5.04h-1.44v-9.6z"/>
      </svg>
    ),
    color: "var(--cyan)"
  },
  { 
    name: "Node.js", 
    x: 140, y: -120, delay: 0.5, 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.25 15.12L10.75 14.37V10.12L13.25 9.37V15.12M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M14.5 16.37L9.5 15.12V8.87L14.5 7.62V16.37Z"/>
      </svg>
    ),
    color: "#83cd29"
  },
  { 
    name: "TypeScript", 
    x: 160, y: 150, delay: 1, 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 0H2C0.89 0 0 0.89 0 2V22C0 23.11 0.89 24 2 24H22C23.11 24 24 23.11 24 22V2H24C24 0.89 23.11 0 22 0ZM18.72 19.04C18.36 19.64 17.9 20.15 17.3 20.57C16.63 21.05 15.65 21.36 14.36 21.49C14.07 21.52 13.8 21.52 13.56 21.52C12.4 21.52 11.4 21.32 10.56 20.91C9.72 20.5 9.04 19.92 8.5 19.16C8.5 19.16 8.5 19.16 8.5 19.14C8.48 19.1 8.46 19.06 8.44 19.01C8.25 18.66 8.08 18.28 7.94 17.88L11.23 15.93C11.36 16.36 11.53 16.73 11.75 17.06C12.03 17.47 12.41 17.8 12.92 18.06C13.43 18.32 14.01 18.45 14.65 18.45C15.34 18.45 15.89 18.29 16.3 17.97C16.48 17.83 16.59 17.65 16.64 17.43C16.64 17.43 16.64 17.43 16.64 17.42C16.65 17.3 16.63 17.18 16.59 17.07C16.55 16.92 16.48 16.79 16.37 16.68C16.03 16.35 15.42 16.11 14.54 15.95L13.17 15.71C11.64 15.44 10.45 15.01 9.61 14.43C8.77 13.85 8.13 13.04 7.69 11.98C7.45 11.41 7.33 10.77 7.33 10.06C7.33 8.78 7.72 7.7 8.5 6.82C9.28 5.94 10.37 5.3 11.76 4.9C12.49 4.69 13.31 4.58 14.22 4.58C15.11 4.58 15.95 4.7 16.72 4.94C17.49 5.18 18.2 5.56 18.84 6.09C19.48 6.62 19.98 7.3 20.35 8.14L17.2 10.1C17 9.49 16.68 8.98 16.22 8.59C15.76 8.2 15.1 8.01 14.25 8.01C13.62 8.01 13.11 8.15 12.72 8.43C12.46 8.62 12.28 8.9 12.18 9.25V9.27C12.18 9.38 12.21 9.49 12.26 9.58C12.35 9.77 12.51 9.92 12.71 10.05C13.06 10.28 13.68 10.47 14.58 10.63L15.95 10.88C17.65 11.18 18.94 11.68 19.82 12.39C20.7 13.1 21.32 14.04 21.7 15.2C21.94 15.96 22.06 16.77 22.06 17.63C22.06 19.06 21.64 20.32 20.81 21.4C19.98 22.48 18.83 23.16 17.38 23.46C16.79 23.58 16.14 23.64 15.42 23.64C14.06 23.64 12.82 23.4 11.69 22.91C10.56 22.42 9.4 21.56 8.21 20.34L11.05 18.2C11.53 18.73 12.1 19.16 12.76 19.49C13.42 19.82 14.28 19.99 15.34 19.99C16.03 19.99 16.61 19.86 17.09 19.6C17.57 19.34 17.84 19.04 17.91 18.7V18.68C17.91 18.6 17.9 18.52 17.86 18.45C17.78 18.28 17.63 18.15 17.43 18.06C17.15 17.94 16.65 17.82 15.92 17.7L14.55 17.46C14.55 17.46 14.55 17.46 14.54 17.46C13.01 17.18 11.83 16.76 10.99 16.2C10.15 15.64 9.53 14.83 9.12 13.78C8.83 13.06 8.68 12.28 8.68 11.44V11.41L11.96 11.41C11.97 12.16 12.19 12.79 12.62 13.31C13.05 13.83 13.68 14.18 14.5 14.36L15.87 14.61C17.37 14.88 18.5 15.3 19.26 15.91C20.02 16.52 20.4 17.4 20.4 18.56C20.4 19.34 20.19 20.01 19.78 20.57C19.37 21.13 18.9 21.57 18.36 21.89L18.72 19.04Z"/>
      </svg>
    ),
    color: "#3178c6"
  }
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for motion
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Transforms for the tilt effect
  const rotateX = useTransform(springY, [-500, 500], [10, -10]);
  const rotateY = useTransform(springX, [-500, 500], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "var(--nav-h)" }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ background: "rgba(0,245,255,0.06)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ background: "rgba(124,58,237,0.08)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6" data-aos="fade-right" data-aos-duration="1200">
            {/* Tag */}
            <div>
              <span className="section-tag">
                <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
                Available for work
              </span>
            </div>

            {/* Main heading */}
            <div className="flex flex-col gap-2">
              <p
                className="text-lg text-[var(--text-muted)] font-mono"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Hello, I'm
              </p>
              <h1
                className="text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight"
                style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}
              >
                Karanam
                <br />
                <span className="gradient-text text-nowrap">Sreekar</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="flex items-center gap-3">
              <span
                className="text-xl md:text-2xl font-medium"
                style={{ color: "var(--text-muted)", fontFamily: "Cabinet Grotesk, sans-serif" }}
              >
                I'm a{" "}
              </span>
              <span
                className="text-xl md:text-2xl font-bold gradient-text min-w-[20ch]"
                style={{ fontFamily: "Clash Display, sans-serif" }}
              >
                {displayed}
                <span className="animate-pulse text-[var(--cyan)]">|</span>
              </span>
            </div>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--text-muted)", fontFamily: "Cabinet Grotesk, sans-serif" }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Junior Software Engineer experienced in developing scalable full-stack SaaS platforms, workflow automation systems, and backend applications.
            </p>

            {/* Main Actions & Socials */}
            <div className="flex flex-wrap items-center gap-6 pt-4" data-aos="fade-up" data-aos-delay="300">
              <a
                href="#projects"
                className="btn-primary px-8"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View My Work
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>

              {/* Social Links In Hero */}
              <div className="flex items-center gap-3 pr-2">
                <motion.a
                  href="https://linkedin.com/in/sreekar-karanam-aba368259"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[#0077b5] hover:border-[#0077b5]/30 group"
                  aria-label="LinkedIn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com/sreekardev123"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-white/30 group"
                  aria-label="GitHub"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </motion.a>
              </div>

              <a
                href="#contact"
                className="text-sm font-bold underline-offset-8 hover:underline decoration-[var(--cyan)] transition-all"
                style={{ color: "var(--text-primary)" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let's Talk →
              </a>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap gap-10 pt-8 border-t mt-4"
              style={{ borderColor: "var(--border)" }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {[
                { num: "3+", label: "Projects Built" },
                { num: "4", label: "Internships completed" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-bold gradient-text"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                  >
                    {stat.num}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-widest leading-none"
                    style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image & Interactions */}
          <div className="relative flex justify-center items-center h-full w-full" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
            {/* Interactive Glow */}
            <motion.div 
              className="absolute w-[400px] h-[400px] bg-[var(--cyan)] rounded-full blur-[100px] opacity-10"
              style={{ x: useTransform(springX, (v) => v * 0.05), y: useTransform(springY, (v) => v * 0.05) }}
            />
            
            {/* Floating Icons Orbit */}
            {floatingIcons.map((fi) => (
              <motion.div
                key={fi.name}
                className="absolute z-20 w-12 h-12 rounded-xl glass-card flex items-center justify-center p-2.5 shadow-2xl"
                style={{ 
                  left: `calc(50% + ${fi.x}px)`, 
                  top: `calc(50% + ${fi.y}px)`,
                  border: "1px solid var(--border)",
                  color: fi.color
                }}
                animate={{ 
                  y: [fi.y, fi.y - 15, fi.y],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: fi.delay,
                  ease: "easeInOut" 
                }}
              >
                {fi.icon}
              </motion.div>
            ))}

            {/* Profile Card with Parallax */}
            <motion.div 
              style={{ rotateX, rotateY, perspective: 1000 }}
              className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] rounded-[3rem] p-2 glass-card animated-border z-10"
            >
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] relative flex items-center justify-center group">
                <Image 
                  src="/assets/profile.jpg" 
                  alt="Karanam Sreekar" 
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Image Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Blending Overlay - Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}
        >
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center p-1"
          style={{ borderColor: "var(--border)" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--cyan)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
