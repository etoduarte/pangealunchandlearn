# Specification Draft: existing microsite and documentation merge

*Interview in progress - Started: 2026-03-09*

## Overview
Rebuild the Pangea Lunch & Learn microsite as a parallax long-scroll storybook that merges the existing 13-section site with the 3 Lessons + 3 Tips framework from `cal/human-ai-collaboration-patterns.md`.

## Key Decisions

### Layout & Interaction
- **Parallax long-scroll** with depth layers (multiple z-layers moving at different speeds)
- **Pure CSS + vanilla JS** — no libraries, zero dependencies
- **Drop presenter mode** and keyboard section-jumping
- **Graceful degradation** on mobile — parallax disabled, clean vertical scroll, content identical
- Keep scroll progress indicator

### Visual Theme
- **Pangea brand-forward** — cyan (#00D4FF), coral (#FF6B5C), green (#34C759) as primary parallax layer colors
- Dark base (--space: #0B1120) with brand colors for depth layers
- **User will provide assets** for parallax backgrounds (SVGs, illustrations, photos)

### Content Flow (top to bottom)
1. **Hero** — title, hook, set the tone
2. **Marketing Suite showcase** — credibility-building (existing S02-S03 content, funnel/scatter/grid)
3. **Live Demo** — kept in-site (CSV → Excel → Presentation flow + Pangea Mexico landing page)
4. **3 Lessons** — conceptual foundation
   - Lesson 1: "It's not the prompt, it's the context"
   - Lesson 2: "Context overflow/rot is why your AI gets dumb"
   - Lesson 3: "AI cares about the beginning and the end"
5. **3 Tips** — practitioner wisdom with case studies
   - Tip 1: "Develop Your Own Shared Language" (Dug/Squirrel case study)
   - Tip 2: "Don't Leash It, Fence It" (Sacred Code/Pilgrimages case study)
   - Tip 3: "Put Yourself in the Loop" (Airport/Meta API case study)
6. **Further Reading** — curated sources (Karpathy, Willison, Chroma, Stanford, Mollick)

### Content Depth
- **Steve agent does case-by-case content merge** — decides per-section what's inline vs progressive reveal
- ELI5s and everyday ChatGPT tips placement determined by Steve

### Showcase Components
- **Both** the Marketing Suite blocks AND the context window animation get **parallax hero moment** treatment (full-viewport, depth layers around them)

### Closing
- No stats colophon, no CTA button
- End with **Further Reading** section only
- Tip connections implicit from flow (no explicit "how they connect" section)

### Deployment
- Vercel at **applacat.com/pangealunchnlearn**

## Scope

### In Scope
- Complete HTML/CSS/JS rebuild with parallax depth layers
- Content merge from patterns doc + existing site
- All existing visual components adapted to parallax hero moments
- Steve content merge pass
- Mobile graceful degradation
- Vercel deployment

### Out of Scope
- Third-party libraries (GSAP, Lenis, etc.)
- Presenter mode / keyboard nav
- Stats colophon
- New illustrations (user provides assets)

## Technical Design

### Stack
- Single `index.html` with semantic sections
- `styles.css` — rebuilt with parallax layer system, brand-forward tokens
- `script.js` — vanilla JS for parallax calculations, intersection observers, scroll tracking
- CSS `perspective` + `translateZ` for depth layers
- `prefers-reduced-motion` media query for accessibility
- Mobile detection to disable parallax transforms

### Parallax Architecture
- Container with `perspective` property
- Child layers with varying `translateZ` values for depth
- Scroll-driven transforms via vanilla JS `scroll` event listener
- Brand-colored gradient meshes, geometric shapes, blurred orbs as CSS layer content
- User-provided assets layered at specific depths

## Implementation Phases
[To be filled — asking about phasing next]

## Open Questions
- Exact asset list needed for parallax layers
- Steve content merge pass timing (before or during build?)
- Landing page (`landing/index.html`) — keep as-is or integrate?
