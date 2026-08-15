import { test, expect } from '@playwright/test';

test('home has hero and catalog', async ({ page }) => {
  await page.goto('/ARENA.AI/');
  await expect(page.locator('h1')).toContainText('Недоступное');
  await expect(page.locator('#catalog')).toBeVisible();
});

test('catalog has 13 products and filters work', async ({ page }) => {
  await page.goto('/ARENA.AI/catalog/');
  const cards = page.locator('[data-brand]');
  await expect(cards).toHaveCount(13);
  // filter by brand
  await page.selectOption('#filter-brand', 'Hourglass');
  await expect(page.locator('[data-brand]:visible')).toHaveCount(4); // Hourglass has 4 products per dataset (check)
});

test('product page has unique CTA token', async ({ page }) => {
  await page.goto('/ARENA.AI/products/ct-luxury-palette-pillow-talk/');
  const cta = page.locator('a.btn--primary').first();
  await expect(cta).toHaveAttribute('href', /t\.me\/BEAUTYSUPPLYMSKBOT\?start=product_/);
});
