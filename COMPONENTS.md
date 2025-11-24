# wafoo-css Components Reference

This document provides a detailed reference for AI agents to understand and generate `wafoo-css` components.

## Core Components

### Buttons (`src/components/buttons.css`)
- **Classes**: `.wf-btn`, `.wf-btn-primary`, `.wf-btn-outline`, `.wf-btn-subtle`, `.wf-btn-gradient`, `.wf-btn-sm/lg`, `.wf-btn-icon`, `.is-loading`
- **Usage**: Standard actions. Support icons and loading states.

### Cards (`src/components/cards.css`)
- **Classes**: `.wf-card`, `.wf-card-washi` (texture variant)
- **Usage**: Content containers. `washi` variant adds Japanese paper texture.

### Forms (`src/components/forms.css`)
- **Classes**: `.wf-field`, `.wf-label`, `.wf-input`, `.wf-textarea`, `.wf-select`, `.wf-checkbox`, `.wf-radio`, `.wf-help`, `.wf-error`
- **States**: `.is-invalid`, `.is-success`
- **Usage**: Standard form controls.

### Table (`src/components/table.css`)
- **Classes**: `.wf-table`, `.wf-table-striped`, `.wf-table-hover`, `.wf-table-sm`
- **Usage**: Data presentation.

### Grid (`src/components/grid.css`)
- **Classes**: `.wf-grid`, `.wf-grid-cols-{n}`, `.wf-gap-{n}`
- **Usage**: CSS Grid layout system.

### Navbar (`src/components/navbar.css`)
- **Classes**: `.wf-navbar`, `.wf-navbar__brand`, `.wf-navbar__nav`, `.wf-navbar__link`
- **Usage**: Top navigation bar.

### Alerts (`src/components/alerts.css`)
- **Classes**: `.wf-alert`, `.wf-alert-info`, `.wf-alert-success`, `.wf-alert-warning`, `.wf-alert-danger`
- **Usage**: Contextual feedback messages.

---

## Navigation

### Breadcrumb (`src/components/breadcrumb.css`)
- **Classes**: `.wf-breadcrumb`, `.wf-breadcrumb__item`, `.wf-breadcrumb__link`
- **Usage**: Path navigation.

### Pagination (`src/components/pagination.css`)
- **Classes**: `.wf-pagination`, `.wf-page-item`, `.wf-page-link`, `.is-active`, `.is-disabled`
- **Usage**: Page navigation.

### Steps (`src/components/steps.css`)
- **Classes**: `.wf-steps`, `.wf-step`, `.is-current`, `.is-done`
- **Usage**: Progress indicators for multi-step processes.

### Tabs (`src/components/tabs.css`)
- **Classes**: `.wf-tablist`, `.wf-tab`, `.wf-tabpanel`, `[data-wf-tabs]`
- **Usage**: Tabbed content. Requires `data-wf-tabs` for JS behavior.

### Sidebar (`src/components/sidebar.css`)
- **Classes**: `.wf-sidebar`, `.wf-sidebar__nav`, `.wf-sidebar__link`
- **Usage**: Vertical navigation.

### Header (`src/components/header.css`)
- **Classes**: `.wf-header`, `.wf-header-noren` (curtain style)
- **Usage**: Page header. `noren` variant adds traditional curtain effect.

---

## Feedback & Status

### Tooltip (`src/components/tooltip.css`)
- **Classes**: `.wf-tooltip`, `[data-wf-tooltip="{id}"]`
- **Usage**: Hover information.

### Popover (`src/components/popover.css`)
- **Classes**: `.wf-popover`, `[data-wf-popover="{id}"]`
- **Usage**: Click-triggered overlays.

### Toast (`src/components/toast.css`)
- **Classes**: `.wf-toast`, `.wf-toast-container`
- **Usage**: Temporary notifications.

### Message (`src/components/message.css`)
- **Classes**: `.wf-message`, `.wf-message-info/success/warning/error`
- **Usage**: Prominent alerts or notices.

### Spinner (`src/components/spinner.css`)
- **Classes**: `.wf-spinner`, `.wf-spinner-sm/lg`, `.wf-spinner-primary`
- **Usage**: Loading indicator.

### Progress (`src/components/progress.css`)
- **Classes**: `.wf-progress`, `.wf-progress-bar`
- **Usage**: Progress bars.

### Skeleton (`src/components/skeleton.css`)
- **Classes**: `.wf-skeleton`, `.wf-skeleton-text`, `.wf-skeleton-circle`
- **Usage**: Loading placeholders.

### Empty (`src/components/empty.css`)
- **Classes**: `.wf-empty`, `.wf-empty__icon`, `.wf-empty__text`
- **Usage**: Empty state placeholders.

### Snackbar (`src/components/snackbar.css`)
- **Classes**: `.wf-snackbar`
- **Usage**: Bottom notifications (similar to Toast).

---

## Overlay

### Modal (`src/components/modal.css`)
- **Classes**: `.wf-modal`, `.wf-modal-overlay`, `.wf-modal__header`, `.wf-modal__body`, `.wf-modal__footer`, `[data-wf-modal="{id}"]`
- **Usage**: Dialogs.

### Offcanvas (`src/components/offcanvas.css`)
- **Classes**: `.wf-offcanvas`, `.wf-offcanvas-start/end`, `[data-wf-offcanvas="{id}"]`
- **Usage**: Slide-out panels.

### Dropdown (`src/components/dropdown.css`)
- **Classes**: `.wf-dropdown`, `.wf-dropdown__menu`, `.wf-dropdown__item`, `[data-wf-dropdown="{id}"]`
- **Usage**: Context menus.

---

## Data Display

### List Group (`src/components/list-group.css`)
- **Classes**: `.wf-list-group`, `.wf-list-group-item`
- **Usage**: Vertical lists.

### Avatar (`src/components/avatar.css`)
- **Classes**: `.wf-avatar`, `.wf-avatar-sm/lg`, `.wf-avatar-circle/square`
- **Usage**: User images.

### Stamp (`src/components/stamp.css`)
- **Classes**: `.wf-stamp`
- **Usage**: Traditional "Hanko" seal style.

### Timeline (`src/components/timeline.css`)
- **Classes**: `.wf-timeline`, `.wf-timeline__item`, `.wf-timeline__content`
- **Usage**: Chronological events.

### Calendar (`src/components/calendar.css`)
- **Classes**: `.wf-calendar`
- **Usage**: Date display/picker.

### Schedule (`src/components/schedule.css`)
- **Classes**: `.wf-schedule`
- **Usage**: Time-based schedule.

### Code (`src/components/code.css`)
- **Classes**: `.wf-code`, `.wf-pre`
- **Usage**: Inline code and blocks.

### Rating (`src/components/rating.css`)
- **Classes**: `.wf-rating`, `.wf-rating__star`
- **Usage**: Star ratings.

### Data Table (`src/components/data-table.css`)
- **Classes**: `.wf-data-table` (Complex table with sort/filter)
- **Usage**: Advanced tables.

---

## Form Extensions

### Switch (`src/components/switch.css`)
- **Classes**: `.wf-switch`
- **Usage**: Toggle switch.

### Range (`src/components/range.css`)
- **Classes**: `.wf-range`
- **Usage**: Slider input.

### Input Group (`src/components/input-group.css`)
- **Classes**: `.wf-input-group`, `.wf-input-group-text`
- **Usage**: Inputs with addons.

### Floating Label (`src/components/floating-label.css`)
- **Classes**: `.wf-floating-label`
- **Usage**: Material-style floating labels.

### File (`src/components/file.css`)
- **Classes**: `.wf-file`
- **Usage**: File upload input.

### Autocomplete (`src/components/autocomplete.css`)
- **Classes**: `.wf-autocomplete`
- **Usage**: Input with suggestions.

---

## Layout & Misc

### Divider (`src/components/divider.css`)
- **Classes**: `.wf-divider`, `.wf-divider-vertical`
- **Usage**: Visual separators.

### Carousel (`src/components/carousel.css`)
- **Classes**: `.wf-carousel`, `.wf-carousel__item`
- **Usage**: Image sliders.

---

### Accordion (`src/components/accordion.css`)
- **Classes**: `.wf-accordion`, `.wf-accordion__item`, `.wf-accordion__header`, `.wf-accordion__content`
- **Usage**: Collapsible content sections.

---

## Utilities (`src/utilities-core.css`, `src/utilities-extras.css`)
- **Spacing**: `.wf-m-{n}`, `.wf-p-{n}` (0-20)
- **Sizing**: `.wf-w-{n}`, `.wf-h-{n}` (fraction, fixed, screen, auto), `.wf-min/max-w/h-{n}`
- **Colors**: `.wf-text-{color}`, `.wf-bg-{color}`
- **Borders**: `.wf-border-{side}-{width}`, `.wf-rounded-{corner}-{size}`
- **Effects**: `.wf-opacity-{n}`, `.wf-scale-{n}`, `.wf-ring-{width}`, `.wf-outline-{width}`
- **State**: `hover:`, `focus:`, `active:`, `disabled:` prefixes.
  > **Note**: `disabled:border` utilities are part of **Core** (`utilities-core.css`). If using Extras standalone, these specific state variants will not be available unless Core is also loaded.

## Themes (`src/themes.css`)
Available themes (apply class to `<body>` or specific container):
- `.theme-sakura` (Pink/White)
- `.theme-koubai` (Red Plum)
- `.theme-moe` (Sprouting Green)
- `.theme-kiku` (Chrysanthemum Purple)
- `.theme-koori` (Ice Blue)
- `.theme-yanagi` (Willow Green)
- `.theme-momiji` (Maple Red)
- `.theme-fuji` (Wisteria Purple)
- `.theme-uguisu` (Olive Green)
- `.theme-yuki` (Snow Blue)

## State Classes
Prefixes available for utilities:
- `wf-hover:` (Hover state)
- `wf-focus:` (Focus-visible state)
- `wf-active:` (Active state)
- `wf-disabled:` (Disabled state)

## JS API Reference (`docs/wafoo.js`)
| Component | Auto-Init Attribute | JS Method | Description |
|-----------|---------------------|-----------|-------------|
| **Tabs** | `data-wf-tabs` | `WFUI.tabs(el)` | Keyboard nav, roving tabindex |
| **Table** | `data-wf-sortable-table` | `WFUI.sortableTable(el)` | Sortable columns, aria-live |
| **Dropdown** | `data-wf-dropdown="{id}"` | `WFUI.dropdown(trigger)` | Toggle menu, Esc to close |
| **Tooltip** | `data-wf-tooltip="{id}"` | `WFUI.tooltip(trigger)` | Hover/Focus reveal, collision detection |
| **Popover** | `data-wf-popover="{id}"` | `WFUI.popover(trigger)` | Click toggle, outside click close |
| **Modal** | `data-wf-modal="{id}"` | `WFUI.modal(trigger)` | Focus trap, backdrop, Esc close |
| **Offcanvas** | `data-wf-offcanvas="{id}"` | `WFUI.offcanvas(trigger)` | Side panel, focus management |

---

## Accessibility (A11y) Reference (v2.0.0)

このセクションでは、主要コンポーネントの ARIA 属性、ロール、キーボード操作を一覧にしています。

### インタラクティブコンポーネント

#### Modal（モーダル）

| 項目 | 要件 |
|------|------|
| **必須 ARIA 属性** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="{titleId}"` |
| **推奨 ARIA 属性** | `aria-describedby="{descId}"` |
| **フォーカス管理** | 開く時: モーダル内の最初のフォーカス可能要素にフォーカス<br>閉じる時: トリガー要素にフォーカスを戻す |
| **キーボード操作** | `Esc`: モーダルを閉じる<br>`Tab`: モーダル内でフォーカスをトラップ（外に出ない） |
| **背景処理** | モーダルが開いている間、背景要素に `aria-hidden="true"` を設定 |

**実装例:**
```html
<button data-wf-modal="example-modal">開く</button>

<div id="example-modal" class="wf-modal-overlay" aria-hidden="true">
  <div class="wf-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">モーダルタイトル</h2>
    <p id="modal-desc">説明文</p>
    <button class="wf-modal__close" aria-label="閉じる">×</button>
  </div>
</div>
```

#### Tabs（タブ）

| 項目 | 要件 |
|------|------|
| **必須 ARIA 属性** | タブリスト: `role="tablist"`<br>タブ: `role="tab"`, `aria-selected="true/false"`, `aria-controls="{panelId}"`<br>パネル: `role="tabpanel"`, `aria-labelledby="{tabId}"` |
| **フォーカス管理** | Roving tabindex: アクティブなタブのみ `tabindex="0"`、他は `tabindex="-1"` |
| **キーボード操作** | `→/←`: 次/前のタブに移動<br>`Home/End`: 最初/最後のタブに移動<br>`Enter/Space`: タブを選択 |

**実装例:**
```html
<div class="wf-tablist" role="tablist" data-wf-tabs>
  <button class="wf-tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" tabindex="0">
    タブ1
  </button>
  <button class="wf-tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">
    タブ2
  </button>
</div>

<div class="wf-tabpanel" role="tabpanel" aria-labelledby="tab-1" id="panel-1">
  パネル1の内容
</div>
<div class="wf-tabpanel" role="tabpanel" aria-labelledby="tab-2" id="panel-2" hidden>
  パネル2の内容
</div>
```

#### Dropdown（ドロップダウン）

| 項目 | 要件 |
|------|------|
| **必須 ARIA 属性** | トリガー: `aria-expanded="true/false"`, `aria-controls="{menuId}"`<br>メニュー: `role="menu"` または `role="listbox"` |
| **キーボード操作** | `Enter/Space`: メニューを開閉<br>`Esc`: メニューを閉じる<br>`↑/↓`: メニュー項目間を移動 |

**実装例:**
```html
<button data-wf-dropdown="menu-1" aria-expanded="false" aria-controls="menu-1">
  メニュー
</button>

<ul id="menu-1" class="wf-dropdown__menu" role="menu" hidden>
  <li role="menuitem"><a href="#">項目1</a></li>
  <li role="menuitem"><a href="#">項目2</a></li>
</ul>
```

#### Tooltip（ツールチップ）

| 項目 | 要件 |
|------|------|
| **必須 ARIA 属性** | トリガー: `aria-describedby="{tooltipId}"`<br>ツールチップ: `role="tooltip"`, `id="{tooltipId}"` |
| **表示/非表示** | デフォルト: `aria-hidden="true"`<br>表示時: `aria-hidden="false"` |
| **キーボード操作** | `Esc`: ツールチップを閉じる |

**実装例:**
```html
<button data-wf-tooltip="tip-1" aria-describedby="tip-1">
  ヘルプ
</button>

<div id="tip-1" class="wf-tooltip" role="tooltip" aria-hidden="true">
  これはヘルプテキストです
</div>
```

#### Sortable Table（ソート可能テーブル）

| 項目 | 要件 |
|------|------|
| **必須 ARIA 属性** | ソートボタン: `aria-sort="ascending/descending/none"` |
| **動的通知** | `aria-live="polite"` 領域でソート結果をアナウンス |
| **キーボード操作** | `Enter/Space`: 列をソート |

**実装例:**
```html
<table class="wf-table" data-wf-sortable-table>
  <thead>
    <tr>
      <th>
        <button class="wf-sort" aria-sort="none">
          名前 <span aria-hidden="true">▲▼</span>
        </button>
      </th>
      <th>
        <button class="wf-sort" aria-sort="none">
          年齢 <span aria-hidden="true">▲▼</span>
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    <!-- データ行 -->
  </tbody>
</table>

<div aria-live="polite" aria-atomic="true" class="wf-sr-only">
  <!-- ソート結果の通知がここに挿入される -->
</div>
```

### フォームコンポーネント

#### Input（入力欄）

| 項目 | 要件 |
|------|------|
| **必須属性** | `<label for="{inputId}">` と `<input id="{inputId}">` の関連付け |
| **エラー表示** | `.is-invalid` クラス + `aria-invalid="true"` + `aria-describedby="{errorId}"` |
| **ヘルプテキスト** | `aria-describedby="{helpId}"` |

**実装例:**
```html
<div class="wf-field">
  <label for="email" class="wf-label">メールアドレス</label>
  <input
    type="email"
    id="email"
    class="wf-input is-invalid"
    aria-invalid="true"
    aria-describedby="email-error email-help"
  >
  <p id="email-help" class="wf-help">例: user@example.com</p>
  <p id="email-error" class="wf-error">有効なメールアドレスを入力してください</p>
</div>
```

#### Checkbox / Radio

| 項目 | 要件 |
|------|------|
| **必須属性** | `<label>` で囲むか `for` 属性で関連付け |
| **グループ化** | `<fieldset>` + `<legend>` でグループ化 |

**実装例:**
```html
<fieldset>
  <legend>興味のある分野</legend>
  <label class="wf-checkbox">
    <input type="checkbox" name="interest" value="design">
    <span>デザイン</span>
  </label>
  <label class="wf-checkbox">
    <input type="checkbox" name="interest" value="dev">
    <span>開発</span>
  </label>
</fieldset>
```

### ステータス表示コンポーネント

#### Alert（アラート）

| 項目 | 要件 |
|------|------|
| **推奨 ARIA 属性** | `role="alert"` （重要な通知の場合）<br>`role="status"` （一般的な情報の場合） |
| **動的挿入** | 動的に挿入される場合、`aria-live="assertive"` または `"polite"` |

**実装例:**
```html
<div class="wf-alert wf-alert-danger" role="alert">
  <strong>エラー:</strong> 処理に失敗しました
</div>
```

#### Progress（プログレスバー）

| 項目 | 要件 |
|------|------|
| **必須 ARIA 属性** | `role="progressbar"`, `aria-valuenow="{current}"`, `aria-valuemin="0"`, `aria-valuemax="100"` |
| **ラベル** | `aria-label` または `aria-labelledby` |

**実装例:**
```html
<div class="wf-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="アップロード進捗">
  <div class="wf-progress-bar" style="width: 60%"></div>
</div>
```

### ナビゲーションコンポーネント

#### Breadcrumb（パンくずリスト）

| 項目 | 要件 |
|------|------|
| **必須要素** | `<nav aria-label="パンくずナビゲーション">` でラップ |
| **現在ページ** | `aria-current="page"` |

**実装例:**
```html
<nav aria-label="パンくずナビゲーション">
  <ol class="wf-breadcrumb">
    <li class="wf-breadcrumb__item"><a href="/">ホーム</a></li>
    <li class="wf-breadcrumb__item"><a href="/products">商品</a></li>
    <li class="wf-breadcrumb__item" aria-current="page">詳細</li>
  </ol>
</nav>
```

#### Pagination（ページネーション）

| 項目 | 要件 |
|------|------|
| **必須要素** | `<nav aria-label="ページネーション">` でラップ |
| **現在ページ** | `aria-current="page"` |
| **無効リンク** | `aria-disabled="true"` + `tabindex="-1"` |

**実装例:**
```html
<nav aria-label="ページネーション">
  <ul class="wf-pagination">
    <li class="wf-page-item is-disabled">
      <a class="wf-page-link" href="#" aria-disabled="true" tabindex="-1">前へ</a>
    </li>
    <li class="wf-page-item is-active">
      <a class="wf-page-link" href="#" aria-current="page">1</a>
    </li>
    <li class="wf-page-item">
      <a class="wf-page-link" href="#">2</a>
    </li>
    <li class="wf-page-item">
      <a class="wf-page-link" href="#">次へ</a>
    </li>
  </ul>
</nav>
```

### アクセシビリティベストプラクティス

#### ページレベル構造

すべてのページに以下を含めることを推奨：

```html
<body>
  <!-- スキップリンク -->
  <a href="#main" class="wf-sr-only">メインコンテンツへスキップ</a>

  <!-- ARIAランドマーク -->
  <header role="banner">
    <nav role="navigation" aria-label="メインナビゲーション">
      <!-- ナビゲーション -->
    </nav>
  </header>

  <main role="main" id="main">
    <!-- メインコンテンツ -->
  </main>

  <footer role="contentinfo">
    <!-- フッター -->
  </footer>
</body>
```

#### スクリーンリーダー専用テキスト

視覚的に隠すが、スクリーンリーダーには読み上げさせたいテキストには `.wf-sr-only` を使用：

```css
.wf-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

#### フォーカスインジケーター

すべてのインタラクティブ要素には明確なフォーカスインジケーターが必要：

```css
/* 既に実装済み */
.wf-btn:focus-visible,
.wf-input:focus-visible {
  outline: 2px solid var(--wf-focus);
  outline-offset: 2px;
}
```

#### モーション制御（v2.0.0）

`prefers-reduced-motion` に対応するため、`--wf-enable-motion` を使用：

```css
/* トークン定義（既に実装済み）*/
:root {
  --wf-enable-motion: 1;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --wf-enable-motion: 0;
  }
}

/* 使用例 */
.wf-animated {
  transition: calc(var(--wf-enable-motion) * 250ms) ease;
}
```

### テスト

wafoo-css は Playwright + axe-core による自動 A11y テストを実装しています：

```bash
npm run test:a11y
```

詳細は `tests/a11y/` を参照してください。

---

**最終更新**: 2025-11-24 (v2.0.0)
**参考**: [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/)
