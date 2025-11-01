# wafoo-css / README

和風CSSフレームワーク（MVP）。ドキュメントとデモ、Examples をローカルで安全に検証する手順をまとめます。

## 1) まず見るページ
- Showcase（一覧）: `http://127.0.0.1:5500/docs/showcase.html`
- ドキュメント: `http://127.0.0.1:5500/docs/index.html`
- A11y テスト: `http://127.0.0.1:5500/docs/a11y-tests.html`

**注**: ダークモードは実装していません。必要な場合は自身で実装してください。

## 2) ローカル配信（推奨: devserver）
フレームワーク本体と分離した Node サーバを同梱しています（依存0）。

```
cd devserver
npm start              # 既定: http://127.0.0.1:5500/
# 変更したい場合: PORT=5501 npm start
```
- ルートはリポジトリ直下。`docs/` と `examples/` の相互リンクで 404 になりません。
- トップ(`/`)にアクセスすると `docs/showcase.html` に自動リダイレクトします。

代替（Python）
```
# リポジトリ直下をルートにして実行
python3 -m http.server 5500
```

## 3) ビルド（CSSを変更したら）
```
bash scripts/build.sh
# サイズ確認（予算: gzip <= 10KB）
gzip -c dist/wafoo.min.css | wc -c
```

## 3.1) 整形・Lint（任意だが推奨）
開発体験の向上と差分最小化のため、Prettier（整形）と Stylelint（CSS Lint）の設定を追加しています。

インストール（初回のみ）
```
npm i -D prettier stylelint stylelint-config-standard
```

整形の実行
```
npm run format         # HTML/CSS/JS/MD を整形
npm run format:check   # 整形要否を確認
```

CSS Lint
```
npm run lint:css       # src/**/*.css をLint
npm run lint:css:fix   # 可能な範囲で自動修正
```

エディタ連携
- .editorconfig を同梱しています（2スペース、LF、行末改行、末尾空白除去）。
- Prettier / Stylelint の拡張を有効化すると保存時整形・警告が機能します。

## 4) テスト観点（手動）
- 画面幅: 320 / 768 / 1200px で崩れとフォーカス可視性を確認
- ブラウザ: Chrome / Safari / Edge（最新安定版）
- Lighthouse: アクセシビリティ/性能 90+ 目安、コンソールエラー 0

## 5) よくある質問 / トラブルシュート
- 404 で「Page Developed by @yandeu」が出る
  - これは VS Code 拡張 Five Server の404です。いまのサーバが `docs/` をルートにしている可能性があります。
  - devserver を使うか、Five Server のルートをリポジトリ直下にしてください。
  - ポート衝突時は devserver を別ポートで起動（例: `PORT=5501 npm start`）。
- `examples/` 直開きで動かない
  - ブラウザのファイル直開きでは相対リンクや一部動作が不安定です。上記サーバ経由で確認してください。

## 6) 主要パス
- docs: `docs/index.html`, `docs/showcase.html`
- examples: `examples/login-simple.html`, `examples/data-simple.html`, `examples/data-table.html`, `examples/tabs.html`, `examples/modal.html`, `examples/navbar-dropdown.html`, `examples/grid.html`, `examples/pagination-breadcrumb.html`, `examples/components-more.html`
- ビルド: `scripts/build.sh` → `dist/wafoo.css` / `dist/wafoo.min.css`

## 7) CI/CD（任意）
- `.github/workflows/ci.yml` を追加済み。PR/Pushで CSS Lint と ビルド、`wafoo.min.css` の gzip サイズ（<=10,000 bytes）チェックを実行します。
