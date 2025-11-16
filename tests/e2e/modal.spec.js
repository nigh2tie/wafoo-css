// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/modal.html');
  });

  test('モーダルが最初は非表示である', async ({ page }) => {
    const modal = page.locator('#test-modal');
    await expect(modal).not.toHaveClass(/is-open/);
  });

  test('ボタンクリックでモーダルが開く', async ({ page }) => {
    const openButton = page.locator('[data-wf-modal="test-modal"]');
    const modal = page.locator('#test-modal');

    await openButton.click();
    await expect(modal).toHaveClass(/is-open/);
  });

  test('閉じるボタンでモーダルが閉じる', async ({ page }) => {
    const openButton = page.locator('[data-wf-modal="test-modal"]');
    const modal = page.locator('#test-modal');
    const closeButton = modal.locator('.wf-modal__close');

    // モーダルを開く
    await openButton.click();
    await expect(modal).toHaveClass(/is-open/);

    // 閉じるボタンをクリック
    await closeButton.click();
    await expect(modal).not.toHaveClass(/is-open/);
  });

  test('Escキーでモーダルが閉じる', async ({ page }) => {
    const openButton = page.locator('[data-wf-modal="test-modal"]');
    const modal = page.locator('#test-modal');

    // モーダルを開く
    await openButton.click();
    await expect(modal).toHaveClass(/is-open/);

    // Escキーを押す
    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/is-open/);
  });

  test('オーバーレイクリックでモーダルが閉じる', async ({ page }) => {
    const openButton = page.locator('[data-wf-modal="test-modal"]');
    const modal = page.locator('#test-modal');

    // モーダルを開く
    await openButton.click();
    await expect(modal).toHaveClass(/is-open/);

    // オーバーレイ（モーダル外）をクリック
    await modal.click({ position: { x: 5, y: 5 } });
    await expect(modal).not.toHaveClass(/is-open/);
  });

  test('モーダル内部クリックでは閉じない', async ({ page }) => {
    const openButton = page.locator('[data-wf-modal="test-modal"]');
    const modal = page.locator('#test-modal');
    const modalDialog = modal.locator('.wf-modal');

    // モーダルを開く
    await openButton.click();
    await expect(modal).toHaveClass(/is-open/);

    // モーダル内部をクリック
    await modalDialog.click();
    await expect(modal).toHaveClass(/is-open/); // まだ開いている
  });
});
