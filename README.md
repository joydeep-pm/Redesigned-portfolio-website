# Joydeep Sarkar | Portfolio

Personal portfolio website for **Joydeep Sarkar** — Fintech Product Leader & Lending Infrastructure Specialist.

**Live:** [joydeepsarkar.me](https://joydeepsarkar.me)

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS with custom warm-cream theme
- **Content:** MDX with gray-matter frontmatter parsing
- **Rendering:** next-mdx-remote + rehype-pretty-code
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Playfair Display (headings), Inter (body)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Project Structure

```
app/
  page.tsx                    # Home (hero, metrics, skills)
  layout.tsx                  # Root layout, fonts, nav
  work/page.tsx               # Work history timeline
  case-studies/
    page.tsx                  # Case studies grid
    [slug]/page.tsx           # Case study detail
  projects/
    page.tsx                  # Projects grid
    [slug]/page.tsx           # Project detail
  threads/page.tsx            # Articles list

content/
  work/                       # Employment history MDX
  case-studies/               # Fintech case studies MDX
  projects/                   # Personal projects MDX
  threads/                    # Articles MDX

components/
  Nav.tsx                     # Fixed nav with mobile menu
  ProjectCard.tsx             # Project cards with demo modal
  CaseStudyCard.tsx           # Cards with gradient backgrounds
  TimelineEntry.tsx           # Work history entries

lib/
  content.ts                  # MDX loading & parsing

public/
  images/
    projects/                 # Project thumbnails & screenshots
    case-studies/             # Case study thumbnails
```

## Content

### Projects

| Project | Description | Tech |
|---------|-------------|------|
| **X Bookmarks Architect** | Automating a Knowledge Ingestion Engine for a PM's Second Brain | Playwright, Python, Notion API, MCP |
| **Custom MCP for Lenny's Podcast** | Product Intelligence Server for elite PM frameworks | Python, MCP SDK, Claude Code |
| **PM Intelligence Engine** | AI-curated podcast insights to discover your product philosophy | Claude Code, Next.js, Three.js, Framer Motion |
| **The Architect's Journey** | Secure, Local-First Fintech App + Marketing Website | React Native, Expo, SQLite, Three.js |
| **Voice Journal** | AI-Powered Voice-to-Text Journaling with Transcription & Insights | React Native, Expo, OpenAI Whisper, GPT-4o-mini |
| **Nano Platformer** | 12-Stage 2D Platformer with Upgrades, Boss Fights & Adaptive Difficulty | Python, Pygame |

### Case Studies

| Case Study | Company | Tags |
|------------|---------|------|
| **E2E Collections Product Suite** | CRED | Lending, System Design |
| **BNPL Growth Strategy** | Juspay / MoreSimpl | Growth, Strategy |
| **Conversion Optimization** | Smallcase | Growth, Activation |
| **Business Banking for D2C** | ACME | Banking, Market Entry |

### Work Experience

| Company | Role | Duration |
|---------|------|----------|
| **M2P Fintech** | Director - Core Lending Suite | Nov 2024 - Present |
| **Paytm** | Director - Product, Lending | Nov 2022 - Nov 2024 |
| **Finvolv** | Lead Product Manager | Dec 2021 - Oct 2022 |
| **State Bank of India** | Deputy Manager & RM - SME | Jun 2011 - Mar 2017 |

### Threads

- [Why Your Home Loan Isn't Really 'Yours'](https://joydeepsarkar.me/threads) - Understanding complex ownership structures behind housing loans
- [Implementing RBI's Co-lending Directions](https://joydeepsarkar.me/threads) - Technical deep-dive into co-lending compliance

## Design

- **Background:** Warm cream (#FAF9F6)
- **Text:** Near-black (#1a1a1a)
- **Accents:** Blue (#2563eb), Gold (#c9a227)
- **Typography:** Playfair Display (serif headings) + Inter (sans body)

## Adding Content

1. Create an `.mdx` file in the appropriate `content/` subdirectory
2. Add required frontmatter fields (see `CLAUDE.md` for schema)
3. Write markdown content below the frontmatter
4. Thumbnails go in `public/images/projects/` or `public/images/case-studies/`
5. Run `npm run build` to verify static generation

## License

Private repository.
