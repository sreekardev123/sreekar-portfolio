"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
};

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

export default function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const USERNAME = "sreekardev123";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("GitHub API route error");
        const data = await res.json();

        setProfile(data.profile);
        setRepos(data.repos);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: "Public Repos", value: profile?.public_repos ?? "—", icon: "📦" },
    { label: "Followers", value: profile?.followers ?? "—", icon: "👥" },
    { label: "Following", value: profile?.following ?? "—", icon: "🔭" },
  ];

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Section heading */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--cyan)", fontFamily: "JetBrains Mono, monospace" }}
          >
            Open Source Activity
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Live on{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              GitHub
            </span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm leading-relaxed">
            Real-time data fetched directly from GitHub API — always up to date.
          </p>
        </motion.div>

        {loading ? (
          /* Skeleton loader */
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl h-24 animate-pulse"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl h-36 animate-pulse"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.35)" }}>
            <p className="text-2xl mb-2">🐙</p>
            <p className="text-sm">Could not load GitHub data. Check back later.</p>
          </div>
        ) : (
          <>
            {/* Profile + stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Avatar */}
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <div className="relative">
                  {profile?.avatar_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatar_url}
                      alt="GitHub Avatar"
                      className="w-16 h-16 rounded-2xl"
                      style={{ border: "2px solid rgba(0,245,255,0.3)" }}
                    />
                  )}
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full"
                    style={{ background: "#00c853", border: "2px solid var(--bg-primary)" }}
                  />
                </div>
              </a>

              {/* Name + link */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-white text-lg">@{USERNAME}</h3>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Full Stack Developer · Building in public
                </p>
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs px-3 py-1 rounded-full transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                  }}
                >
                  <span>🐙</span> View Profile
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-6 sm:gap-8">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl font-bold text-white">{s.value}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Repos grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -4, borderColor: "rgba(0,245,255,0.3)" }}
                  className="flex flex-col p-4 rounded-2xl group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Repo name */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p
                      className="font-semibold text-sm text-white group-hover:text-[var(--cyan)] transition-colors truncate"
                    >
                      📁 {repo.name}
                    </p>
                    <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[12px] flex-1 leading-relaxed line-clamp-2"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {repo.description || "No description provided."}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: LANGUAGE_COLORS[repo.language] ?? "#aaa" }}
                        />
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                        ⭐ {repo.stargazers_count}
                      </span>
                      <span className="text-[11px] ml-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                        🍴 {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-10"
            >
              <a
                href={`https://github.com/${USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.4)";
                  (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
              >
                🐙 View All Repositories
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
