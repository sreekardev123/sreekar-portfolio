# 🚀 Premium Portfolio — Next.js + Three.js + MongoDB

A jaw-dropping, premium developer portfolio with:
- ⚡ **Next.js 15** (App Router, API Routes)
- 🎨 **HeroUI** component library
- 🌊 **Framer Motion** smooth animations
- 🌐 **Three.js / React Three Fiber** 3D scenes
- 🌙 **Dark / Light** theme with next-themes
- 🍃 **MongoDB** (contact form storage)
- 🖱️ **Custom cursor** with smooth trailing
- 🎯 **TypeScript** throughout

---

## 📦 Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then fill in your **MongoDB URI**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio
```

**How to get a free MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account → New Project → Build a Database (free tier)
3. Create cluster → Connect → Drivers → Copy the connection string
4. Replace `<password>` with your actual password

### 3. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🛠️ Customization

### Personal Info
Update these files with your real info:

| File | What to change |
|------|----------------|
| `components/sections/HeroSection.tsx` | Name, description, stats |
| `components/sections/AboutSection.tsx` | Bio, timeline, location |
| `components/sections/SkillsSection.tsx` | Skill levels, tech stack |
| `components/sections/ProjectsSection.tsx` | Your real projects |
| `components/sections/ContactSection.tsx` | Email, LinkedIn, GitHub |
| `components/Navbar.tsx` | Logo initials |
| `components/Footer.tsx` | Social links, email |
| `app/layout.tsx` | Page title, meta description |

### Fonts
Fonts are loaded from Google Fonts / Fontshare in `globals.css`. Change the import URLs to use different fonts.

### Theme Colors
Edit CSS variables in `globals.css`:
```css
:root {
  --cyan: #00f5ff;    /* Primary accent */
  --purple: #7c3aed;  /* Secondary accent */
  --gold: #f59e0b;    /* Tertiary accent */
}
```

---

## 🗂️ Project Structure

```
premium-portfolio/
├── app/
│   ├── api/contact/route.ts    ← MongoDB API endpoint
│   ├── globals.css              ← All design tokens + styles
│   ├── layout.tsx               ← Root layout with providers
│   ├── page.tsx                 ← Main page
│   └── providers.tsx            ← HeroUI + next-themes
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx      ← Hero with 3D sphere
│   │   ├── AboutSection.tsx     ← About + DNA helix 3D + timeline
│   │   ├── SkillsSection.tsx    ← Animated skill bars + marquee
│   │   ├── ProjectsSection.tsx  ← 3D tilt project cards
│   │   └── ContactSection.tsx   ← MongoDB form + 3D mail
│   ├── HeroScene.tsx            ← Three.js hero sphere + rings
│   ├── AboutScene.tsx           ← Three.js DNA helix
│   ├── ContactScene.tsx         ← Three.js floating envelope
│   ├── CustomCursor.tsx         ← Smooth laggy cursor
│   ├── Navbar.tsx               ← Animated sticky nav
│   ├── ParticleBackground.tsx   ← Canvas particles
│   └── Footer.tsx               ← Links + social
├── lib/mongodb.js               ← DB connection
├── models/Contact.js            ← Mongoose schema
└── public/                      ← Add cv.pdf, favicon, etc.
```

---

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variable: `MONGODB_URI`
4. Deploy!

Your portfolio will be live in ~2 minutes. ✨

---

## 📝 Contact Form — How It Works

When a visitor submits the form:
1. `POST /api/contact` is called
2. Data is validated server-side
3. Saved to MongoDB with timestamp
4. Success/error shown to visitor

You can view submissions in your **MongoDB Atlas** dashboard under the `contacts` collection.

---

## 🎨 Features Overview

| Feature | Details |
|---------|---------|
| Custom cursor | Dot + trailing ring, pointer state detection |
| Hero 3D | Distorted sphere + orbiting tori + stars + particles |
| About 3D | Animated DNA helix + floating code snippets |
| Contact 3D | Floating envelope + glow orbs |
| Skill bars | Animated on scroll with percentage counter |
| Tech marquee | Infinite scroll with fade edges |
| Project cards | 3D perspective tilt on hover |
| Dark/Light | Persistent theme with smooth transitions |
| Particles | Canvas-drawn connected particle network |
| Timeline | Alternating left/right with glow dots |

---

Made with 💙 | Next.js + Three.js + MongoDB
