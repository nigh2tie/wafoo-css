const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    const fileUrl = `file://${path.resolve(__dirname, '../docs/reference.html')}`;
    await page.goto(fileUrl);
  });

  test('Modal should open and close', async ({ page }) => {
    // Open modal
    await page.click('button[data-wf-modal="demo-modal"]');
    const modal = page.locator('#demo-modal');
    await expect(modal).toBeVisible();

    // Close modal via button
    await page.click('#demo-modal .wf-modal__close');
    await expect(modal).toBeHidden();
  });

  test('Tabs should switch content', async ({ page }) => {
    const tab1 = page.getByRole('tab', { name: 'タブ1' });
    const tab2 = page.getByRole('tab', { name: 'タブ2' });
    const panel1 = page.locator('#demo-panel-1');
    const panel2 = page.locator('#demo-panel-2');

    // Initial state
    await expect(tab1).toHaveAttribute('aria-selected', 'true');
    await expect(panel1).toBeVisible();
    await expect(panel2).toBeHidden();

    // Switch to Tab 2
    await tab2.click();
    await expect(tab2).toHaveAttribute('aria-selected', 'true');
    await expect(tab1).toHaveAttribute('aria-selected', 'false');
    await expect(panel2).toBeVisible();
    await expect(panel1).toBeHidden();
  });
});
