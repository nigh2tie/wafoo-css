const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Visual Regression', () => {
  test.skip(!!process.env.CI, 'Visual regression tests are skipped in CI (requires platform-specific snapshots)');

  test('Landing Page should match snapshot', async ({ page }) => {
    const fileUrl = `file://${path.resolve(__dirname, '../docs/index.html')}`;
    await page.goto(fileUrl);

    // Wait for page to be fully loaded
    await expect(page).toHaveTitle(/wafoo-css/);
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('landing-page.png', { fullPage: true });
  });

  test('Components Page should match snapshot', async ({ page }) => {
    const fileUrl = `file://${path.resolve(__dirname, '../docs/reference.html')}`;
    await page.goto(fileUrl);

    // Wait for page to be fully loaded
    await expect(page).toHaveTitle(/リファレンス/);
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('reference-page.png', { fullPage: true });
  });
});
