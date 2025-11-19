# wafoo-css アクセシビリティガイド

このドキュメントは、wafoo-cssを使用してアクセシブルなWebアプリケーションを構築するためのガイドです。

## 目次

- [基本原則](#基本原則)
- [ARIA属性の使い方](#aria属性の使い方)
- [キーボードナビゲーション](#キーボードナビゲーション)
- [コンポーネント別のアクセシビリティ](#コンポーネント別のアクセシビリティ)
- [テスト方法](#テスト方法)

---

## 基本原則

### WCAG 2.1 AA準拠

wafoo-cssは、WCAG 2.1 Level AA準拠を目標としています。以下の原則を守ることで、アクセシブルなWebアプリケーションを構築できます。

1. **知覚可能（Perceivable）**
   - テキストと背景のコントラスト比が4.5:1以上（通常のテキスト）
   - 画像には代替テキストを提供
   - 情報は色だけに依存しない

2. **操作可能（Operable）**
   - すべての機能がキーボードで操作可能
   - 十分な時間を提供（タイムアウトの設定）
   - 発作を引き起こすコンテンツを避ける

3. **理解可能（Understandable）**
   - テキストは読みやすく理解可能
   - ページの動作は予測可能
   - 入力エラーを識別し、修正方法を提示

4. **堅牢（Robust）**
   - マークアップは有効で、支援技術と互換性がある
   - ARIA属性を適切に使用

---

## ARIA属性の使い方

### 基本的なARIA属性

#### `role` 属性

要素の役割を明示的に指定します。

```html
<!-- ナビゲーション -->
<nav role="navigation" aria-label="メインナビゲーション">
  <!-- ... -->
</nav>

<!-- ダイアログ -->
<div class="wf-modal" role="dialog" aria-modal="true">
  <!-- ... -->
</div>

<!-- タブリスト -->
<div class="wf-tablist" role="tablist">
  <!-- ... -->
</div>
```

#### `aria-label` と `aria-labelledby`

要素にラベルを提供します。

```html
<!-- aria-label: 直接ラベルを指定 -->
<button aria-label="閉じる">×</button>

<!-- aria-labelledby: 他の要素を参照 -->
<h2 id="modal-title">モーダルタイトル</h2>
<div class="wf-modal" aria-labelledby="modal-title">
  <!-- ... -->
</div>
```

#### `aria-describedby`

要素の説明を提供します。

```html
<input type="text" aria-describedby="email-help">
<div id="email-help">メールアドレスを入力してください</div>
```

#### `aria-expanded`

折りたたみ可能な要素の状態を示します。

```html
<button aria-expanded="false" aria-controls="accordion-panel">
  見出し
</button>
<div id="accordion-panel" hidden>
  パネル内容
</div>
```

#### `aria-hidden`

装飾的な要素をスクリーンリーダーから隠します。

```html
<!-- 装飾的なアイコン -->
<span aria-hidden="true">◆</span>
<span class="wf-sr-only">必須項目</span>
```

#### `aria-current`

現在のページや項目を示します。

```html
<nav aria-label="パンくずリスト">
  <ol class="wf-breadcrumb">
    <li><a href="/">ホーム</a></li>
    <li><a href="/products">商品</a></li>
    <li aria-current="page">詳細</li>
  </ol>
</nav>
```

---

## キーボードナビゲーション

### 基本的なキーボード操作

- **Tab**: 次のフォーカス可能な要素に移動
- **Shift + Tab**: 前のフォーカス可能な要素に移動
- **Enter / Space**: ボタンやリンクをアクティブ化
- **Esc**: モーダルやドロップダウンを閉じる
- **矢印キー**: タブやメニュー項目間を移動

### フォーカス管理

#### フォーカス可視性

wafoo-cssは、フォーカス状態を視覚的に明確に表示します：

```css
:focus-visible {
  outline: 2px solid var(--wf-focus);
  outline-offset: 2px;
}
```

#### フォーカストラップ（モーダル）

モーダルを開いた際は、フォーカスをモーダル内に閉じ込める必要があります。

```javascript
// モーダルを開く際のフォーカス管理
function openModal(modal) {
  modal.hidden = false;
  modal.classList.add('is-open');
  
  // フォーカスをモーダル内の最初のフォーカス可能な要素に移動
  const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) {
    firstFocusable.focus();
  }
  
  // Tabキーでモーダル外に出ないようにする
  modal.addEventListener('keydown', trapFocus);
}

function trapFocus(e) {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}
```

---

## コンポーネント別のアクセシビリティ

### モーダル

#### 必要なARIA属性

```html
<div id="modal-1" class="wf-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="wf-modal">
    <div class="wf-modal__header">
      <h2 id="modal-title">モーダルタイトル</h2>
      <button class="wf-modal__close" aria-label="閉じる">×</button>
    </div>
    <div class="wf-modal__body">
      モーダルの内容
    </div>
  </div>
</div>
```

#### キーボード操作

- **Esc**: モーダルを閉じる
- **Tab**: モーダル内の要素間を移動（フォーカストラップ）
- **Shift + Tab**: 逆方向に移動

#### JavaScript実装例

```javascript
const modal = document.getElementById('modal-1');
const closeButton = modal.querySelector('.wf-modal__close');

// モーダルを開く
function openModal() {
  modal.hidden = false;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // 背景スクロールを無効化
  
  // フォーカスをモーダルに移動
  closeButton.focus();
}

// モーダルを閉じる
function closeModal() {
  modal.hidden = true;
  modal.classList.remove('is-open');
  document.body.style.overflow = ''; // 背景スクロールを有効化
}

// Escキーで閉じる
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

closeButton.addEventListener('click', closeModal);
```

---

### タブ

#### 必要なARIA属性

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

#### キーボード操作

- **左右矢印キー**: タブ間を移動
- **Home**: 最初のタブに移動
- **End**: 最後のタブに移動
- **Enter / Space**: タブを選択

---

### ドロップダウン

#### 必要なARIA属性

```html
<button data-wf-dropdown="dd-1" aria-expanded="false" aria-haspopup="true">
  メニュー
</button>
<ul id="dd-1" class="wf-dropdown__menu" role="menu" aria-label="メニュー" hidden>
  <li>
    <a class="wf-dropdown__item" role="menuitem" href="#">項目A</a>
  </li>
  <li>
    <a class="wf-dropdown__item" role="menuitem" href="#">項目B</a>
  </li>
</ul>
```

#### キーボード操作

- **Enter / Space**: ドロップダウンを開く/閉じる
- **Esc**: ドロップダウンを閉じる
- **上下矢印キー**: メニュー項目間を移動
- **Enter**: メニュー項目を選択

---

### アコーディオン

#### 必要なARIA属性

```html
<div class="wf-accordion">
  <div class="wf-accordion__item">
    <button 
      class="wf-accordion__header" 
      aria-expanded="false" 
      aria-controls="panel-1"
      id="accordion-header-1"
    >
      見出し
    </button>
    <div 
      class="wf-accordion__panel" 
      id="panel-1"
      aria-labelledby="accordion-header-1"
      hidden
    >
      パネル内容
    </div>
  </div>
</div>
```

#### キーボード操作

- **Enter / Space**: アコーディオンを開く/閉じる
- **上下矢印キー**: アコーディオン項目間を移動（複数の場合）

---

### フォーム

#### ラベルと入力の関連付け

```html
<!-- 方法1: for属性とid属性で関連付け -->
<label class="wf-label" for="email">メールアドレス</label>
<input type="email" id="email" class="wf-input" required>

<!-- 方法2: ラベルで囲む -->
<label class="wf-label">
  メールアドレス
  <input type="email" class="wf-input" required>
</label>
```

#### エラー状態の表示

```html
<label class="wf-label" for="email">メールアドレス</label>
<input 
  type="email" 
  id="email" 
  class="wf-input is-invalid" 
  aria-invalid="true"
  aria-describedby="email-error"
  required
>
<div id="email-error" class="wf-alert wf-alert-danger" role="alert">
  メールアドレスの形式が正しくありません
</div>
```

#### 必須項目の表示

```html
<label class="wf-label" for="name">
  名前
  <span aria-label="必須項目">◆</span>
</label>
<input type="text" id="name" class="wf-input" required aria-required="true">
```

---

### アラート

#### 必要なARIA属性

```html
<!-- 成功メッセージ -->
<div class="wf-alert wf-alert-success" role="alert">
  保存しました
</div>

<!-- エラーメッセージ -->
<div class="wf-alert wf-alert-danger" role="alert" aria-live="assertive">
  エラーが発生しました
</div>
```

#### `aria-live` 属性

動的に追加されるメッセージには、`aria-live`属性を使用します。

- `aria-live="polite"`: 現在の操作が完了した後に通知（通常のメッセージ）
- `aria-live="assertive"`: すぐに通知（エラーメッセージなど）

---

### ツールチップ

#### 必要なARIA属性

```html
<button data-wf-tooltip="tip-1" aria-describedby="tip-1">
  ホバーしてください
</button>
<div id="tip-1" class="wf-tooltip" role="tooltip" aria-hidden="true" hidden>
  ヒントテキスト
</div>
```

---

## テスト方法

### 1. キーボードのみでの操作テスト

1. マウスを使用せず、キーボードのみで操作
2. Tabキーで全要素にアクセス可能か確認
3. フォーカスが視覚的に明確か確認
4. すべての機能がキーボードで操作可能か確認

### 2. スクリーンリーダーでのテスト

#### macOS (VoiceOver)

1. `Cmd + F5` でVoiceOverを有効化
2. `Ctrl + Option + 右矢印` で要素を順番に読み上げ
3. 各要素が適切に読み上げられるか確認

#### Windows (NVDA)

1. NVDAをインストール
2. `Insert + Q` でNVDAを有効化
3. `Insert + 右矢印` で要素を順番に読み上げ
4. 各要素が適切に読み上げられるか確認

### 3. コントラスト比の確認

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

通常のテキストは4.5:1以上、大きなテキスト（18pt以上、または14pt以上の太字）は3:1以上が必要です。

### 4. 自動テストツール

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## ベストプラクティス

### 1. セマンティックHTMLを使用

```html
<!-- ❌ 悪い例 -->
<div onclick="handleClick()">ボタン</div>

<!-- ✅ 良い例 -->
<button onclick="handleClick()">ボタン</button>
```

### 2. 見出しの階層を正しく使用

```html
<h1>ページタイトル</h1>
  <h2>セクション1</h2>
    <h3>サブセクション1-1</h3>
  <h2>セクション2</h2>
```

### 3. リンクのテキストを明確に

```html
<!-- ❌ 悪い例 -->
<a href="/page">詳細</a>

<!-- ✅ 良い例 -->
<a href="/page">商品の詳細を見る</a>
```

### 4. 画像には代替テキストを提供

```html
<!-- 装飾的な画像 -->
<img src="decoration.png" alt="">

<!-- 情報を含む画像 -->
<img src="chart.png" alt="2024年の売上推移グラフ">
```

### 5. フォーカス順序を論理的に

フォーカス可能な要素は、視覚的な順序と同じ順序でフォーカスが移動するようにします。

---

## 参考資料

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**最終更新**: 2025-11-19

