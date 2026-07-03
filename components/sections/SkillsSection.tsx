"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "#00f5ff",
    number: "01",
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
    number: "02",
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
    number: "03",
    skills: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🐬" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Drizzle ORM", icon: "🌧️" },
      { name: "Prisma ORM", icon: "⬟" },
    ],
  },
  {
    title: "Tools & Concepts",
    icon: "💡",
    color: "#ec4899",
    number: "04",
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

// ─── Skill Badge ──────────────────────────────────────────────────────────────
function SkillBadge({ name, icon, color }: { name: string; icon: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-pointer"
      style={{
        background: hovered ? `${color}20` : `${color}10`,
        border: `1px solid ${hovered ? `${color}60` : `${color}30`}`,
        boxShadow: hovered ? `0 4px 20px ${color}30, 0 0 0 1px ${color}15` : `0 2px 8px ${color}10`,
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <span className="text-base">{icon}</span>
      <span
        className="text-sm font-medium whitespace-nowrap"
        style={{ color: hovered ? color : "var(--text-primary)", fontFamily: "Cabinet Grotesk, sans-serif", transition: "color 0.2s" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

// ─── Skill Card ───────────────────────────────────────────────────────────────
function SkillCard({ cat, ci }: { cat: typeof skillCategories[0]; ci: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      data-aos={ci % 2 === 0 ? "fade-right" : "fade-left"}
      data-aos-delay={ci * 120}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative rounded-2xl p-8 overflow-hidden cursor-default group"
      style={{
        background: hovered
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${cat.color}12 0%, rgba(255,255,255,0.04) 70%)`
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? `${cat.color}40` : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 0 50px ${cat.color}18, 0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
          : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        transition: "all 0.35s ease",
      }}
    >
      {/* Mouse-tracked glow orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "200px",
          height: "200px",
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Glowing top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full pointer-events-none"
        style={{
          width: hovered ? "70%" : "0%",
          background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
          boxShadow: `0 0 16px ${cat.color}`,
          transition: "width 0.4s ease",
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-8 rounded-r-full pointer-events-none"
        style={{
          width: "3px",
          height: hovered ? "60%" : "30%",
          background: `linear-gradient(to bottom, ${cat.color}, ${cat.color}20)`,
          boxShadow: `2px 0 12px ${cat.color}60`,
          transition: "height 0.4s ease",
        }}
      />

      {/* Big decorative number */}
      <div
        className="absolute bottom-4 right-6 font-black pointer-events-none select-none"
        style={{
          fontSize: "7rem",
          lineHeight: 1,
          color: `${cat.color}07`,
          fontFamily: "Clash Display, sans-serif",
          transition: "color 0.3s ease",
        }}
      >
        {cat.number}
      </div>

      {/* Bottom sweep line */}
      <div
        className="absolute bottom-0 left-0 h-[1px] pointer-events-none"
        style={{
          width: hovered ? "100%" : "0%",
          background: `linear-gradient(90deg, ${cat.color}60, transparent)`,
          transition: "width 0.5s ease 0.1s",
        }}
      />

      {/* Card header */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <motion.div
          animate={hovered ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
          className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: `${cat.color}15`,
            border: `1px solid ${cat.color}40`,
            boxShadow: hovered ? `0 0 20px ${cat.color}40` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {cat.icon}
        </motion.div>
        <div>
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}
          >
            {cat.title}
          </h3>
          <p className="text-sm font-mono mt-0.5" style={{ color: cat.color }}>
            <CountUp end={cat.skills.length} hovered={hovered} /> technologies
          </p>
        </div>
      </div>

      {/* Skill Badges */}
      <div className="relative z-10 flex flex-wrap gap-3">
        {cat.skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: si * 0.06 + ci * 0.1 }}
          >
            <SkillBadge name={skill.name} icon={skill.icon} color={cat.color} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Count Up ────────────────────────────────────────────────────────────────
function CountUp({ end, hovered }: { end: number; hovered: boolean }) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  if (!hasRun.current && hovered) {
    hasRun.current = true;
    let start = 0;
    const step = () => {
      start++;
      setCount(start);
      if (start < end) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if (!hovered && hasRun.current) {
    hasRun.current = false;
    setCount(end);
  }

  return <span>{count || end}</span>;
}

// ─── Section ─────────────────────────────────────────────────────────────────
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
        <div data-aos="zoom-in" className="flex flex-col items-center text-center mb-20">
          <span className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            My Expertise
          </span>
          <h2 className="section-title">
            Skills & <span>Technologies</span>
          </h2>
          <p className="mt-4 max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
            A carefully curated stack of modern technologies I use to build exceptional digital
            experiences.
          </p>
        </div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((cat, ci) => (
            <SkillCard key={cat.title} cat={cat} ci={ci} />
          ))}
        </div>

        {/* Tech stack marquee — untouched */}
        <div data-aos="fade-up-right" className="flex flex-col items-center gap-6">
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
              style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }}
            />
            <motion.div
              className="flex gap-4 p-2"
              animate={{ x: [0, -50 * techStack.length] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
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
                    style={{ color: "var(--text-primary)", fontFamily: "Cabinet Grotesk, sans-serif" }}
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
