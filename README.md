# wafoo-css

和風CSSフレームワーク - 伝統的な日本の美学を取り入れた、レスポンシブでモダンなウェブプロジェクト開発のためのCSSフレームワーク。

## 目次

- [クイックスタート](#クイックスタート)
  - [パターン1: すぐに使う](#パターン1-すぐに使う)
  - [パターン2: カスタマイズして使う](#パターン2-カスタマイズして使う)
- [特徴](#特徴)
- [含まれるファイル](#含まれるファイル)
- [ビルド方法](#ビルド方法)
- [コンポーネント](#コンポーネント)
- [カスタマイズ](#カスタマイズ)
- [テーマ](#テーマ)
- [作者](#作者)
- [著作権とライセンス](#著作権とライセンス)

## クイックスタート

wafoo-cssは2つの使い方があります。

### パターン1: すぐに使う

ビルド済みのCSSとJavaScriptをダウンロードして使います。

```bash
# リポジトリをダウンロード
git clone https://github.com/nigh2tie/wafoo-css.git
```

HTMLに読み込みます：

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My App - wafoo-css</title>
    <link rel="stylesheet" href="path/to/wafoo-css/dist/wafoo.css" />
  </head>
  <body>
    <div class="wf-container">
      <h1>Hello, wafoo-css!</h1>
      <button class="wf-btn wf-btn-primary">ボタン</button>
    </div>

    <!-- インタラクティブコンポーネントを使う場合 -->
    <script src="path/to/wafoo-css/dist/wafoo.js"></script>
  </body>
</html>
```

### パターン2: カスタマイズして使う

ソースファイルを編集して、自分専用のCSSフレームワークを作ります。

```bash
# リポジトリをclone
git clone https://github.com/nigh2tie/wafoo-css.git
cd wafoo-css

# 依存パッケージをインストール
npm install

# src/のファイルを編集
# 例: src/tokens.css でカラーを変更
# 例: src/components/buttons.css でボタンスタイルを変更

# ビルド実行
bash scripts/build.sh

# dist/wafoo.css と dist/wafoo.min.css が生成される
```

## 特徴

**伝統的な日本の美学を取り入れたCSSフレームワーク**

- **Noto Serif JP（明朝体）** - 日本語に最適化されたタイポグラフィ
- **和紙テクスチャ** - 背景全体に和紙のような質感
- **伝統色パレット** - 紅梅・藤・桜・白百合・墨・灰
- **テーマ対応グラデーション** - 各テーマに最適化された配色
- **和風コンポーネント** - 判子（ハンコ）、暖簾ヘッダー、和紙風カード
- **漢数字サポート** - 壱・弐・参・肆などの表示
- **10種類のテーマ** - 桜、紅梅、萌黄、菊、氷、柳、紅葉、藤、鶯、雪

## 含まれるファイル

```
wafoo-css/
├── dist/
│   ├── wafoo.css        # コンパイル済みCSS
│   ├── wafoo.min.css    # 圧縮版CSS
│   ├── wafoo.js         # JavaScript（タブ、モーダル等）
│   └── wafoo.min.js     # 圧縮版JavaScript
│
├── src/
│   ├── tokens.css       # デザイントークン（色、スペーシング等）
│   ├── base.css         # ベーススタイル
│   ├── components/      # コンポーネントCSS（26ファイル）
│   ├── utilities.css    # ユーティリティクラス
│   └── themes.css       # 10種類のテーマ
│
├── scripts/
│   ├── build.sh         # ビルドスクリプト
│   └── generate-utilities.js  # ユーティリティ自動生成
│
└── package.json         # 依存関係
```

## ビルド方法

### 初回セットアップ

```bash
npm install
```

### CSSをビルド

```bash
# src/の全ファイルを結合して dist/wafoo.css を生成
bash scripts/build.sh
```

このコマンドは以下を実行します。

1. src/の30個のCSSファイルを1つに結合
2. PostCSSでautoprefixerを適用
3. cssnanoで圧縮して dist/wafoo.min.css を生成

### ユーティリティクラスを再生成

```bash
# src/utilities.css を再生成
npm run generate:utils
```

ユーティリティクラス（`.wf-mt-2`,
`.wf-p-4`等）を変更したい場合は、`scripts/generate-utilities.js`を編集してから実行してください。

### その他のコマンド

```bash
# サイズ確認
npm run size          # gzip圧縮後のサイズを表示

# コード整形
npm run format        # Prettier実行
npm run format:check  # 整形が必要かチェック

# Lint
npm run lint:css      # CSS Lint実行
npm run lint:css:fix  # 自動修正
```

## コンポーネント

### レイアウト

#### Grid System（12列）

```html
<div class="wf-container">
  <div class="wf-row wf-g-3">
    <div class="wf-col-12 wf-col-md-8">メイン</div>
    <div class="wf-col-12 wf-col-md-4">サイド</div>
  </div>
</div>
```

クラス: `wf-row`, `wf-col-{1..12}`, `wf-col-sm-*|md-*|lg-*`, `wf-g-{0..5}`（ガター）

### ナビゲーション

#### Navbar

```html
<nav class="wf-navbar" role="navigation" aria-label="Primary">
  <a class="wf-navbar-brand" href="#">ブランド</a>
  <ul class="wf-navbar-nav">
    <li class="wf-nav-item"><a class="wf-nav-link is-active" href="#">ホーム</a></li>
    <li class="wf-nav-item"><a class="wf-nav-link" href="#">ドキュメント</a></li>
  </ul>
</nav>
```

#### Breadcrumb

```html
<nav aria-label="Breadcrumb">
  <ol class="wf-breadcrumb">
    <li class="wf-breadcrumb-item"><a href="#">ホーム</a></li>
    <li class="wf-breadcrumb-item"><a href="#">ライブラリ</a></li>
    <li class="wf-breadcrumb-item" aria-current="page">データ</li>
  </ol>
</nav>
```

#### Pagination

```html
<nav class="wf-pagination" aria-label="Pagination">
  <a class="wf-page-link is-disabled" aria-disabled="true">前へ</a>
  <a class="wf-page-link" href="#">1</a>
  <a class="wf-page-link is-active" aria-current="page">2</a>
  <a class="wf-page-link" href="#">3</a>
  <a class="wf-page-link" href="#">次へ</a>
</nav>
```

### ボタン

```html
<!-- 基本ボタン -->
<button class="wf-btn wf-btn-primary">プライマリ</button>
<button class="wf-btn wf-btn-outline">アウトライン</button>
<button class="wf-btn wf-btn-subtle">サブトル</button>

<!-- 和風グラデーションボタン（テーマ対応） -->
<button class="wf-btn wf-btn-gradient">グラデーション</button>

<!-- ステータスボタン -->
<button class="wf-btn wf-btn-success">成功</button>
<button class="wf-btn wf-btn-warning">警告</button>
<button class="wf-btn wf-btn-danger">エラー</button>

<!-- サイズ -->
<button class="wf-btn wf-btn-primary wf-btn-sm">小サイズ</button>
<button class="wf-btn wf-btn-primary wf-btn-lg">大サイズ</button>
```

### カード

```html
<!-- 通常カード -->
<div class="wf-card">
  <h3>タイトル</h3>
  <p>本文内容</p>
</div>

<!-- 和紙風カード（四隅に飾り枠） -->
<div class="wf-card-washi">
  <h3>和紙風カード</h3>
  <p>四隅に紅梅色の飾り枠があり、和紙のような質感を表現しています。</p>
</div>
```

### フォーム

#### 基本的な入力

```html
<!-- ラベルには自動的に◆マーカーが表示されます -->
<label class="wf-label" for="email">メールアドレス</label>
<input type="email" id="email" class="wf-input" placeholder="name@example.com" />

<label class="wf-label" for="comment">コメント</label>
<textarea id="comment" class="wf-textarea" rows="4"></textarea>
```

#### Checkbox / Radio

```html
<label class="wf-checkbox__label">
  <input type="checkbox" class="wf-checkbox" />
  同意する
</label>

<label class="wf-radio__label">
  <input type="radio" name="option" class="wf-radio" />
  オプション1
</label>
```

#### Switch

```html
<label class="wf-switch__label">
  <input type="checkbox" class="wf-switch" role="switch" />
  通知を有効にする
</label>
```

#### Range

```html
<label class="wf-label" for="vol">音量</label>
<input id="vol" type="range" class="wf-range" min="0" max="100" value="30" />
```

#### Input Group

```html
<div class="wf-input-group">
  <span class="wf-input-group__prepend wf-input-group__text">@</span>
  <input class="wf-input" placeholder="ユーザー名" />
</div>
```

#### Floating Label

```html
<div class="wf-form-floating">
  <input id="email2" class="wf-input" placeholder="name@example.com" />
  <label for="email2">メールアドレス</label>
</div>
```

### アラート

```html
<div class="wf-alert wf-alert-success">成功しました</div>
<div class="wf-alert wf-alert-warning">警告メッセージ</div>
<div class="wf-alert wf-alert-danger">エラーが発生しました</div>
```

### テーブル

```html
<table class="wf-table wf-table-striped wf-table-hover">
  <thead>
    <tr>
      <th>名前</th>
      <th>年齢</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>太郎</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
```

### インタラクティブコンポーネント

これらのコンポーネントは `dist/wafoo.js` が必要です。

#### Tabs

```html
<div class="wf-tabs" data-wf-tabs>
  <div class="wf-tablist" role="tablist">
    <button class="wf-tab" role="tab" aria-selected="true">タブ1</button>
    <button class="wf-tab" role="tab">タブ2</button>
  </div>
  <div class="wf-tabpanel" role="tabpanel">パネル1の内容</div>
  <div class="wf-tabpanel" role="tabpanel" hidden>パネル2の内容</div>
</div>
```

#### Modal

```html
<button data-wf-modal="modal-1">モーダルを開く</button>

<div id="modal-1" class="wf-modal-overlay" hidden>
  <div class="wf-modal" role="dialog" aria-modal="true">
    <div class="wf-modal__header">
      <h2>タイトル</h2>
      <button class="wf-modal__close" aria-label="閉じる">×</button>
    </div>
    <div class="wf-modal__body">モーダルの内容</div>
  </div>
</div>
```

#### Dropdown

```html
<button data-wf-dropdown="dd-1">メニュー</button>
<ul id="dd-1" class="wf-dropdown__menu" role="menu" hidden>
  <li><a class="wf-dropdown__item" role="menuitem" href="#">項目A</a></li>
  <li><a class="wf-dropdown__item" role="menuitem" href="#">項目B</a></li>
</ul>
```

#### Accordion

```html
<div class="wf-accordion">
  <div class="wf-accordion__item">
    <button class="wf-accordion__header" aria-expanded="false">見出し</button>
    <div class="wf-accordion__panel" hidden>パネル内容</div>
  </div>
</div>
```

#### Tooltip

```html
<button data-wf-tooltip="tip-1">ホバーしてください</button>
<div id="tip-1" class="wf-tooltip" role="tooltip" hidden>ヒント</div>
```

#### Offcanvas

```html
<button data-wf-offcanvas="oc-1">サイドメニューを開く</button>
<div id="oc-1" class="wf-offcanvas wf-offcanvas-start" role="dialog" hidden>
  <h2>メニュー</h2>
  <!-- メニュー内容 -->
</div>
```

### Progress

```html
<div class="wf-progress" aria-label="進捗">
  <div
    class="wf-progress__bar wf-progress-success"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="42"
    style="width:42%"
  ></div>
</div>
```

### Spinner

```html
<div class="wf-spinner" role="status">
  <span class="wf-sr-only">読み込み中…</span>
</div>
```

### 和風コンポーネント

#### 判子（Stamp）

```html
<span class="wf-stamp">承認</span>
```

#### 暖簾ヘッダー（Noren Header）

```html
<header class="wf-header-noren">
  <h1>サイトタイトル</h1>
</header>
```

### ユーティリティクラス

```css
/* スペーシング */
.wf-mt-{0,2,4,6,8,10,12}   /* margin-top */
.wf-mb-{0,2,4,6,8,10,12}   /* margin-bottom */
.wf-p-{0,2,4,6,8,10,12}    /* padding */

/* テキスト色 */
.wf-text-accent
.wf-text-success
.wf-text-warning
.wf-text-danger
.wf-text-muted

/* 背景色 */
.wf-bg-accent
.wf-bg-success
.wf-bg-warning
.wf-bg-danger

/* Display */
.wf-block, .wf-flex, .wf-grid, .wf-hidden

/* Flex */
.wf-items-center, .wf-justify-between

/* その他 */
.wf-text-center
.wf-text-right
.wf-sr-only    /* スクリーンリーダー専用 */
```

## カスタマイズ

wafoo-cssはCSS変数（カスタムプロパティ）を使用しており、簡単にテーマをカスタマイズできます。

### 色を変更する

`src/tokens.css` を編集：

```css
:root {
  --wf-color-accent: #6a5c7c; /* アクセントカラー */
  --wf-color-bg: #e7ddd4; /* 背景色 */
  --wf-primary-bg: #4f4560; /* ボタンのプライマリカラー */
  /* ... その他多数 */
}
```

編集後、ビルドを実行：

```bash
bash scripts/build.sh
```

### コンポーネントを削除する

`scripts/build.sh` の `FILES` 配列から不要なコンポーネントを削除。

```bash
FILES=(
  "$ROOT_DIR/src/tokens.css"
  "$ROOT_DIR/src/base.css"
  "$ROOT_DIR/src/components/buttons.css"
  # "$ROOT_DIR/src/components/modal.css"  ← コメントアウトで除外
  # ...
)
```

ビルドすると、そのコンポーネントが含まれないCSSが生成されます。

### ユーティリティクラスを追加する

`scripts/generate-utilities.js` を編集して、新しいユーティリティを追加。

```javascript
const config = {
  spacing: {
    values: [0, 2, 4, 6, 8, 10, 12, 16] // 16を追加
    // ...
  }
};
```

再生成

```bash
npm run generate:utils
bash scripts/build.sh
```

## テーマ

wafoo-cssには10種類の伝統的な日本の色テーマが含まれています。全てのテーマは `wafoo.css`
に含まれているため、追加のCSSファイルは不要です。

`<body>` 要素にテーマクラスを適用するだけで使えます。

```html
<link rel="stylesheet" href="dist/wafoo.css">
</head>
<body class="theme-sakura">
  <!-- 桜テーマが適用される -->
  <h1>Hello, wafoo-css!</h1>
</body>
```

利用可能なテーマ

- `theme-sakura`（桜）- 桜色の優しいピンク
- `theme-koubai`（紅梅）- 紅梅の鮮やかなピンク
- `theme-moe`（萌黄）- 春の新緑
- `theme-kiku`（菊）- 菊の紫
- `theme-koori`（氷）- 氷のような淡い青
- `theme-yanagi`（柳）- 柳の緑
- `theme-momiji`（紅葉）- 秋の紅葉
- `theme-fuji`（藤）- 藤の薄紫
- `theme-uguisu`（鶯）- 鶯色の渋い緑
- `theme-yuki`（雪）- 雪のような白とグレー

## 作者

**Q_Q**

## 著作権とライセンス

コードとドキュメントの著作権 2025 Q_Q。コードは [MITライセンス](LICENSE)
の下で公開されています。使う際にはAIにコードを喰わせて、自由にカスタマイズして利用してOKです。
