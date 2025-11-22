# Tailwind CSS 統合ガイド

Wafoo CSSは、Tailwind CSSと共存できるように設計されています。このガイドでは、両者を組み合わせて使用する方法と、競合の解決方法について説明します。

## セットアップ

### 1. Tailwind CSSのインストール

まだインストールしていない場合は、npm経由でTailwind CSSをインストールしてください：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. Wafoo CSSのインポート

メインのCSSファイルで、Tailwindのユーティリティよりも**前**にWafoo CSSをインポートします。これにより、必要に応じてTailwindのユーティリティがWafooのスタイルを上書きできるようになります（カスケードレイヤーを使用する場合、順序はそれほど重要ではありませんが、良い習慣です）。

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

## 設定

### プレフィックス（推奨）

クラス名の衝突を避けるために、Tailwindクラスにプレフィックスを付けることを強く推奨します。Wafooはユーティリティに `.wf-` プレフィックスを使用していますが、一般的な名前（`.btn`, `.card` など）は、同様のコンポーネントを生成するTailwindプラグインを使用する場合に競合する可能性があります。

`tailwind.config.js` にて：

```javascript
module.exports = {
  prefix: 'tw-', // 例: flex の代わりに tw-flex を使用
  // ...
}
```

ただし、Wafooのユーティリティには `.wf-` プレフィックスが付いているため（例：`.wf-flex`, `.wf-p-4`）、標準のTailwindユーティリティ（例：`.flex`, `.p-4`）はWafooユーティリティと直接**競合しません**。これらは併用可能です。

### テーマの拡張

Tailwindのテーマを拡張して、Wafooのデザイン・トークンに合わせることができます。

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'wafoo-primary': 'var(--wf-primary-bg)',
        'wafoo-accent': 'var(--wf-color-accent)',
        'wafoo-surface': 'var(--wf-surface-base)',
      },
      spacing: {
        'wafoo-4': 'var(--wf-space-4)',
      }
    }
  }
}
```

## 役割分担の例

コードベースをきれいに保つために、以下の役割分担を推奨します：

| カテゴリ | Wafoo CSS | Tailwind CSS |
|----------|-----------|--------------|
| **コンポーネント** | ボタン、カード、モーダル、フォーム | 単発のウィジェット、複雑なインタラクティブ状態 |
| **レイアウト** | 基本コンテナ、グリッドシステム | 複雑なFlexbox/Gridレイアウト、レスポンシブ調整 |
| **スペーシング** | 標準スペーシング (`.wf-m-4`) | 微調整 (`.mt-[3px]`) |
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

## FAQ

**Q: Tailwind内でWafooの色を使用できますか？**
A: はい、「設定」セクションで示したように、Tailwindのテーマ設定を拡張すれば可能です。

**Q: Wafooのクラス名がTailwindプラグインと競合した場合はどうすればよいですか？**
A: `tailwind.config.js` の `prefix` オプションを使用して、すべてのTailwindクラスを名前空間化してください（例：`tw-btn`）。

**Q: WafooはTailwindの `@apply` をサポートしていますか？**
A: Wafooは標準CSSです。WafooのソースファイルをPostCSSで処理しない限り、Wafooクラスを直接 `@apply` することはできません。一般的には、HTML内でWafooクラスを使用することを推奨します。

## トラブルシューティング

- **スタイルが適用されない**: 読み込み順序を確認してください。上書きを可能にするため、通常はTailwindユーティリティを最後に読み込む必要があります。
- **特定のスタイルが上書きできない**: どうしてもWafooのスタイルを上書きする必要がある場合は、Tailwindの任意の値（Arbitrary values）や `!important` 修飾子（例：`!p-0`）を使用してください。

## まとめ

Wafoo CSSの事前にデザインされた和風コンポーネントと、Tailwind CSSのユーティリティファーストの力を組み合わせることで、伝統的な美学を犠牲にすることなく、ユニークで高品質なインターフェースを迅速に構築できます。
