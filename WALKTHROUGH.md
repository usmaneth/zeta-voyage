# Voyage — Technical Walkthrough

## What We Were Given

Two things:

**The starter app** — a Next.js 16 chatbot scaffold built on the Reverbia SDK. It had solid AI infrastructure out of the box: streaming responses, multi-model support, file handling, conversation memory, and tool execution. But visually it was a blank slate — default shadcn components, no brand identity, no vertical-specific features.

**Design mockups** — a separate Vite + Express app (not production code, just a design reference) showing what a luxury travel experience *could* look like. Different tech stack entirely — `framer-motion`, `wouter` for routing, inline styles in places. The mockups came in stages as zip files, each introducing new components.

The challenge wasn't "build from scratch" — it was "take working AI infrastructure and layer a compelling, polished product experience on top of it without breaking what already works."

---

## How We Approached It — Layer by Layer

Rather than bolting features on randomly, we went **theme → layout → interactive features**, in that order. Each layer had to be stable before building the next one.

### Layer 1: Design System

Started with color and typography. We chose a **navy + gold HSL palette** using Tailwind v4's `@theme inline` system with CSS custom properties.

Why navy + gold? Luxury travel brands — Aman, Four Seasons, Belmond — overwhelmingly use dark, rich palettes. A white/minimal UI would feel like a generic SaaS product. Navy (`hsl(220, 25%, 12%)`) gives depth without being harsh. Gold (`hsl(43, 90%, 50%)`) is the accent across every interactive element — buttons, borders, loading states, hover effects.

Typography: **Playfair Display** for headings (serif, editorial feel — like a travel magazine) mapped to Tailwind's `font-serif` utility through the theme config. Body text stays clean with the system sans-serif.

One thing worth noting: Tailwind v4 changed how themes work. It's no longer `tailwind.config.js` with a colors object — it's `@theme inline` blocks in CSS with `var()` references. The entire color system lives in `globals.css` as HSL custom properties. This is a meaningful architectural shift from v3 that affects how you compose styles.

### Layer 2: Layout

The chat interface uses a **45/55 split-screen**: left panel with auto-rotating destination imagery and live weather, right panel for the conversation.

The tradeoff here is explicit: we sacrifice horizontal space for the chat. On smaller laptops this could feel cramped. We accepted this because the left panel is doing real work — it sets mood, surfaces live weather data, and gives users something to look at during AI response latency. Below the `lg` breakpoint (~1024px), the left panel hides entirely and chat goes full-width. No compromised middle ground — either the panel adds value or it's gone.

### Layer 3: Interactive Features

This is where the mockup components came in. Each was adapted rather than ported directly — different animation library (`motion/react` not `framer-motion`), different routing (`next/link` not `wouter`), different component patterns (native buttons with Tailwind classes rather than importing shadcn `Button` for simple CTAs).

---

## File Structure — What We Added vs. Modified

A key principle: **don't scatter changes everywhere**. We kept a clean separation between the starter app's existing infrastructure and our new travel-specific code.

### Files We Created (New)

All new travel-specific code lives in two places:

**`app/components/luxury/`** — A dedicated directory for all luxury UI components. This was an intentional choice: rather than dropping new components alongside the starter app's existing ones (`chatbot.tsx`, `app-sidebar.tsx`, etc.), we namespaced everything under `luxury/`. This means:
- You can instantly see what's ours vs. what shipped with the starter
- Deleting the `luxury/` folder would cleanly remove all travel UI without touching core chat functionality
- No risk of naming collisions with existing components

```
app/components/luxury/
  tilt-card.tsx              — 3D tilt wrapper with gold glare (landing page)
  destination-modal.tsx      — Full-screen explore modal with itinerary/pricing
  flip-card.tsx              — 3D flip cards with insider tips
  spotlight-section.tsx      — Cursor-tracking hidden luxuries reveal
  mood-selector.tsx          — 6 travel mood buttons for chat onboarding
  quick-action-chips.tsx     — Context-aware follow-up suggestions
  inline-destination-card.tsx — Rich card rendered inside chat messages
  destination-card.tsx       — Standalone destination card component
  weather-widget.tsx         — Weather display (compact + full variants)
  upcoming-trips.tsx         — Trip list with status badges
```

**`lib/`** — Domain logic and data, separate from UI:

```
lib/
  system-prompt.ts           — Voyage concierge persona prompt
  travel-data.ts             — Destination, Trip, WeatherData types + mock data
  weather-api.ts             — Open-Meteo integration with 15-min cache
  detect-destinations.ts     — Keyword + alias detection engine
```

**`app/landing/page.tsx`** — The entire landing page is new. We created a new route rather than modifying the existing app entry point.

**`public/images/`** — 10 destination and hero images for the visual layer.

### Files We Modified (Existing)

These are starter app files we touched. The goal was **minimal, surgical edits** — change what's needed for the travel experience without rewriting the app's plumbing:

| File | What Changed | Why |
|------|-------------|-----|
| `app/globals.css` | Full rewrite | Replaced default theme with navy+gold HSL palette. This is the design system foundation — everything else references these variables. |
| `app/layout.tsx` | Font + metadata | Added Playfair Display import, updated page title/description to Voyage branding. ~5 lines changed. |
| `app/login/page.tsx` | Visual reskin | Background image, gold accents, luxury copy. Same auth flow, different paint. |
| `app/components/chatbot.tsx` | Heaviest modification | Added split-screen layout, mood selector, inline cards, quick action chips, tool output stripping, card deduplication logic. This is where the chat *experience* lives. |
| `app/components/chat-provider.tsx` | System prompt wiring | Imported `VOYAGE_SYSTEM_PROMPT` and passed it as `systemPrompt` prop to `useAppChat()`. ~3 lines changed. |
| `app/components/app-sidebar.tsx` | Branding | Swapped header text to "Voyage" with gold styling. ~2 lines changed. |
| `app/components/app-layout.tsx` | Loading spinner | Changed default spinner to gold. ~1 line changed. |
| `app/(app)/layout.tsx` | Loading spinner | Same gold spinner change. ~1 line changed. |
| `lib/constants.ts` | Placeholder text | Travel-themed input placeholders instead of generic ones. |

### What We Didn't Touch

Just as important — what we left alone:

- **`hooks/`** — All SDK hooks (`useAppChat`, `useAppModels`, `useAppFiles`, etc.) untouched. The AI infrastructure works; we built on top of it.
- **`components/ui/`** — The entire shadcn component library. We use these components as-is and added our own alongside them.
- **`components/chat/`** — The core chat message rendering pipeline. We compose around it, not inside it.
- **`app/api/`**, **`lib/database.ts`**, **`lib/seed-data.ts`** — Backend/data infrastructure. No reason to touch.
- **`e2e/`**, **`eslint.config.mjs`**, **`tsconfig.json`** — Tooling config. Left as-is.

### Why This Structure Matters

This organization answers a question every reviewer will have: *"How much of this is yours vs. the starter?"*

The answer is clear at a glance:
- **`luxury/`** directory = all new UI components
- **`lib/system-prompt.ts`**, **`lib/travel-data.ts`**, **`lib/weather-api.ts`**, **`lib/detect-destinations.ts`** = all new domain logic
- **`app/landing/page.tsx`** = new page
- Everything else = targeted modifications to existing files, mostly skinning and wiring

A reviewer can `diff` any modified file against the starter to see exactly what changed. The new files stand entirely on their own.

---

## Key Features — What We Built and Why

### Landing Page

- **Parallax hero** with scroll-driven depth and morphing destination text
- **3D tilt destination cards** — uses `useMotionValue` and `useSpring` to track cursor position, applies `rotateX`/`rotateY` transforms with `perspective(1000px)` and `preserve-3d`. A gold glare overlay follows the cursor using `useMotionTemplate` for the gradient position. The math maps cursor coordinates to a configurable tilt range (default 8°).
- **Explore modal** — click any destination card and a full-screen slide-up shows highlights, a day-by-day itinerary timeline with gold connector dots, pricing, duration, rating, and "Perfect For" tags.
- **Hidden Luxuries spotlight** — a cursor-tracking section where moving your mouse reveals hidden perks. Uses pointer event coordinates mapped to a radial gradient mask.
- **3D flip cards** — CSS `backface-visibility: hidden` on two absolutely positioned faces, `rotateY(180deg)` on hover via motion. Shows insider tips on the back.

### Chat Interface

- **Mood selector** — 6 travel mood buttons (Adventure, Romance, Relaxation, Culture, Beach, Culinary). Each has a unique color gradient, icon, and sends a curated prompt. Selected state shows gold border with sparkle effect; unselected moods fade to 40% opacity. This gives users a low-friction way to start without typing.

- **Inline destination cards** — this was the biggest architectural decision, covered in its own section below.

- **Quick action chips** — context-aware follow-up suggestions that appear after each AI response. A `detectActions()` function scans the message for keywords (destinations, hotels, dining, itinerary, activities, booking, romance) and returns up to 4 relevant chips. If nothing matches, falls back to "Explore More" / "Surprise Me". Only renders on the latest message to avoid visual clutter.

- **Live weather** — Open-Meteo API, displayed in Fahrenheit, 15-minute in-memory cache.

- **Tool output filtering** — the Reverbia SDK sometimes surfaces internal text like `Executing tool: search_memory(query=...)` in the response stream. We strip this with regex before rendering. Applied in three places: the streaming subscription callback, stored message text display, and the StreamingMessage component's initial text prop.

---

## The Big Decision: Keyword Detection vs. Tool Calling

This is worth spending time on because it shows architectural reasoning.

The Reverbia SDK supports **tool calling** — the AI can invoke functions during its response loop. The natural instinct would be to create a `show_destination_card` tool that the AI calls when it wants to display a card.

**Why we didn't do that:**

SDK tool calls execute in a processing loop and return **text** back to the AI. They're designed for data retrieval (search memory, look up a fact), not UI rendering. There's no clean mechanism to say "render this React component in the chat stream" from inside a tool call.

You *could* hack it: have the tool return a special marker string like `[CARD:santorini]`, then parse that on the frontend. But that's just keyword detection with extra steps, plus now you're dependent on the AI model reliably invoking the tool and the response loop completing before the text renders.

**What we did instead:** Direct keyword detection on the frontend. After each AI response, we scan the text for destination names and aliases (e.g., "Maldivian," "Greek islands," "Swiss Alps") and render rich cards below the message.

Benefits:
- **Model-agnostic** — works across all AI models, no tool schemas to maintain
- **Instant rendering** — no round-trip to the AI, cards appear as soon as text is parsed
- **Graceful degradation** — if detection misses, the text response still reads perfectly fine
- **Simpler debugging** — the detection logic is a pure function you can unit test

The system prompt tells the AI that cards will be rendered when it mentions destinations by name, so it's encouraged to name-drop specific destinations rather than being vague.

---

## Edge Cases We Hit and Solved

### Card Deduplication

If messages 1-3 are all about Santorini, the card should only appear after message 1. First attempt used a `useRef(new Set())` to track shown destinations, adding IDs during render. This is a **React anti-pattern** — mutating a ref during render is a side effect. On re-renders (which happen frequently with streaming), the Set was already populated from the first render pass, so every destination got filtered out. Cards stopped appearing entirely.

The fix: **pure computation from the messages array**. For each message, we iterate all *previous* assistant messages, build a Set of already-shown destination IDs, and filter the current detections against it. No mutation, no side effects, deterministic on every render. This is the kind of bug that's easy to introduce and hard to debug — it only manifests when React re-renders, which during streaming is constant.

### Temperature Unit Mismatch

Changed the Open-Meteo API to return Fahrenheit (`&temperature_unit=fahrenheit`), but the frontend still showed "°C". The API change was correct but there were 5 hardcoded "°C" labels across 4 component files. A grep for "°C" caught them all. Lesson: when you change a data source, trace the label all the way to the render.

### Tool Execution Text Leaking

The Reverbia SDK's internal execution logs (`Executing tool: search_memory(query=...)` with numbered result lines) were rendering in the chat. This is SDK infrastructure that should never face users. We added a `stripToolOutput()` regex function applied at three points in the rendering pipeline — the streaming callback, the stored message render, and the StreamingMessage component's initial text. Three application points because text enters the UI through three different code paths depending on whether the message is actively streaming, just finished, or loaded from history.

---

## Adaptation Patterns — Mockup to Production

Every component from the mockups needed adaptation. The patterns were consistent:

| Mockup | Production | Why |
|--------|-----------|-----|
| `framer-motion` | `motion/react` | Motion v12 rebranded. Same API, different import path |
| `wouter` `<Link>` | `next/link` `<Link>` | Next.js App Router handles routing |
| `font-playfair` | `font-serif` | Our Tailwind theme maps serif to Playfair Display |
| shadcn `<Button>` for simple CTAs | Native `<button>` + Tailwind | Avoid unnecessary component overhead for a styled button |
| Inline hex colors | HSL CSS custom properties | Consistent with our design system |
| `date-fns` formatting | Native `Date` methods | One less dependency for simple date display |

This wasn't mindless find-and-replace. Each adaptation required understanding *why* the mockup made its choice and whether that reason still applied in our stack.

---

## What's Real vs. Mocked

| Data | Source |
|------|--------|
| Current weather | **Live** — Open-Meteo API, no key required |
| 7-day forecast | **Live** — fetched on demand (lazy loaded on click) |
| AI responses | **Live** — Reverbia SDK streaming |
| Destinations, highlights, itineraries, pricing | **Mocked** — static data |
| Trip data | **Mocked** — static data |
| Images | **Static** — local files |

The weather lazy loading is intentional: each destination card could trigger a forecast request. If the AI mentions three destinations, that's three API calls for data most users won't look at. Fetching on first click of the "7-day" toggle keeps initial load fast while offering depth for users who want it.

---

## Frontend Engineering Choices Worth Highlighting

- **CSS custom properties over Tailwind config values** — Tailwind v4's `@theme inline` means your design tokens live in CSS, not JavaScript. This enables runtime theme switching without rebuilding and keeps the styling layer decoupled from the build toolchain.

- **`useMotionValue` + `useSpring` for tilt cards** — Rather than re-rendering on every mouse move, motion values update outside React's render cycle. The spring physics are handled by the animation library, not by React state updates. This is critical for 60fps interactions — a `useState` approach would cause a re-render on every `mousemove` event.

- **`AnimatePresence` for modals** — Allows exit animations. Without it, React unmounts the component immediately and you can't animate out. The modal slides up on mount and slides down on unmount.

- **Deterministic card deduplication** — Computing "which cards to show" from the messages array rather than tracking state imperatively. This is the functional programming principle applied: same input, same output, no hidden state. It naturally handles edge cases like message deletion or conversation reload.

- **Three-point text sanitization** — Applying `stripToolOutput()` at the streaming callback, the stored message render, and the StreamingMessage component covers all code paths. Missing any one of these would leak SDK internals in specific scenarios (active stream, just-completed message, or history reload).

---

## Summary

1. **System design** — Layered approach (theme → layout → features), each building on the last
2. **Architectural reasoning** — Keyword detection over tool calling, with clear rationale
3. **Bug debugging** — React render side-effect bug caught and fixed with a principled approach
4. **Adaptation skill** — Taking mockup code in one stack and translating it to another without cargo-culting
5. **Attention to detail** — Temperature labels, tool output leaking, card deduplication, lazy loading
6. **Performance awareness** — Motion values outside render cycle, lazy forecast fetching, in-memory caching
7. **Product thinking** — Every feature tied back to "does this feel like something a luxury traveler would actually want to use?"
