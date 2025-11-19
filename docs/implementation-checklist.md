# wafoo-css 実装状況チェックリスト

改善案_20251119.mdの実装状況を確認するためのチェックリストです。

## 使用方法

### 自動チェック（推奨）

```bash
bash scripts/check-implementation.sh
```

### 手動チェック

以下の項目を順番に確認してください。

---

## Phase 1: ユーティリティクラスの拡充

### スペーシング値の追加

- [ ] `src/tokens.css` に `--wf-space-16: 64px` が存在する
- [ ] `scripts/generate-utilities.js` の `spacing.values` が `[0, 1, 2, 3, 4, 6, 8, 10, 12, 16]` に設定されている
- [ ] `src/utilities.css` に以下のクラスが生成されている:
  - [ ] `.wf-mt-1`
  - [ ] `.wf-mt-3`
  - [ ] `.wf-mt-16`
- [ ] `gap.values` も同様に更新されている

### カラーユーティリティの拡充

- [ ] `scripts/generate-utilities.js` に `generateColorUtilities()` 関数が存在する
- [ ] `src/utilities.css` に以下のクラスが生成されている:
  - [ ] `.wf-text-accent`
  - [ ] `.wf-text-primary`
  - [ ] `.wf-text-muted`
  - [ ] `.wf-text-success`
  - [ ] `.wf-text-warning`
  - [ ] `.wf-text-danger`
  - [ ] `.wf-text-link`
  - [ ] `.wf-bg-accent`
  - [ ] `.wf-bg-primary`
  - [ ] `.wf-bg-surface`
  - [ ] `.wf-bg-surface-subtle`
  - [ ] `.wf-bg-surface-muted`
  - [ ] `.wf-bg-success`
  - [ ] `.wf-bg-warning`
  - [ ] `.wf-bg-danger`
  - [ ] `.wf-border-accent`
  - [ ] `.wf-border-primary`
  - [ ] `.wf-border-subtle`
  - [ ] `.wf-border-strong`
  - [ ] `.wf-border`

### シャドウユーティリティの追加

- [ ] `scripts/generate-utilities.js` に `generateShadowUtilities()` 関数が存在する
- [ ] `src/utilities.css` に以下のクラスが生成されている:
  - [ ] `.wf-shadow-sm`
  - [ ] `.wf-shadow-md`
  - [ ] `.wf-shadow-lg`
  - [ ] `.wf-shadow-xl`
  - [ ] `.wf-shadow-none`

---

## Phase 2: ドキュメントの改善

### アクセシビリティガイド

- [ ] `docs/accessibility.md` が存在する
- [ ] `REFERENCE.md` に「アクセシビリティ」セクションが追加されている
- [ ] アクセシビリティガイドに以下の内容が含まれている:
  - [ ] 基本原則（WCAG 2.1 Level AA）
  - [ ] ARIA属性の使い方
  - [ ] キーボードナビゲーション
  - [ ] コンポーネント別のアクセシビリティ実装例
  - [ ] テスト方法

### 各コンポーネントの使用例

- [ ] `REFERENCE.md` の「よく使うコンポーネント」セクションに使用例が追加されている
- [ ] 以下のコンポーネントに使用例が追加されている:
  - [ ] ボタン（基本的な使用例、サイズバリエーション、ステータスボタンなど）
  - [ ] カード（基本的な使用例、カード内のレイアウト）
  - [ ] フォーム（基本的な入力フィールド、エラー状態、必須項目の表示など）

---

## Phase 3: 命名規則の標準化

### 命名規則ドキュメント

- [ ] `docs/naming-conventions.md` が存在する
- [ ] `REFERENCE.md` に「命名規則」セクションが追加されている
- [ ] 命名規則ドキュメントに以下の内容が含まれている:
  - [ ] 基本原則（wf-プレフィックス、Tailwind風の命名）
  - [ ] 命名規則一覧（スペーシング、ディスプレイ、Flex、Grid、テキスト、カラー、シャドウなど）
  - [ ] Tailwind互換性の説明
  - [ ] 後方互換性の説明

### クラス名の予測可能性向上

- [ ] `src/utilities.css` に以下のTailwind互換クラス名が追加されている:
  - [ ] `.wf-w-full` (width: 100%)
  - [ ] `.wf-w-screen` (width: 100vw)
  - [ ] `.wf-h-full` (height: 100%)
- [ ] 既存クラス名（`wf-w-100`, `wf-h-100`）は後方互換性のため維持されている

---

## Phase 4: ドキュメントの構造化（AI対応）

### JSON Schema

- [ ] `docs/components-schema.json` が存在する
- [ ] JSON Schemaが正しい形式で定義されている
- [ ] スキーマに以下のプロパティが含まれている:
  - [ ] `version`
  - [ ] `components` (配列)
  - [ ] 各コンポーネントに `name`, `category`, `description`, `baseClass`, `classes`, `examples`, `javascript`, `accessibility`, `themeAware` が定義されている

### AIプロンプトテンプレート

- [ ] `docs/ai-prompts.md` が存在する
- [ ] プロンプトテンプレートに以下の内容が含まれている:
  - [ ] 基本テンプレート
  - [ ] コンポーネント別テンプレート（ボタン、カード、フォーム、モーダル、タブ）
  - [ ] レイアウトテンプレート（フレックス、グリッド）
  - [ ] フォームテンプレート
  - [ ] ベストプラクティス

---

## Phase 5: 新規コンポーネント

### データテーブル

- [ ] `src/components/data-table.css` が存在する
- [ ] `dist/wafoo.js` に `WFUI.dataTable` APIが実装されている
- [ ] `scripts/build.sh` に `data-table.css` が含まれている
- [ ] `REFERENCE.md` にデータテーブルのドキュメントが追加されている
- [ ] `examples/data-table-enhanced.html` が存在し、動作する

### オートコンプリート

- [ ] `src/components/autocomplete.css` が存在する
- [ ] `dist/wafoo.js` に `WFUI.autocomplete` APIが実装されている
- [ ] `scripts/build.sh` に `autocomplete.css` が含まれている
- [ ] `REFERENCE.md` にオートコンプリートのドキュメントが追加されている
- [ ] `examples/autocomplete.html` が存在し、動作する

### スナックバー

- [ ] `src/components/snackbar.css` が存在する
- [ ] `dist/wafoo.js` に `WFUI.snackbar` APIが実装されている
- [ ] `scripts/build.sh` に `snackbar.css` が含まれている
- [ ] `REFERENCE.md` にスナックバーのドキュメントが追加されている
- [ ] `examples/snackbar.html` が存在し、動作する

---

## ビルド確認

- [ ] `bash scripts/build.sh` が正常に実行できる
- [ ] `dist/wafoo.css` が生成される
- [ ] `dist/wafoo.min.css` が生成される
- [ ] `dist/wafoo.js` が生成される
- [ ] `dist/wafoo.min.js` が生成される
- [ ] `docs/` ディレクトリにビルド済みファイルがコピーされる

---

## ドキュメント整合性確認

### 改善案ドキュメント

- [ ] `private_docs/改善案_20251119.md` に絵文字が含まれていない（No-Emoji Policy準拠）
- [ ] 各Phaseに「[実装済み]（2025-11-19）」の注記が追加されている
- [ ] 実装ファイルのパスが明記されている
- [ ] 未実装項目（`scripts/generate-schema.js`）が「今後の計画」として明記されている

---

## チェック結果の記録

### 最終確認日

- 日付: ___________
- 確認者: ___________

### 実装状況

- Phase 1: [ ] 完了 [ ] 未完了
- Phase 2: [ ] 完了 [ ] 未完了
- Phase 3: [ ] 完了 [ ] 未完了
- Phase 4: [ ] 完了 [ ] 未完了
- Phase 5: [ ] 完了 [ ] 未完了

### 備考

---

**最終更新**: 2025-11-20

