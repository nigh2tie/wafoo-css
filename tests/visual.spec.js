const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Visual Regression', () => {
  test.skip(!!process.env.CI, 'Visual regression tests are skipped in CI (requires platform-specific snapshots)');

  test('Landing Page should match snapshot', async ({ page }) => {
    // In a real scenario, we would start a local server.
    // For this example, we'll try to load the file directly if possible,
    // or assume a server is running at localhost:8080 (common for static servers)
    // Let's use an absolute path for reliability in this environment.
    const fileUrl = `file://${path.resolve(__dirname, '../docs/index.html')}`;
    await page.goto(fileUrl);

    await expect(page).toHaveTitle(/wafoo-css/);
    
    // Visual comparison
    // Note: This will generate a new snapshot on the first run.
    await expect(page).toHaveScreenshot('landing-page.png', { fullPage: true });
  });

  test('Components Page should match snapshot', async ({ page }) => {
    const fileUrl = `file://${path.resolve(__dirname, '../docs/reference.html')}`;
    await page.goto(fileUrl);

    await expect(page).toHaveTitle(/リファレンス/);
    await expect(page).toHaveScreenshot('reference-page.png', { fullPage: true });
  });
});
