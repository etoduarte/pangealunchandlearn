# Pangea Design System — Complete Extraction

> Source: `Design Guide/` folder (16 PNGs from official Pangea Brand Guide)
> Full analysis: `cal/analyses/design-deep-dive.md`

---

## Colors

### Primary
```css
--color-cyan: #00D4FF;          /* Primary brand — buttons, accents, gradient start */
--color-blue: #0099E5;          /* Gradient midpoint, secondary */
--color-deep-blue: #0066CC;     /* Gradient end, hover states */
--color-navy: #002B49;          /* Primary text, dark backgrounds */
--color-midnight: #0A1E3D;      /* Deepest dark, dark mode */
```

### Neutrals
```css
--color-cream: #F5F0EB;         /* PRIMARY background (not white!) */
--color-beige: #F0ECE6;         /* Subtle differentiation on cream */
--color-off-white: #FAFAF8;     /* Card bg when on cream */
--color-white: #FFFFFF;          /* Cards on gradient, button text */
--color-gray-light: #D1CDC8;    /* Borders on cream */
--color-gray: #6B7280;          /* Secondary text */
--color-gray-dark: #374151;     /* Strong body text */
```

### Accents
```css
--color-coral: #FF6B5C;         /* Accent pops */
--color-gold: #F5A623;          /* Illustration accents, coins */
--color-green: #34C759;         /* Success, "received" states */
--color-teal: #008B8B;          /* Dark nav overlays */
```

### Gradients
```css
--gradient-hero: linear-gradient(135deg, #00D4FF 0%, #0099E5 50%, #0066CC 100%);
--gradient-soft: linear-gradient(180deg, #00D4FF 0%, #00B8E6 100%);
--gradient-button: linear-gradient(135deg, #00D4FF, #0099E5);
--gradient-dark: linear-gradient(180deg, #002B49 0%, #0A1E3D 100%);
```

### Halftone Texture (on ALL gradient surfaces)
```css
--texture-halftone: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
--texture-size: 6px 6px;
```

---

## Typography

### Font
- **Family**: Aeonik (or fallback: Inter / Plus Jakarta Sans)
- **Stack**: `'Aeonik', 'Inter', system-ui, -apple-system, sans-serif`

### Scale
```css
--text-display: 900 clamp(48px, 8vw, 96px)/0.9;    /* Hero titles */
--text-h1: 800 clamp(36px, 5vw, 56px)/1.0;          /* Section titles */
--text-h2: 700 clamp(28px, 3.5vw, 40px)/1.1;        /* Sub-sections */
--text-h3: 600 clamp(22px, 2.5vw, 28px)/1.2;        /* Card headings */
--text-body-lg: 400 20px/1.6;                         /* Lead paragraphs */
--text-body: 400 clamp(16px, 1.5vw, 18px)/1.6;      /* Body */
--text-caption: 400 14px/1.5;                          /* Labels */
--text-overline: 600 clamp(12px, 1vw, 14px)/1.4;     /* Section numbers, UPPERCASE */
```

### Key Rules
- **Hero text on gradient = DARK NAVY** (not white)
- Uppercase used for overlines/section numbers only
- Letter-spacing: -0.02em display, -0.01em H1, 0.08em overline

---

## Layout

### Spacing
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 48px;
--space-xl: 80px;
--space-2xl: 120px;
```

### Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### Shadows
```css
--shadow-card: 0 4px 24px rgba(0,0,0,0.08);
--shadow-elevated: 0 8px 40px rgba(0,0,0,0.12);
--shadow-notification: 0 2px 12px rgba(0,0,0,0.1);
```

### Widths
```css
--width-content: 1200px;        /* Max content width */
--width-narrow: 800px;          /* Text-heavy sections */
```

---

## Component Patterns

### Hero Section
- Full-bleed gradient background + halftone texture overlay
- Section number top-left (overline style, cyan/light)
- Display title in dark navy
- Optional floating card (white, rounded-xl, shadow-elevated)
- Dark navy footer bar at bottom: logo | breadcrumb | page info

### Content Section
- Cream (#F5F0EB) background
- 80-120px vertical padding
- H2 + body text, often 2-column layout
- Same dark navy footer bar

### Cards
- White bg, rounded-lg to rounded-xl
- shadow-card (on cream) or shadow-elevated (on gradient)
- 32-40px padding

### Buttons
- Primary: cyan gradient bg, white bold text, rounded-md, `padding: 12px 24px`
- Hover: deeper blue, `scale(1.02)`
- Pattern: "Label →" with arrow

### Floating Notifications
- Small cards with icon + text
- Slightly rotated (~2-5deg) for playfulness
- Float over content with parallax
- e.g., "XYZ Dollar Received" with green accent

### Footer Nav Bar
- Height: ~52px
- Dark navy bg
- White Pangea logo (left)
- White breadcrumb text (center)
- White page label + number (right)

---

## Motion

### Timing
```css
--ease-micro: 200ms ease-out;                           /* hover, focus */
--ease-transition: 350ms cubic-bezier(0.25, 0.1, 0.25, 1);  /* fade, slide */
--ease-entrance: 600ms cubic-bezier(0.16, 1, 0.3, 1);  /* scroll reveals */
--ease-hero: 900ms cubic-bezier(0.16, 1, 0.3, 1);      /* large movements */
```

### Patterns
- **Scroll reveal**: fade up + translateY(30px → 0), stagger 100ms
- **Parallax**: decorative elements at 0.3-0.5x scroll speed
- **Float**: subtle 10px up/down loop on decorative items, 3-4s duration
- **Gradient shift**: hero gradient hue rotates subtly on scroll

---

## Visual Motifs

1. **Halftone dot texture** — on every gradient, gives editorial/print quality
2. **Paper plane** — brand icon, decorative element, can animate between sections
3. **Section numbers** — "01" through "09", first-class typographic element
4. **Floating stickers/notifications** — decorative UI elements from Visual Language
5. **Cream + cyan contrast** — warm background vs. cool accents = the brand tension

---

## Presentation Content (9 Slides → 9 Sections)

### Slide 1 — Title Hero
**"Marketing & AI"** (display)
**"What Actually Works"** (H1)
Lunch & Learn | Jose Duarte

### Slide 2 — What I've Been Building
- Custom SAAS tool built with AI assistance
- "But today isn't about what I built. It's about what you can do."

### Slide 3 — Live Demo
**Raw CSV → Clean Excel → Presentation**
Using Claude Cowork — no code, no CLI

### Slide 4 — Two Takeaways
- One Concept: **Context Engineering**
- One Technique: **Metaphors & Common Language**

### Slide 5 — Context Engineering ★ (animated section)
Three-panel visualization:
1. Setup & intent fills context window — "All good"
2. Chat grows, window filling up — "Filling up..."
3. Overflow: setup is gone — "AI is lost"
> "Every prompt, the AI reads from the top. When your conversation outgrows the window, it loses the beginning — the part where you told it what to do."

### Slide 6 — What This Means For You
1. **Start fresh often** — Long chats = dumb AI. New conversation = fresh brain.
2. **Front-load the good stuff** — AI pays most attention to the start.
3. **One task, one thread** — Each task deserves its own context.
> "Think of it like managing a marketing budget — every dollar (token) counts."

### Slide 7 — Speak in Metaphors ★ (animated section)
- **Problem**: Sync data from Meta's API
- **Metaphor**: "Ads are passengers at an airport. Their daily data is luggage they need to pick up."
- **Result**: AI explained every bottleneck through that frame
> "I didn't need to know the technical terms. I needed a shared language to think with."

### Slide 8 — Closing
**"Stop engineering prompts."**
**"Start having conversations with guardrails."**
Align on intent. Watch your context. Let the AI do the rest.

### Slide 9 — Questions / CTA
Try it today: claude.ai → Cowork
Jose Duarte
