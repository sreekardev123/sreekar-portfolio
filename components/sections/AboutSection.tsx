"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

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
    year: "2026",
    title: "Software Developer Intern",
    company: "AIdeas Tech Solution",
    desc: "Working on AI-driven platforms supporting automation workflows, digital learning operations, and financial transaction systems using React, Node.js, and Gemini API.",
    color: "#00f5ff",
  },
  {
    year: "2025",
    title: "Full Stack Developer Intern",
    company: "24hr7 Commerce Pvt. Ltd.",
    desc: "Developed MERN-based modules improving application performance. Integrated REST APIs and MySQL DB operations supporting real-time data processing workflows.",
    color: "#7c3aed",
  },
  {
    year: "2022",
    title: "Web Developer Intern",
    company: "Habib IT Solutions",
    desc: "Built responsive UI components enhancing usability. Assisted backend integration tasks and version control workflows using Git and GitHub.",
    color: "#f59e0b",
  },
  {
    year: "2022",
    title: "Salesforce Virtual Intern",
    company: "Smart Internz",
    desc: "Practiced CRM workflow automation and debugging concepts improving process understanding and technical problem-solving capabilities.",
    color: "#ec4899",
  },
];

export default function AboutSection() {
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
                <p className="text-sm font-bold gradient-text">Junior Engineer</p>
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
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Industry Exposure</p>
                <p className="text-sm font-bold" style={{ color: "var(--gold)" }}>4 Internships</p>
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
                &nbsp;&nbsp;role: <span className="text-[#a5d6ff]">"Junior Engineer"</span>,
                <br />
                &nbsp;&nbsp;stack: [<span className="text-[#a5d6ff]">"React"</span>, <span className="text-[#a5d6ff]">"Node"</span>],
                <br />
                &nbsp;&nbsp;status: <span className="text-[#a5d6ff]">"Fresher"</span>
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
                I'm a Junior Software Engineer with a focus on developing scalable{" "}
                <span className="gradient-text font-semibold">full-stack SaaS platforms</span>
                , workflow automation systems, and backend financial applications.
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
                { label: "Availability", value: "Open to offers", aos: "fade-left", delay: "300" },
                { label: "Internships completed", value: "4", aos: "fade-right", delay: "200" },
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
                href="/assets/resume.pdf"
                download="Karanam_Sreekar_Resume.pdf"
                className="btn-primary"
              >
                Download CV
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
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
                    {item.year.slice(2)}
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
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
