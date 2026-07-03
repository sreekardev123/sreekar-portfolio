"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

const RESUME_PATH = "/assets/Sreekar_Karanam_Resume.pdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = RESUME_PATH;
    link.download = "Sreekar_Karanam_Resume.pdf";
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] cursor-pointer"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[9999] flex flex-col rounded-3xl overflow-hidden"
            style={{
              background: "rgba(10,10,20,0.95)",
              border: "1px solid rgba(0,245,255,0.2)",
              boxShadow: "0 0 80px rgba(0,245,255,0.1), 0 40px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {/* Title */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,245,255,0.15)", border: "1px solid rgba(0,245,255,0.3)" }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--cyan)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "Clash Display, sans-serif" }}>
                    Sreekar Karanam — Resume
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                    Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                    color: "#000",
                    fontFamily: "Cabinet Grotesk, sans-serif",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "var(--text-muted)",
                    fontFamily: "Cabinet Grotesk, sans-serif",
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open
                </a>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "var(--text-muted)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden p-4">
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#fff" }}
                title="Resume Preview"
              />
            </div>

            {/* Bottom hint */}
            <div
              className="px-6 py-3 flex items-center justify-between flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                Press <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--text-primary)" }}>Esc</kbd> to close
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Updated July 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
