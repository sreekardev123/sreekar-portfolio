"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ResumeModal from "@/components/ResumeModal";

const AboutScene = dynamic(() => import("@/components/AboutScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center opacity-40">
      <div className="loader-ring" />
    </div>
  ),
});

const timeline = [
  {
    year: "June 2025 — May 2026",
    shortYear: "25-26",
    title: "Full Stack Developer",
    company: "AIdeas Tech Solutions Pvt Ltd",
    desc: "Built and shipped 4 production-grade SaaS platforms end-to-end as part of a core engineering team, contributing across the full stack from database schema design to deployment pipelines.",
    color: "#00f5ff",
    projects: [
      {
        name: "Trendzity — Influencer Campaign & Wallet Management Platform",
        bullets: [
          "Built double-entry ledger system with debit/credit entries and withdrawable vs non-withdrawable balance separation",
          "Processed 1,000+ wallet transactions with secure Razorpay integration supporting bank and UPI flows",
          "Built cron-based analytics sync for 500+ creator accounts with API throttling",
          "Integrated Meta, LinkedIn, YouTube, and Telegram social APIs for multi-platform campaign management",
          "Reduced manual finance handling by 35% through admin approval workflows",
          "Deployed on Render and Vercel with CI/CD pipelines reducing build-to-deploy time to under 3 minutes"
        ],
        tech: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT", "OAuth 2.0", "Razorpay", "Cloudinary"]
      },
      {
        name: "Enterprise CRM — Role-Based Sales & Lead Management System",
        bullets: [
          "Architected RBAC system for 5 corporate roles with table-level and action-level permissions",
          "Built stateful lead conversion engine managing Lead → Opportunity → Student transitions",
          "Developed analytics dashboards using Recharts and Redux Toolkit for pipeline and conversion tracking",
          "Reduced manual finance handling by 35% through structured approval workflows",
          "Secured all APIs using Helmet.js, Bcrypt, and Prisma ORM with PostgreSQL"
        ],
        tech: ["Next.js", "React", "TypeScript", "Redux Toolkit", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT", "Zod", "Recharts"]
      },
      {
        name: "AIdeas Academy — Learning Management System",
        bullets: [
          "Designed modular LMS architecture in Next.js and TypeScript supporting 4 user roles",
          "Built scalable PostgreSQL schema using Drizzle ORM with 8 normalized tables",
          "Reduced administrative query time by 40% through optimized schema design",
          "Implemented automated welcome email system using Nodemailer with Gmail SMTP",
          "Developed secure REST APIs with JWT token refresh flows and session-protected content access"
        ],
        tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "JWT", "Zod", "Nodemailer", "Multer"]
      },
      {
        name: "SMM — AI-Powered Social Media Automation Platform",
        bullets: [
          "Architected AI content automation using Google Gemini API for caption and image generation",
          "Built image-to-video engine using FFmpeg to compile AI images into video loops for YouTube",
          "Integrated Meta Graph API, LinkedIn API, YouTube Data API, and Twitter via Puppeteer automation",
          "Reduced manual content creation by 85% through end-to-end AI automation",
          "Built cron-based post scheduler with Instagram guard limits and duplicate content prevention"
        ],
        tech: ["React", "JavaScript", "Vite", "Node.js", "Express.js", "PostgreSQL", "Google Gemini API", "FFmpeg", "Cloudinary", "Puppeteer", "JWT"]
      }
    ]
  },
  {
    year: "2022",
    shortYear: "22",
    title: "Web Developer Intern",
    company: "Habib IT Solutions",
    desc: "Built responsive UI components enhancing usability. Assisted backend integration tasks and version control workflows using Git and GitHub.",
    color: "#f59e0b",
  },
  {
    year: "2022",
    shortYear: "22",
    title: "Salesforce Virtual Intern",
    company: "Smart Internz",
    desc: "Practiced CRM workflow automation and debugging concepts improving process understanding and technical problem-solving capabilities.",
    color: "#ec4899",
  },
];

export default function AboutSection() {
  const [showProjects, setShowProjects] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex flex-col items-center text-center mb-20"
          data-aos="fade-down"
        >
          <span className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            About Me
          </span>
          <h2 className="section-title">
            Who I <span>Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: 3D Scene & WOW Elements */}
          <div
            className="relative h-[520px] sm:h-[550px] lg:h-[600px] flex items-center justify-center mt-10 lg:mt-0"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {/* Animated Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-[var(--cyan)]/30 border-dashed animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] rounded-full border border-[var(--purple)]/20 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute w-[480px] h-[480px] sm:w-[550px] sm:h-[550px] rounded-full border border-[var(--cyan)]/10 border-dotted animate-[spin_40s_linear_infinite]" />
            </div>

            {/* Core 3D Scene */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden scale-90 sm:scale-100"
              style={{
                boxShadow: "inset 0 0 50px rgba(0, 245, 255, 0.1)",
              }}
            >
              <AboutScene />
            </div>

            {/* Floating Stat Card 1 */}
            <motion.div
              className="absolute top-0 right-4 sm:-right-4 glass-card px-4 py-3 flex items-center gap-3 z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,255,0.1)] border border-[var(--cyan)] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                🚀
              </div>
              <div>
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Role</p>
                <p className="text-sm font-bold gradient-text">Full Stack Developer</p>
              </div>
            </motion.div>

            {/* Floating Stat Card 2 */}
            <motion.div
              className="absolute top-44 right-4 sm:top-auto sm:bottom-12 sm:-right-8 glass-card px-4 py-3 flex items-center gap-3 z-10"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[rgba(124,58,237,0.1)] border border-[var(--purple)] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                💻
              </div>
              <div>
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Arsenal</p>
                <p className="text-sm font-bold" style={{ color: "var(--purple)" }}>15+ Technologies</p>
              </div>
            </motion.div>

            {/* Floating Stat Card 3 */}
            <motion.div
              className="absolute top-20 left-4 sm:top-20 sm:-left-4 glass-card px-4 py-3 flex items-center gap-3 z-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[var(--gold)] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                ⚡
              </div>
              <div>
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Industry Experience</p>
                <p className="text-sm font-bold" style={{ color: "var(--gold)" }}>1 Year</p>
              </div>
            </motion.div>

            {/* Live Terminal HUD Overlay */}
            <motion.div
              className="absolute bottom-0 left-4 sm:-bottom-4 sm:-left-8 glass-card p-4 rounded-xl shadow-2xl border border-[var(--border)] max-w-[240px] sm:max-w-[260px] z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex gap-1.5 mb-3 border-b border-[var(--border)] pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <pre className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--purple)" }}>const</span>{" "}
                <span style={{ color: "var(--cyan)" }}>sreekar</span> = {"{"}
                <br />
                &nbsp;&nbsp;role: <span className="text-[#a5d6ff]">"Full Stack Developer"</span>,
                <br />
                &nbsp;&nbsp;stack: [<span className="text-[#a5d6ff]">"React"</span>, <span className="text-[#a5d6ff]">"Node"</span>],
                <br />
                &nbsp;&nbsp;status: <span className="text-[#a5d6ff]">"1 Year Exp"</span>
                <br />
                {"}"};
              </pre>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            <div data-aos="fade-left" data-aos-delay="150">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                I'm a Full Stack Developer with a focus on developing scalable{" "}
                <span className="gradient-text font-semibold">full-stack SaaS platforms</span>
                , workflow automation systems, and backend applications.
              </p>
            </div>

            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
              data-aos="fade-left"
              data-aos-delay="200"
            >
              I am skilled in building secure REST APIs, authentication workflows, and 
              database-driven architectures in collaborative startup environments. I am 
              constantly focused on delivering efficient product solutions and improving 
              overall system performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Education", value: "St. Joseph's Degree College", aos: "fade-left", delay: "200" },
                { label: "Availability", value: "Open to Work", aos: "fade-left", delay: "300" },
                { label: "Experience", value: "1 Year", aos: "fade-right", delay: "200" },
                { label: "Focus", value: "Full Stack (React/Node)", aos: "fade-right", delay: "300" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card p-4 flex flex-col gap-1"
                  data-aos={item.aos}
                  data-aos-delay={item.delay}
                >
                  <span
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)", fontFamily: "Clash Display, sans-serif" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="400">
              <a
                href="/assets/Sreekar_Karanam_Resume.pdf"
                download="Sreekar_Karanam_Resume.pdf"
                className="btn-primary"
              >
                Download CV
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
              <button
                onClick={() => setResumeOpen(true)}
                className="btn-outline flex items-center gap-2"
              >
                📄 View Resume
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <div className="flex flex-col items-center text-center mb-16" data-aos="fade-up">
            <span className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
              Experience
            </span>
            <h2 className="section-title text-4xl">
              My <span>Journey</span>
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--cyan), var(--purple), transparent)" }}
            />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div
                  key={item.year + i}
                  data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={i * 100}
                  className={`relative lg:w-5/12 glass-card p-6 ${
                    i % 2 === 0 ? "lg:self-start lg:ml-0" : "lg:self-end lg:mr-0"
                  }`}
                >
                  {/* Year dot */}
                  <div
                    className="absolute top-6 hidden lg:flex items-center justify-center w-10 h-10 rounded-full border-2 text-xs font-mono font-bold"
                    style={{
                      [i % 2 === 0 ? "right" : "left"]: "-5.5rem",
                      borderColor: item.color,
                      color: item.color,
                      background: "var(--bg-primary)",
                    }}
                  >
                    {item.shortYear}
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute top-8 hidden lg:block w-3 h-3 rounded-full"
                    style={{
                      [i % 2 === 0 ? "right" : "left"]: "-2.5rem",
                      transform: "translateX(50%)",
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                  />

                  <div className="flex flex-col gap-2">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium gradient-text">{item.company}</p>
                    <p className="text-sm leading-relaxed mb-1" style={{ color: "var(--text-muted)" }}>
                      {item.desc}
                    </p>

                    {item.projects && (
                      <div className="mt-4 pt-4 border-t border-[var(--border)]">
                        <button
                          onClick={() => setShowProjects(!showProjects)}
                          className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[var(--cyan)] hover:text-white transition-colors"
                        >
                          {showProjects ? "Hide Shipped Projects ▲" : "View Shipped Projects (4) ▼"}
                        </button>
                        
                        {showProjects && (
                          <div className="mt-4 flex flex-col gap-6">
                            {item.projects.map((proj, pIdx) => (
                              <div key={proj.name} className="flex flex-col gap-2">
                                <h4 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: "Clash Display, sans-serif" }}>
                                  {proj.name}
                                </h4>
                                <ul className="list-disc pl-4 text-xs flex flex-col gap-1.5" style={{ color: "var(--text-muted)" }}>
                                  {proj.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="leading-relaxed">{bullet}</li>
                                  ))}
                                </ul>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {proj.tech.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[9px] px-2 py-0.5 rounded-full font-mono"
                                      style={{
                                        background: "rgba(0, 245, 255, 0.05)",
                                        border: "1px solid rgba(0, 245, 255, 0.15)",
                                        color: "var(--cyan)"
                                      }}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
