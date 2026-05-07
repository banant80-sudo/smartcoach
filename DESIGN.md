# Design Brief

## Direction
Educational Clarity + Trust — a light, accessible platform for teachers to spot student improvement areas and provide coaching. Warm emerald primary with status-flag system (red/yellow/green).

## Tone
Friendly yet focused. Warm, approachable geometry with restrained motion. Teacher-facing clarity first, no gamification chrome.

## Differentiation
Dual-action status badges on student cards — at a glance, red/yellow/green flags + quick-access coaching button in one gesture. No scrolling needed for workflow.

## Color Palette

| Token       | OKLCH          | Role                              |
|-------------|----------------|-----------------------------------|
| background  | 0.98 0.01 230  | Cool light off-white              |
| foreground  | 0.18 0.02 230  | Deep text for readability         |
| primary     | 0.48 0.18 150  | Warm emerald (trust, growth)      |
| accent      | 0.65 0.15 70   | Warm amber (CTAs, highlights)     |
| chart-1     | 0.55 0.22 25   | Red flag (needs improvement)      |
| chart-2     | 0.72 0.15 85   | Yellow flag (moderate progress)   |
| chart-3     | 0.6 0.18 150   | Green flag (on track)             |
| muted       | 0.92 0.01 230  | Secondary backgrounds             |
| border      | 0.88 0.01 230  | Subtle dividers                   |

## Typography

- Display: Fraunces — headers, student names, grade labels
- Body: DM Sans — UI labels, descriptions, body text
- Scale: Hero `text-5xl font-bold`, headings `text-2xl font-bold`, labels `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Subtle shadow hierarchy: card `shadow-xs`, no full-page depth. Cool light theme with restrained shadows for focus on content.

## Structural Zones

| Zone    | Background | Border          | Notes                                      |
|---------|------------|-----------------|--------------------------------------------|
| Header  | card/white | border-b        | Language toggle, title; subtle separation |
| Content | background | —               | Alternating card bg on student sections   |
| Footer  | muted/40   | border-t        | Help, settings; soft treatment            |

## Spacing & Rhythm

Spacious gaps: `gap-6` between grade sections, `gap-4` within student grid, `gap-2` for micro-spacing. Breathing room for teacher scanning.

## Component Patterns

- Buttons: rounded `lg`, accent color, hover opacity 90%, no transforms
- Status flags: inline-flex with `text-xs`, subtle background opacity (10% of color), bold text
- Cards: `rounded-lg`, white/card background, `shadow-xs` on hover
- Badges: student progress inline, red/yellow/green, no transitions

## Motion

- Entrance: fade-in on page load (200ms)
- Hover: opacity change on buttons/cards (300ms ease)
- Coaching flow: 1-click access, no modals (inline drawer preferred)

## Constraints

- Multi-language: all strings in Odia, Hindi, English — no hardcoded text
- Mobile-first: `sm:` breakpoints for tablet/desktop
- Accessibility: WCAG AA, color not sole indicator (icons + text for flags)
- Teacher workflows: reduce cognitive load, visual flags first, coaching access one tap

## Signature Detail

Dual-action status badges that combine progress indicator + quick coaching link on each student card — teacher never leaves the dashboard to start coaching.
