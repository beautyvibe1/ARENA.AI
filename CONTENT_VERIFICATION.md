# CONTENT_VERIFICATION.md — проверка достоверности и blockers

Дата: 2026-08-14

## Evidence matrix

| Claim | Источник | Confidence | Решение |
|-------|----------|------------|---------|
| 13 товаров, цены snapshot 14.08.2026 | https://beautysupplymsk.github.io/new/ + CONTEXT-AVITO (2).MD | high | централизовано в src/data/products.ts, lastVerified 2026-08-14 |
| Рейтинг 5,0 Avito, 33 отзыва, с ноября 2011, 120+ отзывов | CONTEXT-AVITO (2).MD + Avito профиль https://www.avito.ru/user/7d5cc17e554a6f4d901ec51bdd907f7b/profile | high | выведено в site.ts + reviews.ts с датой проверки |
| Две реальные цитаты Юля 2 мая и Анастасия 22 апреля | CONTEXT-AVITO (2).MD | high | опубликованы дословно без года, с указанием source Avito |
| Три цитаты Юля/Анастасия/Елена из /new/ и /s/ | /new/, /s/ — неподтверждённые | low | исключены как verified, помечены как не прошедшие сверку |
| Официальный дилер/поставщик, авторизованные дистрибьюторы, температурная упаковка, тысячи клиентов, ответ за 1/10 минут | /new/ /s/ legacy copy | unverified | исключены |
| Charlotte Tilbury — американский бренд | legacy copy | false | исправлено: «товары привезены из США», Charlotte Tilbury — британский бренд, но поставка из США |
| BODY Sculpt official URL | imageskincare.com — старый URL 404 | medium | используем актуальный https://imageskincare.com/products/vol-u-lift-body с пометкой |
| Pillow Talk exact palette URL | ранее указывался bundle Kit | medium | исправлено на https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk |
| Curator Eyeshadow Refill 1 г Minimalist | /new/ указал refill, /s/ путал с palette 3,5 г | high | уточнено как refill 1 г, ссылка на https://www.hourglasscosmetics.com/products/curator-eyeshadow-refill |
| Telegram bot https://t.me/BEAUTYSUPPLYMSKBOT | источники | high | используется, токены product_<slug> формат [A-Za-z0-9_-] ≤64 |
| Telegram channel https://t.me/beautysupplymsk | источники | high | используется |
| Avito profile https://www.avito.ru/user/7d5cc17e554a6f4d901ec51bdd907f7b/profile | проверено | high | используется |
| Instagram https://instagram.com/beautysupplymsk | упоминание, но не проверялось | low | не рекламируем как основной, помечено как требующее проверки |
| support@beauty-supply.shop | старые версии сайта | unverified | не публикуем, blocker |
| Юридические реквизиты ИП/ООО для оферты | не предоставлены | missing | не публикуем пустую оферту, page /legal/returns объясняет подход, blocker зафиксирован |

## Release blockers (требуют внешнего подтверждения владельца, не выдумываем)

- [ ] Юридические реквизиты ИП/ООО, ИНН, ОГРН, адрес для публичной оферты (если нужна). Сейчас оферта не публикуется как действующий документ.
- [ ] Подтверждение рабочей почты support@beauty-supply.shop — проверить MX/доступ, иначе не публиковать.
- [ ] Подтверждение принадлежности и работоспособности Instagram https://instagram.com/beautysupplymsk — проверить, что принадлежит проекту, иначе не делать основным каналом.
- [ ] Подтверждение SLA: «ответ до 10 минут», «передача в доставку до 1 рабочего дня», «предзаказ 14–21 день» — владелец должен подтвердить как SLA или смягчить до ориентиров. Сейчас использовано смягчённое «обычно» / «ориентировочно».
- [ ] Подтверждение analytics counter ID (Yandex Metrica / GA) и privacy decision — пока adapter без отправки данных.
- [ ] Подтверждение custom domain beauty-supply.shop — пока production URL https://beautyvibe1.github.io/ARENA.AI/, CNAME не создаём.

## Что исключено/исправлено

- Fake scarcity, countdown, зачёркнутые цены — не используются.
- Текст 6–10 px — устранён, минимум body 16 px, secondary 13–14 px, fine print ≥12 px, contrast WCAG AA.
- PII в localStorage — устранено, храним только slug избранного.
- Квиз с именем/телефоном — заменён на non-PII quiz (concern + budget + optional product) → safe token.
- Product schema с InStock/AggregateRating без подтверждения — используем PreOrder + priceValidUntil, без fake rating.
- Runtime hotlink brand CDN — нет, все критические товарные изображения локальны.
- Query-only product pages — заменены на static /products/<slug>/.

## Проверки перед релизом (выполняются CI)

- install, typecheck, validate-content, build, check-links
- sitemap содержит 13 product pages
- canonical/robots используют production URL с base /ARENA.AI/
- telegram tokens валидны, CTA работают без JS как ссылки
- no console errors, no broken internal assets
