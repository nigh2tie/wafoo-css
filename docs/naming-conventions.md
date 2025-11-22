# wafoo-css 命名規則

このドキュメントは、wafoo-cssのクラス名の命名規則を完全に説明します。

## 目次

- [基本原則](#基本原則)
- [プレフィックス](#プレフィックス)
- [命名規則一覧](#命名規則一覧)
- [Tailwind互換性](#tailwind互換性)
- [後方互換性](#後方互換性)

---

## 基本原則

### 1. `wf-` プレフィックス

すべてのwafoo-cssクラスは `wf-` プレフィックスで始まります。これにより、名前空間の衝突を避け、他のCSSフレームワークとの共存が可能です。

```html
<!-- 正しい -->
<button class="wf-btn wf-btn-primary">ボタン</button>

<!-- 間違い -->
<button class="btn btn-primary">ボタン</button>
```

### 2. Tailwind風の命名規則

wafoo-cssは、Tailwind CSSの命名規則を採用しています。これにより、Tailwindユーザーがwafoo-cssに移行しやすくなります。

```html
<!-- Tailwind -->
<div class="flex items-center gap-4 p-6">

<!-- wafoo-css -->
<div class="wf-flex wf-items-center wf-gap-4 wf-p-6">
```

### 3. セマンティックな命名

カラーユーティリティは、具体的な色名（`text-red-500`など）ではなく、セマンティックな名前（`text-accent`など）を使用します。これにより、テーマシステムとの統合が可能です。

```html
<!-- 正しい（テーマ変数ベース） -->
<div class="wf-text-accent wf-bg-primary">

<!-- 間違い（具体的な色名） -->
<div class="wf-text-red-500 wf-bg-blue-300">
```

---

## プレフィックス

### `wf-` プレフィックス

すべてのユーティリティクラスとコンポーネントクラスは `wf-` プレフィックスで始まります。

**例:**
- `.wf-btn` - ボタンコンポーネント
- `.wf-mt-4` - マージントップユーティリティ
- `.wf-text-accent` - テキストカラーユーティリティ

---

## 命名規則一覧

### スペーシング

#### マージン

```css
.wf-m-{value}      /* margin: {value} */
.wf-mt-{value}     /* margin-top: {value} */
.wf-mr-{value}     /* margin-right: {value} */
.wf-mb-{value}     /* margin-bottom: {value} */
.wf-ml-{value}     /* margin-left: {value} */
.wf-mx-{value}     /* margin-left & margin-right: {value} */
.wf-my-{value}     /* margin-top & margin-bottom: {value} */
```

**利用可能な値:** `0`, `1`, `2`, `3`, `4`, `6`, `8`, `10`, `12`, `16`

**例:**
```html
<div class="wf-mt-4">マージントップ 16px</div>
<div class="wf-mx-2">左右マージン 8px</div>
```

#### パディング

```css
.wf-p-{value}       /* padding: {value} */
.wf-pt-{value}     /* padding-top: {value} */
.wf-pr-{value}     /* padding-right: {value} */
.wf-pb-{value}     /* padding-bottom: {value} */
.wf-pl-{value}     /* padding-left: {value} */
.wf-px-{value}     /* padding-left & padding-right: {value} */
.wf-py-{value}     /* padding-top & padding-bottom: {value} */
```

**利用可能な値:** `0`, `1`, `2`, `3`, `4`, `6`, `8`, `10`, `12`, `16`

**例:**
```html
<div class="wf-p-4">パディング 16px</div>
<div class="wf-px-2 wf-py-4">左右8px、上下16px</div>
```

#### ギャップ

```css
.wf-gap-{value}    /* gap: {value} */
```

**利用可能な値:** `0`, `1`, `2`, `3`, `4`, `6`, `8`, `10`, `12`, `16`

**例:**
```html
<div class="wf-flex wf-gap-4">ギャップ 16px</div>
```

---

### ディスプレイ

```css
.wf-block          /* display: block */
.wf-inline         /* display: inline */
.wf-inline-block   /* display: inline-block */
.wf-flex           /* display: flex */
.wf-inline-flex    /* display: inline-flex */
.wf-grid           /* display: grid */
.wf-hidden         /* display: none */
```

**例:**
```html
<div class="wf-flex wf-items-center">フレックスコンテナ</div>
<div class="wf-hidden">非表示</div>
```

---

### Flex

#### アイテムの配置

```css
.wf-items-start    /* align-items: flex-start */
.wf-items-center   /* align-items: center */
.wf-items-end      /* align-items: flex-end */
.wf-items-stretch  /* align-items: stretch */
.wf-items-baseline /* align-items: baseline */
```

#### 主軸の配置

```css
.wf-justify-start    /* justify-content: flex-start */
.wf-justify-center   /* justify-content: center */
.wf-justify-end      /* justify-content: flex-end */
.wf-justify-between  /* justify-content: space-between */
.wf-justify-around   /* justify-content: space-around */
.wf-justify-evenly   /* justify-content: space-evenly */
```

#### 折り返し

```css
.wf-flex-wrap         /* flex-wrap: wrap */
.wf-flex-nowrap       /* flex-wrap: nowrap */
.wf-flex-wrap-reverse /* flex-wrap: wrap-reverse */
```

**例:**
```html
<div class="wf-flex wf-items-center wf-justify-between wf-gap-4">
  フレックスレイアウト
</div>
```

---

### Grid

```css
.wf-grid-cols-1   /* grid-template-columns: repeat(1, minmax(0, 1fr)) */
.wf-grid-cols-2   /* grid-template-columns: repeat(2, minmax(0, 1fr)) */
.wf-grid-cols-3   /* grid-template-columns: repeat(3, minmax(0, 1fr)) */
.wf-grid-cols-4   /* grid-template-columns: repeat(4, minmax(0, 1fr)) */
.wf-grid-cols-6   /* grid-template-columns: repeat(6, minmax(0, 1fr)) */
.wf-grid-cols-12  /* grid-template-columns: repeat(12, minmax(0, 1fr)) */
```

**例:**
```html
<div class="wf-grid wf-grid-cols-3 wf-gap-4">
  3列グリッド
</div>
```

---

### テキスト

#### フォントサイズ

```css
.wf-text-xs  /* font-size: calc(var(--wf-font-sm) - 2px) */
.wf-text-sm  /* font-size: var(--wf-font-sm) */
.wf-text-md  /* font-size: var(--wf-font-md) */
.wf-text-lg  /* font-size: var(--wf-font-lg) */
.wf-text-xl  /* font-size: var(--wf-font-xl) */
```

#### テキスト配置

```css
.wf-text-left    /* text-align: left */
.wf-text-center  /* text-align: center */
.wf-text-right   /* text-align: right */
.wf-text-justify /* text-align: justify */
```

#### フォントウェイト

```css
.wf-font-bold    /* font-weight: 700 */
```

#### テキスト処理

```css
.wf-text-truncate  /* overflow: hidden; text-overflow: ellipsis; white-space: nowrap */
.wf-text-break     /* overflow-wrap: anywhere; word-break: break-word */
.wf-line-clamp-2   /* 2行で切り詰め */
.wf-line-clamp-3   /* 3行で切り詰め */
.wf-nowrap         /* white-space: nowrap */
```

**例:**
```html
<p class="wf-text-lg wf-text-center wf-font-bold">大きな中央揃えの太字</p>
<p class="wf-text-truncate">長いテキストが省略記号で切り詰められます</p>
```

---

### カラー（テーマ変数ベース）

#### テキスト色

```css
.wf-text-accent   /* color: var(--wf-color-accent) */
.wf-text-primary  /* color: var(--wf-primary-bg) */
.wf-text-muted    /* color: var(--wf-color-muted) */
.wf-text-success  /* color: var(--wf-success) */
.wf-text-warning  /* color: var(--wf-warning) */
.wf-text-danger   /* color: var(--wf-danger) */
.wf-text-link     /* color: var(--wf-link-color) */
```

#### 背景色

```css
.wf-bg-accent         /* background-color: var(--wf-color-accent) */
.wf-bg-primary        /* background-color: var(--wf-primary-bg) */
.wf-bg-surface        /* background-color: var(--wf-surface-base) */
.wf-bg-surface-subtle /* background-color: var(--wf-surface-subtle) */
.wf-bg-surface-muted  /* background-color: var(--wf-surface-muted) */
.wf-bg-success        /* background-color: var(--wf-success) */
.wf-bg-warning        /* background-color: var(--wf-warning) */
.wf-bg-danger         /* background-color: var(--wf-danger) */
```

#### ボーダー色

```css
.wf-border-accent  /* border-color: var(--wf-color-accent) */
.wf-border-primary /* border-color: var(--wf-primary-bg) */
.wf-border-subtle  /* border-color: var(--wf-color-border-subtle) */
.wf-border-strong  /* border-color: var(--wf-color-border-strong) */
.wf-border         /* border-color: var(--wf-color-border) */
```

**例:**
```html
<!-- テーマを変えると自動的に色が変わる -->
<div class="wf-text-accent wf-bg-primary">
  テーマ対応のカラー
</div>
```

---

### シャドウ

```css
.wf-shadow-sm    /* box-shadow: var(--wf-shadow-sm) */
.wf-shadow-md    /* box-shadow: var(--wf-shadow-md) */
.wf-shadow-lg    /* box-shadow: var(--wf-shadow-lg) */
.wf-shadow-xl    /* box-shadow: var(--wf-shadow-xl) */
.wf-shadow-none  /* box-shadow: none */
```

**例:**
```html
<div class="wf-card wf-shadow-md">シャドウ付きカード</div>
```

---

### サイズ

#### 幅

```css
.wf-w-100        /* width: 100% */
.wf-max-w-sm     /* max-width: 480px */
.wf-max-w-md     /* max-width: 720px */
.wf-max-w-lg     /* max-width: 960px */
.wf-max-w-xl     /* max-width: 1200px */
.wf-container-fluid /* max-width: none !important */
```

#### 高さ

```css
.wf-h-100        /* height: 100% */
.wf-h-screen     /* height: 100vh */
.wf-min-h-screen /* min-height: 100vh */
```

**例:**
```html
<div class="wf-w-100 wf-max-w-lg">最大幅960pxのコンテナ</div>
```

---

### 位置

```css
.wf-relative  /* position: relative */
.wf-absolute  /* position: absolute */
.wf-fixed     /* position: fixed */
.wf-sticky    /* position: sticky */
```

---

### オーバーフロー

```css
.wf-overflow-hidden  /* overflow: hidden */
.wf-overflow-auto    /* overflow: auto */
.wf-overflow-scroll  /* overflow: scroll */
```

---

### Z-index

```css
.wf-z-0     /* z-index: 0 */
.wf-z-10    /* z-index: 10 */
.wf-z-100   /* z-index: 100 */
.wf-z-1000  /* z-index: 1000 */
```

---

### 透明度

```css
.wf-opacity-0   /* opacity: 0 */
.wf-opacity-50  /* opacity: 0.5 */
.wf-opacity-100 /* opacity: 1 */
```

---

### 可視性

```css
.wf-visible   /* visibility: visible */
.wf-invisible /* visibility: hidden */
```

---

### アスペクト比

```css
.wf-aspect-square  /* aspect-ratio: 1 / 1 */
.wf-aspect-video    /* aspect-ratio: 16 / 9 */
.wf-aspect-4-3      /* aspect-ratio: 4 / 3 */
```

---

### カーソル

```css
.wf-cursor-pointer      /* cursor: pointer */
.wf-cursor-not-allowed  /* cursor: not-allowed */
.wf-cursor-wait         /* cursor: wait */
.wf-cursor-grab         /* cursor: grab */
```

---

### スクロールスナップ

```css
.wf-snap-x      /* scroll-snap-type: x mandatory */
.wf-snap-y      /* scroll-snap-type: y mandatory */
.wf-snap-start   /* scroll-snap-align: start */
```

---

### アニメーション

```css
.wf-fade-in   /* fade-in アニメーション */
.wf-slide-up  /* slide-up アニメーション */
.wf-pulse     /* pulse アニメーション */
```

---

### トランジション

```css
.wf-transition        /* transition: all var(--wf-duration-fast) var(--wf-ease-out) */
.wf-transition-colors /* transition: color, background-color, border-color */
```

---

### レスポンシブ

すべてのユーティリティクラスは、ブレークポイントプレフィックスを付けることで、特定の画面サイズでのみ適用できます。

**ブレークポイント:**
- `sm`: 600px以上
- `md`: 900px以上
- `lg`: 1200px以上

**形式:**
```css
.wf-{breakpoint}-{utility}
```

**例:**
```html
<!-- モバイルでは非表示、デスクトップでは表示 -->
<div class="wf-hidden wf-md-flex">デスクトップのみ表示</div>

<!-- モバイルでは中央揃え、デスクトップでは左揃え -->
<p class="wf-text-center wf-md-text-left">レスポンシブテキスト</p>
```

**利用可能なレスポンシブユーティリティ:**
- `.wf-sm-hidden`, `.wf-md-hidden`, `.wf-lg-hidden`
- `.wf-sm-flex`, `.wf-md-flex`, `.wf-lg-flex`
- `.wf-sm-grid`, `.wf-md-grid`, `.wf-lg-grid`
- `.wf-sm-items-center`, `.wf-md-items-center`, `.wf-lg-items-center`
- `.wf-sm-justify-between`, `.wf-md-justify-between`, `.wf-lg-justify-between`
- `.wf-sm-text-center`, `.wf-md-text-center`, `.wf-lg-text-center`

---

## Tailwind互換性

wafoo-cssは、Tailwind CSSの命名規則を採用していますが、`wf-` プレフィックスを付ける必要があります。

### 対応表

| Tailwind | wafoo-css |
|----------|-----------|
| `flex` | `wf-flex` |
| `items-center` | `wf-items-center` |
| `justify-between` | `wf-justify-between` |
| `gap-4` | `wf-gap-4` |
| `p-6` | `wf-p-6` |
| `mt-4` | `wf-mt-4` |
| `text-center` | `wf-text-center` |
| `bg-white` | `wf-bg-surface` |
| `shadow-md` | `wf-shadow-md` |

### 主な違い

1. **プレフィックス**: Tailwindはプレフィックスなし、wafoo-cssは `wf-` プレフィックス必須
2. **カラー**: Tailwindは具体的な色名（`text-red-500`）、wafoo-cssはセマンティックな名前（`text-accent`）
3. **値の範囲**: Tailwindはより多くの値、wafoo-cssは限定的な値（軽量化のため）

---

## 後方互換性

### 既存クラス名の維持

既存のクラス名（例: `wf-w-100`）は後方互換性のため維持されています。新しいクラス名（例: `wf-w-full`）を追加する際は、既存クラス名との競合を避けます。

### 推奨クラス名

ドキュメントでは、新しいクラス名を推奨していますが、既存クラス名も引き続き使用可能です。

**例:**
```html
<!-- 既存クラス名（後方互換性のため維持） -->
<div class="wf-w-100">幅100%</div>

<!-- 新しいクラス名（推奨、将来的にTailwind互換） -->
<div class="wf-w-full">幅100%</div>
```

---

## ベストプラクティス

### 1. クラス名の組み合わせ

複数のユーティリティクラスを組み合わせて使用します。

```html
<!-- 良い例 -->
<div class="wf-flex wf-items-center wf-justify-between wf-gap-4 wf-p-6 wf-bg-surface wf-shadow-md">
  コンテンツ
</div>

<!-- 悪い例（インラインスタイルを使用） -->
<div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px; background-color: white; box-shadow: ...">
  コンテンツ
</div>
```

### 2. セマンティックなカラーの使用

テーマ変数ベースのカラーユーティリティを使用します。

```html
<!-- 良い例（テーマ対応） -->
<div class="wf-text-accent wf-bg-primary">

<!-- 悪い例（具体的な色名） -->
<div class="wf-text-red-500 wf-bg-blue-300">
```

### 3. レスポンシブデザイン

モバイルファーストで設計し、必要に応じてレスポンシブユーティリティを追加します。

```html
<!-- 良い例（モバイルファースト） -->
<div class="wf-flex wf-flex-col wf-gap-4 wf-md-flex-row wf-md-gap-6">
  コンテンツ
</div>
```

---