# wafoo-css への貢献

wafoo-cssへの貢献に興味を持っていただき、ありがとうございます！コミュニティからの貢献を歓迎します。

## はじめに

1. **リポジトリをフォーク** してください。
2. **フォークをローカルにクローン** します。
   ```bash
   git clone https://github.com/YOUR_USERNAME/wafoo-css.git
   cd wafoo-css
   ```
3. **依存関係をインストール** します。
   ```bash
   npm install
   ```

## 開発ワークフロー

### ビルド
CSSファイル（Core と Extras）をビルドするには：
```bash
npm run build
```

### テスト
自動テスト（Playwright）を実行するには：
```bash
# 最初にブラウザをインストール
npx playwright install
# テスト実行
npm run test
```

### リント
コードスタイルをチェックするには：
```bash
npm run lint
```

## コーディング規約

### No-Emoji Policy
ドキュメント、コミットメッセージ、コードコメントに絵文字を使用しないでください。

### CSS命名規則

#### 基本原則

1. **`wf-` プレフィックス**

   すべてのwafoo-cssクラスは `wf-` プレフィックスで始まります。これにより、名前空間の衝突を避け、他のCSSフレームワークとの共存が可能です。

   ```html
   <!-- 正しい -->
   <button class="wf-btn wf-btn-primary">ボタン</button>

   <!-- 間違い -->
   <button class="btn btn-primary">ボタン</button>
   ```

2. **Tailwind風の命名規則**

   wafoo-cssは、Tailwind CSSの命名規則を採用しています。これにより、Tailwindユーザーがwafoo-cssに移行しやすくなります。

   ```html
   <!-- Tailwind -->
   <div class="flex items-center gap-4 p-6">

   <!-- wafoo-css -->
   <div class="wf-flex wf-items-center wf-gap-4 wf-p-6">
   ```

3. **セマンティックな命名**

   カラーユーティリティは、具体的な色名（`text-red-500`など）ではなく、セマンティックな名前（`text-accent`など）を使用します。これにより、テーマシステムとの統合が可能です。

   ```html
   <!-- 正しい（テーマ変数ベース） -->
   <div class="wf-text-accent wf-bg-primary">

   <!-- 間違い（具体的な色名） -->
   <div class="wf-text-red-500 wf-bg-blue-300">
   ```

#### ユーティリティクラス命名規則

**スペーシング**:
```css
.wf-m-{value}    /* margin */
.wf-mt-{value}   /* margin-top */
.wf-p-{value}    /* padding */
.wf-gap-{value}  /* gap */
```
利用可能な値: `0`, `1`, `2`, `3`, `4`, `6`, `8`, `10`, `12`, `16`

**カラー**:
```css
.wf-text-{semantic}  /* テキスト色 */
.wf-bg-{semantic}    /* 背景色 */
```
セマンティック名: `accent`, `primary`, `muted`, `success`, `warning`, `danger`

**レイアウト**:
```css
.wf-flex          /* display: flex */
.wf-grid          /* display: grid */
.wf-hidden        /* display: none */
.wf-items-center  /* align-items: center */
.wf-justify-between  /* justify-content: space-between */
```

**レスポンシブ**:
```css
.wf-sm-*  /* 600px以上 */
.wf-md-*  /* 900px以上 */
.wf-lg-*  /* 1200px以上 */
```

#### コンポーネントクラス命名規則

BEMライクな命名規則に従います：

```css
.wf-component              /* ベース */
.wf-component__element     /* 要素 */
.wf-component--modifier    /* 修飾子 */
```

**例**:
```html
<!-- カード -->
<div class="wf-card">
  <h3 class="wf-card__title">タイトル</h3>
  <p class="wf-card__text">本文</p>
</div>

<!-- 和紙風カード -->
<div class="wf-card wf-card-washi">
  ...
</div>

<!-- ボタン -->
<button class="wf-btn wf-btn-primary wf-btn-lg">
  ボタン
</button>
```

#### 状態クラス

```css
.is-active     /* アクティブ状態 */
.is-loading    /* ローディング中 */
.is-disabled   /* 無効状態 */
.is-open       /* 開いている */
.is-invalid    /* バリデーションエラー */
```

### JavaScript規約

- **ES2020+構文**: `const`/`let`, アロー関数, Optional chaining (`?.`), Nullish coalescing (`??`)
- **命名規則**: キャメルケース（変数・関数）、パスカルケース（クラス）
- **コメント**: JSDocスタイルで関数・クラスにドキュメント

### 和風デザイン哲学
新しいコンポーネントは、伝統的な日本のデザイン哲学に沿っている必要があります。

## プルリクエストプロセス

1. 機能または修正用の新しいブランチを作成します。
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. 変更をコミットします。
   ```bash
   git commit -m "feat: add new button variant"
   ```
   **注**: [Conventional Commits](https://www.conventionalcommits.org/)に従います。
3. フォークにプッシュしてプルリクエストを提出します。
4. すべてのCIチェックが通過することを確認してください。

## ライセンス

貢献することで、あなたの貢献がMITライセンスの下でライセンスされることに同意したものとみなされます。
