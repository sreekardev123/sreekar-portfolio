"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ContactScene = dynamic(() => import("@/components/ContactScene"), {
  ssr: false,
  loading: () => null,
});

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "sreekarkaranam27@gmail.com",
    href: "mailto:sreekarkaranam27@gmail.com",
    color: "#00f5ff",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/sreekar-karanam",
    href: "https://linkedin.com/in/sreekar-karanam-aba368259",
    color: "#7c3aed",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: "GitHub",
    value: "github.com/sreekardev123",
    href: "https://github.com/sreekardev123",
    color: "#f59e0b",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 9392151196",
    href: "tel:+919392151196",
    color: "#ec4899",
  },
];

type Status = "idle" | "loading" | "success" | "error";

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
    <section
      id="contact"
      className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-hidden"
    >
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
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.08), transparent)",
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
            Contact
          </span>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
          <p
            className="mt-4 max-w-lg text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's build something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Contact info + 3D */}
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="flex flex-col gap-8"
          >
            {/* 3D Scene */}
            <div
              className="relative h-56 sm:h-64 rounded-3xl overflow-hidden glass-card"
              style={{ border: "1px solid var(--border)" }}
            >
              <ContactScene />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, var(--bg-card) 100%)",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  className="text-xs font-mono uppercase tracking-widest mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Location
                </p>
                <p
                  className="text-lg font-bold gradient-text"
                  style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                  Available Globally 🌍
                </p>
              </div>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {contactInfo.map((info, i) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass-card w-full p-4 flex flex-col gap-2 cursor-pointer transition-transform hover:-translate-y-1 hover:border-[var(--cyan)]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: `${info.color}15`,
                      border: `1px solid ${info.color}30`,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-mono"
                      style={{ color: info.color }}
                    >
                      {info.label}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-primary)", fontFamily: "Cabinet Grotesk, sans-serif" }}
                    >
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability indicator */}
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)", fontFamily: "Clash Display, sans-serif" }}
                >
                  Currently Available
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Open to freelance & full-time opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="glass-card p-6 sm:p-8">
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "Clash Display, sans-serif", color: "var(--text-primary)" }}
              >
                Send a Message
              </h3>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                Fill in the form below and I'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)", fontFamily: "Cabinet Grotesk, sans-serif" }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Karanam Sreekar"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    required
                    disabled={status === "loading"}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)", fontFamily: "Cabinet Grotesk, sans-serif" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="sreekarkaranam27@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    required
                    disabled={status === "loading"}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)", fontFamily: "Cabinet Grotesk, sans-serif" }}
                  >
                    Message *
                  </label>
                  <textarea
                    className="form-input resize-none"
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    required
                    disabled={status === "loading"}
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="btn-primary w-full justify-center text-sm py-4 transition-transform active:scale-95"
                    style={{
                      opacity: status === "loading" ? 0.8 : 1,
                      cursor: status !== "idle" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : status === "success" ? (
                      <>
                        ✅ Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {/* Status messages */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    status === "success" || status === "error" ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                  }`}
                >
                  {status === "success" && (
                    <div
                      className="text-center text-sm py-3 px-4 rounded-xl mt-4"
                      style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
                    >
                      🎉 Your message has been sent successfully! I'll be in touch soon.
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      className="text-center text-sm py-3 px-4 rounded-xl mt-4"
                      style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      ❌ {errorMsg}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
