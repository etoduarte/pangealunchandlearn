# Pangea Lunch & Learn Microsite

A storybook-style microsite for Jose Duarte's "Marketing & AI: What Actually Works" lunch and learn presentation, styled to the Pangea brand guide.

## Source Materials

- `marketing-ai-outline.pptx` — 9-slide presentation outline (extracted text in cal/DESIGN.md)
- `Design Guide/` — Full Pangea brand guide as PNGs (design tokens extracted in cal/DESIGN.md)

## Design Constraints

- Follow Pangea brand guide exactly: cyan/aqua primary, dark navy text, cream backgrounds
- Bold display typography for headings, clean sans-serif for body
- Paper plane motif and 3D illustration style where appropriate
- Gradient blue hero sections matching brand guide patterns
- The microsite IS the presentation — each section maps to a slide

## Stack Decisions

- Static site (HTML/CSS/JS) — no framework overhead for a microsite
- Deploy-ready for Vercel
- Scroll-based storybook navigation (one section per slide)

## Cal Commands

| Command | Purpose |
|---------|---------|
| `/cal:analyze` | Deep investigation |
| `/cal:save` | Preserve learnings |
| `/cal:onboard` | Re-scan project |

## Approval Gates

- Design system deviations from brand guide require user approval
- Adding any build tooling or framework requires user approval
