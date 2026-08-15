import { describe, it, expect } from 'vitest';
import { products } from '../../src/data/products';
import { slugToTelegramToken } from '../../src/lib/telegram';

describe('products dataset', () => {
  it('has 13 products', () => {
    expect(products.length).toBe(13);
  });
  it('all prices are positive and snapshot date present', () => {
    for (const p of products) {
      expect(p.price).toBeGreaterThan(0);
      expect(p.lastVerified).toBe('2026-08-14');
      expect(p.volume).toBeTruthy();
      expect(p.officialUrl.startsWith('http')).toBe(true);
    }
  });
  it('telegram tokens are valid and <=64 chars', () => {
    for (const p of products) {
      const token = slugToTelegramToken(p.slug);
      expect(token.length).toBeLessThanOrEqual(64);
      expect(/^[A-Za-z0-9_-]+$/.test(token)).toBe(true);
      expect(token.startsWith('product_')).toBe(true);
    }
  });
  it('slugs are unique and kebab-case', () => {
    const slugs = products.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(/^[a-z0-9-]+$/.test(s)).toBe(true);
  });
});
