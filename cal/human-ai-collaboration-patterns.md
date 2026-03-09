# Human/AI Collaboration Patterns
## Jose Duarte — Documented from practice, not theory

These patterns emerged from months of daily collaboration between a non-technical marketer and AI coding agents, building production software (the Pangea Marketing Suite). They are documented here in full for reuse in articles, talks, books, and other formats. The Pangea Lunch & Learn microsite is one output — not the only one.

The structure: three lessons about how AI actually works, then three tips for working with it well. The lessons are the "why." The tips are the "what to do about it."

---

# Part 1: Three Lessons

## Lesson 1: It's not the prompt that matters — it's the context.

Everyone talks about "prompt engineering" — the idea that if you phrase your request just right, the AI will give you a perfect answer. It's not wrong, exactly. A well-written prompt helps. But it's focused on the wrong thing.

What actually determines the quality of AI output isn't the last message you sent. It's everything the AI can see when it reads your conversation — the full context. That includes: any custom instructions or system prompt you've set up, every message you've sent, every response the AI has given, every file or data you've pasted in, and the order it all appears.

The AI doesn't just read your latest message and respond. It re-reads the *entire* conversation from top to bottom, every single time. Your latest message matters, but it's one input among many. The AI's understanding of who you are, what you're working on, what tone you prefer, what you've already tried — all of that comes from context, not from any single prompt.

This is why two people can send the exact same message to the AI and get completely different results. The difference is what came before.

The practical shift: stop obsessing over how to phrase the perfect question. Start thinking about what the AI knows about you and your task before you ask it anything. That's context. And it matters more than any prompt trick.

---

## Lesson 2: Context overflow is one of the biggest reasons your AI gets dumb.

Everyone has had the experience: a conversation with AI starts great — sharp, focused, on-point answers — and then gradually gets worse. By message 15 or 20, it's repeating itself, contradicting things it said earlier, or giving vague answers to specific questions. Most people assume the AI "got tired" or "isn't that smart." Neither is true.

What happened is context degradation — sometimes called "context rot."

Every AI has a finite amount of text it can hold in working memory at once — the context window. Think of it as a container. Every message, every response, every pasted document goes into this container. And here's what most people don't realize: the AI's performance starts degrading well before the container is full. Research from Chroma (2025) showed that accuracy drops significantly as context grows — even with plenty of room left. Stanford's "Lost in the Middle" study found that information placed in the middle of long contexts gets the least attention, while the beginning and end get the most.

This creates a specific, predictable problem. Most people spend real time thinking through their first message — setting up the task, providing context, defining what they need. That opening prompt is the highest-quality input in the entire conversation. But everything that follows is reactive tinkering: "no, change this," "make it more X," "actually go back to the other version." As the conversation fills with these low-effort iterative messages, the carefully constructed beginning gets pushed farther and farther from the end — where the AI is paying the most attention. The signal-to-noise ratio degrades with every exchange.

The AI isn't getting dumber. The thoughtful setup that made it smart is getting drowned out by the noise of refinement.

Once you understand this, a lot of "AI is bad at X" complaints turn into "my context got noisy." Long conversations aren't just less efficient — they're actively degrading the AI's ability to help you. This is a mechanical reality, not a quality problem.

---

## Lesson 3: AI cares most about the beginning and the end — so make good use of your Custom Instructions.

Here's where Lessons 1 and 2 come together.

The AI pays the most attention to two parts of every conversation: the very beginning and the very end. The beginning is where Custom Instructions live — the persistent setup that tells the AI who you are and how to behave. The end is the latest message — the thing you just asked for. The middle of the conversation — all the back-and-forth exchanges — fades in importance as it grows. (This is the "Lost in the Middle" effect, confirmed by Stanford research in 2024.)

The good news: most AI tools protect your Custom Instructions from being deleted during long conversations. They stay in place. The bad news: their *influence weakens* as more content piles up between them and the AI's latest response. The instructions are still there — the AI just pays less attention to them as the conversation grows noisier (Lesson 2).

And here's the other half of it: your first message — the one where you actually thought through what you needed — is the most vulnerable. Everything after it is tinkering: "change this," "make it shorter," "go back to the other version." Those reactive messages pile up, and the carefully crafted opening gets pushed into the middle of the conversation, exactly where the AI pays the least attention. The most thoughtful input you gave gets buried by the least thoughtful.

Most people have never set up their Custom Instructions in ChatGPT, or don't know that Claude has equivalent features. They're leaving the most protected, most influential real estate in every conversation completely blank.

This is why the three tips below all involve being intentional about what goes into the context, especially at the beginning. Custom Instructions aren't an advanced feature. They're the single most useful thing most people aren't using.

In ChatGPT, go to Settings → Personalization → Custom Instructions. In Claude, click your initials in the lower left to set Profile Preferences, or create a Project and add Project Instructions for more control. Tell the AI who you are, what you do, and how you like to work. That one setup will improve every conversation you have from now on.

---

# Part 2: Three Tips

Now that the mechanics are clear — context is everything, overflow kills it, and the bookends matter most — here are three tips for working with these realities instead of against them.

---

## Tip 1: Develop Your Own Shared Language with the AI

**Core idea:** Shared language — metaphors, analogies, and mental models — between human and AI. Not "prompt engineering." A living vocabulary that both sides use to communicate, teach, and reason together.

### How it connects

If context is what matters (Lesson 1), then shared language is a way to pack more meaning into less of it. A single metaphor — "you're chasing squirrels" — communicates in five words what would take a paragraph of technical instruction. And since context is finite (Lesson 2), that efficiency adds up. When you find the metaphors and shorthand that work, those go into your Custom Instructions (Lesson 3) — so the AI starts every conversation already speaking your language.

### The case study: Dug the Dog

The AI was drifting off-task — scope creeping, chasing tangents, losing the thread. Rather than writing a technical correction, Jose typed:

> "Sometimes working with you is like walking Dug the dog from UP, without a leash: everything's fine until you see a squirrel and you just run off. And right now you're seeing squirrels everywhere."

The AI immediately understood three things at once:
1. **The technical problem** — scope drift, losing focus on the original task
2. **The emotional state** — frustration was high, not just mild annoyance
3. **The desired correction** — stop, step back, take a broader look at the problem

It did all three. A technical instruction like "please stay focused on the original scope" would have addressed #1 at best. The metaphor carried the full payload.

**The principle:** Evocative language carries more signal than technical direction. A single metaphor can communicate problem, emotion, and desired action at the same time.

### ELI5

AI doesn't read your mind — it reads your words. And some words work way better than others. Instead of giving the AI robotic instructions, talk to it the way you'd talk to a smart coworker: use comparisons, paint pictures, describe what something *feels like*. If the AI is going off track, don't say "refocus on the original parameters" — say "you're chasing squirrels right now." It'll get it faster.

And it goes both ways. If the AI is explaining something you don't understand, ask it to explain using something you *do* understand. "Explain this like I'm organizing a warehouse" or "describe this like a relay race." You don't need to learn technical language. You need the AI to meet you where you are.

### Everyday tips (works with ChatGPT on the web)

**1. When the AI drifts, describe the drift — don't just correct it.**
Instead of: "That's not what I asked for."
Try: "You're going down a rabbit hole. Come back to the main thing I asked about."
Or even: "You're being Dug from UP right now — squirrel! Let's refocus."
The AI responds better to a *description of the behavior* than a flat correction.

**2. Ask the AI to explain hard things using something you already know.**
Works for anything: "Explain ROI attribution like a relay race." "Explain this spreadsheet formula like a recipe." "Explain this budget variance like I'm packing for a trip and I overpacked one bag."
You'll understand it faster, and the AI will give you a framework you can actually use to make decisions — not just a definition you'll forget.

**3. Build a go-to phrase for when you're frustrated.**
Pick something that feels natural to you — "you're off the rails," "we're going in circles," "squirrel" — and use it consistently. Over the course of a conversation, the AI starts to recognize *your* shorthand. It won't remember between conversations, but within a single chat it picks up patterns fast.

---

## Tip 2: Don't Leash It, Fence It

**Core idea:** Systematic constraints on the AI, built around the fact that you don't know what you don't know. You can't review what you can't evaluate — so you build a process where other AIs do adversarial review of the work, and you mediate the findings.

### How it connects

Shared language (Tip 1) made context efficient. Fences make it clean. Instead of letting the AI wander into irrelevant territory — burning through your finite context window with noise — fences keep it working within bounds where the conversation stays focused and the context stays healthy. And the best fences live in your Custom Instructions, right at the top, where they shape every conversation from the start. "When I say 'Sacred Code,' stop and verify before changing anything" — that's a fence that sits in the most protected space you have.

### Leashes vs fences

Most people's first instinct with AI is to leash it — give it very specific, step-by-step instructions. "Do exactly this, then exactly that." A leash works when you know exactly where the AI needs to go. You're in control, the path is clear, and you're just using the AI as a faster pair of hands.

But if you *don't* know where it needs to go — if you're exploring, building something new, or working outside your expertise — a leash is the wrong tool. You can't give precise directions to a place you've never been. What you need instead is a fence: let the AI run free, explore, and make creative decisions *within bounds that keep it from going somewhere dangerous*.

A leash says: "Go here." A fence says: "Go anywhere you want, but not past there."

### The case study: Sacred Code and Pilgrimages

The Squirrel from Tip 1 worked well enough as a one-off that Jose codified it. It became a built-in skill — a plugin in his AI development environment. Now, instead of re-explaining the concept, he can just say:

> "Squirrel: that feature isn't working like we talked about."

And the AI escalates beyond a typical debug. It doesn't just patch the immediate symptom — it steps back, re-reads the broader context, and addresses the root cause. The word "Squirrel" triggers a specific behavioral protocol, not just a vague instruction.

But the fencing went further than shorthand commands. Jose and the AI started developing a shared vocabulary for how code should be treated:

- Critical business logic gets labeled **"Sacred Code"** in comments — not `// DO NOT MODIFY` or `// IMPORTANT`, but language that sounds intentionally dramatic.
- The AI gets sent on **"pilgrimages"** to review and protect the sacred code — a ritual of re-reading and verifying that nothing has been broken.

The result: the AI pays more attention to these markers than to standard code comments. Jose has prevented real problems multiple times because the AI will stop mid-change and say: *"I was about to change X, but it says this weird thing in the comments."*

Standard comments get skimmed. Dramatic, non-traditional ones get respected. The working theory is that because these comments are unusual — they don't pattern-match to the millions of `// TODO` and `// FIXME` comments in the AI's training data — they stand out. They create friction in the right places.

These are fences. The Sacred Code labels don't tell the AI what to do — they tell it where the boundaries are. The pilgrimages don't control the AI's behavior step by step — they create a review ritual that catches problems before they ship. The AI has full creative and technical freedom inside the fence. It just can't wander past the markers without stopping.

### The adversarial review pattern

Jose also built check gates between every step. After the primary AI builds a feature, a separate adversarial AI reviews the work before it's considered done. The adversarial reviewer isn't trying to be helpful — it's trying to find problems.

**Example: iPhone feature development**
An AI would build an iPhone feature. Before Jose accepted it, an adversarial reviewer AI would examine the code specifically to verify it met Apple's standards — Human Interface Guidelines, accessibility requirements, platform conventions, performance patterns. The reviewer would present findings to Jose, and Jose would mediate: deciding which issues mattered, which were acceptable trade-offs, and which needed to be fixed.

The human's role in this process is worth being specific about. Jose isn't reviewing the code directly — he's reviewing the *disagreements between AIs*. When AI #1 builds something and AI #2 says "this violates Apple's accessibility guidelines," Jose doesn't need to understand the technical details of accessibility implementation. He needs to decide: is this important? Should we fix it? The adversarial structure surfaces issues that a non-technical person would never know to look for, and presents them in a format where the human can make judgment calls.

Without fences: the AI builds something that works today but has hidden problems.
With fences: the AI builds something, a second AI stress-tests it, and the human sees any tension between the two before accepting the work.

**The principle:** You don't need to become technical to get quality output. You need to build a process that compensates for your blind spots — structured disagreement, with you as the decision-maker. That's a role any professional already knows how to play.

### ELI5

Most people give AI super detailed step-by-step instructions because they're afraid it'll do something wrong. That's a leash — and it works fine when you know exactly what you want. But a leash means *you* have to know the right path, and sometimes you don't.

A fence is different. A fence says: "I don't care how you get there, but stay inside these lines." You're not controlling every step — you're setting boundaries and letting the AI figure out the best route. Then, instead of checking every move yourself, you have *another* AI check the work for you. You just look at what the two of them disagree on, and you make the call.

It's like being a manager. You don't need to know how to do everyone's job. You need to know when two people disagree and make the decision about which direction to go.

### Everyday tips (works with ChatGPT on the web)

**1. Give it the boundaries, not the steps.**
Instead of: "Write a 3-paragraph email. First paragraph should cover X. Second paragraph should cover Y. Third should be a call to action."
Try: "Write an email to my team about the Q4 results. Keep it under 200 words, make it encouraging but honest, and end with a clear next step. Surprise me with the structure."
You set the fence. The AI figures out the best way to move within it.

**2. Ask the AI to critique its own work.**
After the AI gives you a draft, follow up with: "Now pretend you're my manager and poke holes in this. What's weak? What would you push back on?"
This is a lightweight version of adversarial review — you're getting the AI to play both builder and reviewer. It catches things you wouldn't think to ask about.

**3. When in doubt, ask "what could go wrong?"**
Before you send that email, publish that report, or commit to that recommendation, ask the AI: "What are three ways this could backfire or be misunderstood?" You're not asking the AI to be perfect, you're asking it to show you the edges of the field so you can decide if you're comfortable.

---

## Tip 3: Put Yourself in the Loop

**Core idea:** Think in trade-offs. Build permission gates into every step and every feature so the AI can't just barrel through — it has to stop, present options, and let the human decide.

### How it connects

Every time you make a decision at a gate, you're adding context the AI didn't have before — your reasoning, your preferences, your domain knowledge. The conversation gets richer and more focused instead of longer and more diffuse. And because each decision lands at the bottom of the conversation — where the AI weighs it most heavily — you're continuously giving it the freshest, most relevant signal about what you actually want.

### The problem it solves

The natural tendency when working with AI is to describe what you want and let it go build it. That works for small, well-understood tasks. But for anything complex, the AI will make dozens of decisions along the way that the human never sees — and some of those decisions will be wrong in ways the human would have caught if they'd been asked.

The fix isn't to micromanage. It's to build gates into the process — points where the AI has to stop, surface the trade-off it's facing, and get a human decision before continuing. Not "check in with me when you're done." More like: "At every decision point, show me the options and let me pick."

### The case study: The Airport

While building the Pangea Marketing Suite, Jose needed to sync thousands of ad records from Meta's advertising API — pulled daily, processed efficiently, without exceeding Meta's rate limits or timing out. He knew what rate limiting was — he'd already built a working version in a prior iteration. But it was painfully slow. His solution had been to build in long delays between requests to avoid getting rate-limited, which meant a full month of data took around 5 minutes to sync. It worked, but it was brute force. He didn't know Swift concurrency patterns or how to make it faster without hitting the limits.

The gates were there — the AI kept stopping and presenting trade-off decisions (batch size, retry strategy, error handling). The fences were working. But Jose kept making the wrong call because his mental model of how syncing should work was off.

He was thinking of syncing like downloading — request everything, get everything, done. So when the AI asked "should we batch in groups of 50 or 500?" he'd pick 500 because bigger seemed more efficient. Wrong. That's what caused the timeouts and rate limits.

The wall broke when the AI explained the problem using a metaphor:

> "Think of ads as passengers at an airport picking up their luggage."

Through that frame, every technical concept became intuitive:
- **Rate limits** = too many passengers rushing the carousel at once
- **Batching** = staggering flight arrivals so the carousel isn't overwhelmed
- **Caching** = pre-sorting luggage before passengers arrive
- **Timeouts** = passengers waiting too long and leaving

Jose could now make architectural trade-off decisions that were natural to him. Should passengers pick up their luggage all at once, or go home and come back? (In practice: a more efficient parsing strategy that didn't time out the API.) He didn't need to learn the jargon — the metaphor gave him a mental model he could reason with, and the reasoning produced working code.

Once concurrency was explained through the airport frame, they built a function that synced an entire month of data in 30 seconds — down from around 5 minutes. Same API, same rate limits, but a fundamentally different approach that Jose could reason about because the concepts were framed in familiar language.

**What this story shows about gates:** The gates were doing their job — surfacing the right questions. The problem was that Jose's mental model was wrong, so he kept making the wrong choice at each gate. It wasn't until a shared metaphor (Tip 1) corrected his intuition that the trade-off decisions became natural. The gates didn't need to get smarter. The human needed the right mental model. And once he had it, every gate after that worked.

**The principle:** Put yourself in the loop not just to catch errors, but to learn. Every trade-off the AI surfaces is a chance to build intuition. And when your intuition is wrong, that's when Tip 1 kicks in to correct it. The tips work together.

### ELI5

When you ask AI to do something big — write a strategy doc, plan an event, build a presentation — the AI will make a hundred small decisions along the way. What to include, what to cut, what tone to use, how to organize it. If you just say "go" and wait for the final result, you'll get something that's maybe 60% right and you won't know why the other 40% feels off.

The fix: tell the AI to check in with you. Not at the end — *during*. "Before you write this, show me your outline and let me approve it." "Give me three options for the opening and let me pick." "When you hit a decision you're not sure about, stop and ask me."

You're not micromanaging. You're steering. And each time you make a choice — "option B, because our audience cares more about X" — the AI gets better context for all the decisions that follow.

### Everyday tips (works with ChatGPT on the web)

**1. Start big tasks with "show me your plan first."**
Before the AI writes anything final, ask it to outline its approach. "I need a presentation about Q4 results. Before you build it, show me what slides you'd include and why." You catch bad assumptions in 10 seconds instead of reading a 20-slide deck you don't like.

**2. Ask "what are you assuming?" before you accept the output.**
The AI always makes assumptions — about your audience, your tone, your goals. It just doesn't tell you unless you ask. After any substantial output, try: "What assumptions did you make here?" You'll be surprised how often it assumed something wrong, and how easy it is to correct when you catch it early.

**3. Turn one-shot requests into two-step conversations.**
Instead of: "Write me a campaign brief."
Try: "I need a campaign brief. First, ask me 5 questions that would help you write a great one."
This flips the dynamic — the AI interviews *you* before it starts working. You end up with better output because the AI actually knows what you need, and you stay in the loop from the very first step.

---

## How the three tips connect

The tips aren't independent — they're a system:

1. **Develop Your Own Shared Language** gives human and AI a vocabulary to reason with
2. **Don't Leash It, Fence It** creates structured constraints so blind spots get surfaced
3. **Put Yourself in the Loop** keeps the human at every decision point, turning each trade-off into a learning moment

The Meta sync story shows how they depend on each other: the gates existed (Tip 3), the fences were in place (Tip 2), but progress was stuck until a shared metaphor (Tip 1) gave the human the mental model needed to make good decisions at the gates.

Each cycle through these tips — each feature built, each trade-off navigated, each metaphor established — makes the next cycle better. The human builds intuition. The shared vocabulary grows. The fences get more precise. The gates surface more nuanced questions.

---

## Further Reading

These ideas didn't come from a book — they came from practice. But it turns out other people arrived at similar conclusions through different paths. Here's where to go deeper on each concept.

**On "it's the context, not the prompt" (Lesson 1):**
- **Andrej Karpathy** (co-founder of OpenAI) endorsed "context engineering" over "prompt engineering" in June 2025, describing it as "the delicate art and science of filling the context window with just the right information for the next step." Jose arrived at the same conclusion independently through building software. — [Karpathy on X](https://x.com/karpathy/status/1937902205765607626)
- **Simon Willison** has documented extensive context engineering patterns including context quarantine, pruning, summarization, and offloading. His writing is the most practical resource on working with context deliberately. — [simonwillison.net/tags/context-engineering](https://simonwillison.net/tags/context-engineering/)
- **Prompting Guide** now has a dedicated Context Engineering Guide that formalizes many of these ideas. — [promptingguide.ai/guides/context-engineering-guide](https://www.promptingguide.ai/guides/context-engineering-guide)

**On context rot and why longer conversations degrade (Lesson 2):**
- **Chroma Research** published a widely-read study on "context rot" in July 2025 showing that LLM performance degrades continuously as context grows — even before the window fills up. This is the research backing for "long chats = worse output." — [research.trychroma.com/context-rot](https://research.trychroma.com/context-rot)
- **"Lost in the Middle"** (Liu et al., Stanford, TACL 2024) demonstrated the U-shaped attention curve: AI pays most attention to the beginning and end of context, and least to the middle. This is the research behind Lesson 3's framing. — [direct.mit.edu/tacl](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00638/119630/Lost-in-the-Middle-How-Language-Models-Use-Long)

**On metaphors and analogies improving AI output (Tip 1):**
- **Analogical Prompting** (ICLR 2024) is a technique where LLMs self-generate relevant analogies before solving problems, drawing on the same principle as the Dug and Airport stories — that analogies improve reasoning. — [arxiv.org/pdf/2310.01714](https://arxiv.org/pdf/2310.01714)
- **Conceptual Metaphor Theory as a Prompting Paradigm** (February 2025) demonstrated that metaphor-based prompting "significantly enhances reasoning accuracy, clarity, and metaphorical coherence" in LLMs. The Dug/Squirrel and Airport/Luggage case studies are practical examples of what this research describes. — [arxiv.org/html/2502.01901v1](https://arxiv.org/html/2502.01901v1)

**On putting the human in the loop (Tip 3):**
- **Ethan Mollick**, *Co-Intelligence* (2024). One of his four core principles is "Be the Human in the Loop" — the same insight as Tip 3. His "jagged frontier" concept explains why human judgment is essential: AI capabilities are unevenly distributed across tasks in ways you can't predict. The AI might nail one part and completely miss the next, which is exactly why gates work.
- **Human-in-the-Loop (HITL)** is an established pattern in machine learning and AI systems design, used by IBM, Google, and Stanford's Human-Centered AI Institute. Tip 3 is the practitioner version of what these organizations have formalized at the systems level.

**On adversarial review and its limits (Tip 2):**
- **"When Can LLMs Actually Correct Their Own Mistakes?"** (TACL 2024-2025) found that self-correction has real limitations — LLMs exhibit self-bias and are better at catching surface-level issues than deep semantic errors. This is why Jose's version (separate AI instance + human mediation) works better than the lightweight "critique your own work" version. Worth knowing the limits. — [direct.mit.edu/tacl](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00713/125177/When-Can-LLMs-Actually-Correct-Their-Own-Mistakes)
