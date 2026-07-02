"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useUISounds } from "@/hooks/useUISounds";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

// ─── Speech synthesis ─────────────────────────────────────────────────────────
function useSpeech() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const speak = (text: string, id: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }
    // Strip markdown symbols before speaking
    const clean = text.replace(/[*_`#>~\[\]()]/g, "").replace(/\n+/g, " ");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
  };

  return { speak, stop, speakingId };
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

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak, stop, speakingId } = useSpeech();
  const { playHover, playClick } = useUISounds();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // Stop speech when chat is closed
  useEffect(() => {
    if (!isOpen) stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: content.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", isStreaming: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok || !response.body) throw new Error("API request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated, isStreaming: true } : m
          )
        );
      }

      if (!accumulated.trim()) throw new Error("Empty response from API.");

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: accumulated, isStreaming: false } : m
        )
      );
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: "⚠️ Something went wrong. Please try again in a moment.",
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 flex flex-col"
            style={{
              width: "380px",
              height: "560px",
              maxHeight: "88vh",
              borderRadius: "20px",
              background: "rgba(8, 8, 18, 0.92)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 28px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,245,255,0.05)",
              overflow: "hidden",
            }}
          >
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
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold"
                    style={{
                      background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                      color: "#000",
                      boxShadow: "0 0 16px rgba(0,245,255,0.25)",
                    }}
                  >
                    N
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#00c853", border: "2px solid rgba(8,8,18,0.92)" }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[13px] text-white leading-tight">Nova AI</h3>
                  <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.38)" }}>
                    Portfolio Assistant · Always online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={() => setMessages([])}
                    className="text-[11px] px-2 py-1 rounded-lg transition-all"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => {
                    playHover();
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                padding: "16px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.08) transparent",
              }}
            >
              {!hasMessages ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(124,58,237,0.1))",
                      border: "1px solid rgba(0,245,255,0.18)",
                    }}
                  >
                    ✦
                  </div>
                  <h4 className="font-semibold text-white mb-1" style={{ fontSize: "15px" }}>
                    Ask me anything
                  </h4>
                  <p
                    className="text-xs mb-5"
                    style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.65, maxWidth: "250px" }}
                  >
                    I know all about the projects, skills, and experience. What would you like to explore?
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-[270px]">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-left text-[12px] px-3 py-2.5 rounded-xl transition-all"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.6)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.3)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(0,245,255,0.85)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                        }}
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
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "assistant" && (
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                          style={{
                            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                            color: "#000",
                          }}
                        >
                          N
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: "86%",
                          borderRadius:
                            m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                          padding: "10px 14px",
                          fontSize: "13px",
                          lineHeight: "1.65",
                          ...(m.role === "user"
                            ? {
                                background:
                                  "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.22))",
                                border: "1px solid rgba(0,245,255,0.18)",
                                color: "rgba(255,255,255,0.92)",
                              }
                            : {
                                background: "rgba(255,255,255,0.045)",
                                border: "1px solid rgba(255,255,255,0.065)",
                                color: "rgba(255,255,255,0.85)",
                              }),
                        }}
                      >
                        {m.role === "user" ? (
                          m.content
                        ) : m.content ? (
                          <div className="prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p style={{ marginBottom: "6px", marginTop: 0 }}>{children}</p>
                                ),
                                strong: ({ children }) => (
                                  <strong style={{ color: "var(--cyan)", fontWeight: 600 }}>
                                    {children}
                                  </strong>
                                ),
                                ul: ({ children }) => (
                                  <ul style={{ paddingLeft: "16px", marginBottom: "6px", marginTop: "4px" }}>
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol style={{ paddingLeft: "16px", marginBottom: "6px", marginTop: "4px" }}>
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li style={{ marginBottom: "3px" }}>{children}</li>
                                ),
                                code: ({ children }) => (
                                  <code
                                    style={{
                                      background: "rgba(0,245,255,0.1)",
                                      padding: "1px 5px",
                                      borderRadius: "4px",
                                      fontSize: "12px",
                                      color: "var(--cyan)",
                                    }}
                                  >
                                    {children}
                                  </code>
                                ),
                              }}
                            >
                              {m.content}
                            </ReactMarkdown>
                            {m.isStreaming && <StreamingCursor />}
                            {/* Speaker button — only when fully streamed */}
                            {!m.isStreaming && (
                              <button
                                onClick={() => speak(m.content, m.id)}
                                title={speakingId === m.id ? "Stop" : "Read aloud"}
                                className="mt-2 flex items-center gap-1 text-[10px] transition-all"
                                style={{
                                  color: speakingId === m.id ? "var(--cyan)" : "rgba(255,255,255,0.25)",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: 0,
                                }}
                              >
                                {speakingId === m.id ? (
                                  <motion.span
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.7 }}
                                  >
                                    🔊
                                  </motion.span>
                                ) : (
                                  <span>🔈</span>
                                )}
                                <span>{speakingId === m.id ? "Stop" : "Read aloud"}</span>
                              </button>
                            )}
                          </div>
                        ) : (
                          <TypingDots />
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid rgba(255,255,255,0.055)",
                flexShrink: 0,
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Message Nova AI..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "13px",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background:
                      input.trim() && !isLoading
                        ? "linear-gradient(135deg, var(--cyan), var(--purple))"
                        : "rgba(255,255,255,0.07)",
                    color: input.trim() && !isLoading ? "#000" : "rgba(255,255,255,0.25)",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
              <p
                className="text-center mt-2"
                style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)" }}
              >
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
        onClick={() => {
          playClick();
          setIsOpen((o) => !o);
        }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: isOpen
            ? "rgba(20,20,35,0.95)"
            : "linear-gradient(135deg, var(--cyan), var(--purple))",
          border: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          color: isOpen ? "rgba(255,255,255,0.7)" : "#000",
          boxShadow: isOpen
            ? "none"
            : "0 0 28px rgba(0,245,255,0.35), 0 6px 24px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ fontSize: "16px" }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ fontSize: "22px" }}
            >
              ✦
            </motion.span>
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
