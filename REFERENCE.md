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
- [全コンポーネント一覧](#全コンポーネント一覧)

---

## よく使うコンポーネント

### ボタン

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-btn` | ベースボタン | `<button class="wf-btn">ボタン</button>` |
| `wf-btn-primary` | プライマリーボタン | `<button class="wf-btn wf-btn-primary">実行</button>` |
| `wf-btn-secondary` | セカンダリーボタン | `<button class="wf-btn wf-btn-secondary">キャンセル</button>` |
| `wf-btn-outline` | アウトラインボタン | `<button class="wf-btn wf-btn-outline">詳細</button>` |
| `wf-btn-danger` | 危険な操作 | `<button class="wf-btn wf-btn-danger">削除</button>` |
| `wf-btn-sm` | 小サイズ | `<button class="wf-btn wf-btn-sm">小</button>` |
| `wf-btn-lg` | 大サイズ | `<button class="wf-btn wf-btn-lg">大</button>` |
| `is-loading` | 読み込み中状態 | `<button class="wf-btn is-loading">処理中...</button>` |

### カード

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-card` | ベースカード | `<div class="wf-card">コンテンツ</div>` |
| `wf-card-washi` | 和紙風カード | `<div class="wf-card wf-card-washi">和風</div>` |
| `wf-card-bordered` | ボーダー付き | `<div class="wf-card wf-card-bordered">枠線</div>` |

### フォーム

| クラス名 | 用途 | 使用例 |
|---------|------|--------|
| `wf-input` | テキスト入力 | `<input type="text" class="wf-input">` |
| `wf-textarea` | テキストエリア | `<textarea class="wf-textarea"></textarea>` |
| `wf-select` | セレクトボックス | `<select class="wf-select"><option>選択</option></select>` |
| `wf-checkbox` | チェックボックス | `<input type="checkbox" class="wf-checkbox">` |
| `wf-radio` | ラジオボタン | `<input type="radio" class="wf-radio">` |
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

### ボタン・インタラクション

22. **ボタン** (`.wf-btn`) - ボタン各種
23. **ボタングループ** (`.wf-btn-group`) - ボタンのグループ化
24. **バッジ** (`.wf-badge`) - バッジ・ラベル

### フィードバック

25. **アラート** (`.wf-alert`) - アラートメッセージ
26. **トースト** (`.wf-toast`) - トースト通知
27. **モーダル** (`.wf-modal`) - モーダルダイアログ
28. **オフキャンバス** (`.wf-offcanvas`) - サイドパネル
29. **ツールチップ** (`.wf-tooltip`) - ツールチップ
30. **ポップオーバー** (`.wf-popover`) - ポップオーバー

### データ表示

31. **テーブル** (`.wf-table`) - データテーブル
32. **リスト** (`.wf-list`) - リスト表示
33. **スケジュール** (`.wf-schedule`) - スケジュール表示
34. **カレンダー** (`.wf-calendar`) - カレンダー表示

### その他

35. **ドロップダウン** (`.wf-dropdown`) - ドロップダウンメニュー
36. **ディバイダー** (`.wf-divider`) - 区切り線
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

## 詳細ドキュメント

より詳しい使用方法やサンプルコードは、以下をご覧ください：

- [メインドキュメント (README.md)](./README.md)
- [ブラウザ版リファレンス (docs/reference.html)](https://nigh2tie.github.io/wafoo-css/reference.html)
- [デモサイト (docs/index.html)](https://nigh2tie.github.io/wafoo-css/)

---

## ライセンス

MIT License
