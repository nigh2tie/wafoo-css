# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-25

### Added

- **色階調システム**: success/warning/danger/ink を 50-900 の10段階階調で提供
  - 例: `--wf-success-50` (最も明るい) ~ `--wf-success-900` (最も暗い)
  - RGB 版も提供: `--wf-success-500-rgb: 76, 175, 80`

- **タイポグラフィ拡充**:
  - フォントサイズ: `wf-text-2xl` (1.5rem), `wf-text-3xl` (1.875rem), `wf-text-4xl` (2.25rem)
  - フォントウェイト: `wf-font-weight-light` (300), `wf-font-weight-semibold` (600), `wf-font-weight-black` (900)
  - 字間: `wf-tracking-tighter` ~ `wf-tracking-widest`
  - 行間: `wf-leading-loose` (2)

- **論理プロパティ**: RTL レイアウト対応のためのユーティリティクラス
  - `wf-mi-*`: margin-inline (左右マージン)
  - `wf-pi-*`: padding-inline (左右パディング)
  - `wf-mb-*` / `wf-pb-*`: margin-block / padding-block (上下)

- **モーション制御**: `prefers-reduced-motion` への対応強化
  - `--wf-enable-motion` トークン: アニメーションの一括制御フラグ
  - `prefers-reduced-motion: reduce` 時は自動的に 0 に設定

- **ダークモード改善**:
  - `color-scheme: light dark` 宣言でフォーム要素も自動的にダークモード対応
  - light/dark で一貫性のあるトークン構造

- **A11y ドキュメント**: コンポーネント毎のロール/ARIA属性/キーボード操作を表形式で明記

### Changed

- トークン構造の変更（詳細は [MIGRATION.md](./MIGRATION.md) 参照）
  - `dist/tokens.json` → `dist/tokens.light.json` / `dist/tokens.dark.json`
  - ink 系を階調化: `--wf-ink-100` ~ `--wf-ink-900`

### Fixed

- **tokens.json のダーク値混在バグ**: v1.x では light/dark の値が混在していた問題を修正
  - `wf-color-bg` が `#121212` (ダーク値) になっていた → `#e7ddd4` (ライト値) に修正

### Deprecated

- `dist/tokens.json` は v2.1.0 で削除予定
  - 代わりに `dist/tokens.light.json` または `dist/tokens.dark.json` を使用してください

---

## [1.0.0] - 2025-11-22

### Changed
- **Core JS**: Modernized `wafoo-core.js` to ES2025 standards (Arrow functions, spread syntax) for better maintainability.
- **Documentation**: Added functional "Demo Modal" to Reference page to improve testing coverage.

### Fixed
- **Linting**: Resolved various CSS and HTML linting errors.
- **Tests**: Fixed functional tests by ensuring required demo elements exist in documentation.

### Added
- **Core/Extras Split**: Separated core styles (`wafoo-core.css`) from extra components (`wafoo-extras.css`) for better performance.
- **Utility Expansion**: Added comprehensive utility classes for spacing, sizing, borders, and state variants (hover/focus).
- **Ecosystem Support**:
    - Added `wafoo-react-helpers` (Alpha) for React integration.
    - Added `wafoo-vue-helpers` (Alpha) for Vue integration.
    - Added Tailwind CSS integration guide (`TAILWIND_INTEGRATION.md`).
- **Documentation**:
    - Added search functionality to Reference page.
- **Developer Experience**:
    - Added Starter Kits for React, Vue, and HTML.
- **CI/CD**:
    - Added GitHub Actions for CI (Lint, Build, Test).
    - Added Semantic Release for automated versioning.
    - Added Playwright for browser testing.

### Changed
- **File Size**: Optimized core bundle size to ~10KB (gzipped).
- **Design**: Refined traditional Japanese aesthetics across all components.
- **Metadata**: Added structured metadata to all component CSS files for better AI compatibility.

### Fixed
- **Emojis**: Removed all emojis from documentation and source code to comply with project policy.
- **Build Scripts**: Improved build reliability and permissions.
