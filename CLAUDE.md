# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Git Operations

**NEVER push to remote repositories without explicit user permission.**

When the user asks to "create a commit" or "prepare for release":
1. STOP before running `git push`
2. Show the user what will be committed
3. ASK for explicit permission: "May I push to GitHub?"
4. ONLY push if the user explicitly says "yes" or "push it"

**Violations of this rule cause serious problems and must be avoided at all costs.**

## Project Overview

**wafoo-css** is a Japanese-inspired (和風) CSS framework providing components styled with traditional Japanese aesthetics. The project is currently in MVP phase with plans for expansion. It includes buttons, cards, forms, alerts, and unique components like stamps (判子) and noren headers (暖簾).

## Build & Development Commands

### Build
```bash
bash scripts/build.sh
```
Concatenates all `src/` CSS files into `dist/wafoo.css` and creates a minified version `dist/wafoo.min.css`.

### Local Development
```bash
# Serve locally for testing (choose one):
python3 -m http.server 8000  # Then visit http://localhost:8000/docs/
npx serve                     # Alternative static server

# Open docs directly (macOS):
open docs/index.html
```

### Size Budget Check
```bash
gzip -c dist/wafoo.min.css | wc -c  # Target: <10KB
```

### Testing & QA
- Test at viewport widths: 320px, 768px, 1200px
- Browser targets: Chrome, Safari, Edge (latest stable)
- Run Lighthouse for accessibility/performance audits
- W3C HTML Validator for example pages

## Architecture

### File Structure
```
src/
├── tokens.css              # Design tokens (colors, spacing, typography)
├── themes.css              # 10 traditional Japanese color themes
├── base.css                # Reset, typography, layout containers
├── components/             # Component styles
│   ├── buttons.css         # Button variants & states
│   ├── stamp.css           # Japanese stamp (判子) component
│   ├── cards.css           # Card & washi variants
│   ├── forms.css           # Inputs, labels, error states
│   ├── header.css          # Noren (暖簾) header
│   ├── steps.css           # Progress steps
│   └── alerts.css          # Alert/status messages
└── utilities.css           # Spacing utilities

dist/                       # Build output (do not edit directly)
docs/                       # Documentation & demos
examples/                   # Usage examples
```

### Build Order
The build script concatenates CSS in this specific order (important for cascade):
1. tokens.css
2. themes.css (10 traditional Japanese color themes)
3. base.css
4. components/* (buttons, stamp, cards, forms, header, steps, alerts, etc.)
5. utilities.css

All themes are bundled into the main `dist/wafoo.css` file - no separate inclusion needed.

### Design Token System

All visual design is controlled through CSS custom properties in `src/tokens.css`:

**Color tokens** - Based on traditional Japanese colors (藤紫 fujimurasaki for accent, 灰桜 haizakura for background):
- Primitives: `--wf-ink-*` (grays), `--wf-accent-*` (50-900 scale)
- Semantic: `--wf-color-text`, `--wf-color-bg`, `--wf-link-color`, `--wf-primary-bg`
- Status: `--wf-success`, `--wf-warning`, `--wf-danger` (AA contrast verified)

**Spacing** - 4px base scale: `--wf-space-1` through `--wf-space-8`

**Typography** - `--wf-font-sm/md/lg`

**Component-specific** - `--wf-btn-py-md`, `--wf-icon-md`, `--wf-stamp-color`, etc.

When adding new components, always reference existing tokens before creating new ones.

### Theming

Ten theme classes are available (defined in `src/themes.css`), each based on traditional Japanese color names:
- `theme-sakura` (桜 - cherry blossom)
- `theme-koubai` (紅梅 - red plum)
- `theme-moe` (萌黄 - spring green)
- `theme-kiku` (菊 - chrysanthemum)
- `theme-koori` (氷 - ice)
- `theme-yanagi` (柳 - willow)
- `theme-momiji` (紅葉 - autumn leaves)
- `theme-fuji` (藤 - wisteria)
- `theme-uguisu` (鶯 - Japanese bush warbler)
- `theme-yuki` (雪 - snow)

Apply to root element: `<body class="theme-kiku">`. Each theme overrides accent colors while maintaining the overall design system.

**Note:** Dark mode (`prefers-color-scheme: dark`) is not implemented. Users can implement it themselves if needed.

### Component Patterns

**Naming conventions:**
- All classes prefixed with `wf-` (wafoo)
- Base class + variant class pattern: `wf-btn wf-btn-primary`
- State modifiers: `is-loading`, `is-invalid`, `is-current`, `is-done`
- Icons: `<span class="wf-icon" aria-hidden="true">✓</span>` inside components

**Component structure:**
- Base styles in `.wf-{component}`
- Variants add to base: `.wf-btn-outline`, `.wf-card-washi`
- Sizes: `.wf-btn-sm`, `.wf-btn-lg`
- States combine with base: `.wf-btn.is-loading`

### Interactive Components (WFUI)

The `docs/ui.js` file provides a JavaScript API (`WFUI`) for interactive components with full accessibility support.

**Auto-initialization:** Components automatically initialize when using `data-wf-*` attributes:

```html
<!-- Tabs: auto-initialize on DOMContentLoaded -->
<div class="wf-tablist" role="tablist" data-wf-tabs>
  <button class="wf-tab" role="tab">Tab 1</button>
</div>

<!-- Sortable Table: auto-initialize with aria-live announcements -->
<table class="wf-table" data-wf-sortable-table>
  <thead>
    <th><button class="wf-sort">Column</button></th>
  </thead>
</table>

<!-- Dropdown: auto-initialize -->
<button data-wf-dropdown="dd-menu">Menu</button>
<ul id="dd-menu" class="wf-dropdown__menu">...</ul>

<!-- Tooltip: auto-initialize -->
<button data-wf-tooltip="tip-1">Hover me</button>
<div id="tip-1" class="wf-tooltip">Tooltip content</div>

<!-- Popover: auto-initialize -->
<button data-wf-popover="pop-1">Click me</button>
<div id="pop-1" class="wf-popover">...</div>

<!-- Modal: auto-initialize -->
<button data-wf-modal="modal-1">Open</button>
<div id="modal-1" class="wf-modal-overlay">...</div>

<!-- Offcanvas: auto-initialize -->
<button data-wf-offcanvas="oc-1">Open</button>
<div id="oc-1" class="wf-offcanvas">...</div>
```

**Available components:**
- `WFUI.tabs()` - Keyboard navigation (Arrow keys, Home/End), roving tabindex
- `WFUI.sortableTable()` - Sort with aria-live announcements for screen readers
- `WFUI.dropdown()` - Keyboard support (Esc to close)
- `WFUI.tooltip()` - Auto-positioning with collision detection, Esc to dismiss
- `WFUI.popover()` - Click-to-toggle with outside-click dismissal
- `WFUI.modal()` - Focus trap, background aria-hidden, Esc to close
- `WFUI.offcanvas()` - Side panel with focus management

**When to use WFUI:**
- Always prefer `data-wf-*` attributes for automatic initialization
- Use direct API calls (`WFUI.tabs(...)`) only when dynamic initialization is needed
- All examples should use declarative attributes for consistency

**Accessibility features:**
- Full keyboard navigation support
- Screen reader announcements (aria-live regions for dynamic changes)
- Focus management (modal/offcanvas trap focus, components restore focus on close)
- Proper ARIA attributes (aria-expanded, aria-controls, aria-hidden, etc.)

## Coding Standards

### CSS Style
- 2-space indentation
- Mobile-first responsive design
- Breakpoints: `--wf-breakpoint-sm` (600px), `--wf-breakpoint-md` (900px)
- No `!important` unless absolutely necessary
- Avoid fixed heights; use content-based sizing
- Use flexbox for component layouts

### Accessibility Requirements
- WCAG 2.1 AA contrast for text (≥4.5:1)
- WCAG non-text contrast (≥3:1) for controls/borders
- Never remove `:focus-visible` outlines
- Icon-only buttons must have `aria-label`
- Form inputs must have associated labels (`for`/`id`)
- Use semantic HTML: `<a>` for navigation, `<button>` for actions
- Support `prefers-reduced-motion` for animations
- External links need `rel="noopener noreferrer"` with `target="_blank"`

**Page-level accessibility (required for all example/doc pages):**
```html
<body>
  <!-- Skip link for keyboard users -->
  <a href="#main" class="wf-sr-only">メインコンテンツへスキップ</a>

  <!-- ARIA landmarks -->
  <header role="banner">...</header>
  <main role="main" id="main">...</main>
</body>
```

All 15 example files and documentation pages include skip links and ARIA landmarks for improved keyboard navigation and screen reader support.

### Component State Management
- Loading state: `.is-loading` (used with buttons)
- Error state: `.is-invalid` (used with form inputs)
- Success/warning states: `.is-success`, `.is-warning`
- Disabled state: `[disabled]` attribute
- Current/done states: `.is-current`, `.is-done` (used with steps)

## Workflow

### Making Changes
1. **Edit source files** in `src/` (never edit `dist/` directly)
2. **Run build**: `bash scripts/build.sh`
3. **Update examples**: Keep `docs/` and `examples/` in sync with component changes
4. **Test responsive**: Check at 320px, 768px, 1200px widths
5. **Verify accessibility**: Check focus states, contrast ratios
6. **Check size budget**: Ensure minified CSS stays under 10KB

### Adding New Components
1. Create new file in `src/components/{name}.css`
2. Add to build script's `FILES` array in correct cascade order
3. Use existing design tokens from `tokens.css`
4. Follow naming convention: `wf-{component}` base class
5. Add API documentation to `docs/index.html`
6. Create usage example in `examples/`
7. Run build and verify output

### Commit Conventions
Follow Conventional Commits format:
- `feat: add wf-modal component`
- `fix: correct wf-btn-primary hover state`
- `docs: update button usage examples`
- `style: adjust wf-card padding`

## Project Status & Roadmap

**Current Phase**: MVP (v0.1.0) - Accessibility & DX Improvements
- Core components (buttons, cards, forms, alerts, tabs, tables, modals, tooltips, etc.)
- Design token system
- Unique Japanese-inspired elements (stamp, noren header)
- 10 traditional color themes
- PostCSS build pipeline with autoprefixer and cssnano
- WFUI auto-initialization for interactive components
- Comprehensive accessibility: skip links, ARIA landmarks, keyboard navigation, screen reader support
- Stylelint + Prettier setup with CI/CD
- Utility class generator script

**Next Phase**: Growth (v0.5.0)
- Grid system
- Additional components (modals, tabs, tooltips)
- Utility class expansion
- Build tooling improvements

See `TODO.md` for detailed task list and `最終計画.md` for long-term vision.

## Important Notes

- This project prioritizes traditional Japanese aesthetics while maintaining modern web standards
- The stamp component (判子) and noren header (暖簾) are culturally specific features that should preserve their visual authenticity
- When suggesting improvements, maintain the 和風 (Japanese-style) design philosophy
- Size budget is critical: all features must keep the minified CSS under 10KB
