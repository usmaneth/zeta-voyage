# Voyage — Luxury AI Travel Guide

A premium AI travel concierge built on the ZetaChain AI Examples starter app. Voyage transforms the standard chatbot interface into a high-end travel planning experience with rich visual components, live data, and an opinionated design language.

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

Requires a `.env.local` with Privy credentials (see [Environment Setup](#environment-setup) below).

---

## Approach

The starter app shipped with solid AI chat infrastructure — streaming, multi-model support, file handling, memory — but no visual identity. Rather than bolt features onto the default UI, I chose to rebuild the experience layer-by-layer: theme first, then layout, then interactive features. Each decision was guided by one question: **does this feel like something a luxury traveler would actually want to use?**

I leaned heavily on AI tooling throughout development. The design mockups provided direction, but I adapted every component to fit our tech stack (Next.js 16, Tailwind v4, Reverbia SDK) rather than porting code directly.

---

## Design Decisions

### Color & Typography

I went with a **navy + gold** palette using HSL values in Tailwind v4's `@theme inline` system. Navy (`hsl(220, 25%, 12%)`) provides depth without being harsh, and gold (`hsl(43, 90%, 50%)`) acts as the accent across every interactive element. Playfair Display for headings gives the editorial, magazine-like quality you'd expect from a luxury brand.

**Why not a white/minimal theme?** Luxury travel brands (Aman, Four Seasons, Belmond) overwhelmingly use dark, rich color palettes. A white UI would feel like a generic SaaS product.

### Split-Screen Chat Layout

The chat interface uses a 45/55 split: a left panel with auto-rotating destination imagery and live weather, and the right panel for the actual conversation.

**The tradeoff:** This sacrifices horizontal space for the chat, which could feel cramped on smaller laptops. I accepted this because the visual context on the left is doing real work — it sets the mood, surfaces weather data, and gives the user something to look at while waiting for AI responses. On screens below `lg` breakpoint, the panel hides entirely and the chat goes full-width.

### Keyword Detection vs. Tool Calling for Destination Cards

This was the biggest architectural decision. The Reverbia SDK supports tool calling, where the AI can invoke functions during its response loop. The natural instinct would be to create a `show_destination_card` tool.

**Why I didn't:** SDK tool calls execute in a processing loop and return text back to the AI — they're designed for data retrieval, not UI rendering. There's no clean way to say "render this React component" from inside a tool call. The AI would have to emit a marker in its text that the frontend parses, which is essentially keyword detection with extra steps.

So I went with direct keyword detection: the frontend scans each AI response for destination names (including aliases like "Maldivian" or "Greek islands"), and when found, renders a rich card below the message. This approach:

- Works across all AI models (no model-specific tool schemas)
- Renders instantly (no round-trip to the AI)
- Degrades gracefully (if detection misses, the text response still reads fine)

Cards only appear the **first time** a destination is mentioned in a conversation. If messages 1-3 are about Santorini, the card shows after message 1 only. This prevents visual clutter and keeps the focus on the conversation.

### Live Weather vs. Mocked Data

Weather data is **live** via the [Open-Meteo API](https://open-meteo.com/) — a free, CORS-enabled weather service that requires no API key. I chose this over mocked data because it's one of the few APIs you can call directly from the client with zero configuration, and live data makes the experience feel genuinely useful rather than decorative.

The implementation uses pre-mapped coordinates for our curated destinations (avoiding a geocoding API call) and a 15-minute in-memory cache to avoid redundant requests. Temperatures display in Fahrenheit.

**What's mocked:** Trip data, destination descriptions/highlights/itineraries, and pricing are all static. In a production app, these would come from a travel inventory API or CMS.

### 7-Day Forecast Expansion

The inline destination cards include a "7-day" toggle that lazily fetches the daily forecast only on first click. This keeps the initial card lightweight (one API call for current weather) while offering depth for users who want it.

**Why lazy loading matters here:** Each card could trigger a forecast request. If the AI mentions two destinations, that's two unnecessary API calls for data most users won't look at. Fetching on demand keeps things fast.

---

## Features

### Landing Page (`/landing`)

| Feature | Description |
|---------|-------------|
| Parallax hero | Scroll-driven depth with morphing destination text |
| Seasonal destinations grid | 4 destination cards with 3D tilt effect + gold glare on hover |
| Explore modal | Click any destination to see highlights, sample itinerary, pricing, and "Perfect For" tags |
| Hidden Luxuries spotlight | Cursor-tracking reveal — move your mouse to discover hidden perks |
| 3D flip cards | Hover to reveal insider tips for select destinations |
| Split-screen feature section | Image + copy layout for "The Experience" |
| Full-width CTA | Aerial Santorini background with call-to-action |

### Chat Interface (`/`)

| Feature | Description |
|---------|-------------|
| Split-screen layout | Left 45% destination carousel with live weather, right 55% chat |
| Mood selector | 6 travel mood buttons (Adventure, Romance, Relaxation, Culture, Beach, Culinary) — each sends a curated prompt |
| Quick suggestion cards | Pre-written prompts to get started quickly |
| Inline destination cards | Rich cards with image, live weather, 7-day forecast, and Book Now button — triggered by keyword detection |
| Quick action chips | Context-aware follow-up suggestions after each AI response (View Itinerary, Best Dining, Top Hotels, etc.) |
| Custom system prompt | AI responds as a luxury concierge named Voyage, aware of available destinations and card rendering |
| Tool output filtering | SDK internals (memory search results, tool execution logs) are stripped from displayed text |

### AI Customization

The system prompt (`lib/system-prompt.ts`) instructs the AI to:
- Respond as "Voyage," a luxury travel concierge
- Mention curated destinations by name (triggering rich card rendering)
- Maintain a warm but polished tone appropriate for high-end service
- Provide specific, actionable recommendations rather than generic advice

---

## Tech Stack

| Technology | Role |
|-----------|------|
| Next.js 16 (App Router) | Framework |
| React 19 | UI |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling (`@theme inline` + CSS variables) |
| Reverbia SDK | AI chat, streaming, memory, tool execution |
| Motion (v12) | Animations (`motion/react`) |
| Lucide React | Icons |
| Privy | Authentication |
| Open-Meteo API | Live weather data |

---

## Project Structure (Key Files)

```
app/
  landing/page.tsx          — Full landing page
  components/
    chatbot.tsx             — Main chat interface (split-screen, cards, chips)
    chat-provider.tsx       — System prompt wiring
    app-sidebar.tsx         — Sidebar with Voyage branding
    luxury/
      tilt-card.tsx         — 3D tilt wrapper with gold glare
      destination-modal.tsx — Slide-up explore modal
      inline-destination-card.tsx — Chat inline card with weather + forecast
      spotlight-section.tsx — Cursor-tracking hidden luxuries
      flip-card.tsx         — 3D flip card experiences
      mood-selector.tsx     — Travel mood grid
      quick-action-chips.tsx — Contextual follow-up chips
      weather-widget.tsx    — Weather display components
      destination-card.tsx  — Standalone destination card
      upcoming-trips.tsx    — Trip list with status badges

lib/
  system-prompt.ts          — Voyage concierge persona
  travel-data.ts            — Destination types + mock data
  weather-api.ts            — Open-Meteo integration (live, 15-min cache)
  detect-destinations.ts    — Keyword + alias detection
  constants.ts              — Travel-themed placeholders
  models.ts                 — AI model configuration

public/images/              — Destination and hero images
```

---

## Environment Setup

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_URL=https://portal.anuma-dev.ai
NEXT_PUBLIC_PRIVY_APP_ID=cmjkga3y002g0ju0clwca9wwp
```

Then:

```bash
pnpm install
pnpm dev
```

---

## What's Real vs. Mocked

| Data | Source |
|------|--------|
| Current weather | **Live** — Open-Meteo API, no key required |
| 7-day forecast | **Live** — Open-Meteo API, fetched on demand |
| AI responses | **Live** — Reverbia SDK streaming |
| Destination descriptions, highlights, itineraries, pricing | **Mocked** — Static data in `travel-data.ts` and component files |
| Trip data (upcoming trips) | **Mocked** — Static data in `travel-data.ts` |
| Destination images | **Static** — Local files in `public/images/` |

---

## Known Considerations

- **Destination card detection** relies on keyword matching. If the AI rephrases a destination name in an unexpected way (e.g., "the Greek isle" instead of "Santorini"), the card won't trigger. The alias list covers common variations but isn't exhaustive.
- **Weather cache** is in-memory (not persisted). A full page refresh resets the 15-minute cache.
- **Left panel** hides on screens below the `lg` breakpoint (~1024px). The chat experience still works fully on smaller screens, just without the destination imagery.
