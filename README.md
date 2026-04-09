# 🏯 Japanese Wall Calendar

An interactive, aesthetically rich Japanese-themed wall calendar built with **React 19** and **Vite**. The calendar is presented as a hanging scroll inside a fully rendered Japanese room interior — complete with a garden window, shoji walls, tatami flooring, and seasonal visual theming.

---

## ✨ Features

### 🗓️ Calendar Core
- **Full month grid** — 6×7 day grid with Monday-start (ISO) layout
- **Month navigation** — browse forwards and backwards through months/years
- **Today highlighting** — current date marked with a distinctive red circle
- **Japanese display** — month names in kanji (一月, 二月, …), weekday labels in Japanese (月, 火, 水, …)

### 🎯 Date Range Selection
- **State machine-driven** — 4-phase selection model (`idle` → `start-selected` → `complete` → `disabled`)
- **Click-to-select** — click one date to start, click another to complete the range
- **Live hover preview** — visual preview of the range while hovering before confirming
- **Bidirectional** — click dates in any order; the range auto-corrects to start < end
- **Single-day selection** — click the same date twice to select a single day

### 🎌 Japanese Holidays & Cultural Dates
- **Public holidays** (Shukujitsu) marked with subtle red accent dots
- **Cultural dates** (Tanabata, Obon, Hinamatsuri, etc.) with tooltip labels
- **Bilingual labels** — English name + Japanese (e.g., "Showa Day · 昭和の日")

### 🖼️ Monthly Header Images
- **12 unique images** — one per month, displayed as a scenic header above the calendar grid
- **Responsive sizing** — uses `max-height` with `object-fit: cover` to adapt across viewports
- **Static imports** — Vite optimizes and hashes each image at build time

### 📝 Persistent Notes
- **Per-month notes** — textarea with monthly context, persisted via `localStorage`
- **Lined paper effect** — CSS-only ruled lines for an authentic notebook feel
- **Range-aware placeholders** — placeholder text updates based on selection state

### 🌸 Seasonal Theming
- **4 seasons** — Spring, Summer, Autumn, Winter — each with a complete visual overhaul
- **CSS custom properties** — a single `data-season` attribute on `<html>` switches the entire color palette
- **Affected elements**: paper warmth, wood tones, accent colors, text colors, garden scene, particle effects

| Season | Accent | Wood | Paper | Garden Particles |
|--------|--------|------|-------|-----------------|
| 🌸 Spring | Sakura pink | Light hinoki | Warm washi | Falling petals |
| 🌿 Summer | Deep indigo | Rich cedar | Bright white | — |
| 🍂 Autumn | Maple red | Dark walnut | Aged warm | Falling leaves |
| ❄️ Winter | Camellia red | Charred cedar | Icy white | Snowfall |

### 🏡 Immersive Scene
- **Garden window** — left panel with a dynamic SVG garden (trees, pond, lantern, stepping stones)
- **Shoji wall** — center panel with kumiko grid pattern where the calendar hangs
- **Shoji sliding doors** — right panel with frosted paper and wooden frames
- **Tatami floor** — bottom strip with straw texture and alternating mat tones
- **Ambient lighting** — subtle light spill animation from the garden window
- **Hanging system** — nail + rope SVG with the calendar paper suspended below

---

## 🏗️ Architecture

```
src/
├── App.jsx                    # Root — composes Scene + Calendar
├── components/
│   ├── Calendar/
│   │   ├── Calendar.jsx       # Main calendar component (grid, nav, notes)
│   │   ├── Calendar.module.css
│   │   └── HeaderImage.jsx    # Month-specific header illustration
│   ├── Garden/
│   │   ├── Garden.jsx         # Season-aware SVG garden scene
│   │   └── Garden.module.css
│   └── Scene/
│       ├── Scene.jsx          # Japanese room interior layout
│       └── Scene.module.css
├── hooks/
│   ├── useCalendar.js         # Month/year navigation state + grid builder
│   ├── useDateRange.js        # Date range selection state machine
│   └── useSeason.js           # Season derivation + DOM attribute setter
├── constants/
│   ├── holidays.js            # Japanese public holidays & cultural dates
│   ├── calendar.js            # Calendar constants
│   └── seasons.js             # Season definitions
├── utils/
│   └── dateUtils.js           # Pure date functions (grid, compare, format)
├── styles/
│   └── global.css             # Design tokens, fonts, seasonal CSS variables
└── assets/
    └── calendar-headers/      # 12 monthly header images (01–12)
```

### Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Separation of concerns** | Hooks own state, components own rendering, utils are pure functions |
| **CSS Modules** | Scoped styles per component — no global class collisions |
| **CSS custom properties** | Seasonal theming via `data-season` attribute — zero JS for style switching |
| **Zero dependencies** | No external UI libraries — only React + ReactDOM |
| **Responsive by default** | `clamp()`, `flex`, and `@media` breakpoints at 1024px and 768px |
| **Accessibility** | `aria-label` on buttons, `tabIndex` management, `prefers-reduced-motion` support |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd calendar-app

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
npm run preview
```

Builds optimized output to `dist/` and serves it locally for preview.

### Linting

```bash
npm run lint
```

---

## 📁 Key Files Explained

### Hooks

| Hook | Purpose |
|------|---------|
| `useCalendar` | Manages `year`/`month` state, builds the 42-cell grid array, provides navigation functions (`goToPrev`, `goToNext`, `goToToday`) |
| `useDateRange` | State machine for date range selection with 4 phases. Provides `getDayState()` for per-cell visual states and `handleDayClick`/`handleDayHover` handlers |
| `useSeason` | Derives season string from month, sets `data-season` on `<html>` to trigger CSS variable cascade |

### Utils

| Function | Description |
|----------|-------------|
| `buildCalendarGrid(year, month)` | Returns 42 day objects with `date`, `day`, `isCurrentMonth`, `isToday` |
| `isSameDay(a, b)` | Date comparison ignoring time |
| `isInRange(date, start, end)` | Checks if a date falls within a range |
| `getSeasonFromMonth(month)` | Maps month index to season string |
| `formatRangeLabel(start, end)` | Formats "Apr 7 – Apr 12" style labels |

### Constants

| File | Description |
|------|-------------|
| `holidays.js` | Japanese public holidays (`FIXED_HOLIDAYS`) and cultural dates (`CULTURAL_DATES`) with O(1) lookup via `MM-DD` keys |

---

## 🎨 Theming

The entire visual theme is driven by **CSS custom properties** defined in `src/styles/global.css`. Changing the season updates these variables:

```css
:root[data-season="spring"] {
  --shoji-paper: #F9F6F0;
  --wood-frame: #C8A97E;
  --accent-primary: #F2C9D8;    /* Sakura pink */
  --text-main: #4A4036;
  /* ... */
}
```

The `useSeason` hook automatically sets `data-season` on `<html>` whenever the viewed month changes, and every styled element reacts through CSS inheritance.

---

## 📱 Responsive Design

The layout adapts across three breakpoints:

| Viewport | Layout | Calendar Width |
|----------|--------|----------------|
| **> 1024px** | Side-by-side (garden \| calendar \| doors) | `clamp(220px, 84%, 370px)` |
| **768–1024px** | Compact side-by-side | `clamp(190px, 88%, 330px)` |
| **< 768px** | Stacked (garden on top, calendar below) | `clamp(260px, 92%, 420px)` |

---

## ♿ Accessibility

- All navigation buttons have `aria-label` attributes
- Holiday dots have `aria-label="Holiday"`
- Decorative elements use `aria-hidden="true"`
- Days outside the current month have `tabIndex={-1}`
- `prefers-reduced-motion` media query disables all animations

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI framework |
| Vite | 8.0 | Build tool & dev server |
| React Compiler | 1.0 | Automatic memoization |
| CSS Modules | — | Scoped component styles |
| Google Fonts | — | Cormorant Garamond + Noto Sans JP |

---

## 📄 License

This project is private and not licensed for public distribution.
