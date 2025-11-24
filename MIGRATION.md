# Migration Guide: v1.0.0 → v1.1.0

このガイドは wafoo-css v1.0.0 から v1.1.0 への移行方法を説明します。

## 目次

- [新機能概要](#新機能概要)
- [tokens.json の拡充](#tokensjson-の拡充)
- [新機能の活用](#新機能の活用)
- [移行チェックリスト](#移行チェックリスト)

---

## 新機能概要

v1.1.0 では以下の新機能と改善があります：

1. **色階調システム**: success/warning/danger/ink が 50-900 の10段階階調で利用可能
2. **tokens.json の拡充**: `dist/tokens.light.json` / `dist/tokens.dark.json` を追加（互換性維持）
3. **タイポグラフィ拡充**: より多くのフォントサイズ・ウェイト・字間・行間オプション
4. **論理プロパティ**: RTL レイアウト対応のユーティリティクラス追加
5. **モーションシステム**: `--wf-enable-motion` フラグでアニメーション制御

---

## tokens.json の拡充

### 変更内容

v1.0.0 では `dist/tokens.json` のみ提供していました。
v1.1.0 では `dist/tokens.light.json` と `dist/tokens.dark.json` を追加し、より明確なテーマ切り替えをサポートします。

**重要**: `dist/tokens.json` は後方互換性のため残しており、`tokens.light.json` と同じ内容です。

### Before (v1.0.0)

```javascript
// v1.0.0: tokens.json のみ利用可能
import tokens from 'wafoo-css/dist/tokens.json';

console.log(tokens['wf-color-bg']);
// → "#e7ddd4"
```

### After (v1.1.0)

```javascript
// ✅ v1.1.0: light/dark を明示的に選択可能
import lightTokens from 'wafoo-css/dist/tokens.light.json';
import darkTokens from 'wafoo-css/dist/tokens.dark.json';

console.log(lightTokens['wf-color-bg']); // → "#e7ddd4" （ライト値）
console.log(darkTokens['wf-color-bg']);  // → "#121212" （ダーク値）

// 後方互換性: tokens.json も引き続き利用可能（light と同じ）
import tokens from 'wafoo-css/dist/tokens.json';
console.log(tokens['wf-color-bg']); // → "#e7ddd4"
```

### package.json の exports を使用（推奨）

```javascript
// ✅ より短い記法
import lightTokens from 'wafoo-css/tokens/light';
import darkTokens from 'wafoo-css/tokens/dark';
```

### 移行手順

#### 1. 既存コードをそのまま使用する場合（推奨）

v1.1.0 は後方互換性があるため、**既存のコードを変更する必要はありません**：

```javascript
// v1.0.0 のコードがそのまま動作
import tokens from 'wafoo-css/dist/tokens.json';
```

#### 2. 新機能を活用する場合

light/dark モードを明示的に切り替えたい場合は、以下のように変更できます：

```javascript
// v1.1.0: 新しい書き方（オプショナル）
import lightTokens from 'wafoo-css/tokens/light';
import darkTokens from 'wafoo-css/tokens/dark';

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const tokens = isDark ? darkTokens : lightTokens;
```

#### 3. React での実装例

```javascript
import { useState, useEffect } from 'react';
import lightTokens from 'wafoo-css/tokens/light';
import darkTokens from 'wafoo-css/tokens/dark';

function useWafooTokens() {
  const [tokens, setTokens] = useState(lightTokens);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTokens = () => {
      setTokens(mediaQuery.matches ? darkTokens : lightTokens);
    };

    updateTokens();
    mediaQuery.addEventListener('change', updateTokens);
    return () => mediaQuery.removeEventListener('change', updateTokens);
  }, []);

  return tokens;
}

// 使用例
function MyComponent() {
  const tokens = useWafooTokens();
  return (
    <div style={{ backgroundColor: tokens['wf-color-bg'] }}>
      Hello, wafoo!
    </div>
  );
}
```

---

## 新機能の活用

### 色階調システム

v1.1.0 では success/warning/danger/ink が 50-900 の10段階階調で利用できます。

```css
/* Before (v1.0.0) - ベース色のみ */
.success {
  background-color: var(--wf-success); /* 1段階のみ */
}

/* After (v1.1.0) - 10段階の階調 */
.success-light {
  background-color: var(--wf-success-100); /* 明るい */
}
.success-base {
  background-color: var(--wf-success-500); /* ベース */
}
.success-dark {
  background-color: var(--wf-success-900); /* 暗い */
}
```

### タイポグラフィ拡充

```css
/* Before (v1.0.0) */
.heading {
  font-size: var(--wf-font-xl); /* 1.25rem まで */
}

/* After (v1.1.0) */
.heading-large {
  font-size: var(--wf-font-2xl); /* 1.5rem */
}
.heading-huge {
  font-size: var(--wf-font-4xl); /* 2.25rem */
}

/* 字間・行間の詳細制御も可能に */
.text-tight {
  letter-spacing: var(--wf-tracking-tight);
  line-height: var(--wf-leading-tight);
}
```

### 論理プロパティ（RTL 対応）

```css
/* Before (v1.0.0) - 物理プロパティ */
.box {
  margin-left: 16px;
  margin-right: 16px;
}

/* After (v1.1.0) - 論理プロパティ（RTL で自動反転）*/
.box {
  margin-inline: 16px;
}
```

ユーティリティクラスも提供：

```html
<!-- Before -->
<div class="wf-ml-4 wf-mr-4">両側マージン</div>

<!-- After（RTL 対応）-->
<div class="wf-mi-4">両側マージン（RTL で自動反転）</div>
```

### モーション制御

```css
/* v1.1.0 で追加 */
:root {
  --wf-enable-motion: 1; /* デフォルトで有効 */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --wf-enable-motion: 0; /* 自動的に無効化 */
  }
}

/* 使用例 */
.animated {
  /* prefers-reduced-motion: reduce 時は 0ms になる */
  transition: calc(var(--wf-enable-motion) * 250ms) ease;
}
```

### color-scheme 宣言

v1.1.0 ではフォーム要素も自動的にダークモード対応します。

```css
/* v1.1.0 で追加済み */
:root {
  color-scheme: light dark;
}
```

これにより、`<input>`, `<select>`, `<button>` などのフォーム要素が
`prefers-color-scheme: dark` 時に自動的にダークスタイルになります。

---

## 移行チェックリスト

### 必須（Breaking Changes への対応）

- [ ] `dist/tokens.json` の import を `dist/tokens.light.json` または `dist/tokens.dark.json` に変更
- [ ] ダークモード切り替えロジックを実装している場合、light/dark を明示的に選択するように修正
- [ ] ビルドスクリプトやツールで `dist/tokens.json` を参照している場合、パスを更新

### 推奨（新機能の活用）

- [ ] 色階調システムの活用を検討（success-50 ~ success-900）
- [ ] タイポグラフィ拡充（2xl-4xl, tracking, leading）を活用
- [ ] RTL 対応が必要な場合、論理プロパティユーティリティ（`wf-mi-*`, `wf-pi-*`）を使用
- [ ] `prefers-reduced-motion` 対応のため、`--wf-enable-motion` を活用
- [ ] A11y ドキュメントを確認し、ARIA 属性とキーボード操作を見直し

### オプション（最適化）

- [ ] 不要な色階調をバンドルから除外（将来の部分ビルドで対応予定）
- [ ] テーマカスタマイズが必要な場合、`tokens.theme.{name}.json` の活用を検討

---

## トラブルシューティング

### Q: v1.0.0 から v1.1.0 への移行は必須？

A: いいえ、v1.1.0 は完全に後方互換性があります。既存のコードはそのまま動作します。

### Q: 新しい色階調を使いたいが、既存コードへの影響は？

A: 影響ありません。v1.1.0 では新しいトークン（`--wf-success-50` など）が追加されましたが、既存のトークン（`--wf-success` など）はそのまま利用可能です。

### Q: `tokens.json` と `tokens.light.json` の違いは？

A: v1.1.0 では後方互換性のため、`dist/tokens.json` は `dist/tokens.light.json` と同じ内容です。新しいプロジェクトでは `tokens.light.json` / `tokens.dark.json` の使用を推奨します。

### Q: テーマ切り替えが動作しない

A: `@media (prefers-color-scheme: dark)` と `.theme-dark` クラスの違いを確認してください：

- `@media (prefers-color-scheme: dark)`: OS/ブラウザの設定に従う（自動）
- `.theme-dark`: JavaScript で手動切り替え（`<body class="theme-dark">`）

---

## トークン検証の警告について

v2.0.0 では `scripts/validate-tokens.js` を使用してトークンファイルの整合性を検証しています。以下の警告が表示されますが、これらは **誤検知（False Positive）** であり、実際には問題ありません。

### 1. フォントファミリー・ウェイトの「サイズ形式ではありません」警告

```
- wf-font-family の値がサイズ形式ではありません: "Noto Serif JP", serif
- wf-font-weight-light の値がサイズ形式ではありません: 300
```

**理由**: 検証スクリプトの「サイズ形式」チェック（`/^\d+(\.\d+)?(px|rem|em|%)$/`）は、`rem`/`px` などの単位を持つ値を想定していますが、フォントファミリー（文字列）やウェイト（数値のみ）は単位を持ちません。これらは仕様通りの正しい値です。

**対応不要**: これらのトークンは CSS 仕様に準拠しており、修正の必要はありません。

### 2. RGB版トークンの「対応する -rgb がありません」警告

```
- wf-success-50 に対応する wf-success-50-rgb がありません
- wf-warning-100 に対応する wf-warning-100-rgb がありません
...
```

**理由**: 現在の実装では、RGB版トークンは **ベースカラー（500番台）のみ** を提供しています。これは以下の設計判断に基づいています：

- **500番台**: `rgba()` での透明度調整に最も頻繁に使用される
- **その他の階調**: 直接 `var(--wf-success-600)` として使用されるため、RGB版は不要

**対応不要**: 必要に応じて RGB 版を追加可能ですが、現状では不要と判断しています。

### 警告の抑制

将来的に検証スクリプトを改善して誤検知を減らす予定ですが、v1.1.0 時点では以下の警告は **無視して問題ありません**：

- `wf-font-family` / `wf-font-family-sans` の形式警告
- `wf-font-weight-*` の形式警告
- `wf-success/warning/danger-{50,100,200,...,900}` の RGB版欠落警告

検証が成功した場合は `✅ 検証完了（警告あり）` と表示され、Exit code 0 を返します。

---

## サポート

質問や問題がある場合は、以下のリソースを活用してください：

- [GitHub Issues](https://github.com/nigh2tie/wafoo-css/issues)
- [CHANGELOG.md](./CHANGELOG.md)
- [トークン命名規則](./private_docs/TOKEN_NAMING_CONVENTION.md)

---

**最終更新**: 2025-11-25
**対象バージョン**: v1.0.0 → v1.1.0
