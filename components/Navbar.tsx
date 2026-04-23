"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Switch,
} from "@heroui/react";

const navLinks = [
  { 
    label: "Home", 
    href: "#home",
    icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  },
  { 
    label: "About", 
    href: "#about",
    icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  },
  { 
    label: "Skills", 
    href: "#skills",
    icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
  },
  { 
    label: "Projects", 
    href: "#projects",
    icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
  },
  { 
    label: "Contact", 
    href: "#contact",
    icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  },
];

export default function NavbarComponent() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActive(label);
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur border-b border-[var(--border)]" : ""
      }`}
      style={{
        background: scrolled && mounted
          ? theme === "dark"
            ? "rgba(3, 7, 18, 0.85)"
            : "rgba(248, 250, 252, 0.85)"
          : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("Home", "#home");
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center">
            <span className="text-black font-bold text-sm font-mono">KS</span>
          </div>
          <span
            className="text-xl font-bold hidden sm:block"
            style={{
              fontFamily: "Clash Display, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Karanam <span className="gradient-text">Sreekar</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              onClick={() => handleNavClick(link.label, link.href)}
              className={`relative px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                active === link.label
                  ? "text-[var(--cyan)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}
            >
              {active === link.label && mounted && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0,245,255,0.08)"
                        : "rgba(124,58,237,0.08)",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="opacity-70">{link.icon}</span>
                {link.label}
              </span>
            </motion.button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.button>
          )}

          {/* CTA Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex btn-primary text-sm py-2 px-5"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Contact", "#contact");
            }}
          >
            Hire Me
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </motion.a>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} style={{color: "var(--text-primary)"}}/>
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} style={{backgroundColor: "var(--text-primary)"}}/>
            <span className={`block w-5 h-0.5 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{backgroundColor: "var(--text-primary)"}}/>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden nav-blur border-t border-[var(--border)]"
            style={{
              background:
                mounted && theme === "dark"
                  ? "rgba(3, 7, 18, 0.95)"
                  : "rgba(248, 250, 252, 0.95)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.label, link.href)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                    active === link.label
                      ? "text-[var(--cyan)] bg-[rgba(0,245,255,0.08)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  <span className="opacity-70">{link.icon}</span>
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
