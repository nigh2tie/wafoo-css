# Wafoo CSS API Reference (WFUI-API)

This document is optimized for AI coding assistants to understand the Wafoo CSS framework.

## Core Concepts

- **Prefix**: All classes use `.wf-` prefix (e.g., `.wf-btn`).
- **Themes**: Applied to `<body>` (e.g., `.theme-sakura`).
- **Design System**: Based on traditional Japanese aesthetics (vertical rhythm, natural colors).

## Components

### Buttons (`.wf-btn`)
- Variants: `.wf-btn-primary`, `.wf-btn-outline`, `.wf-btn-ghost`, `.wf-btn-gradient`
- Sizes: `.wf-btn-sm`, `.wf-btn-lg`

### Cards (`.wf-card`)
- Standard: `.wf-card`
- Washi Style: `.wf-card-washi` (includes decorative corners)

### Typography
- Vertical Text: `.wf-writing-vertical-rl`
- Serif Font: `.wf-font-serif` (Noto Serif JP)

### Layout
- Container: `.wf-container`
- Grid: `.wf-grid`, `.wf-grid-cols-{1-12}`
- Flex: `.wf-flex`, `.wf-flex-col`, `.wf-items-center`

### Utilities (Common)
- Spacing: `.wf-m-{0-12}`, `.wf-p-{0-12}`
- Colors: `.wf-text-{color}`, `.wf-bg-{color}`
- Display: `.wf-hidden`, `.wf-block`, `.wf-inline-block`

## CSS Variables (Tokens)

### Colors
- `--wf-color-primary`: Main brand color
- `--wf-color-accent`: Accent color (often red/pink)
- `--wf-color-text`: Main text color
- `--wf-color-bg`: Background color

### Spacing
- `--wf-space-1`: 0.25rem
- `--wf-space-4`: 1rem

## Example Usage

### Card with Button
```html
<div class="wf-card-washi">
  <h3 class="wf-card__title">Title</h3>
  <p class="wf-card__text">Content goes here.</p>
  <button class="wf-btn wf-btn-primary">Action</button>
</div>
```

### Vertical Text Hero
```html
<section class="wf-section wf-text-center">
  <h1 class="wf-writing-vertical-rl wf-font-serif" style="height: 300px">
    Japanese Title
  </h1>
</section>
```
