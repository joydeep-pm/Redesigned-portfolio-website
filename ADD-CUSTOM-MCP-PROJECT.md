# Add New Project: Custom MCP

## Instructions

Add this new project to the existing portfolio. Create the MDX file.

---

## Step 1: Create New Project File

Create `content/projects/custom-mcp-lenny.mdx`:

```mdx
---
title: Custom MCP for Lenny's Podcast
description: "Building a Product Intelligence Server for elite PM frameworks"
status: completed
tech: ["Python 3.12", "MCP SDK", "Claude Code", "Markdown"]
featured: true
order: 1
---

## The Problem

PM frameworks are trapped in transcripts. The best product advice from interviews with top PMs—pricing strategies, growth tactics, roadmap frameworks—sits buried in hours of podcast content.

Context-switching between IDE and browser to find relevant advice slows down technical drafting. Every time I'm writing a PRD or strategy doc, I'd think "Lenny had a great episode on this..." and lose 20 minutes searching.

## The Solution

A custom Model Context Protocol (MCP) server that indexes 320+ Lenny's Podcast transcripts, allowing an AI agent to search for elite PM advice in real-time—directly from my IDE.

## Technical Implementation

### 1. Data Acquisition
- Cloned 320+ markdown transcripts from ChatPRD's public archive
- Organized by guest, topic, and date for efficient indexing
- ~2M+ words of PM wisdom, locally accessible

### 2. MCP Server Development
- Built Python-based server using the official MCP SDK
- Implemented semantic search across all transcripts
- Handles concurrent queries with low latency

### 3. Custom Tool: `search_lenny_insights`
- Query interface: natural language questions about PM topics
- Returns relevant excerpts with episode context
- Supports filtering by guest, topic, or date range

### 4. Claude Code Integration
- Connected via `--mcp` flag for agentic workflows
- Real-time access during PRD drafting
- No browser context-switching required

## Example Usage

```
> "What does Shreyas Doshi say about high-agency PMs?"

[Searching 320 transcripts...]

Found 3 relevant excerpts:
1. Episode #47 with Shreyas Doshi: "High-agency PMs don't wait for 
   permission. They identify the most important problem and start 
   solving it..."
2. Episode #112: "The difference between good and great PMs is 
   often just the willingness to do the uncomfortable thing..."
```

## Impact

| Metric | Result |
|--------|--------|
| Transcripts Indexed | 320+ |
| Total Content | ~2M words |
| Search Latency | <2 seconds |
| Context Switches Saved | 100% |

## Why This Matters

Transformed a static archive into an **active tool** for:
- Writing PRDs with real framework references
- Brainstorming technical strategy with expert backing
- Learning PM craft through targeted retrieval
- Building "just-in-time" knowledge systems

## The Bigger Picture

This project demonstrates the power of MCP for building personal productivity tools. Any knowledge corpus—books, courses, internal docs—can become an AI-accessible resource with the same pattern.

## Stack

- **Python 3.12:** Core server implementation
- **MCP SDK:** Model Context Protocol framework
- **Claude Code:** AI agent integration
- **Markdown:** Transcript storage format
```

---

## Step 2: Quick Command

```bash
cat > content/projects/custom-mcp-lenny.mdx << 'EOF'
---
title: Custom MCP for Lenny's Podcast
description: "Building a Product Intelligence Server for elite PM frameworks"
status: completed
tech: ["Python 3.12", "MCP SDK", "Claude Code", "Markdown"]
featured: true
order: 1
---

## The Problem

PM frameworks are trapped in transcripts. The best product advice from interviews with top PMs—pricing strategies, growth tactics, roadmap frameworks—sits buried in hours of podcast content.

Context-switching between IDE and browser to find relevant advice slows down technical drafting. Every time I'm writing a PRD or strategy doc, I'd think "Lenny had a great episode on this..." and lose 20 minutes searching.

## The Solution

A custom Model Context Protocol (MCP) server that indexes 320+ Lenny's Podcast transcripts, allowing an AI agent to search for elite PM advice in real-time—directly from my IDE.

## Technical Implementation

### 1. Data Acquisition
- Cloned 320+ markdown transcripts from ChatPRD's public archive
- Organized by guest, topic, and date for efficient indexing
- ~2M+ words of PM wisdom, locally accessible

### 2. MCP Server Development
- Built Python-based server using the official MCP SDK
- Implemented semantic search across all transcripts
- Handles concurrent queries with low latency

### 3. Custom Tool: search_lenny_insights
- Query interface: natural language questions about PM topics
- Returns relevant excerpts with episode context
- Supports filtering by guest, topic, or date range

### 4. Claude Code Integration
- Connected via --mcp flag for agentic workflows
- Real-time access during PRD drafting
- No browser context-switching required

## Impact

| Metric | Result |
|--------|--------|
| Transcripts Indexed | 320+ |
| Total Content | ~2M words |
| Search Latency | <2 seconds |
| Context Switches Saved | 100% |

## Why This Matters

Transformed a static archive into an **active tool** for:
- Writing PRDs with real framework references
- Brainstorming technical strategy with expert backing
- Learning PM craft through targeted retrieval
- Building "just-in-time" knowledge systems

## Stack

- **Python 3.12:** Core server implementation
- **MCP SDK:** Model Context Protocol framework
- **Claude Code:** AI agent integration
- **Markdown:** Transcript storage format
EOF
```

---

## Step 3: Verification

The project should appear on `/projects` page with:
- ✅ emoji (completed status)
- Title: "Custom MCP for Lenny's Podcast"
- Description: "Building a Product Intelligence Server..."
- Tech tags: Python 3.12, MCP SDK, Claude Code, Markdown
- Order: 1 (appears second, after Bookmarks Architect)

---

## Project Display Order

After adding both new projects:

1. **The Bookmarks Architect** (order: 0)
2. **Custom MCP for Lenny's Podcast** (order: 1)
3. **LLM-based PRD Generator** (order: 1 → will tie, adjust if needed)
4. **Personal Task Dashboard** (order: 2)

---

## Notes

- Set to `order: 1` to appear after Bookmarks Architect
- `featured: true` ensures visibility
- No external links included—add demoUrl/repoUrl if available
