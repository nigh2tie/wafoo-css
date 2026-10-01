# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-10-02

### Breaking Changes

移行方法は [guides/migration.md](guides/migration.md#v1x--v200) を参照してください。

- **対応ブラウザの引き上げ**: 配色トークンを `light-dark()` で定義し直したため、Chrome / Edge 123+、Safari 17.5+、Firefox 120+ が必要になりました。これより古いブラウザでは配色トークンが無効になります
- **色トークンの意味の変更**
  - 色テーマの `--wf-color-accent` / `--wf-link-color` は、テーマ色そのものではなく文字として読める濃さに調整した色になりました（淡いテーマ色は `--wf-primary-bg`）
  - warning（杏）・info（露草）の塗りの上の文字が白から暗色（`--wf-warning-fg` / `--wf-info-fg`）になりました
  - status の階調（`--wf-success-*` / `--wf-warning-*` / `--wf-danger-*`）の値が変わりました（500 が各伝統色）
  - 各テーマの `--wf-info` / `--wf-secondary` を削除しました
- **`.wf-label` の◆マーカーを既定で表示しないように変更**（`.wf-label-mark` を付けたときだけ表示）
- **グリッドとレスポンシブユーティリティが効くようになったことによる表示の変化**: これまで構文エラーで無視され全幅で縦に並んでいた `.wf-col-*` が、600px 以上で指定どおりの幅になります
- **z-index の値の変更**（モーダル 9999 → 1300、トースト・スナックバー 9999 → 1600、サイドバー 1000 → 1200 など）
- **npm パッケージ内のファイル名の変更**: `REFERENCE.md` → `guides/reference.md`

### Fixed

- **レスポンシブ指定が一切効いていなかった問題を修正**: `@media (min-width: var(--wf-breakpoint-*))` は CSS の仕様上無効なため、グリッド（`.wf-col-*`）・レスポンシブユーティリティ（`.wf-md-flex` など）・カレンダーの大画面用指定がすべて無視されていた。px 値を直接書くよう変更し、stylelint の `media-query-no-invalid` を有効化して再発を検出するようにした
- ツールチップの上下配置で矢印が逆向き・本体から離れて表示されていた問題を修正
- ポップオーバーの矢印が JS の配置クラス（`is-top` / `is-bottom`）に連動せず表示されず、手動クラスでも内向きだった問題を修正（枠線付きの外向き矢印に変更）
- モーダル内でツールチップ・ポップオーバーが背面に隠れる、トースト・スナックバーとモーダルの前後が DOM 順で変わる問題を修正（z-index をトークン化）
- `wafoo-extras.css` を `wafoo-core.css` より先に読み込むとカスケードレイヤーの優先順位が逆転する問題を修正（先頭でレイヤー順序を宣言）
- モバイルのナビドロワーとサイドバーのサブメニューが、閉じていても Tab キーでフォーカスできた問題を修正
- フルスクリーンモーダル・ナビドロワーがモバイルのアドレスバーの裏に隠れる問題を修正（`100dvh` を併記）
- 桜・菊テーマのライトモードでページ背景とカードがどちらも白になり、カードの境界が見えなかった問題を修正（背景を #fcf0f3 / #f5f1f9 に変更）
- アコーディオンの開閉記号（▼▲）、カルーセルの再生・停止記号（▶ ■ ■）が読み上げられ、フォントによって位置がずれる問題を修正（CSS の図形に変更）
- **配色のコントラスト（WCAG 2.1 AA）を全テーマ × ライト／ダークで満たすよう修正**
  - warning（杏）・info（露草）の塗りの上の文字を暗色に変更（白文字は 1.73:1 / 2.88:1 だった）
  - 状態色を文字に使う箇所（outline ボタン、トーストの見出し、フォームの検証メッセージ、`.wf-text-*` など）を、新しい `-text` トークンに変更
  - 各テーマの文字用アクセント色・リンク色を、背景に対して 4.5:1 を満たす明度に調整（淡いテーマ色は塗りに使用）
  - グラデーションボタンの文字色を固定の白から `--wf-gradient-fg` に変更
  - フォーム部品の枠線（`--wf-color-border-strong`）をページ背景に対して 3:1 以上に変更
- **ダークモード**
  - ヘッダー・メッセージ・サイドバー・タイムライン・アバター・評価・カルーセルなど、階調トークンを直接参照していたため暗い背景に暗い文字が乗っていた箇所を修正
  - アクセント色・フォーカスリング・状態色・枠線がダークモードで切り替わっていなかった問題を修正
  - `data-theme="light"` でライトモードに固定できなかった問題を修正
  - 色テーマとダークモードを併用すると本文が読めなくなる問題を修正（各テーマにダーク用の値を追加）
- `:root` で他のトークンを参照して宣言していたトークン（stamp の色、outline ボタンのホバー色、グラデーション）がテーマに追従していなかった問題を修正
- ダークモードで和紙テクスチャが格子模様として浮き、補助テキストが読みにくかった問題を修正（テクスチャを薄くし、`--wf-color-muted` のダーク値を #a3a3a3 → #b8b8b8 に変更）
- 不透明度を下げて表現していたため文字が読めなくなっていた箇所を修正（カレンダーの前月・翌月の日付、スケジュールの範囲開始枠の点滅）
- フォーム部品とボタンが本文のフォントを継承せず、ブラウザ既定（約 13px のゴシック体、テキストエリアは等幅）で小さく表示されていた問題を修正
- 補足・検証メッセージ（`.wf-help` / `.wf-error` など）が入力欄に密着していた問題を修正
- テスト用の `@playwright/test` を 1.58 系に更新
- `.wf-list-group` を `<ul>` / `<ol>` に付けたときに既定の余白が残る問題を修正
- 入力グループのボタン・ラベルが縮んで文字が折り返す問題を修正
- アバターの状態表示（`.wf-avatar-status`）の点が切り取られていた問題を修正
- ローディング中のボタンのスピナーが中央からずれて回転しなかった問題を修正（`spinner.css` と同名のキーフレーム `wf-spin` が上書きし、位置合わせの `transform` と競合していた）。あわせて、文字色を透明にしていたためスピナー自体が見えていなかった問題も修正
- 横並びタイムラインで、進行中マーカーの拡大アニメーションが中央寄せの `transform` を上書きしてずれる問題と、マーカーがカードの中央に揃わず線が両端からはみ出す問題を修正
- スピナーのトラック（下地の円）がライトモードで背景と同化して見えなかった問題を修正
- 未定義の `--wf-duration-normal` を参照していたため、カルーセル・サイドバーのトランジションが効いていなかった問題を修正
- 未定義のキーフレーム（`wf-pulse` など）を参照していたため、タイムライン・オートコンプリート・スナックバーのアニメーションが動いていなかった問題を修正
- `snackbar` / `data-table` / `autocomplete` の CSS がビルドに含まれていなかった問題を修正
- データテーブルのソート見出しで、見出し文字列が HTML として解釈される問題を修正
- 視覚回帰テストが、比較用の画像がない環境で「初回は必ず失敗し、2回目は自分で書き出した画像と比べて合格する」動作になっていた問題を修正（画像がないときはスキップし、`npm run test:visual:update` で作成する）
- `scripts/check-implementation.sh` が最初の NG で終了していた問題（`set -e` と `((n++))`、関数の `return 1`、全角文字に隣接した変数展開）と、統合・削除済みのファイルを探していた古いチェックを修正
- ドキュメント内のリンク切れを修正

### Added

- z-index のトークン `--wf-z-dropdown` / `-sticky` / `-drawer-backdrop` / `-drawer` / `-modal` / `-popover` / `-tooltip` / `-toast`
- ネイティブ `<dialog class="wf-modal">`（`showModal()`）と `<details class="wf-accordion__item">` + `<summary class="wf-accordion__header">` に対応
- `.wf-label-mark`: ラベルに和風の◆マーカーを付ける（読み上げ対象外）
- 配色トークン: `--wf-color-accent-fg` / `--wf-color-accent-subtle` / `--wf-color-accent-muted`、状態色の `-text` / `-veil`、`--wf-info-fg` / `--wf-secondary-fg`、`--wf-gradient-fg`、`--wf-header-bg` / `--wf-header-fg`
- `.wf-text-info` / `.wf-text-secondary`
- `npm run check:contrast`（トークンの組み合わせを検証。lint とビルドでも実行）
- 配色チェックページ `docs/color-check.html` と、それを使った Playwright テスト

### Changed

- `.wf-label` に自動で付いていた◆マーカーを廃止し、`.wf-label-mark` を付けたときだけ表示するよう変更
- `.wf-container` 系を base レイヤーから components レイヤーへ移動（`src/components/container.css`）
- ナビドロワーの開閉を `left` から `transform` のアニメーションに、サイドバーのサブメニューを `max-height: 500px` から実際の高さへの補間に変更
- **ディレクトリ構成**: ルート直下のガイドを `guides/` に移動（`REFERENCE.md` → `guides/reference.md`、`COMPONENTS.md` → `guides/components.md`、`ACCESSIBILITY.md` → `guides/accessibility.md`、`MIGRATION.md` → `guides/migration.md`、`TAILWIND_INTEGRATION.md` → `guides/tailwind-integration.md`、`AI_PROMPTS.md` → `guides/ai-prompts.md`）。npm パッケージ内の `REFERENCE.md` も `guides/reference.md` になります
- browserslist / prettier / stylelint の設定を `package.json` に統合し、`.browserslistrc` / `.prettierrc.json` / `.stylelintrc.json` と、`files` 指定で不要になっていた `.npmignore` を削除
- `wafoo-core.min.css` のサイズ上限を 15KB に変更
- 配色トークンを `light-dark()` で定義し、モードの切り替えを `color-scheme` に一本化（対応ブラウザ: Chrome / Edge 123+、Safari 17.5+、Firefox 120+）
- `src/themes.css` を `@layer tokens` に移動
- status の階調（`--wf-success-*` / `--wf-warning-*` / `--wf-danger-*`）を、500 が各伝統色になるよう作り直し、`--wf-accent-400` を 300 と 500 の中間に調整
- `dist/tokens*.json` に、`var()` と `light-dark()` を解決した値を出力
- `--wf-info` / `--wf-secondary`（未使用だった重複トークン）を各テーマから削除
- z-index の固定値を `--wf-z-*` トークンに置き換え

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

- トークン構造の変更（詳細は [MIGRATION.md](./guides/migration.md) 参照）
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
