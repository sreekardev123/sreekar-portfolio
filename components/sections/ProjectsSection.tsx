"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "SMM",
    subtitle: "AI-Powered Social Media Automation Platform",
    description:
      "Architected AI content automation using Google Gemini API for captions and images. Built image-to-video compiling using FFmpeg, and integrated Meta Graph, LinkedIn, YouTube, and Twitter Puppeteer automation. Reduced manual content creation by 85% with cron-based scheduling.",
    tags: ["React", "JavaScript", "Vite", "Node.js", "Express.js", "PostgreSQL", "Google Gemini API", "FFmpeg", "Cloudinary", "Puppeteer", "JWT"],
    color: "var(--cyan)",
    gradient: "from-[#00f5ff20] to-[#7c3aed20]",
    stats: { stars: 12, forks: 3 },
    live: "#",
    github: "https://github.com/AIdeas-Tech-Solutions-Private-Limited/smmaideas",
    featured: true,
    emoji: "🤖",
    bg: "linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(124,58,237,0.1) 100%)",
    image: "/assets/smm-automation.png",
    imagePosition: "object-center",
  },
  {
    id: 2,
    title: "AIdeas Academy",
    subtitle: "Learning Management System",
    description:
      "Designed a modular LMS architecture supporting 4 user roles. Built a scalable PostgreSQL schema with 8 normalized tables using Drizzle ORM, reducing query time by 40%. Implemented Nodemailer welcome system and secure REST APIs with JWT refresh flows.",
    tags: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "JWT", "Zod", "Nodemailer", "Multer"],
    color: "var(--purple)",
    gradient: "from-[#7c3aed20] to-[#ec489920]",
    stats: { stars: 8, forks: 2 },
    live: "#",
    github: "#",
    featured: true,
    emoji: "🎓",
    bg: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(236,72,153,0.1) 100%)",
    image: "/assets/lms.png",
  },
  {
    id: 3,
    title: "Enterprise CRM",
    subtitle: "Role-Based Sales & Lead Management System",
    description:
      "Architected role-based access control (RBAC) for 5 corporate roles with table-level permissions. Developed stateful lead conversion engine, pipeline analytics dashboard using Recharts/Redux Toolkit, and secured APIs using Helmet, Bcrypt, and Prisma.",
    tags: ["Next.js", "React", "TypeScript", "Redux Toolkit", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT", "Zod", "Recharts"],
    color: "#3b82f6",
    gradient: "from-[#3b82f620] to-[#8b5cf620]",
    stats: { stars: 10, forks: 2 },
    live: "#",
    github: "https://github.com/AIdeas-Tech-Solutions-Private-Limited/crm-webapp",
    githubBackend: "https://github.com/AIdeas-Tech-Solutions-Private-Limited/crm-api",
    featured: true,
    emoji: "📈",
    bg: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)",
    image: "/assets/crm-project.png",
    imagePosition: "object-center",
  },
  {
    id: 4,
    title: "Trendzity",
    subtitle: "Influencer Campaign & Wallet Management Platform",
    description:
      "Built double-entry ledger system with separation of withdrawable/non-withdrawable balances. Processed 1000+ wallet transactions with secure Razorpay integration. Integrated Meta, LinkedIn, YouTube, and Telegram APIs for campaigns, reducing manual finance overhead by 35%.",
    tags: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Razorpay", "JWT", "Cloudinary"],
    color: "var(--gold)",
    gradient: "from-[#f59e0b20] to-[#ef444420]",
    stats: { stars: 15, forks: 4 },
    live: "https://impact-earn-market-l7bd.vercel.app/",
    github: "https://github.com/sreekardev123/Trendzity-Frontend-",
    githubBackend: "https://github.com/sreekardev123/Trendzity-Backend",
    featured: true,
    emoji: "💰",
    bg: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(239,68,68,0.1) 100%)",
    image: "/assets/brand.png",
  },
  {
    id: 5,
    title: "Netflix Clone",
    subtitle: "Frontend Streaming Application",
    description:
      "Developed a Netflix clone emphasizing a responsive and dynamic UI. Leveraged Tailwind CSS for efficient styling, Swiper for content carousels, and React Router for seamless navigation.",
    tags: ["React.js", "Tailwind CSS", "React Router", "Swiper"],
    color: "#ef4444",
    gradient: "from-[#ef444420] to-[#00000020]",
    stats: { stars: 20, forks: 5 },
    live: "https://netflix-c2n1.vercel.app/",
    github: "https://github.com/sreekardev123/netflix",
    featured: false,
    emoji: "🍿",
    bg: "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(0,0,0,0.1) 100%)",
    image: "/assets/netflix-project.png",
    imagePosition: "object-center",
  },
  {
    id: 6,
    title: "Multi-Role Auth Platform",
    subtitle: "Full-Stack Landing Page",
    description:
      "Responsive landing page with four distinct login roles (Admin, Professional, Client, Employee). Includes secure OTP and Security Question dual authentication stored in MySQL.",
    tags: ["React.js", "Node.js", "MySQL", "Nodemailer"],
    color: "#3b82f6",
    gradient: "from-[#3b82f620] to-[#8b5cf620]",
    stats: { stars: 10, forks: 2 },
    live: "#",
    github: "#",
    featured: false,
    emoji: "🔐",
    bg: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)",
    image: "/assets/multirole.png",
  },
  {
    id: 7,
    title: "Digital Marketing Platform",
    subtitle: "Multi-Service Web Architecture",
    description:
      "Backend API and UI covering 13 digital services. Handles automated email notifications, form validation, and MySQL integrations for real-time reliable data processing.",
    tags: ["React.js", "Node.js", "Express.js", "MySQL"],
    color: "#10b981",
    gradient: "from-[#10b98120] to-[#3b82f620]",
    stats: { stars: 14, forks: 4 },
    live: "#",
    github: "#",
    featured: false,
    emoji: "📈",
    bg: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.1) 100%)",
    image: "/assets/image.png",
  },
  {
    id: 8,
    title: "AI Business Chatbot",
    subtitle: "Interactive AI Assistant",
    description:
      "Interactive chatbot featuring speech synthesis, dynamic form handling, and secure OTP management. Includes a 4-module dashboard to manage user data.",
    tags: ["React.js", "Node.js", "Express.js", "MySQL"],
    color: "#8b5cf6",
    gradient: "from-[#8b5cf620] to-[#ec489920]",
    stats: { stars: 18, forks: 6 },
    live: "#",
    github: "#",
    featured: false,
    emoji: "💬",
    bg: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(236,72,153,0.1) 100%)",
    image: "/assets/chatbot.png",
  },
  {
    id: 9,
    title: "AI Image Generator",
    subtitle: "Text-to-Image Application",
    description:
      "Generates diverse AI images dynamically from text prompts. Integrated Hugging Face APIs and optimized Node.js backends for faster image rendering performance.",
    tags: ["JavaScript", "Node.js", "Express.js", "Hugging Face"],
    color: "#ec4899",
    gradient: "from-[#ec489920] to-[#f43f5e20]",
    stats: { stars: 25, forks: 8 },
    live: "#",
    github: "#",
    featured: false,
    emoji: "🎨",
    bg: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(244,63,94,0.1) 100%)",
    image: "/assets/aiimage.png",
    imagePosition: "object-center",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg tilt
    const rotateY = ((x - centerX) / centerX) * 5;

    setMousePos({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      data-aos={index % 3 === 0 ? "fade-right" : index % 3 === 1 ? "zoom-in-up" : "fade-left"}
      data-aos-delay={index * 150}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card overflow-hidden group cursor-pointer h-full"
      style={{ perspective: "1000px" }}
    >
      <div
        className="transition-transform duration-200 ease-out h-full flex flex-col"
        style={{
          transform: hovered 
            ? `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.02)` 
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Card top — visual */}
        <div
          className="relative h-48 flex items-center justify-center overflow-hidden"
          style={{ background: project.bg }}
        >
          {/* Image OR Emoji Background */}
          {project.image ? (
            <>
              {/* The Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`absolute inset-0 object-cover transition-transform duration-700 ease-out ${(project as any).imagePosition || "object-top"}`}
                style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Optional: Add a dark overlay so the badge stays readable */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </>
          ) : (
            <>
              {/* Animated grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `linear-gradient(${project.color}20 1px, transparent 1px), linear-gradient(90deg, ${project.color}20 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Big emoji */}
              <div
                className="text-7xl relative z-10 transition-transform duration-300"
                style={{ transform: hovered ? "scale(1.2) rotate(5deg)" : "scale(1) rotate(0deg)" }}
              >
                {project.emoji}
              </div>

              {/* Glow orb */}
              <div
                className="absolute w-32 h-32 rounded-full blur-2xl transition-all duration-300"
                style={{ 
                  background: project.color,
                  transform: hovered ? "scale(1.5)" : "scale(1)",
                  opacity: hovered ? 0.3 : 0.15
                }}
              />
            </>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-bold"
              style={{
                background: `${project.color}20`,
                border: `1px solid ${project.color}50`,
                color: project.color,
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col gap-4 flex-grow">
          <div>
            <p
              className="text-xs font-mono mb-1"
              style={{ color: project.color }}
            >
              {project.subtitle}
            </p>
            <h3
              className="text-xl font-bold"
              style={{
                fontFamily: "Clash Display, sans-serif",
                color: "var(--text-primary)",
              }}
            >
              {project.title}
            </h3>
          </div>

          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t mt-auto" style={{ borderColor: "var(--border)" }}>
            <div className="flex gap-3 ml-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* @ts-ignore */}
                {project.githubBackend ? "Frontend Code" : "Code"}
              </a>
              {/* @ts-ignore */}
              {project.githubBackend && (
                <a
                  /* @ts-ignore */
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Backend Code
                </a>
              )}
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg font-semibold hover:scale-105 active:scale-95 transition-transform"
                style={{
                  background: project.color,
                  color: "#000",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const filtered = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(0,245,255,0.05), transparent)",
        }}
      />

      <motion.div style={{ y: contentY }} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          data-aos="zoom-in-down"
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            Portfolio
          </span>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <p
            className="mt-4 max-w-xl text-base"
            style={{ color: "var(--text-muted)" }}
          >
            A selection of my best work — from complex SaaS platforms to
            immersive 3D experiences.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex justify-center gap-3 mb-12"
        >
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-6 py-2.5 rounded-full text-sm font-medium capitalize transition-all hover:scale-105 active:scale-95"
              style={{
                fontFamily: "Cabinet Grotesk, sans-serif",
                background:
                  filter === f
                    ? "linear-gradient(135deg, var(--cyan), var(--purple))"
                    : "var(--bg-card)",
                color: filter === f ? "#000" : "var(--text-muted)",
                border: filter === f ? "none" : "1px solid var(--border)",
              }}
            >
              {f === "all" ? `All Projects (${projects.length})` : `Featured (${projects.filter(p => p.featured).length})`}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <div
          data-aos="fade-up"
          data-aos-offset="-50"
          className="flex justify-center mt-16"
        >
          <a
            href="https://github.com/sreekardev123"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All on GitHub
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
