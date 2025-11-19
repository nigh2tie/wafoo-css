# wafoo-css リファレンス

このドキュメントは、wafoo-cssで利用可能な全てのコンポーネント、CSS変数、ユーティリティクラスの完全なリファレンスです。

## 目次

- [よく使うコンポーネント](#よく使うコンポーネント)
- [CSS変数リファレンス](#css変数リファレンス)
  - [カラー](#カラー)
  - [タイポグラフィ](#タイポグラフィ)
  - [スペーシング](#スペーシング)
  - [ボーダー・シャドウ](#ボーダーシャドウ)
  - [アニメーション](#アニメーション)
  - [ブレークポイント](#ブレークポイント)
  - [コンポーネント固有](#コンポーネント固有)
- [ユーティリティクラス](#ユーティリティクラス)
- [命名規則](#命名規則)
- [全コンポーネント一覧](#全コンポーネント一覧)
- [アクセシビリティ](#アクセシビリティ)

---

## よく使うコンポーネント

### ボタン

#### 基本的な使用例

```html
<!-- プライマリーボタン -->
<button class="wf-btn wf-btn-primary">実行</button>

<!-- セカンダリーボタン -->
<button class="wf-btn wf-btn-secondary">キャンセル</button>

<!-- アウトラインボタン -->
<button class="wf-btn wf-btn-outline">詳細</button>

<!-- サブトルボタン -->
<button class="wf-btn wf-btn-subtle">その他</button>
```

#### サイズバリエーション

```html
<!-- 小サイズ -->
<button class="wf-btn wf-btn-primary wf-btn-sm">小</button>

<!-- 通常サイズ（デフォルト） -->
<button class="wf-btn wf-btn-primary">通常</button>

<!-- 大サイズ -->
<button class="wf-btn wf-btn-primary wf-btn-lg">大</button>
```

#### ステータスボタン

```html
<!-- 成功 -->
<button class="wf-btn wf-btn-success">保存</button>

<!-- 警告 -->
<button class="wf-btn wf-btn-warning">注意</button>

<!-- 危険な操作 -->
<button class="wf-btn wf-btn-danger">削除</button>
```

#### グラデーションボタン（和風）

```html
<button class="wf-btn wf-btn-gradient">グラデーション</button>
```

#### 読み込み中状態

```html
<button class="wf-btn wf-btn-primary is-loading" disabled>
  処理中...
</button>
```

#### 無効化

```html
<button class="wf-btn wf-btn-primary" disabled>無効</button>
```

#### アイコン付きボタン

```html
<button class="wf-btn wf-btn-primary">
  <span class="wf-icon">◆</span>
  保存
</button>
```

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-btn` | ベースボタン | `<button class="wf-btn">ボタン</button>` |
| `wf-btn-primary` | プライマリーボタン | `<button class="wf-btn wf-btn-primary">実行</button>` |
| `wf-btn-secondary` | セカンダリーボタン | `<button class="wf-btn wf-btn-secondary">キャンセル</button>` |
| `wf-btn-outline` | アウトラインボタン | `<button class="wf-btn wf-btn-outline">詳細</button>` |
| `wf-btn-subtle` | サブトルボタン | `<button class="wf-btn wf-btn-subtle">その他</button>` |
| `wf-btn-gradient` | グラデーションボタン | `<button class="wf-btn wf-btn-gradient">グラデーション</button>` |
| `wf-btn-success` | 成功ボタン | `<button class="wf-btn wf-btn-success">保存</button>` |
| `wf-btn-warning` | 警告ボタン | `<button class="wf-btn wf-btn-warning">注意</button>` |
| `wf-btn-danger` | 危険な操作 | `<button class="wf-btn wf-btn-danger">削除</button>` |
| `wf-btn-sm` | 小サイズ | `<button class="wf-btn wf-btn-sm">小</button>` |
| `wf-btn-lg` | 大サイズ | `<button class="wf-btn wf-btn-lg">大</button>` |
| `is-loading` | 読み込み中状態 | `<button class="wf-btn is-loading">処理中...</button>` |

### カード

#### 基本的な使用例

```html
<!-- 通常カード -->
<div class="wf-card">
  <h3>タイトル</h3>
  <p>本文内容</p>
</div>

<!-- 和紙風カード（四隅に飾り枠） -->
<div class="wf-card wf-card-washi">
  <h3>和紙風カード</h3>
  <p>四隅に紅梅色の飾り枠があり、和紙のような質感を表現しています。</p>
</div>

<!-- ボーダー付きカード -->
<div class="wf-card wf-card-bordered">
  <h3>ボーダー付きカード</h3>
  <p>枠線が強調されたカードです。</p>
</div>
```

#### カード内のレイアウト

```html
<div class="wf-card">
  <div class="wf-card__header">
    <h3>カードタイトル</h3>
  </div>
  <div class="wf-card__body">
    <p>カードの本文内容</p>
  </div>
  <div class="wf-card__footer">
    <button class="wf-btn wf-btn-primary">アクション</button>
  </div>
</div>
```

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-card` | ベースカード | `<div class="wf-card">コンテンツ</div>` |
| `wf-card-washi` | 和紙風カード | `<div class="wf-card wf-card-washi">和風</div>` |
| `wf-card-bordered` | ボーダー付き | `<div class="wf-card wf-card-bordered">枠線</div>` |

### フォーム

#### 基本的な入力フィールド

```html
<!-- テキスト入力 -->
<label class="wf-label" for="name">名前</label>
<input type="text" id="name" class="wf-input" placeholder="名前を入力">

<!-- メールアドレス -->
<label class="wf-label" for="email">メールアドレス</label>
<input type="email" id="email" class="wf-input" placeholder="name@example.com">

<!-- パスワード -->
<label class="wf-label" for="password">パスワード</label>
<input type="password" id="password" class="wf-input" placeholder="パスワードを入力">
```

#### テキストエリア

```html
<label class="wf-label" for="comment">コメント</label>
<textarea id="comment" class="wf-textarea" rows="4" placeholder="コメントを入力"></textarea>
```

#### セレクトボックス

```html
<label class="wf-label" for="country">国</label>
<select id="country" class="wf-select">
  <option value="">選択してください</option>
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
  <option value="uk">イギリス</option>
</select>
```

#### チェックボックス

```html
<label class="wf-checkbox__label">
  <input type="checkbox" class="wf-checkbox" id="agree">
  利用規約に同意する
</label>
```

#### ラジオボタン

```html
<fieldset>
  <legend>選択してください</legend>
  <label class="wf-radio__label">
    <input type="radio" name="option" class="wf-radio" value="option1">
    オプション1
  </label>
  <label class="wf-radio__label">
    <input type="radio" name="option" class="wf-radio" value="option2">
    オプション2
  </label>
</fieldset>
```

#### スイッチ

```html
<label class="wf-switch__label">
  <input type="checkbox" class="wf-switch" role="switch" id="notifications">
  通知を有効にする
</label>
```

#### エラー状態

```html
<label class="wf-label" for="email-error">メールアドレス</label>
<input 
  type="email" 
  id="email-error" 
  class="wf-input is-invalid" 
  aria-invalid="true"
  aria-describedby="email-error-message"
>
<div id="email-error-message" class="wf-alert wf-alert-danger" role="alert">
  メールアドレスの形式が正しくありません
</div>
```

#### 必須項目の表示

```html
<label class="wf-label" for="required-field">
  名前
  <span aria-label="必須項目">◆</span>
</label>
<input 
  type="text" 
  id="required-field" 
  class="wf-input" 
  required 
  aria-required="true"
>
```

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-input` | テキスト入力 | `<input type="text" class="wf-input">` |
| `wf-textarea` | テキストエリア | `<textarea class="wf-textarea"></textarea>` |
| `wf-select` | セレクトボックス | `<select class="wf-select"><option>選択</option></select>` |
| `wf-checkbox` | チェックボックス | `<input type="checkbox" class="wf-checkbox">` |
| `wf-radio` | ラジオボタン | `<input type="radio" class="wf-radio">` |
| `wf-switch` | スイッチ | `<input type="checkbox" class="wf-switch" role="switch">` |
| `wf-label` | ラベル | `<label class="wf-label">名前</label>` |
| `is-invalid` | エラー状態 | `<input class="wf-input is-invalid">` |

### アラート・トースト

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-alert` | アラートボックス | `<div class="wf-alert">お知らせ</div>` |
| `wf-alert-success` | 成功メッセージ | `<div class="wf-alert wf-alert-success">成功</div>` |
| `wf-alert-warning` | 警告メッセージ | `<div class="wf-alert wf-alert-warning">警告</div>` |
| `wf-alert-danger` | エラーメッセージ | `<div class="wf-alert wf-alert-danger">エラー</div>` |
| `wf-toast` | トースト通知 | `<div class="wf-toast">通知</div>` |
| `wf-toast-success` | 成功トースト | `<div class="wf-toast wf-toast-success">保存しました</div>` |
| `wf-toast-warning` | 警告トースト | `<div class="wf-toast wf-toast-warning">注意</div>` |
| `wf-toast-danger` | エラートースト | `<div class="wf-toast wf-toast-danger">失敗</div>` |

### ナビゲーション

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-navbar` | ナビゲーションバー | `<nav class="wf-navbar">...</nav>` |
| `wf-navbar-brand` | ブランドロゴ/タイトル | `<a class="wf-navbar-brand">wafoo</a>` |
| `wf-navbar-nav` | ナビゲーションリスト | `<ul class="wf-navbar-nav">...</ul>` |
| `wf-nav-item` | ナビゲーション項目 | `<li class="wf-nav-item">...</li>` |
| `wf-nav-link` | ナビゲーションリンク | `<a class="wf-nav-link">リンク</a>` |
| `wf-hamburger` | ハンバーガーメニュー | `<button class="wf-hamburger">...</button>` |
| `wf-hamburger__line` | ハンバーガーの線 | `<span class="wf-hamburger__line"></span>` |
| `is-active` | アクティブ状態 | `<a class="wf-nav-link is-active">現在地</a>` |

### モーダル

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-modal-overlay` | モーダルオーバーレイ | `<div class="wf-modal-overlay">...</div>` |
| `wf-modal` | モーダル本体 | `<div class="wf-modal">...</div>` |
| `wf-modal-sm` | 小サイズモーダル | `<div class="wf-modal wf-modal-sm">...</div>` |
| `wf-modal-lg` | 大サイズモーダル | `<div class="wf-modal wf-modal-lg">...</div>` |
| `wf-modal__header` | モーダルヘッダー | `<div class="wf-modal__header">...</div>` |
| `wf-modal__title` | モーダルタイトル | `<h2 class="wf-modal__title">タイトル</h2>` |
| `wf-modal__body` | モーダル本文 | `<div class="wf-modal__body">...</div>` |
| `wf-modal__footer` | モーダルフッター | `<div class="wf-modal__footer">...</div>` |
| `wf-modal__close` | 閉じるボタン | `<button class="wf-modal__close">×</button>` |
| `is-open` | 開いた状態 | `<div class="wf-modal-overlay is-open">...</div>` |

### テーブル

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-table` | ベーステーブル | `<table class="wf-table">...</table>` |
| `wf-table-striped` | ストライプテーブル | `<table class="wf-table wf-table-striped">...</table>` |
| `wf-table-bordered` | ボーダー付き | `<table class="wf-table wf-table-bordered">...</table>` |
| `wf-table-hover` | ホバー効果 | `<table class="wf-table wf-table-hover">...</table>` |

### データテーブル（ソート・フィルタ機能付き）

データテーブルは、ソート、フィルタ、ページネーション機能を持つ拡張テーブルコンポーネントです。

#### 基本的な使用例

```html
<div class="wf-data-table">
  <div class="wf-data-table__toolbar">
    <div class="wf-data-table__search">
      <input type="text" class="wf-input" placeholder="検索...">
    </div>
  </div>
  <div class="wf-data-table__wrapper">
    <table class="wf-data-table__table">
      <thead>
        <tr>
          <th>名前</th>
          <th>年齢</th>
          <th>メール</th>
        </tr>
      </thead>
      <tbody>
        <!-- JavaScript APIで動的に生成 -->
      </tbody>
    </table>
  </div>
  <div class="wf-data-table__footer">
    <div class="wf-data-table__info">1-10 / 50件</div>
  </div>
</div>
```

#### JavaScript API

```javascript
const table = WFUI.dataTable(document.querySelector('.wf-data-table'), {
  columns: [
    { key: 'name', label: '名前', sortable: true },
    { key: 'age', label: '年齢', sortable: true },
    { key: 'email', label: 'メール', filterable: true }
  ],
  data: [
    { name: '山田太郎', age: 30, email: 'yamada@example.com' },
    { name: '佐藤花子', age: 25, email: 'sato@example.com' }
  ],
  sortable: true,
  filterable: true,
  pagination: true,
  pageSize: 10,
  selectable: false
});

// メソッド
table.sort('name', 'asc'); // ソート
table.filter('山田'); // フィルタ
table.setPage(2); // ページ変更
```

### オートコンプリート

オートコンプリートは、入力時に候補を表示する入力補完コンポーネントです。

#### 基本的な使用例

```html
<div class="wf-autocomplete">
  <input type="text" class="wf-input wf-autocomplete__input" placeholder="検索...">
</div>
```

#### JavaScript API

```javascript
const autocomplete = WFUI.autocomplete(document.querySelector('.wf-autocomplete__input'), {
  source: function(query, callback) {
    // 非同期データ取得
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => callback(data));
  },
  minLength: 2,
  delay: 300,
  onSelect: function(item) {
    console.log('選択:', item);
  }
});

// 破棄
autocomplete.destroy();
```

### スナックバー（スタック管理）

スナックバーは、複数の通知をスタック表示する通知コンポーネントです。

#### 基本的な使用例

```javascript
// スナックバーの表示
WFUI.snackbar.show({
  message: '保存しました',
  type: 'success', // 'success' | 'warning' | 'danger' | 'info'
  duration: 3000,
  position: 'bottom-right' // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
});

// すべて削除
WFUI.snackbar.clear();

// 特定の位置のスナックバーを削除
WFUI.snackbar.clear('bottom-right');
```

#### バリエーション

```javascript
// 成功メッセージ
WFUI.snackbar.show({
  message: '保存しました',
  type: 'success'
});

// 警告メッセージ
WFUI.snackbar.show({
  message: '注意が必要です',
  type: 'warning'
});

// エラーメッセージ
WFUI.snackbar.show({
  message: 'エラーが発生しました',
  type: 'danger'
});

// 情報メッセージ
WFUI.snackbar.show({
  message: '情報',
  type: 'info'
});
```

---

## CSS変数リファレンス

### カラー

#### インク（グレースケール）

```css
--wf-ink-50: #f9fafb;
--wf-ink-100: #f3f4f6;
--wf-ink-200: #e5e7eb;
--wf-ink-300: #d1d5db;
--wf-ink-400: #9ca3af;
--wf-ink-500: #6b7280;
--wf-ink-600: #4b5563;
--wf-ink-700: #374151;
--wf-ink-800: #1f2937;
--wf-ink-900: #111827;
```

#### アクセントカラー（藤紫ベース）

```css
--wf-accent-50: #faf5ff;
--wf-accent-100: #f3e8ff;
--wf-accent-200: #e9d5ff;
--wf-accent-300: #d8b4fe;
--wf-accent-400: #c084fc;
--wf-accent-500: #a855f7;  /* 藤紫 */
--wf-accent-600: #9333ea;
--wf-accent-700: #7e22ce;
--wf-accent-800: #6b21a8;
--wf-accent-900: #581c87;
```

#### セマンティックカラー

```css
/* テキスト・背景 */
--wf-color-text: var(--wf-ink-900);
--wf-color-text-muted: var(--wf-ink-600);
--wf-color-bg: var(--wf-ink-50);
--wf-surface-base: #ffffff;
--wf-surface-muted: var(--wf-ink-100);
--wf-surface-subtle: var(--wf-accent-50);

/* リンク・アクセント */
--wf-link-color: var(--wf-accent-600);
--wf-link-hover: var(--wf-accent-700);
--wf-color-accent: var(--wf-accent-500);

/* ボーダー */
--wf-color-border: var(--wf-ink-200);
--wf-color-border-focus: var(--wf-accent-400);

/* ステータス */
--wf-success: #10b981;
--wf-success-fg: #ffffff;
--wf-warning: #f59e0b;
--wf-warning-fg: #ffffff;
--wf-danger: #ef4444;
--wf-danger-fg: #ffffff;
--wf-info: var(--wf-accent-500);
--wf-info-fg: #ffffff;

/* プライマリー（ボタン等） */
--wf-primary-bg: var(--wf-accent-600);
--wf-primary-fg: #ffffff;
--wf-primary-hover: var(--wf-accent-700);

/* セカンダリー */
--wf-secondary-bg: var(--wf-ink-600);
--wf-secondary-fg: #ffffff;
--wf-secondary-hover: var(--wf-ink-700);
```

### タイポグラフィ

```css
/* フォントサイズ */
--wf-font-xs: 0.75rem;    /* 12px */
--wf-font-sm: 0.875rem;   /* 14px */
--wf-font-md: 1rem;       /* 16px */
--wf-font-lg: 1.125rem;   /* 18px */
--wf-font-xl: 1.25rem;    /* 20px */
--wf-font-2xl: 1.5rem;    /* 24px */

/* 行間 */
--wf-leading-tight: 1.25;
--wf-leading-normal: 1.5;
--wf-leading-relaxed: 1.75;

/* フォントウェイト */
--wf-font-normal: 400;
--wf-font-medium: 500;
--wf-font-semibold: 600;
--wf-font-bold: 700;
```

### スペーシング

```css
--wf-space-0: 0;
--wf-space-1: 0.25rem;   /* 4px */
--wf-space-2: 0.5rem;    /* 8px */
--wf-space-3: 0.75rem;   /* 12px */
--wf-space-4: 1rem;      /* 16px */
--wf-space-5: 1.25rem;   /* 20px */
--wf-space-6: 1.5rem;    /* 24px */
--wf-space-8: 2rem;      /* 32px */
--wf-space-10: 2.5rem;   /* 40px */
--wf-space-12: 3rem;     /* 48px */
--wf-space-16: 4rem;     /* 64px */
```

### ボーダー・シャドウ

```css
/* ボーダー半径 */
--wf-radius-sm: 0.25rem;  /* 4px */
--wf-radius-md: 0.375rem; /* 6px */
--wf-radius-lg: 0.5rem;   /* 8px */
--wf-radius-xl: 0.75rem;  /* 12px */
--wf-radius-full: 9999px;

/* シャドウ */
--wf-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--wf-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--wf-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--wf-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
```

### アニメーション

```css
/* トランジション時間 */
--wf-transition-fast: 150ms;
--wf-transition-base: 200ms;
--wf-transition-slow: 300ms;

/* イージング */
--wf-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--wf-ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### ブレークポイント

```css
--wf-breakpoint-sm: 600px;
--wf-breakpoint-md: 900px;
--wf-breakpoint-lg: 1200px;
```

### コンポーネント固有

```css
/* ボタン */
--wf-btn-py-sm: var(--wf-space-1);
--wf-btn-px-sm: var(--wf-space-2);
--wf-btn-py-md: var(--wf-space-2);
--wf-btn-px-md: var(--wf-space-4);
--wf-btn-py-lg: var(--wf-space-3);
--wf-btn-px-lg: var(--wf-space-6);

/* アイコン */
--wf-icon-xs: 0.75rem;
--wf-icon-sm: 1rem;
--wf-icon-md: 1.25rem;
--wf-icon-lg: 1.5rem;

/* 判子（スタンプ） */
--wf-stamp-color: #c41e3a;
--wf-stamp-size: 64px;
--wf-stamp-border: 3px;
```

---

## ユーティリティクラス

### スペーシング

| クラス名 | 用途 | 値 |
|---------|------|-----|
| `wf-mt-0` ~ `wf-mt-8` | マージントップ | 0 ~ 2rem |
| `wf-mb-0` ~ `wf-mb-8` | マージンボトム | 0 ~ 2rem |
| `wf-ml-0` ~ `wf-ml-8` | マージンレフト | 0 ~ 2rem |
| `wf-mr-0` ~ `wf-mr-8` | マージンライト | 0 ~ 2rem |
| `wf-pt-0` ~ `wf-pt-8` | パディングトップ | 0 ~ 2rem |
| `wf-pb-0` ~ `wf-pb-8` | パディングボトム | 0 ~ 2rem |
| `wf-pl-0` ~ `wf-pl-8` | パディングレフト | 0 ~ 2rem |
| `wf-pr-0` ~ `wf-pr-8` | パディングライト | 0 ~ 2rem |

### テキスト

| クラス名 | 用途 |
|---------|------|
| `wf-text-left` | 左揃え |
| `wf-text-center` | 中央揃え |
| `wf-text-right` | 右揃え |
| `wf-text-sm` | 小さいテキスト |
| `wf-text-lg` | 大きいテキスト |
| `wf-text-bold` | 太字 |
| `wf-text-muted` | 薄いテキスト |

### 表示

| クラス名 | 用途 |
|---------|------|
| `wf-hidden` | 非表示 |
| `wf-block` | ブロック表示 |
| `wf-inline-block` | インラインブロック |
| `wf-flex` | フレックス表示 |
| `wf-grid` | グリッド表示 |

### アクセシビリティ

| クラス名 | 用途 |
|---------|------|
| `wf-sr-only` | スクリーンリーダー専用（視覚的に非表示） |

---

## 命名規則

wafoo-cssは、Tailwind CSSの命名規則を採用していますが、すべてのクラス名に `wf-` プレフィックスを付けます。

### 基本原則

1. **`wf-` プレフィックス**: すべてのクラス名は `wf-` で始まります
2. **Tailwind風の命名**: Tailwind CSSの命名規則を採用
3. **セマンティックなカラー**: 具体的な色名ではなく、セマンティックな名前を使用（テーマ変数ベース）

### クイックリファレンス

#### スペーシング

```html
<!-- マージン -->
<div class="wf-mt-4">マージントップ 16px</div>
<div class="wf-mx-2">左右マージン 8px</div>

<!-- パディング -->
<div class="wf-p-4">パディング 16px</div>
<div class="wf-px-2 wf-py-4">左右8px、上下16px</div>

<!-- ギャップ -->
<div class="wf-flex wf-gap-4">ギャップ 16px</div>
```

#### ディスプレイ

```html
<div class="wf-flex wf-items-center wf-justify-between">フレックスレイアウト</div>
<div class="wf-grid wf-grid-cols-3 wf-gap-4">3列グリッド</div>
<div class="wf-hidden">非表示</div>
```

#### カラー（テーマ変数ベース）

```html
<!-- テキスト色 -->
<p class="wf-text-accent">アクセント色</p>
<p class="wf-text-primary">プライマリ色</p>
<p class="wf-text-muted">ミュート色</p>

<!-- 背景色 -->
<div class="wf-bg-primary">プライマリ背景</div>
<div class="wf-bg-surface">サーフェス背景</div>

<!-- ボーダー色 -->
<div class="wf-border-accent">アクセントボーダー</div>
```

#### シャドウ

```html
<div class="wf-card wf-shadow-md">シャドウ付きカード</div>
```

#### レスポンシブ

```html
<!-- モバイルでは非表示、デスクトップでは表示 -->
<div class="wf-hidden wf-md-flex">デスクトップのみ表示</div>

<!-- モバイルでは中央揃え、デスクトップでは左揃え -->
<p class="wf-text-center wf-md-text-left">レスポンシブテキスト</p>
```

### Tailwind互換性

wafoo-cssは、Tailwind CSSの命名規則を採用していますが、`wf-` プレフィックスを付ける必要があります。

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

### 詳細な命名規則

完全な命名規則のリファレンスは、[docs/naming-conventions.md](./docs/naming-conventions.md)を参照してください。

---

## 全コンポーネント一覧

### レイアウト

1. **コンテナ** (`.wf-container`) - コンテンツ幅制限
2. **グリッド** (`.wf-grid`) - CSS Grid レイアウト
3. **スタック** (`.wf-stack`) - 垂直スタック

### ナビゲーション

4. **ナビバー** (`.wf-navbar`) - ナビゲーションバー
5. **ハンバーガーメニュー** (`.wf-hamburger`) - モバイルメニュー
6. **暖簾ヘッダー** (`.wf-noren`) - 和風ヘッダー
7. **ブレッドクラム** (`.wf-breadcrumb`) - パンくずリスト
8. **ステップ** (`.wf-steps`) - 進捗ステップ
9. **タブ** (`.wf-tablist`, `.wf-tab`) - タブナビゲーション

### コンテンツ

10. **カード** (`.wf-card`) - コンテンツカード
11. **和紙カード** (`.wf-card-washi`) - 和紙風カード
12. **アコーディオン** (`.wf-accordion`) - 折りたたみコンテンツ
13. **判子（スタンプ）** (`.wf-stamp`) - 和風スタンプ

### フォーム

14. **入力フィールド** (`.wf-input`) - テキスト入力
15. **テキストエリア** (`.wf-textarea`) - 複数行入力
16. **セレクト** (`.wf-select`) - ドロップダウン選択
17. **チェックボックス** (`.wf-checkbox`) - チェックボックス
18. **ラジオボタン** (`.wf-radio`) - ラジオボタン
19. **スイッチ** (`.wf-switch`) - トグルスイッチ
20. **ラベル** (`.wf-label`) - フォームラベル
21. **フォームグループ** (`.wf-form-group`) - フォーム要素グループ
22. **オートコンプリート** (`.wf-autocomplete`) - 入力補完

### ボタン・インタラクション

22. **ボタン** (`.wf-btn`) - ボタン各種
23. **ボタングループ** (`.wf-btn-group`) - ボタンのグループ化
24. **バッジ** (`.wf-badge`) - バッジ・ラベル

### フィードバック

25. **アラート** (`.wf-alert`) - アラートメッセージ
26. **トースト** (`.wf-toast`) - トースト通知
27. **スナックバー** (`.wf-snackbar`) - スタック管理通知
28. **モーダル** (`.wf-modal`) - モーダルダイアログ
29. **オフキャンバス** (`.wf-offcanvas`) - サイドパネル
30. **ツールチップ** (`.wf-tooltip`) - ツールチップ
31. **ポップオーバー** (`.wf-popover`) - ポップオーバー

### データ表示

32. **テーブル** (`.wf-table`) - データテーブル
33. **データテーブル** (`.wf-data-table`) - ソート・フィルタ機能付きテーブル
34. **リスト** (`.wf-list`) - リスト表示
35. **スケジュール** (`.wf-schedule`) - スケジュール表示
36. **カレンダー** (`.wf-calendar`) - カレンダー表示

### その他

37. **ドロップダウン** (`.wf-dropdown`) - ドロップダウンメニュー
38. **ディバイダー** (`.wf-divider`) - 区切り線
37. **スピナー** (`.wf-spinner`) - ローディングスピナー

---

## テーマ

wafoo-cssには10種類の和風カラーテーマが用意されています。

| クラス名 | テーマ名 | 由来 |
|---------|---------|------|
| `theme-sakura` | 桜 | 春の桜色 |
| `theme-koubai` | 紅梅 | 紅梅の花色 |
| `theme-moe` | 萌黄 | 春の新芽色 |
| `theme-kiku` | 菊 | 菊の花色 |
| `theme-koori` | 氷 | 氷の透明感 |
| `theme-yanagi` | 柳 | 柳の葉色 |
| `theme-momiji` | 紅葉 | 秋の紅葉色 |
| `theme-fuji` | 藤 | 藤の花色 |
| `theme-uguisu` | 鶯 | 鶯の羽色 |
| `theme-yuki` | 雪 | 雪の白さ |

使用方法：

```html
<body class="theme-sakura">
  <!-- コンテンツ -->
</body>
```

---

## アクセシビリティ

wafoo-cssは、WCAG 2.1 Level AA準拠を目標としています。アクセシブルなWebアプリケーションを構築するためのガイドを用意しています。

### アクセシビリティガイド

詳細なアクセシビリティガイドは、[docs/accessibility.md](./docs/accessibility.md)を参照してください。

ガイドには以下の内容が含まれています：

- **基本原則**: WCAG 2.1準拠のための原則
- **ARIA属性の使い方**: `role`, `aria-label`, `aria-expanded`などの適切な使用
- **キーボードナビゲーション**: Tabキー、Escキー、矢印キーなどの操作
- **コンポーネント別のアクセシビリティ**: モーダル、タブ、ドロップダウンなどの実装例
- **テスト方法**: キーボード操作テスト、スクリーンリーダーテスト、コントラスト比の確認

### 主要なポイント

1. **セマンティックHTMLを使用**: `<button>`, `<nav>`, `<dialog>`などの適切な要素を使用
2. **ARIA属性を適切に使用**: `role`, `aria-label`, `aria-expanded`などを適切に設定
3. **キーボード操作をサポート**: すべての機能がキーボードで操作可能にする
4. **フォーカス管理**: モーダルなどのフォーカストラップを実装
5. **コントラスト比を確保**: テキストと背景のコントラスト比が4.5:1以上

### クイックリファレンス

#### モーダル

```html
<div id="modal-1" class="wf-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="wf-modal">
    <div class="wf-modal__header">
      <h2 id="modal-title">モーダルタイトル</h2>
      <button class="wf-modal__close" aria-label="閉じる">×</button>
    </div>
    <div class="wf-modal__body">モーダルの内容</div>
  </div>
</div>
```

#### タブ

```html
<div class="wf-tabs" data-wf-tabs>
  <div class="wf-tablist" role="tablist" aria-label="タブナビゲーション">
    <button class="wf-tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
      タブ1
    </button>
    <button class="wf-tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
      タブ2
    </button>
  </div>
  <div class="wf-tabpanel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    パネル1の内容
  </div>
  <div class="wf-tabpanel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    パネル2の内容
  </div>
</div>
```

#### フォーム

```html
<label class="wf-label" for="email">メールアドレス</label>
<input 
  type="email" 
  id="email" 
  class="wf-input" 
  aria-required="true"
  aria-describedby="email-help"
  required
>
<div id="email-help" class="wf-text-muted">メールアドレスを入力してください</div>
```

---

## 詳細ドキュメント

より詳しい使用方法やサンプルコードは、以下をご覧ください：

- [メインドキュメント (README.md)](./README.md)
- [ブラウザ版リファレンス (docs/reference.html)](https://nigh2tie.github.io/wafoo-css/reference.html)
- [アクセシビリティガイド (docs/accessibility.md)](./docs/accessibility.md)
- [デモサイト (docs/index.html)](https://nigh2tie.github.io/wafoo-css/)

---

## ライセンス

MIT License
