# PRD — Atharva Gawande Portfolio

## Original Problem Statement
"build me a cool portfolio, which includes cool animations and best way to showcast my best projects, my skills"

## User Choices (confirmed)
- Single-page scrolling portfolio
- Dark cinematic vibe with neon accents (lime #CAFF00, cyan #00F0FF on #050505 black) — user open to design changes later
- Real content from uploaded resume (Atharva_Gawande_CV_SED.pdf)
- Certifications: curated marquee (4 highlights) + "View all on LinkedIn" link — NOT a full wall
- Contact via mailto + social links (GitHub, LinkedIn) — no backend contact form
- Name/title: Atharva Gawande — Software Developer / Engineer

## Architecture
- Frontend-only React app (CRA + craco + Tailwind), no backend features used
- Animations: framer-motion v13, Lenis smooth scroll, react-fast-marquee
- Content centralized in /app/frontend/src/data/portfolio.js (edit this file to change content)
- Components: Navbar, Hero, About, Projects (sticky horizontal scroll), Skills, Experience, Certifications (marquee), Contact, CustomCursor, Magnetic, SectionHeading
- Fonts: Cabinet Grotesk (Fontshare), JetBrains Mono + Outfit (Google Fonts), imported in index.css

## User Personas
- Recruiters/hiring managers scanning projects, skills, experience fast
- Atharva sharing the link on LinkedIn/GitHub/resume

## Core Requirements (static)
1. Cool animations throughout (staggered reveals, custom cursor, magnetic buttons, smooth scroll)
2. Best-possible project showcase (horizontal sticky-scroll gallery, not a card grid)
3. Skills presentation
4. Contact + social links

## Implemented (2026-07)
- Hero with letter-stagger name reveal, outlined surname, dual CTAs, location bar
- About: asymmetric layout, cinematic portrait, 4 stats (projects/internships/CGPA/certs)
- Projects: 4 real projects from resume (Cortex AI Assistant, DevPulse Dashboard, FlowForge Pipeline Builder, Presence Face Recognition) in horizontal sticky-scroll with progress bar; each links to GitHub repos tab
- Skills: 4 grouped panels (Programming, Web Dev, Frameworks, AI & Tools) with staggered chips
- Experience: 2 internships timeline + Education card (BCA 8.15 CGPA) + Leadership card (Rotaract)
- Certifications: infinite marquee with 4 certs + LinkedIn link
- Contact: giant LET'S TALK footer, mailto CTA, GitHub/LinkedIn rows
- Custom cursor (mix-blend-difference), magnetic buttons, noise overlay, glassmorphic nav
- Download CV button in hero (links to uploaded resume PDF — verified 200/PDF)
- Mobile slide-in menu with numbered links (hamburger on <md screens)
- User feedback round: project description text brightened (gray-200, inverts to black under white cursor); "Live Demo" link slot per project (renders when project.live set in portfolio.js — awaiting user's deployed URLs); certifications marquee speed 35→60 + title got nav-style lime underline sweep on hover
- AI chatbot "Ask Me Anything": floating lime bubble → glass chat panel; POST /api/chat streams GPT-5.4 via SSE (Emergent universal key in backend/.env); system prompt carries full resume facts; plain-text replies; history persisted in Mongo chat_messages; suggestion chips; tested live (projects + open-to-work answers accurate)
- Bug fixes round: experience bullet text locked light (#D1D5DB inline — same hidden-override family as project descriptions); sticky projects gallery restored (overflow-x hidden→clip on html/body; hidden broke position:sticky); text-white inline lock on project descriptions; bolder 2.5px outline on project index numbers; overflow-x sealed on phone/tablet/desktop (verified 390/834/1920)

## Backlog
- P0: Replace project images with real screenshots per project (user to provide)
- P0: Per-project GitHub repo links (currently all point to repos tab)
- P1: Add remaining GitHub projects beyond the 4 resume ones (user mentioned more exist)
- P1: Working contact form (Resend managed email) if user wants more than mailto
- P2: Project detail modals/pages with demos
- P2: Theme variants (user said design may change later)
- P2: User exploring GitHub export + deployment (Vercel/Netlify); contacted support re: 7-day plan credits

## Next Tasks
1. Collect real project screenshots + repo URLs from user
2. Decide final certification list vs LinkedIn link approach
3. Optional: contact form via Resend
