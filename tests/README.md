# wafoo-css テスト

このディレクトリには、wafoo-cssのテストコードが含まれています。

## テストの種類

### E2Eテスト (`tests/e2e/`)

インタラクティブなコンポーネントの動作をテストします。

- **Modal**: 開閉、Escキー、オーバーレイクリック
- **Tabs**: タブ切り替え、キーボードナビゲーション
- **Dropdown**: 開閉、Escキー、外側クリック

### アクセシビリティテスト (`tests/a11y/`)

WCAG 2.1 AA準拠をチェックします。

- コントラスト比
- ARIA属性
- キーボードナビゲーション
- フォーカス管理

### テストフィクスチャ (`tests/fixtures/`)

テスト用のHTMLファイルです。

## テストの実行

### すべてのテストを実行

```bash
npm test
```

### E2Eテストのみ

```bash
npm run test:e2e
```

### アクセシビリティテストのみ

```bash
npm run test:a11y
```

### UIモードで実行（デバッグ用）

```bash
npm run test:ui
```

### ヘッド付きモードで実行（ブラウザを表示）

```bash
npm run test:headed
```

### デバッグモード

```bash
npm run test:debug
```

## テストの追加

### 新しいコンポーネントのE2Eテスト追加

1. `tests/fixtures/`に新しいHTMLファイルを作成
2. `tests/e2e/`に新しいテストファイルを作成

```javascript
// tests/e2e/new-component.spec.js
const { test, expect } = require('@playwright/test');

test.describe('New Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/new-component.html');
  });

  test('テストケース', async ({ page }) => {
    // テストコード
  });
});
```

### 新しいアクセシビリティテスト追加

```javascript
// tests/a11y/components.spec.js に追加
test('New Component - アクセシビリティチェック', async ({ page }) => {
  await page.goto('/tests/fixtures/new-component.html');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## CI/CD統合

GitHub Actionsで自動実行されます:

- すべてのPush/PRでテストが実行
- テスト結果はアーティファクトとして保存（30日間）
- 失敗時はレポートを確認可能

## トラブルシューティング

### テストが失敗する場合

1. ビルドを確認: `npm run build`
2. ローカルサーバーを起動して手動確認: `python3 -m http.server 8000`
3. テストレポートを確認: `playwright-report/index.html`

### Playwright Browsersのインストール

```bash
npx playwright install chromium
```

## 参考資料

- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
