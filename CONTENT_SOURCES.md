# CONTENT_SOURCES.md — происхождение контента и активов

Дата проверки: 2026-08-14

## Источники и назначение

### Основные источники проекта
- https://beautysupplymsk.github.io/new/ — приоритетный источник: ассортимент 13 товаров, цены snapshot, funnel, визуальное направление. Assets: 13 WebP packshots.
- https://github.com/BEAUTYSUPPLYMSK/new — исходники /new/: компоненты, CSS, данные, public/images/products/*.webp (переиспользованы, оптимизированы, лицензии принадлежат проекту Beauty Supply).
- https://beautysupplymsk.github.io/s/index.html — предыдущая многостраничная версия: IA, фильтры, страницы delivery/about и идеи галерей.
- https://github.com/BEAUTYSUPPLYMSK/s — исходники /s/: JSON product data, галереи, reference SVG, original-product-images (не переносили raw оригиналы >30 МБ, только оптимизированные WebP из /new/).

### Контекстные файлы в целевом репозитории (сохранены)
- CONTEXT-AVITO (2).MD — бизнес-метрики: рейтинг 5,0, 33 отзыва, с ноября 2011, 120+ отзывов на площадках, две реальные цитаты (Юля 2 мая, Анастасия 22 апреля) без года.
- CONTEXT_BeautySupplyMSK.md.pdf — предыдущий аналитический отчёт, использован как вторичный источник.

### Официальные страницы exact SKU — источник названий, объёмов, назначения, способа применения, cautions
- https://imageskincare.com/products/vol-u-lift-body — VOL.U.LIFT BODY GLP-1/GIP Sculpt + Firm Treatment Complex
- https://imageskincare.com/products/vol-u-lift-glp-1-4d-skin-rebound-complex — GLP-1 4D Skin Rebound Complex
- https://imageskincare.com/products/hydrating-repair-cr-me — VITAL C Hydrating Repair Crème 57 г
- https://imageskincare.com/products/ageless-retinol-repair-cream — AGELESS+ Retinol Repair Crème 0.3%
- https://imageskincare.com/products/pure-mineral-hydrating-moisturizer-spf-30 — Pure Mineral Hydrating SPF 30 (уточнён URL варианта 73 г)
- https://imageskincare.com/products/daily-prevention-advanced-smartblend-mineral-moisturizer-spf-75 — Advanced Smartblend Mineral SPF 75 48 г
- https://imageskincare.com/products/image-md-restoring-youth-serum — IMAGE MD Restoring Youth Serum 30 мл
- https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk — Luxury Palette Pillow Talk 5.2 г (exact palette, не bundle Pillow Talk In Bloom Kit)
- https://www.hourglasscosmetics.com/products/curator-eyeshadow-refill — Curator Eyeshadow Refill — Minimalist 1 г (refill, 40 оттенков, кастомная система)
- https://www.hourglasscosmetics.com/products/ambient-lighting-palette — Ambient Lighting Palette 3×3 г
- https://www.hourglasscosmetics.com/products/ambient-lighting-blush — Ambient Lighting Blush 4.2 г
- https://www.charlottetilbury.com/us/product/hollywood-contour-wand — Hollywood Contour Wand 12 мл
- https://imageskincare.com/products/image-md-biotech-longevity-creme — IMAGE MD Biotech Longevity Crème 50 г (новинка 2026, URL может меняться, отмечено в продуктах)

### Assets provenance
- public/images/products/*.webp — из BEAUTYSUPPLYMSK/new public/images/products, принадлежит проекту Beauty Supply, оптимизированы (744 КБ суммарно). Не является AI-generated fake packaging. Проверено соответствие exact SKU.
- public/images/og/beauty-supply-og.jpg — AI-generated editorial visual, сгенерировано для OG 1200×630, не является фото конкретного экземпляра, используется только как social preview.
- public/favicon.svg — собственный SVG, deep espresso background, буква B.
- public/apple-touch-icon.png — AI-generated minimal icon, luxury brand mark.

### Что не переносили
- raw originals /product-card-assets 15 МБ PNG, 30 МБ original-product-images, zip-архивы, .git, node_modules, dist.

## Иерархия истины
- Ассортимент/цены: /new/ snapshot 14.08.2026
- Свойства/объёмы/usage: официальная страница exact SKU
- Бизнес-метрики и цитаты: CONTEXT-AVITO (2).MD + проверяемый Avito-профиль
- /s/ — для IA/фильтров, не для claims
- Не выдумываем юр. реквизиты, отзывы, сертификаты, SLA, официальный дилерский статус

## Licensed fonts
- Inter + Playfair Display via Google Fonts with display=swap, subset cyrillic. Если потребуется self-host, проверить лицензию.
