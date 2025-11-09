# wafoo-css

和風CSSフレームワーク - 伝統的な日本の美学を取り入れた、レスポンシブでモダンなウェブプロジェクト開発のためのCSSフレームワーク。

## 目次

- [クイックスタート](#クイックスタート)
  - [パターン1: すぐに使う](#パターン1-すぐに使う)
  - [パターン2: カスタマイズして使う](#パターン2-カスタマイズして使う)
- [特徴](#特徴)
- [クイックリファレンス](#クイックリファレンス)
- [含まれるファイル](#含まれるファイル)
- [ビルド方法](#ビルド方法)
- [コンポーネント](#コンポーネント)
- [CSS変数リファレンス](#css変数リファレンス)
- [カスタマイズ](#カスタマイズ)
- [テーマ](#テーマ)
- [作者](#作者)
- [著作権とライセンス](#著作権とライセンス)

## クイックスタート

wafoo-cssは2つの使い方があります。

オンラインデモ（GitHub Pages）

- サンプルとコンポーネント一覧: https://nigh2tie.github.io/wafoo-css/

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
- **完全なテーマシステム** -
  10種類のテーマ（桜、紅梅、萌黄、菊、氷、柳、紅葉、藤、鶯、雪）で全コンポーネントが正しく色継承
- **テーマ対応グラデーション** - 各テーマに最適化された配色
- **和風コンポーネント** - 判子（ハンコ）、暖簾ヘッダー、和紙風カード
- **漢数字サポート** - 壱・弐・参・肆などの表示
- **拡張されたデザイントークン** - 行間、シャドウ、アニメーション時間、イージング関数を体系化
- **軽量** - gzip圧縮後約12KB（20KB予算内、将来的にcore/extras分割予定）
- **自動初期化** - `data-wf-*`属性による宣言的なコンポーネント制御

## リファレンス

wafoo-cssの詳細なリファレンスドキュメントを用意しています：

- **[完全リファレンス (REFERENCE.md)](./REFERENCE.md)** - GitHub上で閲覧できるMarkdown形式の完全なリファレンス
- **[リファレンス (docs/reference.html)](https://nigh2tie.github.io/wafoo-css/reference.html)** - ブラウザで見やすいHTML形式のリファレンス

リファレンスには以下が含まれています：
- よく使うコンポーネント一覧
- 全CSS変数（カラー、タイポグラフィ、スペーシング等）
- ユーティリティクラス一覧
- 利用可能な全34種類のコンポーネント

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
│   ├── components/      # コンポーネントCSS（29ファイル）
│   ├── utilities.css    # ユーティリティクラス
│   └── themes.css       # 10種類のテーマ
│   └── js/
│       └── wafoo.js     # JS拡張（任意。dist/wafoo.js 末尾に連結されるパッチ）
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
# src/のCSSを結合/圧縮し、必要に応じてJSパッチも反映して dist/ に出力
bash scripts/build.sh
```

このコマンドは以下を実行します。

1. src/配下のCSSを結合（@layer順）
2. PostCSS（autoprefixer/cssnano）で最適化
3. `src/js/wafoo.js` が存在する場合、`dist/wafoo.js` の末尾に連結してJSを再出力（簡易minifyも実施）

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
    <div class="wf-col-12 wf-col-sm-8">メイン</div>
    <div class="wf-col-12 wf-col-sm-4">サイド</div>
  </div>
</div>
```

クラス: `wf-row`, `wf-col-{1..12}`, `wf-col-sm-*|md-*|lg-*`, `wf-g-{0..5}`（ガター）

### ナビゲーション

#### Navbar

```html
<!-- デスクトップ用ナビゲーション -->
<nav class="wf-navbar" role="navigation" aria-label="Primary">
  <a class="wf-navbar-brand" href="#">ブランド</a>

  <!-- ハンバーガーメニューアイコン（モバイルで表示） -->
  <button class="wf-hamburger" aria-label="メニュー" aria-expanded="false">
    <span class="wf-hamburger__line"></span>
    <span class="wf-hamburger__line"></span>
    <span class="wf-hamburger__line"></span>
  </button>

  <!-- ナビゲーションメニュー -->
  <ul class="wf-navbar-nav">
    <li class="wf-nav-item"><a class="wf-nav-link is-active" href="#">ホーム</a></li>
    <li class="wf-nav-item"><a class="wf-nav-link" href="#">ドキュメント</a></li>
    <li class="wf-nav-item"><a class="wf-nav-link" href="#">お問い合わせ</a></li>
  </ul>
</nav>
```

**JavaScript（メニュー開閉）:**

```javascript
const hamburger = document.querySelector('.wf-hamburger');
const navMenu = document.querySelector('.wf-navbar-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active');
  navMenu.classList.toggle('is-open');
  const isOpen = navMenu.classList.contains('is-open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
```

モバイル時（768px以下）は自動的にハンバーガーアイコンが表示され、メニューはサイドパネルとして表示されます。

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

**自動初期化**:
`data-wf-*`属性を使用することで、JavaScriptコードを書かずにコンポーネントが自動的に初期化されます。

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

モーダルのバリエーション（クラスで拡張できます）

- 配置: `.wf-modal-overlay.is-top`（上寄せ）
- サイズ: `.wf-modal-sm` / `.wf-modal-lg` / `.wf-modal-fullscreen`
- 長文対応: `.wf-modal--scroll`（本文を `max-height: 80vh; overflow: auto;`）
- ステータス配色: `.wf-modal--danger` / `--warning` / `--success` / `--info`
- フッター整列: `.wf-modal__footer.is-start` / `.is-center`

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

#### Schedule（スケジュール選択）

時間スロットを選択するコンポーネントです。日単位・週単位の表示モードに対応しています。

```html
<div
  class="wf-schedule"
  data-wf-schedule
  data-wf-schedule-mode="daily"
  data-wf-schedule-interval="60"
  data-wf-schedule-range="all-day"
>
  <!-- モード選択 -->
  <div class="wf-schedule__mode-grid">
    <button class="wf-schedule__mode-button is-active">1日単位指定</button>
    <button class="wf-schedule__mode-button">1週間単位指定</button>
  </div>

  <!-- 設定 -->
  <div class="wf-schedule__settings-grid">
    <input type="date" class="wf-input" id="selected-date" />
    <!-- 時間レンジはAPIでのみ設定可能（デフォルトは all-day） -->
    <select class="wf-select" id="time-interval">
      <option value="60">60分刻み</option>
      <option value="30">30分刻み</option>
      <option value="15">15分刻み</option>
    </select>
  </div>

  <!-- 日単位モード：タイムテーブル -->
  <div class="wf-schedule__daily">
    <div class="wf-schedule__time-grid cols-8"></div>
  </div>

  <!-- 週単位モード：週カレンダー -->
  <div class="wf-schedule__weekly is-hidden">
    <div class="wf-schedule__calendar-header"></div>
    <div class="wf-schedule__calendar-grid"></div>
  </div>
</div>
```

**属性:**

- `data-wf-schedule`: 自動初期化を有効化
- `data-wf-schedule-mode`: 表示モード（`daily` または `weekly`）
- `data-wf-schedule-interval`: 時間刻み（`15`, `30`, `60`）
- `data-wf-schedule-range`: 時間レンジ（`all-day` のみ）。その他のレンジはAPIでのみ設定します。
- `data-wf-schedule-date`: 初期選択日（ISO形式: `YYYY-MM-DD`）

**JavaScript API:**

```javascript
const instance = WFUI.schedule(element, {
  mode: "daily", // 'daily' または 'weekly'
  timeInterval: 60, // 15, 30, または 60
  // timeRange はAPIのみで設定（デフォルト: 'all-day'）
  // プリセット: 'daytime' (8:00–18:00), 'extended' (10:00–20:00)
  // カスタム: { start: 6, end: 12, label: 'morning' } または (date)=>{...}
  timeRange: 'all-day',
  selectedDate: null, // ISO形式の日付文字列
  onSelect: slots => {} // 選択変更時のコールバック
});

// メソッド
instance.getSelectedSlots(); // 選択されたスロットの配列を取得
instance.clearSelection(); // 選択をクリア
instance.setMode(mode); // モード切り替え
instance.setTimeInterval(interval); // 時間刻み設定
// 時間レンジ設定（APIのみ）
instance.setTimeRange('daytime'); // プリセット（8:00–18:00）
instance.setTimeRange('extended'); // プリセット（10:00–20:00）
instance.setTimeRange({ start: 6, end: 12, label: 'morning' }); // カスタム
instance.setTimeRange(date => ({ start: date.getDay() === 0 ? 10 : 8, end: 18, label: 'dynamic' })); // 関数
instance.setSelectedDate(date); // 選択日付設定
instance.navigateWeek(direction); // 週ナビゲーション（-1: 前週, 1: 次週）
instance.getCurrentWeekStart(); // 現在の週の開始日を取得
instance.goToCurrentWeek(); // 今週に移動
instance.generateText(); // 選択をテキスト形式で生成
```

注意
- `work1` / `work2` は使用できません。代わりに `daytime` / `extended` またはカスタム `{ start, end, label }` を使用してください。
- デフォルトは `all-day`（24時間表示）です。APIで `setTimeRange()` を呼び出した場合のみ時間レンジが適用されます。

#### Calendar（カレンダー）

日付を選択するカレンダーコンポーネントです。単一選択、複数選択、範囲選択に対応しています。

```html
<div class="wf-calendar" data-wf-calendar>
  <div class="wf-calendar__header">
    <button class="wf-calendar__nav-btn" data-action="prev" aria-label="前月">‹</button>
    <div class="wf-calendar__title"></div>
    <button class="wf-calendar__nav-btn" data-action="next" aria-label="次月">›</button>
  </div>
  <div class="wf-calendar__weekdays"></div>
  <div class="wf-calendar__grid"></div>
</div>
```

**属性:**

- `data-wf-calendar`: 自動初期化を有効化
- `data-wf-calendar-date`: 初期選択日（ISO形式: `YYYY-MM-DD`）
- `data-wf-calendar-multiple`: 複数選択を有効化（`"true"`）
- `data-wf-calendar-range`: 範囲選択を有効化（`"true"`）
- `data-wf-calendar-week-start`: 週の開始日（`0`=日曜日、`1`=月曜日、デフォルト: `1`）
- `data-wf-calendar-min-date`: 最小日付（ISO形式）
- `data-wf-calendar-max-date`: 最大日付（ISO形式）

**JavaScript API:**

```javascript
const instance = WFUI.calendar(element, {
  selectedDate: null, // 初期選択日（ISO形式）
  selectedDates: [], // 複数選択の場合の初期選択日配列
  minDate: null, // 最小日付（ISO形式）
  maxDate: null, // 最大日付（ISO形式）
  weekStart: 1, // 週の開始日（0=日曜、1=月曜）
  allowMultiple: false, // 複数選択を許可
  allowRange: false, // 範囲選択を許可
  onSelect: date => {}, // 選択時のコールバック
  onNavigate: (year, month) => {} // 月変更時のコールバック
});

// メソッド
instance.getSelectedDate(); // 選択された日付を取得（単一選択）
instance.getSelectedDates(); // 選択された日付の配列を取得（複数選択）
instance.getRange(); // 選択範囲を取得（範囲選択: {start, end}）
instance.setSelectedDate(date); // 日付を設定（単一選択）
instance.setSelectedDates(dates); // 日付を設定（複数選択）
instance.navigateMonth(direction); // 月ナビゲーション（-1: 前月, 1: 次月）
instance.goToMonth(year, month); // 指定月に移動
instance.goToToday(); // 今月に移動
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

### Toast（通知）

```html
<!-- 基本 -->
<div class="wf-toast">
  <div class="wf-toast__content">
    <div class="wf-toast__title">お知らせ</div>
    新しいメッセージが届きました
  </div>
  <button class="wf-toast__close" aria-label="閉じる">×</button>
</div>

<!-- 成功/警告/エラー -->
<div class="wf-toast wf-toast--success">...</div>
<div class="wf-toast wf-toast--warning">...</div>
<div class="wf-toast wf-toast--danger">...</div>
```

### Divider（区切り線）

```html
<!-- 水平線 -->
<hr class="wf-divider" />

<!-- テキスト付き -->
<div class="wf-divider wf-divider--text">または</div>

<!-- 垂直線 -->
<div style="display: flex; align-items: center;">
  <span>項目A</span>
  <div class="wf-divider wf-divider--vertical"></div>
  <span>項目B</span>
</div>
```

### KBD / Code

```html
<!-- キーボードキー -->
<kbd class="wf-kbd">Ctrl</kbd>
+
<kbd class="wf-kbd">S</kbd>

<!-- インラインコード -->
<code class="wf-code">const name = "wafoo"</code>

<!-- コードブロック（コピー機能付き） -->
<pre class="wf-code-block" data-wf-codeblock><code>
function greet(name) {
  return `こんにちは、${name}さん`;
}
</code></pre>
```

`data-wf-codeblock`属性を付けると、自動的に「コピー」ボタンが追加され、クリックでコードをクリップボードにコピーできます。Clipboard
API対応ブラウザで動作します。

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

主な追加ユーティリティ（抜粋）

```css
/* テキスト処理 */
.wf-text-truncate    /* 省略記号（ellipsis） */
.wf-text-break       /* 任意の位置で改行 */
.wf-line-clamp-2     /* 2行で切り詰め */
.wf-line-clamp-3     /* 3行で切り詰め */

/* カーソル */
.wf-cursor-pointer, .wf-cursor-not-allowed, .wf-cursor-wait, .wf-cursor-grab

/* アスペクト比 */
.wf-aspect-square, .wf-aspect-video, .wf-aspect-4-3

/* スクロールスナップ */
.wf-snap-x, .wf-snap-y, .wf-snap-start

/* 高さ・フォント */
.wf-h-100            /* 高さ100% */
.wf-text-xl          /* 拡張フォントサイズ（--wf-font-xl） */
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
  /* ... その他多数（詳細はREFERENCE.mdを参照） */
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

### 利用可能なテーマ

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

### 完全なテーマ継承

全てのテーマには、以下の完全な変数セットが含まれています：

- **基本色**: `--wf-color-accent`, `--wf-color-bg`, `--wf-primary-bg`
- **派生色**: hover/active状態、境界線（通常/subtle/strong）、サーフェス（base/subtle/muted）
- **グラデーション**: テーマ専用の開始色/終了色

これにより、ボタンのホバー効果、カードの装飾枠、フォームのラベル、グラデーションボタンなど、**全てのコンポーネント**がテーマ切り替えに正しく反応します。

### JavaScriptでテーマ切り替え

```javascript
// テーマを動的に変更
document.body.className = "theme-momiji";

// 複数クラスがある場合
document.body.classList.remove("theme-sakura");
document.body.classList.add("theme-koori");
```

## 作者

**Q_Q**

## 著作権とライセンス

コードとドキュメントの著作権 2025 Q_Q。コードは [MITライセンス](LICENSE)
の下で公開されています。使う際にはAIにコードを喰わせて、自由にカスタマイズして利用してOKです。
