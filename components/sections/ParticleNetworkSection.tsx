"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Code2, Cpu, Globe } from "lucide-react";

import NeuralBackground from "@/components/NeuralBackground";

// ─── Feature Cards ───────────────────────────────────────────────────────────
const features = [
  {
    icon: Code2,
    color: "var(--cyan)",
    hexColor: "#00f5ff",
    title: "Full-Stack Development",
    desc: "Building end-to-end products — from pixel-perfect UIs to scalable backend APIs.",
    number: "01",
  },
  {
    icon: Cpu,
    color: "#a78bfa",
    hexColor: "#a78bfa",
    title: "AI Integration",
    desc: "Embedding intelligent features using OpenAI, Gemini, and custom ML pipelines.",
    number: "02",
  },
  {
    icon: Globe,
    color: "#34d399",
    hexColor: "#34d399",
    title: "SaaS Architecture",
    desc: "Designing subscription platforms, multi-tenancy, billing, and auth from scratch.",
    number: "03",
  },
  {
    icon: Zap,
    color: "#fbbf24",
    hexColor: "#fbbf24",
    title: "Performance First",
    desc: "Every project ships optimised for Core Web Vitals, accessibility, and load speed.",
    number: "04",
  },
];

// ─── Feature Card Component ───────────────────────────────────────────────────
function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setShimmerPos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      key={f.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
      whileHover={{ y: -8, scale: 1.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col gap-3 rounded-2xl p-5 backdrop-blur-xl cursor-default overflow-hidden"
      style={{
        background: hovered
          ? `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, ${f.hexColor}12 0%, rgba(255,255,255,0.05) 60%)`
          : "rgba(255,255,255,0.04)",
        boxShadow: hovered
          ? `0 0 40px ${f.hexColor}25, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
          : `0 0 20px ${f.hexColor}10, 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
        transition: "all 0.3s ease",
      }}
    >
      {/* Animated border using pseudo-element workaround */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${hovered ? `${f.hexColor}50` : "rgba(255,255,255,0.08)"}`,
          transition: "border-color 0.3s ease",
        }}
      />

      {/* Glowing top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full pointer-events-none"
        style={{
          width: hovered ? "80%" : "0%",
          background: `linear-gradient(90deg, transparent, ${f.hexColor}, transparent)`,
          boxShadow: `0 0 12px ${f.hexColor}`,
          transition: "width 0.4s ease",
        }}
      />

      {/* Shimmer sweep on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
            : "transparent",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Number badge */}
      <div
        className="absolute top-4 right-4 text-xs font-mono font-bold tracking-widest pointer-events-none"
        style={{
          color: `${f.hexColor}40`,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.65rem",
        }}
      >
        {f.number}
      </div>

      {/* Icon with pulse glow */}
      <motion.div
        animate={hovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
        className="w-11 h-11 rounded-xl flex items-center justify-center relative"
        style={{
          background: `${f.hexColor}15`,
          border: `1px solid ${f.hexColor}40`,
          boxShadow: hovered ? `0 0 20px ${f.hexColor}40` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <f.icon className="w-5 h-5 relative z-10" style={{ color: f.color }} />
      </motion.div>

      {/* Title */}
      <h3
        className="text-sm font-bold leading-snug pr-6"
        style={{ color: "var(--text-primary)", fontFamily: "Clash Display, sans-serif" }}
      >
        {f.title}
      </h3>

      {/* Description */}
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
      >
        {f.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[1px] rounded-full pointer-events-none"
        style={{
          width: hovered ? "100%" : "0%",
          background: `linear-gradient(90deg, ${f.hexColor}80, transparent)`,
          transition: "width 0.5s ease 0.1s",
        }}
      />
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ParticleNetworkSection() {
  return (
    <section
      id="particle-network"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Canvas fills the whole section ── */}
      <div className="relative w-full h-[680px] md:h-[780px] flex flex-col items-center justify-center px-4">
        <NeuralBackground />

        {/* Dark gradient overlay so text is always readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,10,20,0.55) 0%, rgba(10,10,20,0.85) 100%)",
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center gap-12">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm"
            style={{
              background: "rgba(0,245,212,0.08)",
              borderColor: "rgba(0,245,212,0.25)",
            }}
          >
            <Zap className="w-4 h-4" style={{ color: "var(--cyan)" }} />
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: "var(--cyan)", fontFamily: "JetBrains Mono, monospace" }}>
              What I Bring
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-center leading-tight"
            style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}
          >
            Code that{" "}
            <span className="gradient-text">connects,</span>
            <br />
            products that{" "}
            <span style={{ color: "var(--cyan)" }}>scale.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
          >
            Move your mouse across the canvas — each particle is connected, just like every layer of a great full-stack product.
          </motion.p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {features.map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


