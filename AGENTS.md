# Repository Guidelines

## Project Structure & Module Organization
- `sample.html` — sandbox page for quick trials.
- `old/` — archived versions (do not modify).
- `src/` — CSS sources: `tokens.css`, `base.css`, `components/`, `utilities.css`.
- `dist/` — build outputs: `wafoo.css`, `wafoo.min.css` (generated; do not edit by hand).
- `docs/` — docs & demos: `index.html`, `report.html`.
- `examples/` — usage examples: `basic.html`, `kaiawase.html`, `forms-full.html`, `layout.html`.
- `scripts/` — build tools (e.g., `build.sh`).

## Build, Test, and Development Commands
- Build: `bash scripts/build.sh` → updates `dist/wafoo.css` and `dist/wafoo.min.css`.
- Open docs: macOS `open docs/index.html`, Windows `start docs\index.html`.
- Local server: `python3 -m http.server 8000` then visit `http://localhost:8000/docs/` (alt: `npx serve`).
- Size budget: for now ≤ `20000` bytes (gzip of `dist/wafoo.min.css`). Plan: build all features first, split into core/extras later.

## Coding Style & Naming Conventions
- Indentation 2 spaces, no trailing whitespace; mobile‑first CSS.
- Classes: `wf-` prefix, kebab-case (e.g., `wf-btn`, `wf-card-washi`).
- CSS variables in `:root` with `--wf-` (e.g., `--wf-color-accent`).
- Utilities: short/consistent names on an 8px scale (e.g., `wf-mb-8`, `wf-p-16`, `wf-gap-8`).
- Do not hand-edit `dist/`; always rebuild from `src/` and sync `docs/`/`examples/`.

## Testing Guidelines
- View at 320 / 768 / 1200 px; verify layout and focus visibility.
- Browsers: latest stable Chrome, Safari, Edge.
- Validate HTML via W3C; resolve DevTools console errors.
- Accessibility: keyboard can reach all focusable elements; focus state is visually obvious.

## Commit & Pull Request Guidelines
- Conventional Commits (e.g., `feat: add wf-btn-primary`).
- Keep scope minimal; discuss toolchain changes before proposing.
- PRs include: summary, affected components, 320/768/1200 px screenshots (Before/After), Lighthouse A11y/Perf ≥ 90, 0 console errors, gzip size of `wafoo.min.css`, and synced `docs/`/`examples/`.

## Release & Versioning
- SemVer. Rebuild `dist/` and tag (e.g., `v0.1.0`).
- Document changes in CHANGELOG (or PR body) and record the gzip size of `wafoo.min.css`.

## Agent-Specific Notes
- These rules apply repo‑wide. Keep patches focused and minimal.
- Always create a feature branch before any change (e.g., `feat/plan-20251104`). Do not work on `main` directly.
- Do not change CI, `.github/`, build pipeline, or tooling without explicit approval.
- Do not hand‑edit `dist/`; only update via `bash scripts/build.sh` and only after the change scope is confirmed.
- Sequence for changes: 1) propose plan, 2) branch, 3) minimal patch in `src/`, 4) rebuild, 5) sync `docs/` and `examples/`, 6) report gzip size.
- If procedure deviates (e.g., wrong branch or unintended edits), immediately stop, apologize, and restore to last HEAD before proceeding.

### No-Emoji Policy (Repo-wide)
- Do not introduce emoji or pictograms anywhere (code, CSS, JS, docs/, examples/, commit messages, alt text, UI copy).
- Use plain text labels instead (e.g., "検索", "設定", "成功"), or component icons rendered via CSS/SVG if needed.
- When updating examples or docs, replace any existing emoji with plain text equivalents.
- Do not hand-edit `dist/`; if an emoji appears in build outputs, remove it at the source and rebuild.
- Optional local check before committing:
  - macOS/Linux: `rg -nP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}]"`
  - If any matches are found, replace them with plain text.
