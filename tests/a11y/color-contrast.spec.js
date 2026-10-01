// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * docs/color-check.html の全コンポーネントを、全テーマ × ライト／ダークで描画し、
 * 実際の computed style からコントラスト比を検証する。
 * トークン単体の検証（npm run check:contrast）では拾えない、
 * コンポーネント側のトークンの使い間違いを検出するためのテスト。
 */
test.describe('配色コントラスト（全テーマ × 両モード）', () => {
  test('すべての組み合わせが WCAG 2.1 AA を満たす', async ({ page }) => {
    await page.goto('/docs/color-check.html');
    await page.waitForLoadState('load');

    const result = await page.evaluate(() => {
      // @ts-ignore
      const { total, checked, summary } = window.wafooColorCheck.runAll();
      return {
        total,
        checked,
        failures: summary
          .filter(s => s.failures)
          .map(s => `${s.theme || 'default'}/${s.mode}: ${s.detail.join(' | ')}`)
      };
    });

    expect(result.checked).toBeGreaterThan(1000);
    expect(result.failures).toEqual([]);
  });
});
