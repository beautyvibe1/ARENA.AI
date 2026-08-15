export const TELEGRAM_BOT_BASE = "https://t.me/BEAUTYSUPPLYMSKBOT";

export function slugToTelegramToken(slug: string): string {
  const underscored = slug.replace(/-/g, "_");
  const token = `product_${underscored}`;
  // validate
  if (!/^[A-Za-z0-9_-]+$/.test(token)) {
    // fallback to sanitized
    return token.replace(/[^A-Za-z0-9_-]/g, "_");
  }
  if (token.length > 64) return token.slice(0, 64);
  return token;
}

export function buildTelegramLink(token: string): string {
  return `${TELEGRAM_BOT_BASE}?start=${encodeURIComponent(token)}`;
}

export function buildProductLink(slug: string): string {
  return buildTelegramLink(slugToTelegramToken(slug));
}

export function buildQuizToken(concern: string, budget: string, productSlug?: string): string {
  // non-PII compact token: q_<concern>_<budget>[_<product>]
  // concern: e.g. lifting, glow, spf etc, budget: low/mid/high
  let base = `quiz_${concern}_${budget}`;
  if (productSlug) {
    const short = productSlug.replace(/-/g, "_").slice(0, 20);
    base += `_${short}`;
  }
  base = base.replace(/[^A-Za-z0-9_-]/g, "_");
  if (base.length > 64) return base.slice(0, 64);
  return base;
}

export const fallbackInstruction =
  "Нажмите Start в боте и отправьте ссылку или название товара — менеджер подтвердит наличие и цену.";
