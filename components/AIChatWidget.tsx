"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useUISounds } from "@/hooks/useUISounds";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

// ─── Quick intro from resume ───────────────────────────────────────────────────
const QUICK_INTRO = `Hi! I am **Sreekar Karanam** — a Full Stack Developer with 1 year of professional experience building production-grade SaaS platforms.

**What I do:**
- 🚀 Built 4 end-to-end SaaS products at **AIdeas Tech Solutions Pvt Ltd**
- 💳 Processed 1,000+ wallet transactions with **Razorpay** integration
- 🤖 Architected AI content automation using **Google Gemini API** reducing manual work by 85%
- 📊 Built analytics dashboards and RBAC systems for enterprise CRM

**My Stack:** React.js · Next.js · TypeScript · Node.js · Express.js · PostgreSQL · MongoDB · Prisma ORM · Drizzle ORM · Python · Django

**Key Projects:** Trendzity (Influencer Platform) · Enterprise CRM · AIdeas LMS · SMM AI Automation · Netflix Clone · AI Image Generator

I am currently **open to work** and looking for full-stack opportunities. Ask me anything! 👋`;

// ─── Speech synthesis ─────────────────────────────────────────────────────────
function useSpeech() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const speak = (text: string, id: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speakingId === id) { setSpeakingId(null); return; }
    const clean = text.replace(/[*_`#>~\[\]()]/g, "").replace(/\n+/g, " ");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0; utterance.pitch = 1.0; utterance.volume = 1;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };
  const stop = () => { window.speechSynthesis?.cancel(); setSpeakingId(null); };
  return { speak, stop, speakingId };
}

// ─── Voice recognition hook ───────────────────────────────────────────────────
function useVoiceInput(onResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { setError("Voice not supported in this browser"); return; }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => { setIsListening(true); setError(null); };
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };
    recognition.onerror = (e: any) => {
      setError(e.error === "not-allowed" ? "Microphone permission denied" : "Voice error, try again");
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  }, [isListening, onResult]);

  return { isListening, startListening, error };
}

const SUGGESTIONS = [
  "What projects have you built?",
  "Do you know React & Next.js?",
  "What's your tech stack?",
  "Tell me about your experience",
];

function StreamingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
      className="inline-block w-[2px] h-[1em] bg-[var(--cyan)] ml-0.5 align-middle"
    />
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1 px-1">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.9, delay }}
          className="w-2 h-2 rounded-full bg-[var(--cyan)]"
        />
      ))}
    </div>
  );
}

// ─── Animated bot avatar ──────────────────────────────────────────────────────
function BotAvatar({ size = "sm", isTyping = false }: { size?: "sm" | "lg"; isTyping?: boolean }) {
  const px = size === "lg" ? 56 : 24;
  const fontSize = size === "lg" ? "22px" : "10px";
  return (
    <div className="relative flex-shrink-0" style={{ width: px, height: px }}>
      <motion.div
        animate={isTyping ? { boxShadow: ["0 0 12px rgba(0,245,255,0.3)", "0 0 24px rgba(124,58,237,0.5)", "0 0 12px rgba(0,245,255,0.3)"] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-full h-full rounded-xl flex items-center justify-center font-bold"
        style={{ background: "linear-gradient(135deg, var(--cyan), var(--purple))", color: "#000", fontSize }}
      >
        N
      </motion.div>
      {/* Orbit ring when typing */}
      {isTyping && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-[-3px] rounded-xl pointer-events-none"
          style={{ border: "1.5px dashed rgba(0,245,255,0.4)", borderTopColor: "transparent" }}
        />
      )}
      {/* Online indicator */}
      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
        style={{ background: "#00c853", border: "2px solid rgba(8,8,18,0.92)" }} />
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak, stop, speakingId } = useSpeech();
  const { playHover, playClick } = useUISounds();

  const hasMessages = messages.length > 0;
  const isTyping = isLoading;

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);
  useEffect(() => { if (!isOpen) stop(); }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    const userMessage: Message = { id: `u-${Date.now()}`, role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", isStreaming: true }]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!response.ok || !response.body) throw new Error("API request failed");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: accumulated, isStreaming: true } : m));
      }
      if (!accumulated.trim()) throw new Error("Empty response.");
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: accumulated, isStreaming: false } : m));
    } catch {
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: "⚠️ Something went wrong. Please try again.", isStreaming: false } : m));
    } finally {
      setIsLoading(false);
    }
  };

  // Quick intro — inject directly without calling the API
  const showIntro = () => {
    if (isLoading) return;
    const introId = `intro-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: "Give me a quick introduction about you" },
      { id: introId, role: "assistant", content: "", isStreaming: true },
    ]);
    // Simulate fast streaming of the pre-written intro
    let i = 0;
    const chunk = 8;
    const interval = setInterval(() => {
      i += chunk;
      const partial = QUICK_INTRO.slice(0, i);
      setMessages((prev) => prev.map((m) => m.id === introId ? { ...m, content: partial, isStreaming: true } : m));
      if (i >= QUICK_INTRO.length) {
        clearInterval(interval);
        setMessages((prev) => prev.map((m) => m.id === introId ? { ...m, content: QUICK_INTRO, isStreaming: false } : m));
      }
    }, 18);
  };

  const { isListening, startListening, error: voiceError } = useVoiceInput((text) => {
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 100);
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex flex-col"
            style={{
              width: "390px",
              height: "580px",
              maxHeight: "90vh",
              borderRadius: "22px",
              background: "rgba(6, 6, 16, 0.96)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(0,245,255,0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,245,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Animated top glow line */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 h-[1.5px] w-[70%] pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent)" }}
            />

            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.07), rgba(124,58,237,0.07))",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "14px 16px",
                flexShrink: 0,
              }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <BotAvatar size="sm" isTyping={isTyping} />
                <div>
                  <h3 className="font-semibold text-[13px] text-white leading-tight">Nova AI</h3>
                  <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {isTyping ? (
                      <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}>
                        Typing…
                      </motion.span>
                    ) : "Portfolio Assistant · Always online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Quick Intro button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { playClick(); showIntro(); }}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,245,255,0.12), rgba(124,58,237,0.12))",
                    border: "1px solid rgba(0,245,255,0.25)",
                    color: "var(--cyan)",
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  <span>👋</span> Intro
                </motion.button>
                {hasMessages && (
                  <button
                    onClick={() => setMessages([])}
                    className="text-[11px] px-2 py-1 rounded-lg transition-all"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => { playClick(); setIsOpen(false); }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => { playHover(); (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ padding: "16px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
            >
              {!hasMessages ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  {/* Big animated avatar */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="mb-4"
                  >
                    <BotAvatar size="lg" />
                  </motion.div>
                  <h4 className="font-semibold text-white mb-1" style={{ fontSize: "15px" }}>Ask me anything</h4>
                  <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.65, maxWidth: "250px" }}>
                    I know all about Sreekar's projects, skills, and experience.
                  </p>
                  {/* Intro CTA */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { playClick(); showIntro(); }}
                    className="flex items-center gap-2 text-[12px] font-semibold px-4 py-2.5 rounded-xl mb-4 transition-all"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
                      border: "1px solid rgba(0,245,255,0.3)",
                      color: "var(--cyan)",
                      boxShadow: "0 0 20px rgba(0,245,255,0.1)",
                    }}
                  >
                    👋 Quick Introduction about Sreekar
                  </motion.button>
                  <div className="flex flex-col gap-2 w-full max-w-[270px]">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-left text-[12px] px-3 py-2.5 rounded-xl transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(0,245,255,0.85)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.04)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                      >
                        → {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "assistant" && <BotAvatar size="sm" isTyping={!!m.isStreaming && !m.content} />}
                      <div
                        style={{
                          maxWidth: "86%",
                          borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                          padding: "10px 14px",
                          fontSize: "13px",
                          lineHeight: "1.65",
                          ...(m.role === "user"
                            ? { background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.22))", border: "1px solid rgba(0,245,255,0.18)", color: "rgba(255,255,255,0.92)" }
                            : { background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.065)", color: "rgba(255,255,255,0.85)" }),
                        }}
                      >
                        {m.role === "user" ? m.content : m.content ? (
                          <div className="prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p style={{ marginBottom: "6px", marginTop: 0 }}>{children}</p>,
                                strong: ({ children }) => <strong style={{ color: "var(--cyan)", fontWeight: 600 }}>{children}</strong>,
                                ul: ({ children }) => <ul style={{ paddingLeft: "16px", marginBottom: "6px", marginTop: "4px" }}>{children}</ul>,
                                ol: ({ children }) => <ol style={{ paddingLeft: "16px", marginBottom: "6px", marginTop: "4px" }}>{children}</ol>,
                                li: ({ children }) => <li style={{ marginBottom: "3px" }}>{children}</li>,
                                code: ({ children }) => <code style={{ background: "rgba(0,245,255,0.1)", padding: "1px 5px", borderRadius: "4px", fontSize: "12px", color: "var(--cyan)" }}>{children}</code>,
                              }}
                            >
                              {m.content}
                            </ReactMarkdown>
                            {m.isStreaming && <StreamingCursor />}
                            {!m.isStreaming && (
                              <button
                                onClick={() => speak(m.content, m.id)}
                                title={speakingId === m.id ? "Stop" : "Read aloud"}
                                className="mt-2 flex items-center gap-1 text-[10px] transition-all"
                                style={{ color: speakingId === m.id ? "var(--cyan)" : "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                              >
                                {speakingId === m.id ? <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.7 }}>🔊</motion.span> : <span>🔈</span>}
                                <span>{speakingId === m.id ? "Stop" : "Read aloud"}</span>
                              </button>
                            )}
                          </div>
                        ) : <TypingDots />}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.055)", flexShrink: 0 }}>
              {/* Voice error */}
              <AnimatePresence>
                {voiceError && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-[10px] text-center mb-2"
                    style={{ color: "#f87171" }}
                  >
                    {voiceError}
                  </motion.p>
                )}
              </AnimatePresence>
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "14px",
                  padding: "9px 10px 9px 14px",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "🎙 Listening…" : "Message Nova AI…"}
                  disabled={isLoading}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: isListening ? "var(--cyan)" : "rgba(255,255,255,0.9)", fontSize: "13px" }}
                />
                {/* Mic button */}
                <motion.button
                  type="button"
                  onClick={() => { playClick(); startListening(); }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: isListening ? "rgba(0,245,255,0.2)" : "rgba(255,255,255,0.06)",
                    border: isListening ? "1px solid rgba(0,245,255,0.5)" : "1px solid transparent",
                    color: isListening ? "var(--cyan)" : "rgba(255,255,255,0.4)",
                    boxShadow: isListening ? "0 0 12px rgba(0,245,255,0.3)" : "none",
                  }}
                  title={isListening ? "Stop listening" : "Voice input"}
                >
                  {isListening ? (
                    <motion.svg
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                    >
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                    </motion.svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                    </svg>
                  )}
                </motion.button>
                {/* Send button */}
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: input.trim() && !isLoading ? "linear-gradient(135deg, var(--cyan), var(--purple))" : "rgba(255,255,255,0.07)",
                    color: input.trim() && !isLoading ? "#000" : "rgba(255,255,255,0.25)",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </motion.button>
              </form>
              <p className="text-center mt-2" style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)" }}>
                Powered by Gemini 2.5 Flash · Nova AI can make mistakes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={playHover}
        onClick={() => { playClick(); setIsOpen((o) => !o); }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: isOpen ? "rgba(20,20,35,0.95)" : "linear-gradient(135deg, var(--cyan), var(--purple))",
          border: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          color: isOpen ? "rgba(255,255,255,0.7)" : "#000",
          boxShadow: isOpen ? "none" : "0 0 28px rgba(0,245,255,0.35), 0 6px 24px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ fontSize: "16px" }}>✕</motion.span>
          ) : (
            <motion.span key="icon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} style={{ fontSize: "22px" }}>✦</motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(0,245,255,0.25)", pointerEvents: "none" }}
          />
        )}
      </motion.button>
    </div>
  );
}
