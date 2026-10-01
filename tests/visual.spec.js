const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * 比較用の画像は OS・ブラウザごとに描画が異なるため、リポジトリには含めていない（.gitignore 対象）。
 * 画像がない環境では比較できないのでスキップする。基準画像は次のコマンドで作成する。
 *   npm run test:visual:update
 */
function requireBaseline(testInfo, name) {
  // --update-snapshots 指定時（all / changed）は画像を作成するので比較対象がなくても実行する
  if (['all', 'changed'].includes(testInfo.config.updateSnapshots)) return;
  const baseline = testInfo.snapshotPath(name, { kind: 'screenshot' });
  test.skip(
    !fs.existsSync(baseline),
    `比較用の画像がありません（${path.relative(process.cwd(), baseline)}）。npm run test:visual:update で作成してください`
  );
}

test.describe('Visual Regression', () => {
  test.skip(!!process.env.CI, 'Visual regression tests are skipped in CI (requires platform-specific snapshots)');

  test('Landing Page should match snapshot', async ({ page }, testInfo) => {
    requireBaseline(testInfo, 'landing-page.png');
    const fileUrl = `file://${path.resolve(__dirname, '../docs/index.html')}`;
    await page.goto(fileUrl);

    // Wait for page to be fully loaded
    await expect(page).toHaveTitle(/wafoo-css/);
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('landing-page.png', { fullPage: true });
  });

  test('Components Page should match snapshot', async ({ page }, testInfo) => {
    requireBaseline(testInfo, 'reference-page.png');
    const fileUrl = `file://${path.resolve(__dirname, '../docs/reference.html')}`;
    await page.goto(fileUrl);

    // Wait for page to be fully loaded
    await expect(page).toHaveTitle(/リファレンス/);
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('reference-page.png', { fullPage: true });
  });
});
