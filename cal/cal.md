# Cal — Permanent Learnings

## Project Context
- Pangea = digital money transfer platform (Mexico, Philippines, 22+ countries)
- Presentation by Jose Duarte, marketing team
- Target audience: coworkers at a lunch and learn — non-technical
- Core message: Context Engineering + Metaphors as techniques for using AI in marketing
- **Goal: STUNT** — this microsite should demonstrate what AI can build

## The SAAS Tool (Pangea Marketing Suite)
- Located at `/Users/etoduarte/0. Coding/React/Pangea-Marketing-Suite`
- React 18 + Next.js 15 + TypeScript + Supabase + Tailwind + shadcn/ui
- Marketing analytics command center: "What do I do TODAY to hit my numbers?"
- Real Meta Ads integration (10k+ observations, 12 efficiency metrics, Pixley scoring)
- Key blocks to showcase: CampaignFunnel (6-stage), SignalMap (scatter plot), TimeSeries, Collection
- Mock data at: `src/test-utils/fixtures/metrics.ts` and `src/components/blocks/__fixtures__/mock-data.ts`
- Has Storybook with 30+ stories
- This tool IS slide 2 ("What I've Been Building") AND slide 3 ("Live Demo")

## User Answers (Q&A)
1. **Slide 2 screenshots**: Use actual blocks/mock data from Marketing Suite — copy them over
2. **Slide 3 (Live Demo)**: Covered by #1 — show the tool
3. **PPTX colors are IGNORED** — only the Pangea brand guide colors matter for the microsite
4. **Tone**: Conversational and punchy, matching the outline's voice
5. **Expanded content**: We have more room — can add tips, appendices, extra sections beyond the original 9

## Critical Deltas (things that are counterintuitive)
- **Hero text is DARK NAVY on cyan gradient** — NOT white. The brand guide is explicit.
- **Primary background is warm cream (#F5F0EB)** — NOT white. White is for cards only.
- **All gradients have halftone dot texture** — this is what makes them feel premium vs flat SaaS blue
- **Section numbers (01, 02...) are a typographic feature** — they're prominent, not hidden
- **PPTX palette (orange #FF6B35, teal #00C9A7, dark #0F1229) is NOT the target** — use brand guide only

## Design Decisions
- Scroll-snap sections, one per slide (9+ total, can expand)
- CSS custom properties for all brand tokens
- Slides 5 (context window) and 7 (airport metaphor) are the "wow" moments — invest animation budget there
- Paper plane as a connecting motif between sections
- Footer nav bar pattern from brand guide = persistent navigation

## Patterns
- Brand guide uses 2-part pages: gradient hero top + cream content bottom
- Cards float over gradients with elevated shadow
- Floating notification stickers as decorative elements (slightly rotated)
- Display text uses -0.02em letter-spacing for tightness
