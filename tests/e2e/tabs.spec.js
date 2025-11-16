// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/tabs.html');
  });

  test('最初のタブがデフォルトで選択されている', async ({ page }) => {
    const firstTab = page.locator('#tab-1');
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('タブクリックで切り替わる', async ({ page }) => {
    const tab1 = page.locator('#tab-1');
    const tab2 = page.locator('#tab-2');
    const panel1 = page.locator('#panel-1');
    const panel2 = page.locator('#panel-2');

    // 最初の状態確認
    await expect(tab1).toHaveAttribute('aria-selected', 'true');
    await expect(panel1).toBeVisible();
    await expect(panel2).toBeHidden();

    // タブ2をクリック
    await tab2.click();

    // 状態が切り替わる
    await expect(tab1).toHaveAttribute('aria-selected', 'false');
    await expect(tab2).toHaveAttribute('aria-selected', 'true');
    await expect(panel1).toBeHidden();
    await expect(panel2).toBeVisible();
  });

  test('キーボード（矢印キー）でタブ移動', async ({ page }) => {
    const tab1 = page.locator('#tab-1');
    const tab2 = page.locator('#tab-2');
    const tab3 = page.locator('#tab-3');

    // tab1にフォーカス
    await tab1.focus();
    await expect(tab1).toBeFocused();

    // 右矢印キーでtab2へ
    await page.keyboard.press('ArrowRight');
    await expect(tab2).toBeFocused();

    // 右矢印キーでtab3へ
    await page.keyboard.press('ArrowRight');
    await expect(tab3).toBeFocused();

    // 左矢印キーでtab2へ戻る
    await page.keyboard.press('ArrowLeft');
    await expect(tab2).toBeFocused();
  });

  test('Homeキーで最初のタブへ、Endキーで最後のタブへ', async ({ page }) => {
    const tab1 = page.locator('#tab-1');
    const tab2 = page.locator('#tab-2');
    const tab3 = page.locator('#tab-3');

    // tab2にフォーカス
    await tab2.focus();

    // Endキーで最後のタブへ
    await page.keyboard.press('End');
    await expect(tab3).toBeFocused();

    // Homeキーで最初のタブへ
    await page.keyboard.press('Home');
    await expect(tab1).toBeFocused();
  });
});
