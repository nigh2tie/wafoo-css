# Tailwind CSS 統合ガイド

Wafoo CSSは、Tailwind CSSと共存できるように設計されています。このガイドでは、両者を組み合わせて使用する方法と、競合の解決方法について説明します。

## セットアップ

### 1. Tailwind CSSのインストール

まだインストールしていない場合は、npm経由でTailwind CSSをインストールしてください：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. Wafoo CSSのインポート（推奨順序）

メインのCSSファイルで、Tailwindのユーティリティよりも**前**にWafoo CSSをインポートします。これにより、必要に応じてTailwindのユーティリティがWafooのスタイルを上書きできるようになります。

```css
/* main.css */
@import "wafoo-css/dist/wafoo.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

または、HTML内でリンクします：

```html
<link rel="stylesheet" href="path/to/wafoo.css">
<link rel="stylesheet" href="path/to/tailwind-output.css">
```

## 競合回避戦略

### 1. プレフィックスの活用

Wafoo CSSは全てのクラスに `wf-` プレフィックスを使用しています（例: `.wf-btn`, `.wf-p-4`）。
一方、Tailwind CSSはデフォルトではプレフィックスがありません。

通常、この違いにより競合は発生しませんが、もしTailwindプラグインなどで競合が発生する場合は、`tailwind.config.js` でTailwind側にプレフィックスを付けることを検討してください。

```javascript
// tailwind.config.js
module.exports = {
  prefix: 'tw-', // 例: flex の代わりに tw-flex を使用
}
```

### 2. 詳細度と上書き

WafooのコンポーネントスタイルをTailwindのユーティリティで上書きしたい場合、読み込み順序が正しければ通常は機能します。
もし上書きできない場合は、Tailwindの `!` 修飾子（Important）を使用してください。

```html
<!-- WafooのパディングをTailwindで強制的に上書き -->
<button class="wf-btn wf-btn-primary !p-8">
  大きなパディング
</button>
```

## Tailwind -> Wafoo マッピング表

Tailwindのクラス名に慣れている方向けの、Wafoo CSS対応表です。
Wafooは基本的にTailwindの命名規則に `wf-` を付けた形を採用しています。

| カテゴリ | Tailwind CSS | Wafoo CSS | 備考 |
| :--- | :--- | :--- | :--- |
| **Flexbox** | `flex` | `wf-flex` | |
| | `flex-col` | `wf-flex-col` | |
| | `items-center` | `wf-items-center` | |
| | `justify-between` | `wf-justify-between` | |
| **Grid** | `grid` | `wf-grid` | |
| | `grid-cols-3` | `wf-grid-cols-3` | |
| | `gap-4` | `wf-gap-4` | |
| **Spacing** | `m-4` | `wf-m-4` | |
| | `p-4` | `wf-p-4` | |
| | `mx-auto` | `wf-mx-auto` | |
| **Sizing** | `w-full` | `wf-w-full` | |
| | `h-screen` | `wf-h-screen` | |
| **Typography** | `text-lg` | `wf-text-lg` | |
| | `font-bold` | `wf-font-bold` | |
| | `text-center` | `wf-text-center` | |
| **Colors** | `text-red-500` | `wf-text-danger` | セマンティック名を使用 |
| | `bg-blue-500` | `wf-bg-info` | セマンティック名を使用 |

## 役割分担の推奨

コードベースをきれいに保つために、以下の役割分担を推奨します：

| カテゴリ | Wafoo CSS | Tailwind CSS |
| :--- | :--- | :--- |
| **コンポーネント** | ボタン、カード、モーダル、フォームなどの**和風UI部品** | 単発のウィジェット、複雑なインタラクティブ状態 |
| **レイアウト** | 基本コンテナ、グリッドシステム | 複雑なFlexbox/Gridレイアウト、レスポンシブ調整 |
| **スペーシング** | コンポーネント内部の余白 | コンポーネント間の余白、微調整 |
| **色** | テーマカラー (`.wf-text-primary`) | テーマにない特定の色合い |

## 実践例：和風ランディングページ

以下は、ランディングページで両者を組み合わせる例です：

```html
<!-- 構造はWafoo、レイアウト調整はTailwind -->
<section class="wf-section wf-bg-surface-subtle flex flex-col md:flex-row items-center justify-between gap-8">
  <div class="wf-card-washi max-w-md w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h2 class="wf-card__title text-2xl font-bold text-gray-800">伝統的な美学</h2>
    <p class="wf-card__text mt-4 text-gray-600">
      Wafooが視覚的なスタイルを担当し、Tailwindが具体的なレイアウトとタイポグラフィの調整を担当します。
    </p>
  </div>
</section>
```
