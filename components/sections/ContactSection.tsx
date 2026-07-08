"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

const ContactScene = dynamic(() => import("@/components/ContactScene"), {
  ssr: false,
  loading: () => null,
});

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "sreekarkaranam27@gmail.com",
    href: "mailto:sreekarkaranam27@gmail.com",
    color: "#00f5ff",
    bg: "rgba(0,245,255,0.08)",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/sreekar-karanam",
    href: "https://linkedin.com/in/sreekar-karanam-aba368259",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/sreekardev123",
    href: "https://github.com/sreekardev123",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 9392151196",
    href: "tel:+919392151196",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.08)",
  },
];

type Status = "idle" | "loading" | "success" | "error";

// ── Floating Label Input ──────────────────────────────────────────────────────
function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        style={{
          position: "absolute",
          left: "16px",
          top: isActive ? "8px" : "50%",
          transform: isActive ? "translateY(0)" : "translateY(-50%)",
          fontSize: isActive ? "10px" : "14px",
          color: focused ? "var(--cyan)" : isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.35)",
          transition: "all 0.2s ease",
          pointerEvents: "none",
          fontFamily: "Cabinet Grotesk, sans-serif",
          letterSpacing: isActive ? "0.08em" : "0",
          textTransform: isActive ? "uppercase" : "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        disabled={disabled}
        required={required}
        style={{
          width: "100%",
          paddingTop: "22px",
          paddingBottom: "10px",
          paddingLeft: "16px",
          paddingRight: "16px",
          background: focused ? "rgba(0,245,255,0.03)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "14px",
          color: "rgba(255,255,255,0.92)",
          fontSize: "14px",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(0,245,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
          transition: "all 0.25s ease",
          fontFamily: "Cabinet Grotesk, sans-serif",
          caretColor: "var(--cyan)",
        }}
      />
    </div>
  );
}

// ── Floating Label Textarea ───────────────────────────────────────────────────
function FloatingTextarea({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  maxLength = 2000,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled: boolean;
  required?: boolean;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const pct = value.length / maxLength;
  const counterColor = pct > 0.9 ? "#ef4444" : pct > 0.7 ? "#f59e0b" : "rgba(255,255,255,0.3)";

  return (
    <div className="relative">
      <label
        style={{
          position: "absolute",
          left: "16px",
          top: isActive ? "10px" : "18px",
          fontSize: isActive ? "10px" : "14px",
          color: focused ? "var(--cyan)" : isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.35)",
          transition: "all 0.2s ease",
          pointerEvents: "none",
          fontFamily: "Cabinet Grotesk, sans-serif",
          letterSpacing: isActive ? "0.08em" : "0",
          textTransform: isActive ? "uppercase" : "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        rows={5}
        style={{
          width: "100%",
          paddingTop: "28px",
          paddingBottom: "36px",
          paddingLeft: "16px",
          paddingRight: "16px",
          background: focused ? "rgba(0,245,255,0.03)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "14px",
          color: "rgba(255,255,255,0.92)",
          fontSize: "14px",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(0,245,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
          transition: "all 0.25s ease",
          resize: "none",
          fontFamily: "Cabinet Grotesk, sans-serif",
          caretColor: "var(--cyan)",
        }}
      />
      {/* Character counter */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          right: "14px",
          fontSize: "11px",
          color: counterColor,
          fontFamily: "Cabinet Grotesk, sans-serif",
          transition: "color 0.3s",
        }}
      >
        {value.length} / {maxLength}
      </div>
    </div>
  );
}

// ── Success card overlay ──────────────────────────────────────────────────────
function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl text-center"
      style={{
        background: "rgba(6,6,16,0.97)",
        backdropFilter: "blur(16px)",
        zIndex: 10,
        padding: "40px",
        border: "1px solid rgba(0,245,255,0.15)",
      }}
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
          border: "2px solid rgba(0,245,255,0.4)",
          boxShadow: "0 0 40px rgba(0,245,255,0.2)",
        }}
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="var(--cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <motion.polyline
            points="20 6 9 17 4 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "Clash Display, sans-serif", color: "white" }}
      >
        Message Sent! 🚀
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-sm mb-6"
        style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "260px" }}
      >
        Thanks for reaching out! I'll get back to you within 24 hours. 🙌
      </motion.p>

      {/* Animated glow pulse */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "2px solid rgba(0,245,255,0.3)" }}
      />

      {/* Countdown bar */}
      <div style={{ width: "120px", height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          style={{ height: "100%", background: "linear-gradient(90deg, var(--cyan), var(--purple))", borderRadius: "99px" }}
        />
      </div>
      <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", marginTop: "8px" }}>Form resets in 5s</p>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ContactSection() {
  const { width, height } = useWindowSize();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-hidden">
      {status === "success" && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          style={{ position: "fixed", zIndex: 99999, top: 0, left: 0 }}
        />
      )}

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.08), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="zoom-in" className="flex flex-col items-center text-center mb-20">
          <span className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            Contact
          </span>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
          <p className="mt-4 max-w-lg text-base" style={{ color: "var(--text-muted)" }}>
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's build something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ── Left Panel ──────────────────────────────────────────────────── */}
          <div data-aos="fade-right" data-aos-delay="100" className="flex flex-col gap-6">
            {/* 3D Scene */}
            <div
              className="relative h-56 sm:h-64 rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
              <ContactScene />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,18,0.9) 100%)" }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Location
                </p>
                <p className="text-lg font-bold gradient-text" style={{ fontFamily: "Clash Display, sans-serif" }}>
                  Available Globally 🌍
                </p>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${info.color}50`;
                    (e.currentTarget as HTMLElement).style.background = info.bg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: info.bg, border: `1px solid ${info.color}30`, color: info.color }}
                  >
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: info.color }}>
                      {info.label}
                    </p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Cabinet Grotesk, sans-serif" }}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#10b981", fontFamily: "Clash Display, sans-serif" }}>
                  Currently Available
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Open to freelance & full-time opportunities
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Panel: Form ────────────────────────────────────────────── */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "32px",
              }}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[70%] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), rgba(124,58,237,0.4), transparent)" }}
              />

              <h3
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}
              >
                Send a Message
              </h3>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                Fill the form and I'll get back to you shortly.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <FloatingInput
                  label="Your Name"
                  value={formData.name}
                  onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                  placeholder="Karanam Sreekar"
                  disabled={status === "loading"}
                  required
                />
                <FloatingInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                  placeholder="sreekarkaranam27@gmail.com"
                  disabled={status === "loading"}
                  required
                />
                <FloatingTextarea
                  label="Your Message"
                  value={formData.message}
                  onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  disabled={status === "loading"}
                  required
                  maxLength={500}
                />

                {/* Error message */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-sm py-3 px-4 rounded-xl text-center"
                      style={{
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#f87171",
                      }}
                    >
                      ❌ {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  whileHover={status === "idle" ? { scale: 1.02 } : {}}
                  whileTap={status === "idle" ? { scale: 0.97 } : {}}
                  className="relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm overflow-hidden"
                  style={{
                    background:
                      status === "loading"
                        ? "rgba(255,255,255,0.07)"
                        : "linear-gradient(135deg, var(--cyan), var(--purple))",
                    color: status === "loading" ? "rgba(255,255,255,0.4)" : "#000",
                    border: status === "loading" ? "1px solid rgba(255,255,255,0.1)" : "none",
                    cursor: status !== "idle" ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: status === "idle" ? "0 0 28px rgba(0,245,255,0.25)" : "none",
                  }}
                >
                  {/* Shimmer on idle */}
                  {status === "idle" && (
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        width: "50%",
                      }}
                    />
                  )}

                  {status === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-4 h-4 border-2 rounded-full"
                        style={{ borderColor: "rgba(255,255,255,0.15)", borderTopColor: "rgba(255,255,255,0.6)" }}
                      />
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>Sending…</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success overlay */}
              <AnimatePresence>
                {status === "success" && <SuccessCard />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
