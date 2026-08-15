# Beauty Supply — premium editorial commerce catalog

Production URL (fallback): https://beautyvibe1.github.io/ARENA.AI/

Stack: Astro 7 + TypeScript strict + static output + minimal client islands. Требуется Node.js ≥22.12. Static HTML для каталога и 13 товарных страниц, progressive enhancement.

## Быстрый старт

```bash
npm ci
npm run dev      # http://localhost:4321/ARENA.AI/
npm run verify   # типы, контент, unit-тесты, build и внутренние ссылки
npm run build
npm run preview
```

Dev server слушает 0.0.0.0 для preview в Arena.

## Структура

- `src/data/products.ts` — единственный источник 13 товаров (snapshot цен 14.08.2026), lastVerified, officialUrl.
- `src/data/site.ts` — site settings, contacts, trust metrics с датой проверки.
- `src/data/reviews.ts` — только 2 проверенные цитаты из CONTEXT-AVITO (2).MD + Avito metrics.
- `src/data/faq.ts`
- `src/lib/telegram.ts` — token `product_<slug_with_underscores>`, regex `[A-Za-z0-9_-]` ≤64.
- `src/components/`, `src/layouts/BaseLayout.astro`
- `src/pages/` — `/`, `/catalog/`, `/products/[slug]/`, `/about/`, `/delivery/`, `/reviews/`, `/preorder/`, `/contacts/`, `/legal/privacy/`, `/legal/returns/`, `404`.
- `public/images/products/*.webp` — 13 оптимизированных packshots из BEAUTYSUPPLYMSK/new (744 КБ), принадлежит проекту.
- `public/images/og/beauty-supply-og.jpg` — editorial OG 1200×630.

## Контент и достоверность

См. `CONTENT_SOURCES.md` и `CONTENT_VERIFICATION.md`. Никаких выдуманных отзывов, реквизитов, SLA или официального дилерства.

- Цены — snapshot 14.08.2026, финальную подтверждает менеджер.
- Наличие — «уточняется», PreOrder в schema, не InStock.
- Reviews — только 2 реальные цитаты с Avito.
- Telegram handoff — честный, fallback инструкция «Нажмите Start и отправьте ссылку/название товара».

## Accessibility

- skip link, semantic landmarks, один H1, видимый focus, keyboard nav, mobile menu aria-expanded, filters как настоящая форма, modal focus trap (если используется), live region для количества, prefers-reduced-motion, no horizontal overflow 320px, 200% zoom.

## SEO

- `lang="ru"`, уникальные title/description/canonical/OG, static HTML, clean routes `/products/<slug>/`, sitemap.xml (включает 13 товаров), robots.txt с абсолютным sitemap URL, JSON-LD Product только с проверенными полями.
- base `/ARENA.AI/` учитывается в canonical/assets.

## Performance

- Минимальный JS, нет гидратации статических секций, LCP preload только hero, CSS без utility runtime, lazy loading ниже fold, responsive images.
- Цели: Lighthouse mobile ≥90/95/95/95, LCP ≤2.5s, CLS ≤0.1, INP ≤200ms — измерять на реальном build, не выдумывать.

## CI/CD

- `npm run verify` — типы, проверка контента, unit-тесты, production build и проверка внутренних ссылок.
- `npm run deploy:prepare` — полная верификация и обновление статического GitHub Pages artifact в `docs/`.
- GitHub Pages публикует ветку `main`, каталог `/docs`; HTTPS включён.

## Контент-обновление

1. Обновить `src/data/products.ts` (цену, объём, officialUrl) и `lastVerified`.
2. Добавить/заменить WebP в `public/images/products/` с тем же именем, оптимизировать (≤100 КБ на файл).
3. `npm run verify`

## Deployment

1. Выполнить `npm run deploy:prepare`.
2. Закоммитить обновлённый `docs/` и отправить изменения в `main`.
3. GitHub Pages автоматически публикует `/docs` на `https://beautyvibe1.github.io/ARENA.AI/`.

Пока custom domain не подтверждён, не создавать CNAME.

## Оставшиеся внешние blockers

См. `CONTENT_VERIFICATION.md`: юр. реквизиты, email, Instagram, SLA, analytics ID, custom domain.
