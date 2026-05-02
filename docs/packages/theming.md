## Purpose

Single source of truth for the theming system. Changing the visual identity of any app means editing only `globals.css` — never touching components.

## Location

- Theme file: `packages/ui/src/globals.css`
- Apps import it via: `@import "@stack/ui/globals.css"` in their own `styles.css`
- To change the theme: edit `packages/ui/src/globals.css` only — all apps update automatically

## Architecture

The theme is built on three layers:

```
globals.css (:root / .dark)   ← the only place you change values
    ↓
@theme inline { ... }         ← bridges CSS vars → Tailwind utilities
    ↓
Components use utilities      ← bg-background, text-foreground, rounded-lg…
```

**Never break this chain.** Components must always consume Tailwind semantic utilities, never raw values.

## CSS Variables Contract

All variables are defined in `globals.css` inside `:root` (light) and `.dark` (dark):

```css
:root {
  /* Radius — single multiplier, all scale from this */
  --radius: 0.625rem;

  /* Colors — oklch() space */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
```

## @theme inline Bridge

The `@theme inline` block in `globals.css` exposes CSS vars as Tailwind v4 design tokens:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Radius scale — all derived from --radius */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

## Semantic Token Usage

| Intent           | Tailwind class              |
|------------------|-----------------------------|
| Page background  | `bg-background`             |
| Page text        | `text-foreground`           |
| Card surface     | `bg-card text-card-foreground` |
| Subtle text      | `text-muted-foreground`     |
| Interactive focus | `ring-ring`                |
| Default border   | `border-border`             |
| Input border     | `border-input`              |
| Primary action   | `bg-primary text-primary-foreground` |
| Small radius     | `rounded-sm`                |
| Default radius   | `rounded-lg`                |
| Large radius     | `rounded-xl`                |

## Base Layer

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

This ensures every border and outline defaults to semantic tokens automatically.

## Rules

- NEVER hardcode colors (`#fff`, `oklch(...)`, `blue-500`) in components
- NEVER hardcode radii (`rounded-[8px]`, `rounded-full` for non-circular elements)
- NEVER hardcode border widths or shadows with raw color values
- Always use semantic utilities: `bg-primary`, `text-muted-foreground`, `rounded-lg`, `border-border`
- To change the entire visual identity: edit ONLY `:root` / `.dark` values in `globals.css`
- Dark mode is handled via `.dark` class on `<html>` — no component-level dark variants needed for colors

## Changing the Theme

To rebrand the entire app to a new color palette:
1. Go to `globals.css`
2. Update `:root` oklch values (use https://ui.shadcn.com/themes as generator)
3. Optionally update `.dark` for dark mode variant
4. Done — all components update automatically

To change border radius globally:
1. Go to `globals.css`
2. Update `--radius` in `:root`
3. Done — all `rounded-sm/md/lg/xl/2xl` scale proportionally
