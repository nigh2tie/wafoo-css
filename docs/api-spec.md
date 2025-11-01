# wafoo-css API Spec Draft (Bootstrap比較ベース)

本稿は今後追加/整備するAPIの草案です。命名は `wf-` 接頭辞、モバイルファースト。ARIAはWAI-ARIA
Authoring Practicesに準拠。

## Grid System（12列）

- クラス: `wf-row`, `wf-col-{1..12}`, `wf-col-sm-*|md-*|lg-*`, `wf-g-{0..5}`（ガター）,
  `wf-offset-{1..11}`, `wf-order-{1..12}`
- 例:

```
<div class="wf-container">
  <div class="wf-row wf-g-3">
    <div class="wf-col-12 wf-col-md-8">Main</div>
    <div class="wf-col-12 wf-col-md-4">Side</</div>
  </div>
</div>
```

## Navbar

- クラス: `wf-navbar`, `wf-navbar-brand`, `wf-navbar-nav`, `wf-nav-item`, `wf-nav-link`,
  `.is-active`
- ARIA: `<nav role="navigation" aria-label="Primary">`

```
<nav class="wf-navbar" role="navigation" aria-label="Primary">
  <a class="wf-navbar-brand" href="#">Brand</a>
  <ul class="wf-navbar-nav">
    <li class="wf-nav-item"><a class="wf-nav-link is-active" href="#">Home</a></li>
    <li class="wf-nav-item"><a class="wf-nav-link" href="#">Docs</a></li>
  </ul>
</nav>
```

## Dropdown

- クラス: `wf-dropdown`, `wf-dropdown__toggle`, `wf-dropdown__menu`, `wf-dropdown__item`
- ARIA: `button[aria-expanded][aria-controls]`, `menu[role=menu]`, `menuitem[role=menuitem]`

```
<div class="wf-dropdown">
  <button class="wf-dropdown__toggle" aria-expanded="false" aria-controls="dd1">メニュー</button>
  <ul id="dd1" class="wf-dropdown__menu" role="menu" hidden>
    <li><a class="wf-dropdown__item" role="menuitem" href="#">項目A</a></li>
    <li><a class="wf-dropdown__item" role="menuitem" href="#">項目B</a></li>
  </ul>
</div>
```

## Pagination

- クラス: `wf-pagination`, `wf-page-item`, `wf-page-link`, `.is-disabled`, `.is-active`
- ARIA: `<nav aria-label="Pagination">`, `aria-current="page"`

```
<nav class="wf-pagination" aria-label="Pagination">
  <a class="wf-page-link is-disabled" aria-disabled="true">Prev</a>
  <a class="wf-page-link" href="#">1</a>
  <a class="wf-page-link is-active" aria-current="page">2</a>
  <a class="wf-page-link" href="#">3</a>
  <a class="wf-page-link" href="#">Next</a>
</nav>
```

## Breadcrumb

- クラス: `wf-breadcrumb`, `wf-breadcrumb-item`
- ARIA: `<nav aria-label="Breadcrumb">`, `aria-current="page"`

```
<nav aria-label="Breadcrumb">
  <ol class="wf-breadcrumb">
    <li class="wf-breadcrumb-item"><a href="#">Home</a></li>
    <li class="wf-breadcrumb-item"><a href="#">Library</a></li>
    <li class="wf-breadcrumb-item" aria-current="page">Data</li>
  </ol>
</nav>
```

## Accordion / Collapse

- クラス: `wf-accordion`, `wf-accordion__item`, `wf-accordion__header`, `wf-accordion__panel`
- ARIA: `button[aria-expanded][aria-controls]`, `region[role=region][aria-labelledby]`

```
<div class="wf-accordion">
  <div class="wf-accordion__item">
    <button class="wf-accordion__header" id="h1" aria-controls="p1" aria-expanded="false">見出し</button>
    <div id="p1" class="wf-accordion__panel" role="region" aria-labelledby="h1" hidden>
      パネル内容
    </div>
  </div>
</div>
```

## Offcanvas

- クラス: `wf-offcanvas-overlay .is-open`, `wf-offcanvas wf-offcanvas-start|end|top|bottom`
- ARIA: `role="dialog" aria-modal="true"`

```
<div class="wf-offcanvas-overlay" hidden></div>
<aside class="wf-offcanvas wf-offcanvas-start" role="dialog" aria-modal="true" aria-labelledby="oc-title" hidden>
  <h2 id="oc-title">メニュー</h2>
  ...
</aside>
```

## Progress

- クラス: `wf-progress`, `wf-progress__bar`, `.wf-progress-sm|lg`,
  `.wf-progress-success|warning|danger`
- ARIA: `role="progressbar" aria-valuemin aria-valuemax aria-valuenow`

```
<div class="wf-progress wf-progress-success" aria-label="進捗">
  <div class="wf-progress__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="42" style="width:42%"></div>
</div>
```

## Spinner

- クラス: `wf-spinner`, `.wf-spinner-sm|lg`
- ARIA: `role="status"` + 視覚的非表示テキスト

```
<div class="wf-spinner" role="status"><span class="wf-sr-only">読み込み中…</span></div>
```

## Input Group

- クラス: `wf-input-group`, `wf-input-group__prepend|append`, `wf-input-group__text`

```
<div class="wf-input-group">
  <span class="wf-input-group__prepend wf-input-group__text">@</span>
  <input class="wf-input" placeholder="username">
  <button class="wf-btn">検索</button>
  </div>
```

## Switch（Toggle）

- クラス: `wf-switch`（input[type=checkbox]）, `wf-switch__label`
- ARIA: `role="switch" aria-checked="true|false"`（option）

```
<label class="wf-switch__label">
  <input type="checkbox" class="wf-switch" role="switch" aria-checked="false"> 通知
</label>
```

## Range（Slider）

- クラス: `wf-range`, `.wf-range-sm|lg`
- ARIA: ブラウザ実装依存（必要に応じて `aria-valuenow` など）

```
<label class="wf-label" for="vol">音量</label>
<input id="vol" type="range" class="wf-range" min="0" max="100" value="30">
```

## File input

- クラス: `wf-file`, 拡張: `wf-input-group`併用やドラッグ領域 `.wf-dropzone`

```
<label class="wf-label" for="avatar">アバター</label>
<input id="avatar" type="file" class="wf-file" accept="image/*">
```

## Floating Label

- クラス: `wf-form-floating`（子に `wf-input|wf-textarea` + `label`）

```
<div class="wf-form-floating">
  <input id="email2" class="wf-input" placeholder="name@example.com">
  <label for="email2">Email</label>
</div>
```

## Tooltip

- クラス: `wf-tooltip-trigger[aria-describedby]`, `wf-tooltip`（位置: `.is-top|right|bottom|left`）
- ARIA: `role="tooltip"`、トリガは `aria-describedby="id"`

```
<button class="wf-btn wf-tooltip-trigger" aria-describedby="tt1">保存</button>
<div id="tt1" class="wf-tooltip is-top" role="tooltip" hidden>保存します</div>
```

## Popover

- クラス: `wf-popover-trigger[aria-controls]`, `wf-popover`（`.is-top|right|...`）
- ARIA: `role="dialog"` or `role="menu"`（内容に応じる）

```
<button class="wf-btn wf-popover-trigger" aria-controls="pv1" aria-expanded="false">詳細</button>
<div id="pv1" class="wf-popover is-right" role="dialog" hidden>
  <div class="wf-popover__header">タイトル</div>
  <div class="wf-popover__body">説明テキスト</div>
</div>
```

## Tabs（整合）

- 既存: `.wf-tabs .wf-tablist .wf-tab[aria-selected] .wf-tabpanel[aria-hidden]`
- 推奨: URLハッシュ同期（任意）

## Modal（整合）

- 既存: `.wf-modal-overlay.is-open .wf-modal`、Esc/クリック閉じ、フォーカストラップ推奨

## Table（整合）

- 既存: `.wf-table[.wf-table-striped|hover|bordered|sticky]`、`th[aria-sort]`、`.wf-sort`

## Utilities（拡張方針）

- 色: `wf-text-{accent|success|warning|danger|muted}`, `wf-bg-*`
- 枠/角/影: `wf-border-*`, `wf-radius-*`, `wf-shadow-*`
- サイズ: `wf-w-*`, `wf-h-*`, `wf-max-w-*`
- 位置: `wf-position-*`, `wf-z-*`, `wf-top|right|bottom|left-*`
- BP: `sm|md|lg|xl` の段階適用（例: `wf-lg-flex`）

備考: 実装時は `@layer` を維持し、`dist/` 更新と `docs/`/`examples/` デモも同時に追加してください。
