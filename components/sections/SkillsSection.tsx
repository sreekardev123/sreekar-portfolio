"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "#00f5ff",
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "⬛" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "TypeScript", icon: "🟦" },
      { name: "Three.js", icon: "🧊" },
      { name: "HTML5/CSS3", icon: "🌐" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "#7c3aed",
    skills: [
      { name: "Node.js", icon: "🟩" },
      { name: "Express.js", icon: "🚂" },
      { name: "Python", icon: "🐍" },
      { name: "Django", icon: "🎸" },
      { name: "REST APIs", icon: "🔌" },
    ],
  },
  {
    title: "Database / ORM",
    icon: "🗄️",
    color: "#f59e0b",
    skills: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🐬" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Drizzle ORM", icon: "🌧️" },
    ],
  },
  {
    title: "Tools & Concepts",
    icon: "💡",
    color: "#ec4899",
    skills: [
      { name: "Git & GitHub", icon: "🐙" },
      { name: "VS Code", icon: "💻" },
      { name: "Authentication", icon: "🔐" },
      { name: "SaaS Architecture", icon: "🏗️" },
    ],
  },
];

const techStack = [
  { name: "Next.js", icon: "⬛" },
  { name: "React.js", icon: "⚛️" },
  { name: "TypeScript", icon: "🟦" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind", icon: "💨" },
  { name: "Python", icon: "🐍" },
  { name: "Node.js", icon: "🟩" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git", icon: "🐙" },
  { name: "Express", icon: "🚂" },
  { name: "Django", icon: "🎸" },
];

function SkillBadge({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 15px -5px ${color}20`,
      }}
    >
      <span className="text-lg">{icon}</span>
      <span
        className="text-sm font-medium whitespace-nowrap"
        style={{
          color: "var(--text-primary)",
          fontFamily: "Cabinet Grotesk, sans-serif",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(124,58,237,0.06), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            My Expertise
          </span>
          <h2 className="section-title">
            Skills & <span>Technologies</span>
          </h2>
          <p
            className="mt-4 max-w-xl text-base"
            style={{ color: "var(--text-muted)" }}
          >
            A carefully curated stack of modern technologies I use to build
            exceptional digital experiences.
          </p>
        </div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.title}
              data-aos={ci % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={ci * 150}
              className="glass-card p-8 group transition-all duration-500 hover:shadow-2xl"
              style={{
                '--hover-color': `${cat.color}15`,
              } as React.CSSProperties}
            >
              {/* Card header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${cat.color}15`,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "Clash Display, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-sm font-mono mt-0.5"
                    style={{ color: cat.color }}
                  >
                    {cat.skills.length} technologies
                  </p>
                </div>
                {/* Accent line */}
                <div
                  className="ml-auto h-8 w-1 rounded-full transition-all duration-500 group-hover:h-12"
                  style={{ background: `linear-gradient(to bottom, ${cat.color}, transparent)` }}
                />
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    color={cat.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <div
          data-aos="fade-up-right"
          className="flex flex-col items-center gap-6"
        >
          <p
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Full Tech Stack
          </p>
          <div className="relative w-full overflow-hidden">
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, var(--bg-primary), transparent)",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to left, var(--bg-primary), transparent)",
              }}
            />
            <motion.div
              className="flex gap-4 p-2"
              animate={{ x: [0, -50 * techStack.length] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: "max-content" }}
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="glass-card flex items-center gap-3 px-5 py-3 flex-shrink-0 transition-transform hover:scale-105"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span
                    className="text-sm font-medium whitespace-nowrap"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "Cabinet Grotesk, sans-serif",
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
