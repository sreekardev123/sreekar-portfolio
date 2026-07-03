import { NextResponse } from "next/server";

const USERNAME = "sreekardev123";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-app",
    };

    // Add token if available (prevents rate limiting)
    if (process.env.GITHUB_TOKEN) {
      (headers as Record<string, string>)["Authorization"] =
        `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 }, // cache for 1 hour
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=20&type=public`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API error: profile=${profileRes.status} repos=${reposRes.status}`
      );
    }

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    // Return only the fields the frontend needs
    return NextResponse.json(
      {
        profile: {
          public_repos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
          avatar_url: profile.avatar_url,
        },
        repos: repos.map((r: Record<string, unknown>) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language,
          updated_at: r.updated_at,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GitHub API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
