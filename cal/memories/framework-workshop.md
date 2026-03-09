# Framework Workshop — The Three Pillars

## Status: INTERVIEWING

## The Framework (working names)
1. **Develop Your Own Shared Language with the AI** — metaphors, analogies, mental models
2. **Don't Leash It, Fence It** — most people's instinct is to leash (step-by-step instructions), which works when you know the destination; fences work better when you don't — let it run free within adversarial constraints
3. **Put Yourself in the Loop** — permission gates and trade-off thinking at every step

## Interview Plan
- Walk through each pillar: what it means, examples, how it maps to existing content
- Identify which existing sections support which pillar
- Determine what needs to be rewritten vs reorganized vs cut
- Workshop the names and framing

## Current Mapping (pre-interview guess)
- Common Semantics ← likely absorbs current "Speak in Metaphors" (S07)
- Behavioral Fences ← may absorb "Context Engineering" tips (S06) + "Common Mistakes" (S06.5)
- Recursive Gates ← new concept, may absorb "Final Answer Trap" fix + expand significantly

## Notes from Interview

### PILLAR 1: Common Semantics — Shared language between you and the AI

**Level 1 — Metaphors communicate faster than instructions**
Principle: Evocative language carries more signal than technical direction.
Case study: "I was frustrated with scope drift. I told the AI it was being like Dug from UP — chasing squirrels everywhere. It immediately understood the problem, the frustration level, and what I needed it to do differently. Three things communicated in one sentence that a technical instruction couldn't have done."

**Level 2 — When a metaphor works, build it into the system**
Principle: A good metaphor can become a permanent tool, not just a one-time trick.
Case study: "The Squirrel became a built-in skill where I can just tell the AI: Squirrel: that feature isn't working like we talked about — and it escalates beyond a typical debug.

Rather than commenting code traditionally, we came up with more dramatic language. We call critical logic 'Sacred Code' and I send the AI on 'pilgrimages' to protect the sacred code.

Sounds silly, but I've prevented disaster numerous times because the AI tells me: 'I was about to change X, but it says this weird thing in the comments.'

Standard comments get skimmed. Dramatic ones get respected."

**Level 3 — Let the AI teach you in your language**
Principle: Metaphors work in both directions — the AI can use them to make complex things accessible.
Case study: "I kept hitting API rate limits building the marketing suite. The AI explained the problem as passengers picking up luggage at an airport. Suddenly I could make architecture decisions — stagger the flights, pre-sort the luggage — without knowing the technical terms. I made trade-off choices that were natural to me, and the result was an algorithm that actually worked."

---

### PILLAR 2: Behavioral Fences
(awaiting interview)

### PILLAR 3: Put the Human in the Loop
(documented in cal/human-ai-collaboration-patterns.md)
