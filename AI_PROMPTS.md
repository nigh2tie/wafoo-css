# wafoo-css AI生成プロンプトテンプレート

このドキュメントは、ChatGPT、GitHub Copilot、その他のAI生成ツールでwafoo-cssのコードを生成するためのプロンプトテンプレートです。

## 目次

- [基本テンプレート](#基本テンプレート)
- [コンポーネント別テンプレート](#コンポーネント別テンプレート)
- [レイアウトテンプレート](#レイアウトテンプレート)
- [フォームテンプレート](#フォームテンプレート)
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
- タイプ: {normal|washi|bordered}
- タイトル: {title}
- 本文: {content}
- フッター: {optional}

クラス名:
- ベース: `wf-card`
- タイプ: `wf-card-washi`（和紙風）、`wf-card-bordered`（ボーダー付き）

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

## 参考資料

- [wafoo-css リファレンス](../REFERENCE.md)
- [wafoo-css 命名規則](./naming-conventions.md)
- [wafoo-css アクセシビリティガイド](./accessibility.md)
- [wafoo-css コンポーネントスキーマ](./components-schema.json)

---

**最終更新**: 2025-11-19

