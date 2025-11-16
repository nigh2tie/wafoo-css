// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Dropdown Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/dropdown.html');
  });

  test('ドロップダウンが最初は閉じている', async ({ page }) => {
    const dropdown = page.locator('.wf-dropdown');
    await expect(dropdown).not.toHaveClass(/is-open/);
  });

  test('トグルボタンクリックでドロップダウンが開く', async ({ page }) => {
    const toggle = page.locator('[data-wf-dropdown="test-dropdown"]');
    const dropdown = page.locator('.wf-dropdown');

    await toggle.click();
    await expect(dropdown).toHaveClass(/is-open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('再度クリックでドロップダウンが閉じる', async ({ page }) => {
    const toggle = page.locator('[data-wf-dropdown="test-dropdown"]');
    const dropdown = page.locator('.wf-dropdown');

    // 開く
    await toggle.click();
    await expect(dropdown).toHaveClass(/is-open/);

    // 閉じる
    await toggle.click();
    await expect(dropdown).not.toHaveClass(/is-open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Escキーでドロップダウンが閉じる', async ({ page }) => {
    const toggle = page.locator('[data-wf-dropdown="test-dropdown"]');
    const dropdown = page.locator('.wf-dropdown');

    // 開く
    await toggle.click();
    await expect(dropdown).toHaveClass(/is-open/);

    // Escキーを押す
    await page.keyboard.press('Escape');
    await expect(dropdown).not.toHaveClass(/is-open/);
  });

  test('外側クリックでドロップダウンが閉じる', async ({ page }) => {
    const toggle = page.locator('[data-wf-dropdown="test-dropdown"]');
    const dropdown = page.locator('.wf-dropdown');

    // 開く
    await toggle.click();
    await expect(dropdown).toHaveClass(/is-open/);

    // 外側をクリック
    await page.locator('h1').click();
    await expect(dropdown).not.toHaveClass(/is-open/);
  });

  test('メニューアイテムが3つ表示される', async ({ page }) => {
    const toggle = page.locator('[data-wf-dropdown="test-dropdown"]');
    const menuItems = page.locator('.wf-dropdown__item');

    await toggle.click();
    await expect(menuItems).toHaveCount(3);
  });
});
