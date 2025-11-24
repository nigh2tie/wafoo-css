# wafoo-css AI生成プロンプトテンプレート

このドキュメントは、ChatGPT、GitHub Copilot、その他のAI生成ツールでwafoo-cssのコードを生成するためのプロンプトテンプレートです。

## プロジェクト概要（AI向け）

- **バージョン**: v1.0.0
- **コンポーネント数**: 43種類
- **テーマ**: 10種類の伝統色テーマ（sakura, momiji, fuji等）
- **JavaScriptライブラリ**: WFUI（インタラクティブコンポーネント用）
- **ターゲットブラウザ**: 最新2バージョンのモダンブラウザ（Chrome, Safari, Edge, Firefox）
- **CSS変数**: 87個のデザイントークン
- **命名規則**: `wf-`プレフィックス + Tailwind風の命名

## 目次

- [基本テンプレート](#基本テンプレート)
- [コンポーネント別テンプレート](#コンポーネント別テンプレート)
- [レイアウトテンプレート](#レイアウトテンプレート)
- [フォームテンプレート](#フォームテンプレート)
- [インタラクティブコンポーネント](#インタラクティブコンポーネント)
- [ベストプラクティス](#ベストプラクティス)

---

## 基本テンプレート

### 汎用テンプレート

```
あなたはwafoo-cssという和風CSSフレームワークの専門家です。
以下の要件に基づいてHTMLコードを生成してください。

要件:
- フレームワーク: wafoo-css
- テーマ: {theme-name}（例: theme-sakura, theme-momiji）
- 要件: {requirements}

wafoo-cssの命名規則:
- プレフィックス: `wf-`
- スペーシング: `wf-mt-{0,1,2,3,4,6,8,10,12,16}`（マージン、パディング、ギャップ）
- カラー: `wf-text-{accent,primary,muted,success,warning,danger}`（テーマ変数ベース）
- ディスプレイ: `wf-flex`, `wf-grid`, `wf-block`, `wf-hidden`
- レスポンシブ: `wf-sm-*`, `wf-md-*`, `wf-lg-*`

重要:
- すべてのクラス名は`wf-`プレフィックスで始まる
- カラーユーティリティはセマンティックな名前を使用（テーマ変数ベース）
- アクセシビリティを考慮（ARIA属性、キーボード操作）
```

---

## コンポーネント別テンプレート

### ボタン

```
wafoo-cssで{size}サイズの{style}ボタンを作成してください。

要件:
- サイズ: {sm|md|lg}
- スタイル: {primary|secondary|outline|subtle|gradient|success|warning|danger}
- テキスト: {button-text}
- アイコン: {optional}

クラス名:
- ベース: `wf-btn`
- スタイル: `wf-btn-{style}`
- サイズ: `wf-btn-{size}`

例:
<button class="wf-btn wf-btn-primary wf-btn-lg">実行</button>
```

### カード

```
wafoo-cssで{type}カードを作成してください。

要件:
- タイプ: {normal|washi}
- タイトル: {title}
- 本文: {content}
- フッター: {optional}

クラス名:
- ベース: `wf-card`
- タイプ: `wf-card-washi`（和紙風、四隅に装飾）

例:
<div class="wf-card wf-card-washi">
  <h3>タイトル</h3>
  <p>本文内容</p>
</div>
```

### フォーム

```
wafoo-cssで{type}入力フィールドを含むフォームを作成してください。

要件:
- 入力タイプ: {text|email|password|textarea|select|checkbox|radio|switch}
- ラベル: {label-text}
- プレースホルダー: {placeholder}
- 必須項目: {true|false}
- エラー状態: {optional}

クラス名:
- ラベル: `wf-label`
- 入力: `wf-input`, `wf-textarea`, `wf-select`
- チェックボックス: `wf-checkbox`
- ラジオ: `wf-radio`
- スイッチ: `wf-switch`
- エラー: `is-invalid`

例:
<label class="wf-label" for="email">メールアドレス</label>
<input type="email" id="email" class="wf-input" placeholder="name@example.com" required>
```

### モーダル

```
wafoo-cssでモーダルダイアログを作成してください。

要件:
- タイトル: {title}
- 本文: {content}
- サイズ: {sm|md|lg}
- アクセシビリティ: ARIA属性を含む

クラス名:
- オーバーレイ: `wf-modal-overlay`
- モーダル: `wf-modal`
- サイズ: `wf-modal-sm`, `wf-modal-lg`
- ヘッダー: `wf-modal__header`
- 本文: `wf-modal__body`
- フッター: `wf-modal__footer`
- 閉じるボタン: `wf-modal__close`

ARIA属性:
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="{title-id}"`

例:
<div id="modal-1" class="wf-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="wf-modal">
    <div class="wf-modal__header">
      <h2 id="modal-title">タイトル</h2>
      <button class="wf-modal__close" aria-label="閉じる">×</button>
    </div>
    <div class="wf-modal__body">モーダルの内容</div>
  </div>
</div>
```

### タブ

```
wafoo-cssでタブナビゲーションを作成してください。

要件:
- タブ数: {number}
- タブ名: {tab-names}
- 自動初期化: `data-wf-tabs`属性を使用

クラス名:
- コンテナ: `wf-tabs`
- タブリスト: `wf-tablist`
- タブ: `wf-tab`
- パネル: `wf-tabpanel`

ARIA属性:
- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- `aria-labelledby`

例:
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

---

## レイアウトテンプレート

### フレックスレイアウト

```
wafoo-cssでフレックスレイアウトを作成してください。

要件:
- 方向: {row|column}
- アイテム配置: {start|center|end|stretch|baseline}
- 主軸配置: {start|center|end|between|around|evenly}
- ギャップ: {0,1,2,3,4,6,8,10,12,16}
- レスポンシブ: {optional}

クラス名:
- コンテナ: `wf-flex`
- アイテム配置: `wf-items-{value}`
- 主軸配置: `wf-justify-{value}`
- ギャップ: `wf-gap-{value}`
- レスポンシブ: `wf-sm-flex`, `wf-md-flex`, `wf-lg-flex`

例:
<div class="wf-flex wf-items-center wf-justify-between wf-gap-4">
  コンテンツ
</div>
```

### グリッドレイアウト

```
wafoo-cssでグリッドレイアウトを作成してください。

要件:
- 列数: {1|2|3|4|6|12}
- ギャップ: {0,1,2,3,4,6,8,10,12,16}
- レスポンシブ: {optional}

クラス名:
- コンテナ: `wf-grid`
- 列数: `wf-grid-cols-{value}`
- ギャップ: `wf-gap-{value}`

例:
<div class="wf-grid wf-grid-cols-3 wf-gap-4">
  <div>項目1</div>
  <div>項目2</div>
  <div>項目3</div>
</div>
```

---

## フォームテンプレート

### 完全なフォーム

```
wafoo-cssで完全なフォームを作成してください。

要件:
- フィールド: {field-list}
- バリデーション: {optional}
- エラー表示: {optional}
- アクセシビリティ: ARIA属性を含む

クラス名:
- フォームグループ: `wf-form-group`（オプション）
- ラベル: `wf-label`
- 入力: `wf-input`, `wf-textarea`, `wf-select`
- エラー: `is-invalid`
- ボタン: `wf-btn wf-btn-primary`

例:
<form>
  <div class="wf-form-group">
    <label class="wf-label" for="name">
      名前
      <span aria-label="必須項目">◆</span>
    </label>
    <input 
      type="text" 
      id="name" 
      class="wf-input" 
      required 
      aria-required="true"
    >
  </div>
  <button type="submit" class="wf-btn wf-btn-primary">送信</button>
</form>
```

---

## ベストプラクティス

### 1. テーマの指定

```html
<!-- テーマを指定 -->
<body class="theme-sakura">
  <!-- コンテンツ -->
</body>
```

### 2. セマンティックなカラーの使用

```html
<!-- ✅ 良い例（テーマ変数ベース） -->
<div class="wf-text-accent wf-bg-primary">

<!-- ❌ 悪い例（具体的な色名は使用しない） -->
<div class="wf-text-red-500 wf-bg-blue-300">
```

### 3. アクセシビリティの考慮

```html
<!-- ARIA属性を含める -->
<button aria-label="閉じる">×</button>

<!-- キーボード操作をサポート -->
<div role="dialog" aria-modal="true">
  <!-- モーダル内容 -->
</div>
```

### 4. レスポンシブデザイン

```html
<!-- モバイルファースト -->
<div class="wf-flex wf-flex-col wf-gap-4 wf-md-flex-row wf-md-gap-6">
  コンテンツ
</div>
```

### 5. ユーティリティクラスの組み合わせ

```html
<!-- 複数のユーティリティクラスを組み合わせる -->
<div class="wf-flex wf-items-center wf-justify-between wf-gap-4 wf-p-6 wf-bg-surface wf-shadow-md">
  コンテンツ
</div>
```

---

## プロンプト例

### 例1: ログインフォーム

```
wafoo-cssでログインフォームを作成してください。

要件:
- メールアドレス入力フィールド（必須）
- パスワード入力フィールド（必須）
- ログインボタン（プライマリ）
- テーマ: theme-sakura
- アクセシビリティ: ARIA属性を含む
- レスポンシブ: モバイルファースト

クラス名の規則:
- すべて`wf-`プレフィックスで始まる
- カラーはセマンティックな名前を使用
- スペーシングは`wf-mt-{value}`, `wf-p-{value}`など
```

### 例2: ダッシュボードレイアウト

```
wafoo-cssでダッシュボードレイアウトを作成してください。

要件:
- ヘッダー（ナビゲーションバー）
- サイドバー（モバイルではオフキャンバス）
- メインコンテンツエリア（カードグリッド）
- フッター
- テーマ: theme-momiji
- レスポンシブ: モバイル、タブレット、デスクトップ対応

使用するコンポーネント:
- `wf-navbar`（ナビゲーションバー）
- `wf-sidebar`（サイドバー）
- `wf-card`（カード）
- `wf-grid`（グリッドレイアウト）
```

### 例3: データテーブル

```
wafoo-cssでデータテーブルを作成してください。

要件:
- テーブルヘッダー
- ストライプ行
- ホバー効果
- ソート機能（将来的）
- アクセシビリティ: ARIA属性を含む

クラス名:
- `wf-table`
- `wf-table-striped`
- `wf-table-hover`
- `wf-table-bordered`（オプション）
```

---

## インタラクティブコンポーネント

wafoo-cssのインタラクティブコンポーネントは`dist/wafoo.js`が必要です。`data-wf-*`属性による自動初期化をサポートしています。

### タブ (Tabs)

```
wafoo-cssでタブナビゲーションを作成してください。

要件:
- タブ数: {number}
- 自動初期化: `data-wf-tabs`属性を使用
- キーボードナビゲーション対応（矢印キー、Home/End）
- ARIA属性を含む

クラス名:
- コンテナ: `wf-tabs`
- タブリスト: `wf-tablist`（`role="tablist"`, `data-wf-tabs`）
- タブ: `wf-tab`（`role="tab"`）
- パネル: `wf-tabpanel`（`role="tabpanel"`）

例:
<div class="wf-tabs" data-wf-tabs>
  <div class="wf-tablist" role="tablist">
    <button class="wf-tab" role="tab" aria-selected="true">タブ1</button>
  </div>
  <div class="wf-tabpanel" role="tabpanel">コンテンツ1</div>
</div>
```

### モーダル (Modal)

```
wafoo-cssでモーダルダイアログを作成してください。

要件:
- 自動初期化: `data-wf-modal="{id}"`属性を使用
- フォーカストラップ機能
- Escキーで閉じる
- 背景クリックで閉じる

クラス名:
- トリガー: `data-wf-modal="modal-id"`
- オーバーレイ: `wf-modal-overlay`（`id="modal-id"`）
- モーダル: `wf-modal`
- ヘッダー: `wf-modal__header`
- 本文: `wf-modal__body`
- 閉じるボタン: `wf-modal__close`
```

### カレンダー (Calendar)

```
wafoo-cssでカレンダーを作成してください。

要件:
- 自動初期化: `data-wf-calendar`属性を使用
- 単一選択/複数選択/範囲選択モード
- 月次ナビゲーション

クラス名:
- コンテナ: `wf-calendar`（`data-wf-calendar`）
- ヘッダー: `wf-calendar__header`
- グリッド: `wf-calendar__grid`
- 日付セル: `wf-calendar__day`
```

---

## 実践プロンプト例（完全版）

以下は、実際のユースケースに基づいた完全なプロンプト例です。

### 例4: ログインページ（完全版）

```
wafoo-cssを使用してログインページを作成してください。

## 要件

### レイアウト
- 中央配置のログインカード（最大幅: 400px）
- 和紙テクスチャカード（`wf-card-washi`）を使用
- ページ背景は淡い色
- テーマ: theme-sakura

### フォーム要素
1. タイトル: "ログイン"
2. メールアドレス入力
   - ラベル: "メールアドレス"
   - 必須マーク付き（◆）
   - プレースホルダー: "name@example.com"
3. パスワード入力
   - ラベル: "パスワード"
   - 必須マーク付き（◆）
   - type="password"
4. チェックボックス: "ログイン状態を保持"
5. ボタン:
   - プライマリボタン: "ログイン"（全幅）
   - リンク: "パスワードをお忘れですか？"（小さい文字、右寄せ）

### アクセシビリティ
- Skip Link: "メインコンテンツへスキップ"
- ARIA Landmarks（header, main, footer）
- すべての入力にラベル関連付け（`for`と`id`）
- ARIA属性（`aria-required`等）

### レスポンシブ
- モバイル: カード幅100%（左右にpadding）
- タブレット以上: カード幅400px、中央配置

## 使用するクラス
- レイアウト: `wf-flex`, `wf-items-center`, `wf-justify-center`, `wf-h-screen`
- カード: `wf-card`, `wf-card-washi`, `wf-max-w-md`, `wf-mx-auto`
- フォーム: `wf-field`, `wf-label`, `wf-input`, `wf-checkbox`, `wf-btn`, `wf-btn-primary`
- スペーシング: `wf-mt-*`, `wf-mb-*`, `wf-p-*`
- テキスト: `wf-text-center`, `wf-text-sm`, `wf-text-muted`
```

**期待される出力例:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログイン - wafoo-css</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="dist/wafoo.min.css">
</head>
<body class="theme-sakura wf-bg-surface">
  <a href="#main" class="wf-sr-only">メインコンテンツへスキップ</a>

  <main role="main" id="main" class="wf-flex wf-items-center wf-justify-center wf-h-screen wf-p-4">
    <div class="wf-card wf-card-washi wf-max-w-md wf-w-full">
      <h1 class="wf-text-center wf-mb-6">ログイン</h1>

      <form>
        <div class="wf-field">
          <label class="wf-label" for="email">
            メールアドレス
            <span aria-label="必須項目">◆</span>
          </label>
          <input
            type="email"
            id="email"
            class="wf-input"
            placeholder="name@example.com"
            required
            aria-required="true"
          >
        </div>

        <div class="wf-field">
          <label class="wf-label" for="password">
            パスワード
            <span aria-label="必須項目">◆</span>
          </label>
          <input
            type="password"
            id="password"
            class="wf-input"
            required
            aria-required="true"
          >
        </div>

        <div class="wf-flex wf-items-center wf-justify-between wf-mt-4 wf-mb-6">
          <label class="wf-checkbox">
            <input type="checkbox">
            <span>ログイン状態を保持</span>
          </label>
          <a href="#" class="wf-text-sm wf-text-accent">パスワードをお忘れですか？</a>
        </div>

        <button type="submit" class="wf-btn wf-btn-primary wf-w-full">
          ログイン
        </button>
      </form>

      <div class="wf-text-center wf-mt-6">
        <p class="wf-text-sm wf-text-muted">
          アカウントをお持ちでないですか？
          <a href="#" class="wf-text-accent">新規登録</a>
        </p>
      </div>
    </div>
  </main>

  <script src="dist/wafoo.min.js"></script>
</body>
</html>
```

---

### 例5: ダッシュボード（完全版）

```
wafoo-cssを使用してダッシュボード画面を作成してください。

## 要件

### レイアウト構造
1. ヘッダー（固定）
   - ロゴ/サイト名（左）
   - ナビゲーションリンク（右）: ダッシュボード、設定、ログアウト
2. サイドバー（左）
   - デスクトップ: 固定表示（幅: 250px）
   - モバイル: オフキャンバス（ハンバーガーメニューで開閉）
   - メニュー項目: ホーム、レポート、ユーザー、設定
3. メインコンテンツエリア
   - 統計カードグリッド（3列、モバイルでは1列）
   - 各カード: タイトル、数値、アイコン、前月比表示
4. フッター

### 統計カード
1. 総売上
   - 数値: "¥1,234,567"
   - 前月比: "+12%"（成功色）
   - アイコン: "¥"
2. 新規ユーザー
   - 数値: "1,234"
   - 前月比: "+8%"（成功色）
   - アイコン: "●"
3. アクティブユーザー
   - 数値: "987"
   - 前月比: "-3%"（警告色）
   - アイコン: "→"

### テーマとスタイル
- テーマ: theme-momiji
- カード: 和紙テクスチャ（`wf-card-washi`）
- スペーシング: 統一的な余白（16px, 24px）

### アクセシビリティ
- Skip Link
- ARIA Landmarks
- サイドバーメニューにARIA属性（`aria-current="page"`）
- オフキャンバスにフォーカストラップ

### レスポンシブ
- モバイル（<600px）: サイドバー非表示、ハンバーガーメニュー、カード1列
- タブレット（600-900px）: サイドバー表示、カード2列
- デスクトップ（≥900px）: フルレイアウト、カード3列

## 使用するコンポーネント
- `wf-navbar` (ヘッダー)
- `wf-sidebar` (サイドバー)
- `wf-offcanvas` (モバイルメニュー)
- `wf-card`, `wf-card-washi` (統計カード)
- `wf-grid`, `wf-grid-cols-*` (カードグリッド)
- `wf-text-success`, `wf-text-warning` (前月比色)
```

---

### 例6: お問い合わせフォーム（完全版）

```
wafoo-cssを使用してお問い合わせフォームページを作成してください。

## 要件

### レイアウト
- 2カラムレイアウト（デスクトップ）
  - 左: フォーム
  - 右: 連絡先情報カード
- モバイル: 1カラム（フォームが上、連絡先情報が下）
- 最大幅: 1200px、中央配置
- テーマ: theme-fuji

### フォーム要素
1. 氏名（必須）
   - type="text"
   - プレースホルダー: "山田 太郎"
2. メールアドレス（必須）
   - type="email"
   - プレースホルダー: "name@example.com"
   - ヘルプテキスト: "返信先として使用します"
3. お問い合わせ種別（必須）
   - select要素
   - オプション: "製品について", "サポート", "その他"
4. メッセージ（必須）
   - textarea（5行）
   - プレースホルダー: "お問い合わせ内容をご記入ください"
5. 個人情報の取り扱い
   - チェックボックス（必須）
   - ラベル: "個人情報保護方針に同意する"
6. 送信ボタン
   - プライマリボタン
   - テキスト: "送信する"

### 連絡先情報カード
- タイトル: "その他のお問い合わせ方法"
- 電話番号: "0120-XXX-XXX"
- 営業時間: "平日 9:00-18:00"
- メールアドレス: "support@example.com"
- カードスタイル: 和紙テクスチャ（`wf-card-washi`）

### バリデーション
- 必須項目に◆マークを表示
- エラー状態のスタイル（`is-invalid`）を含む例を追加
- エラーメッセージ例: "このフィールドは必須です"

### アクセシビリティ
- すべての入力にラベル関連付け
- `aria-required="true"`
- `aria-describedby` でヘルプテキストを関連付け
- エラーメッセージに `role="alert"`

## 使用するクラス
- レイアウト: `wf-grid`, `wf-grid-cols-2`, `wf-gap-8`
- フォーム: `wf-field`, `wf-label`, `wf-input`, `wf-textarea`, `wf-select`, `wf-checkbox`
- カード: `wf-card`, `wf-card-washi`
- ボタン: `wf-btn`, `wf-btn-primary`
- テキスト: `wf-help`, `wf-error`
- レスポンシブ: `wf-md-grid-cols-2`（600px以上で2列）
```

---

### 例7: データテーブル with 検索・フィルタ（完全版）

```
wafoo-cssを使用してユーザー管理テーブルページを作成してください。

## 要件

### 機能
1. 検索バー
   - 入力フィールド: "名前、メールで検索..."
   - 検索ボタン（プライマリ）
2. フィルタ（ドロップダウン）
   - ラベル: "ステータス"
   - オプション: "すべて", "アクティブ", "非アクティブ"
3. テーブル
   - 列: ID, 名前, メール, ステータス, アクション
   - ソート機能付き（`data-wf-sortable-table`）
   - ストライプ行（`wf-table-striped`）
   - ホバー効果（`wf-table-hover`）
4. ページネーション
   - 前へ/次へボタン
   - ページ番号表示（1, 2, 3...）
5. アクションボタン
   - 編集ボタン（アイコン: ✎）
   - 削除ボタン（アイコン: ×）

### テーブルデータ例（3行）
1. ID: 001, 名前: 山田太郎, メール: yamada@example.com, ステータス: アクティブ
2. ID: 002, 名前: 鈴木花子, メール: suzuki@example.com, ステータス: アクティブ
3. ID: 003, 名前: 佐藤次郎, メール: sato@example.com, ステータス: 非アクティブ

### スタイル
- テーマ: theme-kiku
- ステータスバッジ:
  - アクティブ: 成功色（`wf-bg-success`, `wf-text-success`）
  - 非アクティブ: ミュート色（`wf-bg-muted`, `wf-text-muted`）

### アクセシビリティ
- テーブルに `<caption>` 追加: "ユーザー一覧"
- ソートボタンに `aria-describedby` でソート説明を関連付け
- ステータスバッジに `role="status"`
- ページネーションに `aria-label="ページネーション"`

### レスポンシブ
- モバイル: テーブルに最小幅を設定し、横スクロール可能に
- 検索バーとフィルタ: モバイルで縦並び、デスクトップで横並び

## 使用するコンポーネント
- `wf-input` (検索)
- `wf-select` (フィルタ)
- `wf-btn`, `wf-btn-primary`, `wf-btn-outline`, `wf-btn-icon`
- `wf-table`, `wf-table-striped`, `wf-table-hover`
- `wf-sort` (ソートボタン)
- `wf-pagination` (ページネーション)
- `wf-badge` (ステータスバッジ)
```

---

### 例8: モーダルダイアログ（削除確認）

```
wafoo-cssを使用して削除確認モーダルダイアログを作成してください。

## 要件

### トリガー
- ボタン: "ユーザーを削除"
- スタイル: 危険色（`wf-btn-danger`）
- `data-wf-modal="delete-confirm"` 属性

### モーダル内容
1. ヘッダー
   - タイトル: "ユーザー削除の確認"
   - 閉じるボタン（×）
2. 本文
   - 警告アイコン（▲）
   - テキスト: "このユーザーを削除してもよろしいですか？この操作は取り消せません。"
   - ユーザー情報表示（カード内）:
     - 名前: "山田太郎"
     - メール: "yamada@example.com"
3. フッター
   - キャンセルボタン（アウトライン）
   - 削除ボタン（危険色、プライマリ）

### アクセシビリティ
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="modal-title"`
- フォーカストラップ（自動）
- Escキーで閉じる（自動）
- 背景クリックで閉じる（自動）

### スタイル
- テーマ: theme-sakura
- モーダルサイズ: 小（`wf-modal-sm`）
- 警告色を使用（`wf-alert-warning`）

## 使用するクラス
- モーダル: `wf-modal-overlay`, `wf-modal`, `wf-modal-sm`
- セクション: `wf-modal__header`, `wf-modal__body`, `wf-modal__footer`
- ボタン: `wf-btn-danger`, `wf-btn-outline`, `wf-modal__close`
- アラート: `wf-alert`, `wf-alert-warning`
- カード: `wf-card`（ユーザー情報表示）
```

---

## 参考資料

- [wafoo-css リファレンス](./REFERENCE.md)
- [wafoo-css コンポーネントAPI](./COMPONENTS.md)
- [wafoo-css 命名規則](./NAMING_CONVENTIONS.md)
- [wafoo-css アクセシビリティガイド](./ACCESSIBILITY.md)
- [llms.txt](./llms.txt) - LLM向け圧縮コンテキスト
- [.cursorrules](./.cursorrules) - AI エージェント向けルール

---

**最終更新**: 2025-11-24

