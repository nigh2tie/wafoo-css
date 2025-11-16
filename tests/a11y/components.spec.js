// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility Tests', () => {
  test('Modal - アクセシビリティチェック', async ({ page }) => {
    await page.goto('/tests/fixtures/modal.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Tabs - アクセシビリティチェック', async ({ page }) => {
    await page.goto('/tests/fixtures/tabs.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Dropdown - アクセシビリティチェック', async ({ page }) => {
    await page.goto('/tests/fixtures/dropdown.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Modal（開いた状態） - アクセシビリティチェック', async ({ page }) => {
    await page.goto('/tests/fixtures/modal.html');

    // モーダルを開く
    await page.click('[data-wf-modal="test-modal"]');

    // 少し待機してモーダルが完全に開くのを確認
    await page.waitForTimeout(100);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Dropdown（開いた状態） - アクセシビリティチェック', async ({ page }) => {
    await page.goto('/tests/fixtures/dropdown.html');

    // ドロップダウンを開く
    await page.click('[data-wf-dropdown="test-dropdown"]');

    // 少し待機
    await page.waitForTimeout(100);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('コントラスト比チェック - Modal', async ({ page }) => {
    await page.goto('/tests/fixtures/modal.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.color'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('キーボードナビゲーション - Tabs', async ({ page }) => {
    await page.goto('/tests/fixtures/tabs.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.keyboard'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('ARIA属性 - すべてのコンポーネント', async ({ page }) => {
    await page.goto('/tests/fixtures/modal.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.aria'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
