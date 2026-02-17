# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start development server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio site using the App Router with static generation for MDX content.

### Content System

Content lives in `/content` as MDX files with YAML frontmatter:
- `content/work/` - Employment history (sorted by `order`)
- `content/case-studies/` - Fintech case studies
- `content/projects/` - Personal projects (sorted by `order`)
- `content/threads/` - Articles (filtered by `draft: false`)

Content is loaded via `lib/content.ts` which exports:
- `getAllWork()`, `getAllCaseStudies()`, `getAllProjects()`, `getAllThreads()`
- `getCaseStudyBySlug()`, `getProjectBySlug()`, `getThreadBySlug()`

### Content Frontmatter

**Projects** require: `title`, `description`, `status` (active|completed|experimental|archived), `tech[]`, `featured`, `order`. Optional: `demoUrl`, `repoUrl`, `thumbnail`.

**Case Studies** require: `title`, `company`, `problem`, `tags[]`, `featured`, `publishedAt`. Optional: `gradient` (blue|purple|green|orange), `thumbnail`, `readingTime`.

**Work** requires: `title`, `role`, `duration`, `startDate`, `metric`, `tags[]`, `order`, `featured`, `current`. Optional: `logo`.

**Threads** require: `title`, `tags[]`, `publishedAt`, `featured`, `draft`. Optional: `excerpt`, `readingTime`, `externalUrl`.

### App Structure

```
app/
├── page.tsx                 # Home (hero, metrics, skills)
├── layout.tsx               # Root layout (Nav, fonts)
├── work/page.tsx            # Timeline of work history
├── case-studies/
│   ├── page.tsx             # Case studies grid
│   └── [slug]/page.tsx      # Dynamic case study detail
├── projects/
│   ├── page.tsx             # Projects grid
│   └── [slug]/page.tsx      # Dynamic project detail
└── threads/page.tsx         # Articles list
```

### Key Components

- `ProjectCard.tsx` / `ProjectModal.tsx` - Project cards with live demo modal embedding
- `CaseStudyCard.tsx` - Cards with gradient backgrounds (4 presets)
- `TimelineEntry.tsx` - Work history timeline entries
- `Nav.tsx` - Fixed nav with mobile menu

### Styling

Tailwind with custom theme in `tailwind.config.ts`:
- Background: warm cream (#FAF9F6)
- Text: near-black (#1a1a1a)
- Accent: blue (#2563eb), gold (#c9a227)
- Fonts: Playfair Display (headings), Inter (body)

MDX rendering uses `next-mdx-remote` with `rehype-pretty-code` for syntax highlighting.

## Adding Content

1. Create `.mdx` file in appropriate `/content` subdirectory
2. Add required frontmatter fields (see above)
3. Write markdown content below frontmatter
4. Run `npm run build` to verify static generation
