# Repository Guidelines

- 必ず日本語で回答をすること

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
- Local server: `python3 -m http.server 8000` then visit `http://localhost:8000/docs/` (alt:
  `npx serve`).
- Size budget: for now ≤ `20000` bytes (gzip of `dist/wafoo.min.css`). Plan: build all features
  first, split into core/extras later.

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
- PRs include: summary, affected components, 320/768/1200 px screenshots (Before/After), Lighthouse
  A11y/Perf ≥ 90, 0 console errors, gzip size of `wafoo.min.css`, and synced `docs/`/`examples/`.

## Release & Versioning

- SemVer. Rebuild `dist/` and tag (e.g., `v0.1.0`).
- Document changes in CHANGELOG (or PR body) and record the gzip size of `wafoo.min.css`.

## Agent-Specific Notes

- These rules apply repo‑wide. Keep patches focused and minimal.
- Always create a feature branch before any change (e.g., `feat/plan-20251104`). Do not work on
  `main` directly.
- Do not change CI, `.github/`, build pipeline, or tooling without explicit approval.
- Do not hand‑edit `dist/`; only update via `bash scripts/build.sh` and only after the change scope
  is confirmed.
- Sequence for changes: 1) propose plan, 2) branch, 3) minimal patch in `src/`, 4) rebuild, 5) sync
  `docs/` and `examples/`, 6) report gzip size.
- If procedure deviates (e.g., wrong branch or unintended edits), immediately stop, apologize, and
  restore to last HEAD before proceeding.

### No-Emoji Policy (Repo-wide)

- 方針: 絵文字・絵的なピクトグラムは禁止。ただし、矢印・幾何学・罫線などの「テキスト記号」は許可。
- 許可例（テキスト記号）: `▲` `▼` `▶︎` `◀︎` `◆` `■` `□` `●` `○` `•` `—` `…` `→` `←` `↑` `↓` `↗` など。
- 禁止例（絵文字/ピクトグラム）: `❤️` `😀` `👍` `📷` `📱` `🚀` `✈️` `🇯🇵` など（顔/手/動物/食べ物/乗り物/道具/国旗等）。
- 技術的基準（目安）:
  - 許可: Arrows(U+2190–U+21FF), Geometric Shapes(U+25A0–U+25FF), Box Drawing(U+2500–U+257F), Block Elements(U+2580–U+259F) 等に属する文字。表示バリエーション（U+FE0E/U+FE0F）が付いても可。
  - 禁止: U+1F300–1FAFF（多くの絵文字・追加記号）、U+1F1E6–1F1FF（地域指標＝国旗）、U+2700–27BF（Dingbats）、U+2600–26FF（Misc Symbols）等に属する絵文字/ピクトグラム。
- UIの視覚補助が必要な場合はテキスト記号またはCSS/SVGで表現し、画像やWebフォント絵文字は使用しない。アクセシビリティのため記号単独に依存せず、`aria-label`や「昇順/降順」等のテキスト併記を推奨。
- Do not hand-edit `dist/`; if a prohibited emoji appears in build outputs, remove it at the source and rebuild.
- Optional local check before committing（禁止対象の検出）:
  - 推奨: `rg -nUP "\p{Extended_Pictographic}" --glob '!dist/**' --glob '!node_modules/**'`
  - 互換: `rg -nP "[\x{1F1E6}-\x{1F1FF}\x{1F300}-\x{1F6FF}\x{1F700}-\x{1F77F}\x{1F900}-\x{1F9FF}\x{1FA70}-\x{1FAFF}\x{2700}-\x{27BF}\x{2600}-\x{26FF}]" --glob '!dist/**' --glob '!node_modules/**'`
  - ヒットした場合は絵文字/ピクトグラムをテキストやCSS/SVGに置き換えること。
