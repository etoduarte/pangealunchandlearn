# Spec: Existing Microsite & Documentation Merge

**Feature:** Rebuild Pangea Lunch & Learn microsite as a parallax storybook
**Started:** 2026-03-09
**Status:** READY FOR IMPLEMENTATION

---

## Overview

Rebuild the Pangea Lunch & Learn microsite from a 13-section scroll-snap presentation into a parallax long-scroll storybook. The site merges the existing visual showcase with the new 3 Lessons + 3 Tips framework documented in `cal/human-ai-collaboration-patterns.md`. The goal is to stunt — show what AI-assisted development can produce.

---

## Content Flow

The site scrolls as a continuous parallax experience, top to bottom:

| Section | Content | Source |
|---------|---------|--------|
| **Hero** | Title, hook, set the tone | New |
| **Marketing Suite Showcase** | Credibility-building — funnel chart, scatter plot, competitor grid | Existing S02-S03 |
| **Live Demo** | CSV → Excel → Presentation flow, links to `/landing/` page | Existing S03-S04 |
| **Lesson 1** | "It's not the prompt, it's the context" | `cal/human-ai-collaboration-patterns.md` |
| **Lesson 2** | "Context overflow/rot is why your AI gets dumb" | `cal/human-ai-collaboration-patterns.md` + existing context window animation (S05) |
| **Lesson 3** | "AI cares about the beginning and the end" | `cal/human-ai-collaboration-patterns.md` |
| **Tip 1** | "Develop Your Own Shared Language" — Dug/Squirrel case study | `cal/human-ai-collaboration-patterns.md` |
| **Tip 2** | "Don't Leash It, Fence It" — Sacred Code/Pilgrimages case study | `cal/human-ai-collaboration-patterns.md` |
| **Tip 3** | "Put Yourself in the Loop" — Airport/Meta API case study | `cal/human-ai-collaboration-patterns.md` |
| **Further Reading** | Curated sources: Karpathy, Willison, Chroma Research, Stanford TACL, Mollick | `cal/human-ai-collaboration-patterns.md` |

### Content Depth Strategy

A **Steve agent content merge pass** determines, on a case-by-case basis, whether each section's ELI5 content and everyday ChatGPT tips are:
- Inline (always visible)
- Progressive reveal (expand on click/tap)
- Omitted from the site (kept in patterns doc only)

### Tip Connections

Implicit from narrative flow. No explicit "how they connect" interstitial section.

---

## Visual & Interaction Design

### Parallax System
- **Depth layers** — multiple z-layers moving at different speeds (Apple product page style)
- **Pure CSS + vanilla JS** — zero third-party dependencies
- CSS `perspective` + `translateZ` for depth separation
- Vanilla JS `scroll` event listener for transform calculations
- Brand-colored CSS layers: gradient meshes, geometric shapes, blurred orbs
- User-provided assets (SVGs, illustrations, photos) layered at specific depths

### Theme
- **Pangea brand-forward** palette:
  - Cyan: `#00D4FF`
  - Coral: `#FF6B5C`
  - Green: `#34C759`
- Dark base: `--space: #0B1120`
- Brand colors used aggressively for parallax depth layers against dark base

### Parallax Hero Moments
Two existing visual components get **full-viewport parallax hero treatment** (depth layers shift around them as they animate):
1. **Marketing Suite blocks** — funnel chart, scatter plot, competitor grid
2. **Context window animation** — three panels showing context filling up (teaches Lesson 2)

### Mobile
- **Graceful degradation** — parallax disabled on mobile via `prefers-reduced-motion` and touch detection
- Parallax layers become static backgrounds
- All content remains identical and accessible
- Clean vertical scroll

### Accessibility
- `prefers-reduced-motion` media query respects user settings
- All content readable without parallax effects
- Semantic HTML structure

---

## Scope

### In Scope
- Complete HTML/CSS/JS rebuild with parallax depth layers
- Content merge from `cal/human-ai-collaboration-patterns.md` + existing site
- Both showcase components adapted to parallax hero moments
- Steve agent content merge pass (inline vs reveal vs omit per section)
- Mobile graceful degradation
- Scroll progress indicator (evolved from existing paper plane)
- Vercel deployment to `applacat.com/pangealunchnlearn`

### Out of Scope
- Third-party libraries (GSAP, Lenis, ScrollTrigger, etc.)
- Presenter mode / keyboard section navigation
- Stats colophon / build flex
- CTA button
- Creating new illustrations (user provides assets)
- Modifying `landing/index.html` (stays separate for live demo)

---

## Technical Design

### File Structure
```
site/
├── index.html          # Rebuilt — parallax storybook
├── styles.css          # Rebuilt — parallax layer system + brand tokens
├── script.js           # Rebuilt — parallax engine + scroll tracking
├── landing/
│   └── index.html      # Unchanged — standalone live demo page
└── assets/             # User-provided parallax layer assets
```

### Parallax Architecture

```
┌─────────────────────────────────┐
│  .parallax-container            │  perspective: 1px
│  ├── .parallax-layer--bg        │  translateZ(-2px) scale(3)   ← slowest
│  ├── .parallax-layer--mid       │  translateZ(-1px) scale(2)   ← medium
│  └── .parallax-layer--fg        │  translateZ(0)               ← normal scroll
│      └── .content               │  actual text/components
└─────────────────────────────────┘
```

- Container: `overflow-y: auto; perspective: 1px; height: 100vh`
- Layers: `position: absolute; transform: translateZ(Npx) scale(S)`
- Scale compensates for perspective shrinking: `scale = 1 + (translateZ * -1) / perspective`
- JS supplements CSS for scroll-driven opacity, rotation, and position tweaks

### Key JS Modules (vanilla)
1. **Parallax engine** — requestAnimationFrame loop reading scroll position, applying transforms
2. **Intersection Observer** — trigger section reveals, animation start/stop
3. **Scroll progress** — update progress indicator position
4. **Mobile detection** — disable parallax transforms on touch devices

### CSS Strategy
- Rebuild design tokens from existing `styles.css` (keep brand colors, typography, spacing)
- New parallax layer classes
- Section-specific hero moment styles
- Responsive breakpoints with parallax disable at mobile widths

---

## User Stories

### US-1: Parallax Scaffolding
**Description:** As a site visitor, I see a smooth parallax scrolling experience with visible depth layers.

**Acceptance Criteria:**
- [ ] Page scrolls continuously (no scroll-snap)
- [ ] At least 2 depth layers visible moving at different speeds
- [ ] Brand colors (cyan, coral, green) visible in parallax layers
- [ ] Dark base theme applied
- [ ] No horizontal scrollbar appears
- [ ] Scroll progress indicator visible and tracking scroll position
- [ ] `prefers-reduced-motion` disables parallax transforms
- [ ] Verify in browser: Chrome + Safari

### US-2: Hero Section
**Description:** As a site visitor, I see an impactful opening that sets the tone.

**Acceptance Criteria:**
- [ ] Title "Marketing & AI: What Actually Works" (or equivalent) visible
- [ ] Parallax depth layers create visual interest behind hero text
- [ ] Hero fills viewport on load
- [ ] Smooth transition into next section on scroll

### US-3: Marketing Suite Showcase (Parallax Hero Moment)
**Description:** As a site visitor, I see the Marketing Suite components as an impressive full-viewport parallax moment.

**Acceptance Criteria:**
- [ ] Funnel chart, scatter plot, and competitor grid visible
- [ ] Components animate/assemble as depth layers shift around them
- [ ] Full viewport treatment (not contained cards)
- [ ] Existing animation logic preserved (funnel bar width animation, scatter dot stagger)

### US-4: Live Demo Section
**Description:** As a site visitor, I see the live demo teaser with link to the landing page.

**Acceptance Criteria:**
- [ ] CSV → Excel → Presentation flow described/visualized
- [ ] Link to `/landing/` page functional
- [ ] Section integrates with parallax flow (not a jarring break)

### US-5: Three Lessons Content
**Description:** As a site visitor, I read through 3 clearly presented lessons about how AI context works.

**Acceptance Criteria:**
- [ ] Lesson 1: "It's not the prompt, it's the context" — content from patterns doc
- [ ] Lesson 2: "Context overflow/rot" — content + context window animation as parallax hero moment
- [ ] Lesson 3: "Beginning and end matter most" — content from patterns doc
- [ ] Context window animation (3 panels) gets full-viewport parallax hero treatment
- [ ] Each lesson scrolls into view with parallax reveal effect

### US-6: Three Tips Content
**Description:** As a site visitor, I read through 3 practitioner tips with case studies.

**Acceptance Criteria:**
- [ ] Tip 1: "Shared Language" with Dug/Squirrel case study
- [ ] Tip 2: "Don't Leash It, Fence It" with Sacred Code/Pilgrimages case study
- [ ] Tip 3: "Put Yourself in the Loop" with Airport/Meta API case study
- [ ] Content depth (ELI5, everyday tips) handled per Steve merge pass decisions
- [ ] Each tip scrolls into view with parallax reveal effect

### US-7: Further Reading
**Description:** As a site visitor, I find curated sources at the end.

**Acceptance Criteria:**
- [ ] Sources listed: Karpathy (context engineering), Willison, Chroma Research (context rot), Stanford TACL (Lost in the Middle), Mollick (Co-Intelligence)
- [ ] Links functional where applicable
- [ ] Clean visual treatment as final section

### US-8: Mobile Graceful Degradation
**Description:** As a mobile visitor, I get all the same content in a clean layout without parallax.

**Acceptance Criteria:**
- [ ] Parallax transforms disabled on touch devices and narrow viewports
- [ ] Parallax layers become static backgrounds or hidden
- [ ] All content identical and readable
- [ ] No horizontal overflow
- [ ] Clean vertical scroll behavior

### US-9: Deployment
**Description:** Site deployed to Vercel at the target domain.

**Acceptance Criteria:**
- [ ] Deployed to Vercel
- [ ] Accessible at `applacat.com/pangealunchnlearn`
- [ ] All assets load correctly in production

---

## Implementation Phases

### Phase 1: Parallax Scaffolding + Hero + Showcase
- [ ] Build parallax container/layer CSS system
- [ ] Implement vanilla JS parallax engine
- [ ] Create hero section with depth layers
- [ ] Migrate Marketing Suite showcase as parallax hero moment
- [ ] Add scroll progress indicator
- [ ] Verify parallax works in Chrome + Safari
- **Covers:** US-1, US-2, US-3
- **Verification:** Open in browser — parallax depth layers visible, hero renders, showcase animates

### Phase 2: Lessons Content + Context Window Hero Moment
- [ ] Add Lesson 1, 2, 3 content from patterns doc
- [ ] Migrate context window animation as parallax hero moment for Lesson 2
- [ ] Add Live Demo section with link to `/landing/`
- [ ] Intersection Observer reveals for each lesson
- **Covers:** US-4, US-5
- **Verification:** All 3 lessons readable, context window animation triggers, demo link works

### Phase 3: Tips Content + Steve Merge Pass
- [ ] Run Steve agent content merge pass on patterns doc
- [ ] Add Tip 1, 2, 3 content with case studies
- [ ] Implement content depth decisions from Steve (inline vs progressive reveal)
- [ ] Add expand/reveal interactions where Steve specifies
- **Covers:** US-6
- **Verification:** All 3 tips readable with case studies, any progressive reveals functional

### Phase 4: Further Reading + Mobile + Deploy
- [ ] Add Further Reading section with curated sources
- [ ] Implement mobile graceful degradation (disable parallax, static fallbacks)
- [ ] Test on mobile viewport sizes
- [ ] Deploy to Vercel at `applacat.com/pangealunchnlearn`
- **Covers:** US-7, US-8, US-9
- **Verification:** Further Reading renders, mobile layout clean, deployed URL accessible

---

## Dependencies & Prerequisites

1. **Steve content merge pass** — needed before Phase 3 (determines inline vs reveal per section)
2. **User-provided assets** — needed for parallax layer backgrounds (can use CSS placeholders until provided)
3. **Vercel + domain config** — needed for Phase 4 deployment

---

## Definition of Done

This feature is complete when:
- [ ] All 9 user stories pass acceptance criteria
- [ ] All 4 implementation phases verified
- [ ] Parallax smooth in Chrome + Safari desktop
- [ ] Mobile layout clean and functional without parallax
- [ ] `prefers-reduced-motion` respected
- [ ] Deployed to Vercel at `applacat.com/pangealunchnlearn`
- [ ] No third-party JS/CSS dependencies

---

## Open Questions

1. **Asset list** — Exact SVGs/illustrations/photos needed for parallax layers (user to provide)
2. **Steve merge timing** — Run Steve pass before Phase 3 starts, or iterate during?
3. **Existing CSS tokens** — How much of `styles.css` design token system carries forward vs. rebuild?

---

## Source Files

| File | Role |
|------|------|
| `cal/human-ai-collaboration-patterns.md` | Primary content source (3 Lessons + 3 Tips) |
| `site/index.html` | Existing site — components to migrate |
| `site/styles.css` | Existing design tokens — selectively reuse |
| `site/script.js` | Existing animations — migrate context window, funnel, scatter |
| `site/landing/index.html` | Standalone live demo page — unchanged |
