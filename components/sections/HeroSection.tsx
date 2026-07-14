"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useUISounds } from "@/hooks/useUISounds";
import dynamic from "next/dynamic";
import ResumeModal from "@/components/ResumeModal";

const WovenCanvas = dynamic(() => import("../WovenCanvas"), {
  ssr: false,
});

const roles = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Developer",
];

// ─── All Tech Stack SVG Icons ──────────────────────────────────────────────
type SvgFC = React.FC<React.SVGProps<SVGSVGElement>>;

const IconReact: SvgFC = (p) => (
  <svg {...p} viewBox="-11.5 -10.23 23 20.46" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const IconNextjs: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.663 19.349l-6.23-8.692V19.35h-1.636V6.72h1.636l6.23 8.692V6.72h1.636v12.63h-1.636z"/>
  </svg>
);

const IconTypeScript: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <rect width="24" height="24" rx="3" fill="currentColor" opacity="0.15"/>
    <path d="M3 3h18v18H3V3zm10.5 10.5v-1.5H9v1.5h1.5v4.5h1.5v-4.5h1.5zm1.5-1.5h4.5v1.5H18v4.5h-1.5v-4.5H15v-1.5z" fill="currentColor"/>
  </svg>
);

const IconTailwind: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C13.27 10.85 14.34 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.23 7.15 14.16 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.27 16.85 9.34 18 11.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.23 13.15 9.16 12 7 12z"/>
  </svg>
);

const IconNodejs: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.8-.78 1.36v9.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.5-.2-.78-.2zM12 4l6 3.5v7L12 18l-6-3.5v-7L12 4zm0 2.5L8 9v6l4 2.5 4-2.5V9l-4-2.5z"/>
  </svg>
);

const IconPython: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-2.76 0-5 .67-5 3v2h5v1H5.5C3.57 8 2 9.57 2 11.5v3C2 16.43 3.57 18 5.5 18H7v-2.5C7 13.57 8.57 12 10.5 12H14c1.1 0 2-.9 2-2V5c0-1.66-1.34-3-3-3zM10 4.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 17.5c2.76 0 5-.67 5-3v-2h-5v-1h6.5c1.93 0 3.5-1.57 3.5-3.5v-3C22 7.57 20.43 6 18.5 6H17v2.5C17 10.43 15.43 12 13.5 12H10c-1.1 0-2 .9-2 2v5c0 1.66 1.34 3 3 3zm4-3.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const IconExpress: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.594a5.523 5.523 0 01-5.79 4.minimal A6.15 6.15 0 01.002 11.576zm1.12-.261l7.808-.004c-.68-3.633-4.532-4.944-7.808.004z"/>
  </svg>
);

const IconDjango: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.364 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.904l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v3.97H17.39z"/>
  </svg>
);

const IconPostgres: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.128 0a10.134 10.134 0 00-2.755.403C13.552.17 12.755.08 11.976.068 10.075.038 8.706.5 7.745 1.264a6.888 6.888 0 00-.874-.248C3.745.328 1.34 2.286.925 5.21c-.18 1.256-.024 2.539.43 3.748-.508.943-.798 1.991-.855 3.06C.39 14.753 2.035 17.13 4.624 18.22c.508 1.098.957 1.746 1.474 2.232.973.908 1.956 1.154 3.015.748a4.9 4.9 0 001.087-.43c.366.09.748.14 1.145.145 1.004.016 1.93-.286 2.72-.824.524.313 1.025.451 1.564.416.964-.061 1.83-.78 2.648-2.312 2.589-1.09 4.234-3.466 4.124-6.2a6.61 6.61 0 00-.855-3.059c.453-1.21.61-2.492.43-3.748C21.586 1.65 19.602-.076 17.128 0zM12 2c.627 0 1.23.08 1.806.222a5.01 5.01 0 00-.765.76C12.43 3.72 12 4.812 12 6c0 1.186.43 2.28 1.04 3.016.377.454.8.738 1.24.853l.222.043c0 2.5-.686 4.3-2.048 5.443C11.11 16.22 9.56 16.8 8.04 16.8c-.95 0-1.777-.214-2.49-.636-.51-.303-.933-.7-1.276-1.178 2.082-.563 3.684-2.072 4.32-4.1.264.11.539.173.821.173 1.29 0 2.349-.88 2.585-2.06 0 0 0-.001.001-.001C12 8.75 12 8.5 12 8.25c0-.29-.019-.574-.055-.849L12 7.4V6c0-.977.362-1.874.962-2.587A5.79 5.79 0 0112 2zm6.166.174c1.94.012 3.485 1.34 3.718 3.205.14 1.08-.1 2.185-.665 3.163l-.08.14-.031.133c-.31 1.34-.184 2.605.35 3.56-.02.067-.041.134-.064.2-.46 1.364-1.536 2.378-2.963 2.81a3.13 3.13 0 01-1.34.098c.152-.49.232-1.015.232-1.568V9.16c.27-.223.53-.49.755-.808C18.75 7.504 19.2 6.368 19.2 5.2c0-.92-.24-1.777-.67-2.518.193-.214.407-.386.636-.508zm-7.82 10.42c.04.036.08.07.12.106.424.354.9.617 1.408.783.043.188.089.372.142.55.326 1.114.966 1.972 1.842 2.484-.3.166-.636.25-.988.24a2.614 2.614 0 01-1.19-.314c-.374-.197-.72-.484-1.04-.857-.28-.327-.55-.738-.81-1.23-.01-.018-.02-.038-.029-.057a9.636 9.636 0 00.545-1.705zm-2.302-.57a7.26 7.26 0 01-1.63 3.015 3.985 3.985 0 01-.855-.596c-.44-.407-.796-.924-1.054-1.543 1.045-.29 2.04-.737 2.955-1.333.197.16.39.31.584.457z"/>
  </svg>
);

const IconMySQL: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.32-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.165zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.57 2.14.38.453.97.68 1.773.68a2.1 2.1 0 001.002-.206l1.12.56-.9.633zm-1.81-1.87c-.166.404-.44.606-.818.606-.395 0-.672-.202-.83-.605-.16-.404-.242-.956-.242-1.656 0-.71.08-1.256.242-1.645.158-.39.435-.585.83-.585.386 0 .66.197.826.59.165.393.247.942.247 1.648 0 .695-.082 1.245-.255 1.647z"/>
  </svg>
);

const IconMongoDB: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
  </svg>
);

const IconGit: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 011.33 3.137 1.846 1.846 0 01-2.59-2.59 1.85 1.85 0 00-.403-2.014L12.86 8.785v6.74a1.846 1.846 0 11-1.862.018V8.766a1.846 1.846 0 01-1.01-2.419L7.272 3.627.461 10.43a1.55 1.55 0 000 2.187l10.478 10.478a1.55 1.55 0 002.188 0l10.419-10.418a1.55 1.55 0 000-2.187z"/>
  </svg>
);

const IconThreejs: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.24 3.31L0 20.69l17.38-4.24L4.24 3.31zM3.56 5.04l10.91 10.91-13.23 3.23 2.32-14.14zM10.07 9.5l1.37 1.37-1.37.33-.33-1.37.33-.33zm2.46-2.46l1.37 1.37-1.37.33-.33-1.37.33-.33zm2.46-2.46l1.37 1.37-1.37.33-.33-1.37.33-.33zM24 2.16L20.84 19l-6.42-6.42L24 2.16z"/>
  </svg>
);

const IconHTML5: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

const IconDrizzle: SvgFC = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 5.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zM14 7a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 0114 7zm3.5 2.75a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zM10.5 5.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zM7 7a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 017 7zm3.5 2.75a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75z"/>
    <rect x="3" y="13" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
    <path d="M6 16.5h3v1.5H6v-1.5zm5 0h3v1.5h-3v-1.5zm5 0h2v1.5h-2v-1.5z" opacity="0.6"/>
  </svg>
);

const TECH_CONFIG: Record<string, { svg: SvgFC; color: string }> = {
  React:       { color: "#61dafb", svg: IconReact },
  "Next.js":   { color: "#ffffff", svg: IconNextjs },
  TypeScript:  { color: "#3178c6", svg: IconTypeScript },
  Tailwind:    { color: "#06b6d4", svg: IconTailwind },
  "Node.js":   { color: "#83cd29", svg: IconNodejs },
  Python:      { color: "#3776ab", svg: IconPython },
  Express:     { color: "#888888", svg: IconExpress },
  Django:      { color: "#092e20", svg: IconDjango },
  PostgreSQL:  { color: "#336791", svg: IconPostgres },
  MySQL:       { color: "#4479a1", svg: IconMySQL },
  MongoDB:     { color: "#47a248", svg: IconMongoDB },
  Git:         { color: "#f05032", svg: IconGit },
  "Three.js":  { color: "#ffffff", svg: IconThreejs },
  HTML5:       { color: "#e34f26", svg: IconHTML5 },
  Drizzle:     { color: "#c5f74f", svg: IconDrizzle },
};

// Arranged in a frame around all 4 edges, avoiding the central content zone
const TECH_SKILLS = [
  // ── TOP ROW (5 icons) ──────────────────────────────────────────────────────
  { id: 1,  name: "React",      pos: "top-[6%]  left-[4%]" },
  { id: 2,  name: "Next.js",    pos: "top-[6%]  left-[20%]" },
  { id: 3,  name: "TypeScript", pos: "top-[4%]  left-[50%] -translate-x-1/2" },
  { id: 4,  name: "Tailwind",   pos: "top-[6%]  right-[20%]" },
  { id: 5,  name: "HTML5",      pos: "top-[6%]  right-[4%]" },
  // ── LEFT SIDE (2 icons) ────────────────────────────────────────────────────
  { id: 6,  name: "Node.js",    pos: "top-[38%] left-[1%]" },
  { id: 7,  name: "Python",     pos: "top-[58%] left-[1%]" },
  // ── RIGHT SIDE (2 icons) ───────────────────────────────────────────────────
  { id: 8,  name: "Express",    pos: "top-[38%] right-[1%]" },
  { id: 9,  name: "Django",     pos: "top-[58%] right-[1%]" },
  // ── BOTTOM ROW (6 icons) ──────────────────────────────────────────────────
  { id: 10, name: "MongoDB",    pos: "bottom-[8%] left-[4%]" },
  { id: 11, name: "PostgreSQL", pos: "bottom-[8%] left-[18%]" },
  { id: 12, name: "MySQL",      pos: "bottom-[8%] left-[34%]" },
  { id: 13, name: "Drizzle",    pos: "bottom-[8%] right-[34%]" },
  { id: 14, name: "Git",        pos: "bottom-[8%] right-[18%]" },
  { id: 15, name: "Three.js",   pos: "bottom-[8%] right-[4%]" },
];

// ─── Individual icon with mouse-repulsion physics ──────────────────────────
function FloatingTechIcon({
  skill, index, mouseX, mouseY,
}: {
  skill: (typeof TECH_SKILLS)[0];
  index: number;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22 });
  const sy = useSpring(y, { stiffness: 250, damping: 22 });

  useEffect(() => {
    const onMove = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mouseX.current - cx;
      const dy = mouseY.current - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - dist / 140) * 52;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, mouseX, mouseY]);

  const cfg = TECH_CONFIG[skill.name];
  if (!cfg) return null;
  const Icon = cfg.svg;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, position: "absolute" }}
      className={skill.pos}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -9, 0, 9, 0], rotate: [0, 4, 0, -4, 0] }}
        transition={{ duration: 4.5 + (index % 5) * 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        title={skill.name}
        className="relative group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl cursor-default"
        style={{
          background: `${cfg.color}12`,
          border: `1px solid ${cfg.color}30`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 4px 20px -4px ${cfg.color}30, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        <Icon
          width={24}
          height={24}
          style={{ color: cfg.color, filter: `drop-shadow(0 0 5px ${cfg.color}66)` }}
        />
        {/* Tooltip on hover */}
        <span
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap text-[9px] font-mono px-1.5 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.8)", color: cfg.color, border: `1px solid ${cfg.color}44` }}
        >
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const { playHover, playClick, playType } = useUISounds();
  const [resumeOpen, setResumeOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-500, 500], [10, -10]);
  const rotateY = useTransform(springX, [-500, 500], [-10, 10]);

  const { scrollY } = useScroll();
  const sectionOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const sectionScale  = useTransform(scrollY, [0, 500], [1, 0.9]);
  const sectionY      = useTransform(scrollY, [0, 500], [0, 150]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseXRef.current = e.clientX;
    mouseYRef.current = e.clientY;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  useEffect(() => {
    const current = roles[roleIndex];
    let t: NodeJS.Timeout;
    if (!isDeleting && displayed.length < current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, displayed.length + 1)); if (cycleCount < 3) playType(); }, 150);
    } else if (!isDeleting && displayed.length === current.length) {
      t = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, displayed.length - 1)); if (cycleCount < 3) playType(); }, 80);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      setCycleCount((c) => c + 1);
    }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIndex, playType, cycleCount]);

  return (
    <>
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "var(--nav-h)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40" style={{ background: "rgba(0,245,255,0.06)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40" style={{ background: "rgba(124,58,237,0.08)" }} />

      {/* ── All 15 floating tech icons ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {TECH_SKILLS.map((skill, i) => (
          <FloatingTechIcon key={skill.id} skill={skill} index={i} mouseX={mouseXRef} mouseY={mouseYRef} />
        ))}
      </div>

      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left Content ── */}
          <div className="flex flex-col gap-6" data-aos="fade-right" data-aos-duration="1200">
            <div className="flex flex-col gap-2">
              <p className="text-lg text-[var(--text-muted)] font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                Hello, I'm
              </p>
              <h1 className="text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight" style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}>
                Karanam<br />
                <span className="gradient-text text-nowrap">Sreekar</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-medium" style={{ color: "var(--text-muted)", fontFamily: "Cabinet Grotesk, sans-serif" }}>I'm a </span>
              <span className="text-xl md:text-2xl font-bold gradient-text min-w-[20ch]" style={{ fontFamily: "Clash Display, sans-serif" }}>
                {displayed}<span className="animate-pulse text-[var(--cyan)]">|</span>
              </span>
            </div>

            <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-muted)", fontFamily: "Cabinet Grotesk, sans-serif" }} data-aos="fade-up" data-aos-delay="100">
              Building <span style={{ color: "var(--cyan)", fontWeight: 600 }}>AI-powered web applications</span> with React, Next.js & Node.js — turning complex ideas into scalable, production-grade products.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6 pt-4" data-aos="fade-up" data-aos-delay="300">
              <a href="#projects" className="btn-primary px-8" onMouseEnter={playHover}
                onClick={(e) => { playClick(); e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                View My Work
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>

              <button
                className="px-8 py-3.5 rounded-full text-sm font-bold transition-all flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }}
                onMouseEnter={(e) => { playHover(); const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--cyan)"; el.style.background = "rgba(0,245,255,0.04)"; el.style.color = "var(--cyan)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.background = "rgba(255,255,255,0.04)"; el.style.color = "var(--text-primary)"; }}
                onClick={() => { playClick(); setResumeOpen(true); }}>
                📄 View Resume
              </button>

              <div className="flex items-center gap-3">
                <motion.a href="https://linkedin.com/in/sreekar-karanam-aba368259" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} onMouseEnter={playHover} onClick={playClick}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[#0077b5] hover:border-[#0077b5]/30"
                  aria-label="LinkedIn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </motion.a>
                <motion.a href="https://github.com/sreekardev123" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} onMouseEnter={playHover} onClick={playClick}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-white/30"
                  aria-label="GitHub">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </motion.a>
              </div>

              <a href="#contact" className="text-sm font-bold underline-offset-8 hover:underline decoration-[var(--cyan)] transition-all"
                style={{ color: "var(--text-primary)" }} onMouseEnter={playHover}
                onClick={(e) => { playClick(); e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Let's Talk →
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 pt-8 border-t mt-4" style={{ borderColor: "var(--border)" }} data-aos="fade-up" data-aos-delay="400">
              {[
                { num: "4+", label: "Projects Shipped" },
                { num: "1 Year", label: "Experience" },
                { num: "1000+", label: "Transactions Processed" },
                { num: "85%", label: "Automation Achieved" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold gradient-text" style={{ fontFamily: "Clash Display, sans-serif" }}>{s.num}</span>
                  <span className="text-[10px] uppercase tracking-widest leading-none" style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* ── Right Side: 3D Holographic Particle Knot ── */}
          <div className="relative flex justify-center items-center h-[350px] md:h-[450px] w-full" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
              <WovenCanvas />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>Scroll</span>
        <div className="w-5 h-8 rounded-full border flex items-start justify-center p-1" style={{ borderColor: "var(--border)" }}>
          <motion.div className="w-1 h-2 rounded-full" style={{ background: "var(--cyan)" }} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
    <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
