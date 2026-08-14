# Beauty Supply — глубокий аудит, выводы и итоговый промпт для Arena.ai Agent Mode

**Срез исследования:** 14 августа 2026 года  
**Целевой репозиторий:** <https://github.com/beautyvibe1/ARENA.AI>  
**Приоритетный источник актуального состояния:** <https://beautysupplymsk.github.io/new/>

---

## 1. Резюме исследования

Beauty Supply — не классический интернет-магазин с корзиной и собственным эквайрингом, а **премиальная каталог-витрина и trust/conversion layer** для продажи оригинальной косметики, привозимой из США. Основной целевой сценарий: посетитель понимает ценность и надёжность продавца, выбирает товар или подбор и переходит в официальный Telegram-бот, где менеджер подтверждает наличие, итоговую цену, оплату и доставку.

У проекта уже есть две полезные, но неполные версии:

1. **`/new/` — лучшая и самая свежая версия по арт-дирекшену, позиционированию, продуктовой матрице и конверсионному сценарию.** Это сильный премиальный editorial-лендинг на React/Vite с 13 товарами, быстрым просмотром, избранным, мини-квизом и SKU-specific переходами в Telegram.
2. **`/s/` — лучшая версия по информационной архитектуре.** В ней есть отдельные страницы каталога, товара, бренда, доставки, отзывов, контактов, предзаказа, privacy/offer, фильтры, галереи, sitemap и GitHub Actions.
3. **Целевой `beautyvibe1/ARENA.AI` практически пуст:** только README и два контекстных документа. Это правильная ситуация для новой реализации с нуля без наследования технического долга.

**Оптимальный финальный продукт:** новый статически генерируемый многостраничный сайт, который визуально и конверсионно продолжает `/new/`, но получает полноценную SEO-архитектуру, товарные URL, фильтрацию, галереи, служебные страницы и deploy pipeline из `/s/`. Нельзя просто скопировать одну из версий: необходимо объединить их сильные стороны и устранить ошибки обеих.

Главный риск проекта сейчас не дизайн, а **достоверность контента и юридическая/репутационная аккуратность**. В версиях есть неподтверждённые цитаты отзывов, слишком сильные формулировки («официальный поставщик», «авторизованные дистрибьюторы»), незаполненная публичная оферта, противоречивая privacy policy, хранение контактных данных в `localStorage`, устаревшие или неверные official source URL и расхождения в SKU/объёмах. Финальный сайт обязан быть красивым, но не ценой вымышленных доказательств доверия.

---

## 2. Что было исследовано

### Основные источники

| Приоритет | Источник | Что проверено |
|---:|---|---|
| 1 | [Живой сайт `/new/`](https://beautysupplymsk.github.io/new/) | Позиционирование, структура лендинга, 13 товаров, цены, CTA, квиз, доверие, доставка, FAQ, SEO-файлы |
| 1 | [Исходники `/new/`](https://github.com/BEAUTYSUPPLYMSK/new) | React/TypeScript/Vite, компоненты, CSS, данные, изображения, production build, Pages-конфигурация |
| 2 | [Живой сайт `/s/`](https://beautysupplymsk.github.io/s/index.html) | Многостраничная архитектура, каталог, карточки товара, фильтры, доставка, предзаказ, отзывы, legal |
| 2 | [Исходники `/s/`](https://github.com/BEAUTYSUPPLYMSK/s) | HTML/CSS/JS, JSON-данные, галереи, исходные фото, workflow, отчёты прошлых аудитов |
| 3 | [Целевой репозиторий](https://github.com/beautyvibe1/ARENA.AI) | Текущее дерево, GitHub Pages, workflows, контекстные документы |
| 3 | `CONTEXT-AVITO (2).MD` | Бизнес-контекст, ассортимент Avito, метрики, две явно предоставленные реальные цитаты |
| 4 | `CONTEXT_BeautySupplyMSK.md.pdf` | Предыдущий аналитический отчёт; использован только как вторичный источник |
| 5 | Официальные страницы брендов | Проверка названий, назначения и ссылок на конкретные SKU |

### Проверенные технические срезы

- `/new/`: 53 отслеживаемых файла, около 2,42 МБ без истории Git; есть дублирование `public/` → `docs/` и архив около 511 КБ.
- Production build `/new/` проходит. Выход: JS около **242 КБ raw / 74 КБ gzip**, CSS около **37,5 КБ raw / 8,35 КБ gzip**, 13 WebP-изображений суммарно около **744 КБ**.
- `/new/` обслуживается GitHub Pages в legacy-режиме из `main:/docs`; заявленного в README автоматического workflow в репозитории нет.
- `/s/`: 273 файла, около 51,35 МБ содержимого. После workflow-исключений в deploy всё равно уходит около **18 МБ**, включая примерно **15 МБ неиспользуемых PNG** из `public/products/`.
- `/s/` содержит около **30 МБ исходных фото**, около **2,4 МБ product-card assets** и около **2,2 МБ оптимизированных публичных галерей**.
- JavaScript `/s/` синтаксически валиден после последнего исправления.
- Целевой `ARENA.AI`: только 3 файла, нет приложения, package manifest, tests, workflow и активного GitHub Pages.
- Реальных Lighthouse-отчётов в источниках нет. Числа 95+/98+ в прежнем аудите — цели/оценки, а не подтверждённые замеры.

---

## 3. Контекст и суть проекта

### Бизнес-модель

- Продавец/магазин: **Beauty Supply**, Москва.
- Позиционирование: кураторский premium beauty-магазин с товарами, закупаемыми/привозимыми из США и доставляемыми по России.
- Основные бренды текущей витрины: **IMAGE Skincare / IMAGE MD, Charlotte Tilbury, Hourglass**.
- Основной checkout/handoff: официальный Telegram-бот `@BEAUTYSUPPLYMSKBOT`.
- Дополнительные trust/contact channels: Telegram-канал `@beautysupplymsk`, профиль Avito, заявленная Instagram-страница.
- Доставка: Москва, СДЭК, Avito Доставка; точные сроки и условия подтверждает менеджер.
- Репутационный тезис источников: рейтинг **5,0 на Avito по 33 отзывам**, на рынке **с ноября 2011 года**, **120+ отзывов на площадках**. Эти значения нужно сопровождать понятным источником/датой проверки и не превращать в неподтверждённый schema `AggregateRating`.
- Сайт не должен изображать полноценный ecommerce checkout, если фактической корзины, оплаты, остатков и backend нет.

### Целевая аудитория

1. Покупатели 18–50 лет, которым нужны оригинальные premium beauty-средства, сложные для покупки в обычной российской рознице.
2. Клиенты профессионального ухода: anti-age, плотность, витамин C, ретинол, SPF.
3. Любители premium makeup: Pillow Talk, Hourglass Ambient, contouring.
4. Покупатели, которым важнее доверие, подтверждение подлинности, конкретное фото и консультация, чем огромный ассортимент.
5. Визажисты и beauty-энтузиасты, готовые сделать предзаказ редкой позиции из США.

### Правильный продуктовый тезис

**Не маркетплейс и не бесконечная витрина, а curated beauty edit + персональный консьерж + проверка конкретного товара + безопасный handoff в Telegram/Avito.**

Это сильнее и достовернее, чем абстрактные обещания «официального поставщика» или попытка имитировать крупный интернет-магазин.

---

## 4. Глубокий аудит `/new/` — приоритетного источника

### Что обязательно сохранить

1. **Сильное premium-позиционирование:** «Недоступное — теперь ваше», curated edit, beauty-консьерж вместо маркетплейса.
2. **Арт-дирекшен:** тёмный espresso/wine hero, pearl/cream поверхности, blush/rose акценты, editorial serif + аккуратный sans-serif, асимметричные product compositions.
3. **Конверсионная последовательность:** value proposition → trust → бренды → каталог → консультация → Avito proof → отзывы → доставка → FAQ → финальный CTA.
4. **13 актуальных позиций**, включая IMAGE MD Biotech Longevity Crème.
5. **SKU-specific Telegram deep links**, быстрый просмотр, явный disclaimer об уточнении цены и наличия.
6. **Избранное**, фильтр по основным категориям, mobile CTA, mini-diagnostic/beauty quiz как способ снизить тревогу выбора.
7. **Оптимизированные локальные WebP**, отсутствие runtime hotlinking товарных изображений.
8. Спокойный, экспертный, дружелюбный тон без агрессивной распродажной механики.

### Критические недостатки

#### SEO и архитектура

- Это SPA/одностраничный лендинг. Исходный HTML содержит только `#root`; основной контент зависит от JavaScript.
- Товары доступны только через modal quick view, без индексируемых отдельных URL.
- Sitemap содержит только главную страницу.
- Нет статических страниц «О нас», «Доставка и оплата», «Контакты», «Отзывы», полноценной privacy/returns.
- Один квадратный product image используется как OG image; нет специально подготовленного social preview 1200×630.
- Product schema и статические product metadata отсутствуют.

#### Доступность и читаемость

- На мобильном множество текстов имеют размер **6–10 px**, включая подписи, trust copy, карточки, consent, footer и fine print. Это визуально эффектно на макете, но неприемлемо для реального чтения и WCAG.
- Часто используется полупрозрачный текст с низким контрастом (`rgba(..., .32–.55)`).
- Modal/quiz закрываются по Escape, но нет полноценного focus trap и гарантированного возврата фокуса к триггеру.
- Mobile menu не меняет доступное имя с «Открыть» на «Закрыть».
- Фильтр размечен как `tablist`, но не реализует ожидаемое keyboard tabs behavior и связанный `tabpanel`.

#### Конверсия и данные

- Квиз просит имя и телефон/@username, копирует заявку в clipboard, кладёт PII в `localStorage`, а затем открывает Telegram. Сам `start` payload не передаёт заполненную заявку; пользователь должен вручную нажать Start и вставить текст.
- При blocked popup/clipboard flow всё равно может выглядеть завершённым.
- Контактные поля не очищаются при повторном открытии квиза.
- Есть противоречие: витрина говорит «в наличии», modal — «уточнить наличие», FAQ — «остатки меняются».
- Нет аналитики конверсии, хотя funnel — центральная часть сайта.

#### Достоверность и legal

- «Политика конфиденциальности» в footer ведёт на `mailto:`, а не на документ.
- Email `support@beauty-supply.shop` и Instagram нужно подтвердить до публикации как рабочие.
- Три развёрнутые цитаты «Юля / Анастасия / Елена» не подтверждаются предоставленным первичным Avito-контекстом и расходятся с двумя цитатами, явно отмеченными там как реальные. Их нельзя публиковать как verified без сверки с профилем.
- Формулировки «ответ до 10 минут», «до 1 рабочего дня», «14–21 день» должны быть подтверждены владельцем как SLA, иначе их нужно смягчить.
- Нельзя называть все бренды «американскими»: Charlotte Tilbury — не американский бренд; корректный тезис — товары закупаются/привозятся **из США**.

#### Источники товара

- Ссылка на BODY Sculpt + Firm Treatment из product data ведёт на 404 на официальном сайте IMAGE Skincare по состоянию на аудит.
- Для Pillow Talk указан URL набора `Pillow Talk In Bloom Kit`, а не точная страница палетки. Корректная текущая страница: <https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk>.
- Поэтому `IMAGE_SOURCES.md` полезен как начало provenance log, но не является безошибочным.

#### Репозиторий и deploy

- В Git хранятся исходные и собранные копии одних и тех же изображений, а также zip-архив.
- `docs/` коммитится вручную; CI/CD отсутствует, хотя README обещает автоматический deploy.
- Это создаёт риск рассинхронизации source/build и лишний шум в diff.

---

## 5. Глубокий аудит `/s/`

### Что стоит перенести в финальную версию

1. **Многостраничную IA:** home, catalog, product, about, delivery, reviews, contacts, preorder, legal, 404.
2. **Расширенные фильтры:** бренд, категория, назначение, поиск; синхронизация с query parameters.
3. **Централизованные данные товаров и отзывов**, а не копии по нескольким страницам.
4. **Галереи товаров** с hero/detail/lifestyle/trust assets.
5. **Отдельные SEO title/description/canonical/OG**, sitemap и robots.
6. **Accessibility patterns:** skip link, focus-visible, reduced motion, live regions, keyboard mobile nav.
7. **GitHub Actions Pages workflow** как направление, но не его текущую реализацию целиком.
8. About/delivery/preorder/contacts как содержание и набор пользовательских вопросов.

### Что нельзя переносить без исправления

- Дизайн более шаблонный и менее премиальный, чем `/new/`: emoji, generic cards, много одинаковых pastel surfaces.
- Product page — один JS-shell `product.html?slug=...`; title/meta/schema меняются на клиенте. Нужны реальные статические пути `/products/<slug>/`.
- При отключённом JavaScript каталога и содержательной карточки товара нет.
- Sitemap включает query-string product URLs вместо clean URLs.
- Workflow загружает почти весь репозиторий как Pages artifact и после исключений всё равно деплоит около **18 МБ**, включая примерно **15 МБ лишних PNG**.
- Существует много дубликатов: originals, product-card-assets, public/product-cards, public/products, SVG placeholders.
- Форма предзаказа добавляет к bot URL параметр `&text=...`, который не является надёжным способом заполнить сообщение Telegram-боту. Clipboard workaround остаётся лишним шагом.
- Cookie banner повторён inline почти на каждой странице, предлагает только «Принять» и показывается даже без реальной аналитики. Использование `localStorage` ошибочно описывается как cookies.
- Privacy policy не идентифицирует оператора и утверждает, что данные не передаются третьим лицам, хотя flow использует Telegram и службы доставки.
- «Публичная оферта» содержит пустое `ИП` и отсутствующие реквизиты. Такой документ нельзя выдавать за готовую официальную оферту.
- Claims «официальный поставщик», «официальные бутики», «авторизованные дистрибьюторы», «температурная упаковка», «тысячи клиентов», «подтвердит за 1 минуту» не подтверждены приложенными источниками.
- Тексты трёх отзывов совпадают с `/new/`, но не с двумя отзывами, прямо указанными как реальные в `CONTEXT-AVITO (2).MD`.
- В старой модели товаров есть расхождения с `/new/`: VOL.U.LIFT face описан слишком общо; Vital C назван ночным кремом; Hourglass Curator указан как палетка 3,5 г, тогда как свежая версия идентифицирует конкретный refill 1 г.

---

## 6. Аудит целевого репозитория `beautyvibe1/ARENA.AI`

На момент исследования в репозитории находятся:

```text
ARENA.AI/
├── README.md
├── CONTEXT-AVITO (2).MD
└── CONTEXT_BeautySupplyMSK.md.pdf
```

### Вывод

- Кодовой базы нет: финальный сайт действительно можно и нужно создать с нуля.
- GitHub Pages не активирован, workflows отсутствуют.
- Контекстные документы нужно сохранить: это evidence/source material, а не мусор.
- В новый репозиторий нельзя переносить `.git` других проектов, zip-архивы, `node_modules`, старые `docs/`, 30 МБ originals и 15 МБ неиспользуемых PNG.
- Оптимальная схема — source-driven static site + автоматическая сборка `dist/` в GitHub Actions. `dist/` и `node_modules/` не коммитить.
- Пока нет подтверждённого custom domain, production base должен корректно работать на project Pages URL: `https://beautyvibe1.github.io/ARENA.AI/`.

---

## 7. Матрица достоверности и конфликтов

### Иерархия истины для финальной реализации

1. **Текущая инструкция владельца + `/new/`** — ассортимент, store prices, tone of voice, визуальное направление, funnel.
2. **`CONTEXT-AVITO (2).MD`** — предоставленные владельцем business facts и точные цитаты, явно названные реальными.
3. **`/s/`** — структура страниц, фильтры и дополнительные assets, но не автоматический источник фактов.
4. **Официальные страницы конкретных брендов/SKU** — название, объём, назначение, usage/cautions.
5. **Никаких догадок.** Если утверждение нельзя подтвердить, его не публиковать как факт.

### Правила разрешения конфликтов

- **Цена продавца:** `/new/`, но UI сообщает, что финальную цену подтверждает менеджер.
- **Наличие:** не обещать `InStock`, если нет реального inventory source. Использовать «уточнить наличие» или поле статуса с датой последней проверки.
- **Название/объём/способ применения:** official exact SKU; если точный оттенок/SKU не установлен — зафиксировать как требующий подтверждения.
- **История:** безопасная формулировка «по данным Beauty Supply, на рынке с ноября 2011 года» либо просто «с ноября 2011 года» после подтверждения владельцем. Не выдумывать непрерывную историю конкретного ИП/ООО.
- **Отзывы:** не использовать три длинные цитаты из сайтов как verified до сверки. Две цитаты, явно предоставленные как реальные:
  - Юля, 2 мая, Gisou маска для волос 230: «Спасибо!⚘️⚘️⚘️ Штрих-код пробивается, оригинальное средство!»
  - Анастасия, 22 апреля, Gisou масло для губ: «Все отлично) Спасибо большое ☺️»
  Не добавлять год, если он не дан.
- **Статусы брендов:** не писать «официальный дилер/представитель/поставщик» без документов. Не называть Charlotte Tilbury американским брендом; писать «товары из США».
- **Legal:** не публиковать пустые реквизиты и не маскировать draft под действующую оферту.

---

## 8. Актуальная товарная матрица из `/new/`

| # | Бренд | Товар | Категория | Объём | Цена |
|---:|---|---|---|---:|---:|
| 1 | IMAGE Skincare | BODY Sculpt + Firm Treatment | Уход за телом | 170 г | 7 799 ₽ |
| 2 | IMAGE Skincare | GLP-1 4D Skin Rebound Complex | Уход за лицом | 57 г | 11 599 ₽ |
| 3 | IMAGE Skincare | VITAL C Hydrating Repair Crème | Уход за лицом | 57 г | 7 799 ₽ |
| 4 | IMAGE Skincare | AGELESS+ Retinol Repair Crème 0.3% | Уход за лицом | 50 г | 8 000 ₽ |
| 5 | IMAGE Skincare | Pure Mineral Hydrating SPF 30 | SPF | 73 г | 5 200 ₽ |
| 6 | IMAGE Skincare | Advanced Smartblend Mineral SPF 75 | SPF | 48 г | 6 000 ₽ |
| 7 | IMAGE MD | Restoring Youth Serum | Уход за лицом | 30 мл | 10 800 ₽ |
| 8 | Charlotte Tilbury | Luxury Palette — Pillow Talk | Макияж | 5,2 г | 7 500 ₽ |
| 9 | Hourglass | Curator Eyeshadow Refill — Minimalist | Макияж | 1 г | 6 500 ₽ |
| 10 | Hourglass | Ambient Lighting Palette | Макияж | 3 × 3 г | 7 500 ₽ |
| 11 | Hourglass | Ambient Lighting Blush | Макияж | 4,2 г | 3 700 ₽ |
| 12 | Charlotte Tilbury | Hollywood Contour Wand | Макияж | 12 мл | 3 500 ₽ |
| 13 | IMAGE MD | Biotech Longevity Crème | Уход за лицом | 50 г | 11 800 ₽ |

Цены являются snapshot сайта на 14.08.2026 и должны быть централизованы в данных, а не размножены в компонентах.

---

## 9. Итоговый вывод и рекомендации

### Рекомендуемая концепция

Создать **editorial commerce catalog**: визуально — premium beauty magazine, функционально — быстрый каталог с индексируемыми карточками, а коммерчески — понятный переход к персональному менеджеру в Telegram.

### Лучшее сочетание двух версий

- От `/new/`: бренд, hero, цвет/типографика, storytelling, curated catalog, concierge quiz, быстрый просмотр, Telegram funnel, FAQ и доверие.
- От `/s/`: отдельные страницы, расширенные фильтры, clean data layer, галереи, about/delivery/contacts/preorder, sitemap/robots/404, CI/CD и accessibility groundwork.
- Новое: static generation, clean product URLs, контент provenance, реальные legal/privacy решения, analytics-ready event layer, automated tests, правильный GitHub Pages base path.

### Рекомендуемый стек

**Astro + TypeScript strict + статический output + минимальные client islands** — наиболее подходящий вариант:

- HTML товаров и контента существует без JavaScript;
- clean routes и SEO получаются из коробки;
- фильтры, избранное, modal и quiz можно гидратировать точечно;
- меньше JS и выше устойчивость, чем у SPA.

Допустим Vite/React только при обязательном prerender/SSG всех контентных и товарных страниц. Чистый client-only SPA повторит главный недостаток `/new/` и не является приемлемым финалом.

### P0 — обязательно до релиза

1. Единый проверенный product dataset и 13 clean product pages.
2. Устранить неподтверждённые отзывы/claims и неверные official links.
3. Удалить PII из `localStorage`; не собирать контакт на статическом сайте без необходимости.
4. Реальная privacy page; никакой пустой оферты.
5. Читаемая типографика и WCAG AA.
6. Telegram deep links, fallback и все внешние ссылки протестированы.
7. CI build/typecheck/test/link check и Pages workflow.
8. Production base `/ARENA.AI/`, sitemap/canonical для реального URL.
9. Оптимизированные и недублированные изображения.

### P1 — сильно желательно

- Фильтры по бренду/категории/задаче + поиск + URL state.
- Избранное только для slug, без персональных данных.
- Product quick view как дополнение, а не замена product page.
- Non-PII beauty quiz, который кодирует только безопасный `start` token и объясняет следующий шаг.
- Event taxonomy для будущей Яндекс.Метрики без фиктивного counter ID.
- Контентные документы `CONTENT_SOURCES.md` и `CONTENT_VERIFICATION.md`.

### P2 — после запуска

- Реальный inventory/update process.
- Подключение подтверждённого custom domain.
- Yandex Metrica после получения ID и privacy decision.
- Beauty guide/blog только при наличии качественного редакционного процесса.
- Checkout/backend — только когда бизнес готов изменить операционную модель.

---

# 10. ИТОГОВЫЙ ПРОМПТ ДЛЯ НОВОГО ЧАТА ARENA.AI AGENT MODE

Ниже — готовый текст. Его нужно целиком вставить в новый чат Arena.ai Agent Mode с подключённым GitHub-репозиторием `beautyvibe1/ARENA.AI`.

---

## КОНТЕКСТ ПРОЕКТА

Ты — автономный senior product engineer, frontend architect, UX/UI designer, technical SEO specialist и QA engineer. Работай непосредственно в подключённом GitHub-репозитории:

**https://github.com/beautyvibe1/ARENA.AI**

Нужно создать с нуля финальный production-ready сайт **Beauty Supply** и загрузить весь необходимый исходный код, контент, оптимизированные assets, тесты и deployment configuration в этот репозиторий.

Beauty Supply — московский premium beauty-магазин/каталог оригинальной косметики, привозимой из США, с доставкой по России. Это не маркетплейс и пока не классический ecommerce с собственной корзиной/эквайрингом. Основной коммерческий сценарий — выбор товара или персонального подбора на сайте и переход в официальный Telegram-бот, где менеджер подтверждает наличие, финальную цену, оплату и доставку.

Ключевые каналы:

- Telegram bot: https://t.me/BEAUTYSUPPLYMSKBOT
- Telegram channel: https://t.me/beautysupplymsk
- Avito: https://www.avito.ru/user/7d5cc17e554a6f4d901ec51bdd907f7b/profile
- Instagram, указанный в источниках: https://instagram.com/beautysupplymsk — использовать только после проверки, что ссылка рабочая и принадлежит проекту.
- `support@beauty-supply.shop` указан в старых версиях, но не считай его подтверждённым, пока не проверишь/не получишь доказательство.

Прежде чем писать код, изучи все источники, репозиторий и их фактическое текущее состояние. Не ограничивайся планом или макетом: после аудита полностью реализуй, протестируй, покажи live preview, закоммить и отправь результат в текущую Arena-ветку, затем открой pull request, если это разрешено средой.

### Источники и порядок приоритета

1. **Приоритетный и самый свежий источник:** https://beautysupplymsk.github.io/new/
2. Его исходники для понимания реализации/assets: https://github.com/BEAUTYSUPPLYMSK/new
3. Предыдущая многостраничная версия: https://beautysupplymsk.github.io/s/index.html
4. Её исходники/assets: https://github.com/BEAUTYSUPPLYMSK/s
5. Контекстные файлы в целевом репозитории:
   - `CONTEXT-AVITO (2).MD`
   - `CONTEXT_BeautySupplyMSK.md.pdf`
6. Официальные страницы конкретных продуктов у IMAGE Skincare, Charlotte Tilbury и Hourglass — источник названий, объёмов, назначения, способа применения и cautions.

Не копируй старый сайт целиком и не импортируй чужую `.git`-историю. Кодовая база должна быть новой. Разрешено избирательно перенести принадлежащие проекту товарные assets и проверенный контент, если ты документируешь происхождение и оптимизируешь файлы.

### Иерархия истины при конфликтах

- Store assortment и цены: `/new/` как snapshot на 14.08.2026.
- Точные свойства/объёмы/usage продукта: официальная страница exact SKU.
- Бизнес-метрики и точные реальные цитаты: `CONTEXT-AVITO (2).MD` и проверяемый Avito-профиль.
- `/s/` использовать для IA, галерей и идей, но не считать автоматически достоверным источником claims.
- Никакой источник не даёт права выдумывать юридические реквизиты, отзывы, сертификаты, SLA или официальный дилерский статус.

## КОНТЕКСТ САЙТА, КОТОРЫЙ НУЖНО СОЗДАТЬ

Создай premium editorial commerce catalog на русском языке. Он должен сочетать:

- визуальную силу, арт-дирекшен и funnel `/new/`;
- многостраничность, фильтры, product details, галереи и SEO `/s/`;
- новую чистую архитектуру, static generation, accessibility, content provenance, automated tests и GitHub Pages deployment.

### Позиционирование

Главная идея: **«Недоступное — теперь ваше»** / curated beauty edit из США, проверка товара и персональный beauty-консьерж.

Сайт должен передавать:

- premium, trustworthy, expert, curated;
- оригинальность и проверку конкретного экземпляра;
- доставка по Москве и России;
- персональный подбор без навязывания;
- безопасный понятный переход в Telegram/Avito.

Не имитируй Ozon/Sephora и не создавай фиктивную корзину. Не используй fake scarcity, countdown, зачёркнутые вымышленные цены и другие dark patterns.

### Визуальное направление

Используй `/new/` как creative benchmark, но не копируй его пиксель-в-пиксель:

- deep espresso / oxblood / wine для hero и финальных CTA;
- warm pearl / ivory / cream для основных поверхностей;
- blush / dusty rose / restrained champagne как акценты;
- editorial serif для display headings + высокочитаемый sans-serif для интерфейса;
- асимметричная журнальная композиция, product still life, тонкие линии, крупный whitespace;
- subtle motion, но не декоративный шум.

Избегай generic AI-template эстетики: бесконечных pill-кнопок, emoji как основных иконок, случайных градиентов, одинаковых rounded cards и чрезмерного glassmorphism.

Минимум для body text — 16 px; secondary UI обычно не меньше 13–14 px; fine print не меньше 12 px. Не повторяй 6–10 px typography из `/new/`. Все контрасты должны соответствовать WCAG 2.2 AA.

## ЦЕЛЬ

Полностью реализовать и разместить в `beautyvibe1/ARENA.AI` готовый статически генерируемый сайт, который:

1. выглядит как самостоятельный premium beauty-бренд;
2. быстро и корректно работает на mobile/desktop;
3. индексирует каталог и каждую карточку товара;
4. повышает доверие и конвертирует в Telegram;
5. содержит только проверяемые claims;
6. автоматически собирается и деплоится на GitHub Pages;
7. поддерживается через один типизированный data source;
8. проходит build/typecheck/tests/link checks без ошибок.

Не заканчивай работу на этапе анализа, плана, wireframe или одного hero. Реализуй весь scope.

## ТРЕБОВАНИЯ

### 1. Технологии и архитектура

Предпочтительный стек: **Astro + TypeScript strict + static output + минимальные client islands**. Это рекомендация, а не слепое требование: если выберешь другой стек, обоснуй его и обеспечь настоящий SSG/prerender всех страниц. Client-only SPA неприемлем.

Обязательно:

- package manager lockfile;
- строгая типизация;
- один источник site settings/contacts;
- один источник product data;
- reusable components/layouts;
- static HTML для каталога и product pages до выполнения JS;
- progressive enhancement;
- никаких runtime hotlinks для критических товарных изображений;
- никаких secrets в клиенте или Git;
- `node_modules/`, `dist/`, coverage, raw archives и временные файлы не коммитить.

Сохрани существующие контекстные документы. Не удаляй их как «неиспользуемые».

### 2. Информационная архитектура

Минимальные реальные маршруты:

- `/` — главная;
- `/catalog/` — полный каталог;
- `/products/<slug>/` — 13 статических страниц товаров;
- `/about/` — о Beauty Supply и подходе;
- `/delivery/` — доставка, оплата, процесс заказа;
- `/reviews/` — метрики и только проверенные цитаты/ссылка на Avito;
- `/preorder/` — предзаказ товара из США через bot flow;
- `/contacts/` — подтверждённые каналы;
- `/legal/privacy/` — правдивое описание обработки на самом сайте и переходов во внешние сервисы;
- `/legal/returns/` или эквивалент — аккуратная информация об обмене/возврате без выдуманных реквизитов;
- custom `404`.

Не публикуй «Публичную оферту» с пустым ИП/ООО. Если обязательные реквизиты не предоставлены, зафиксируй их в `CONTENT_VERIFICATION.md` как release blocker; не придумывай значения.

### 3. Главная страница

Собери осмысленный funnel:

1. announcement + доступная sticky navigation;
2. premium hero с value proposition, двумя CTA и сильным product visual;
3. trust strip: происхождение, проверка, доставка, Avito;
4. curated brands;
5. featured/catalog preview 13 товаров;
6. beauty concierge section;
7. authenticity process;
8. Avito proof;
9. verified reviews или честная ссылка на профиль;
10. доставка по шагам;
11. FAQ;
12. финальный CTA;
13. полноценный footer с legal/contact links.

Не дублируй один и тот же аргумент в пяти почти одинаковых секциях. Сохрани premium pacing.

### 4. Каталог

- Все 13 товаров присутствуют.
- Фильтры: бренд, категория, задача/goal.
- Поиск по русскому и оригинальному названию.
- Состояние фильтров отражается в URL и восстанавливается после reload.
- Количество товаров вычисляется из данных, не hardcode.
- Empty state и reset filters.
- Product card: точное изображение SKU, бренд, line, оригинальное и русское название, объём, цена, статус «наличие уточняется», CTA подробнее и заказать.
- Избранное допустимо, но хранить только slug; корректно обрабатывать недоступный `localStorage`.
- Quick view допустим только как дополнение. Основное название/изображение обязано вести на static product URL.

### 5. Товарные страницы

Для каждого товара:

- clean slug URL;
- unique title/description/canonical/OG;
- breadcrumbs;
- локальная responsive gallery;
- brand, line, original name, русское название, объём;
- цена snapshot + ясный текст «финальную цену и наличие подтвердит менеджер»;
- краткое и полное описание;
- benefits, способ применения и важные cautions только из exact official source;
- CTA в Telegram с уникальным допустимым `start` payload;
- блок проверки оригинальности и доставки;
- related products;
- ссылка на official product source для редакционной проверки (не обязательно делать её главным пользовательским CTA);
- Product JSON-LD только с фактически верными полями. Не задавай `InStock` и `AggregateRating`, если они не подтверждены.

### 6. Актуальная матрица товаров и цен

Используй этот snapshot как store truth, затем проверь exact SKU:

1. IMAGE Skincare — BODY Sculpt + Firm Treatment — 170 г — 7 799 ₽.
2. IMAGE Skincare — GLP-1 4D Skin Rebound Complex — 57 г — 11 599 ₽.
3. IMAGE Skincare — VITAL C Hydrating Repair Crème — 57 г — 7 799 ₽.
4. IMAGE Skincare — AGELESS+ Retinol Repair Crème 0.3% — 50 г — 8 000 ₽.
5. IMAGE Skincare — Pure Mineral Hydrating SPF 30 — 73 г — 5 200 ₽.
6. IMAGE Skincare — Advanced Smartblend Mineral SPF 75 — 48 г — 6 000 ₽.
7. IMAGE MD — Restoring Youth Serum — 30 мл — 10 800 ₽.
8. Charlotte Tilbury — Luxury Palette — Pillow Talk — 5,2 г — 7 500 ₽.
9. Hourglass — Curator Eyeshadow Refill — Minimalist — 1 г — 6 500 ₽.
10. Hourglass — Ambient Lighting Palette — 3 × 3 г — 7 500 ₽.
11. Hourglass — Ambient Lighting Blush — 4,2 г — 3 700 ₽.
12. Charlotte Tilbury — Hollywood Contour Wand — 12 мл — 3 500 ₽.
13. IMAGE MD — Biotech Longevity Crème — 50 г — 11 800 ₽.

Добавь `lastVerified: 2026-08-14` в данные/документацию. Не размножай цены вручную по компонентам.

### 7. Telegram conversion flow

- Bot URL: `https://t.me/BEAUTYSUPPLYMSKBOT`.
- У каждого товара уникальный `start` token формата `product_<slug_with_underscores>`.
- Token должен соответствовать `[A-Za-z0-9_-]` и быть не длиннее 64 символов.
- Не рассчитывай на `&text=` для Telegram bot deep link.
- Quiz не должен сохранять имя, телефон или @username в `localStorage`.
- Предпочтительно сделать non-PII quiz: concern + budget + optional product → безопасный compact `start` payload → бот сам продолжает диалог.
- Если bot backend не поддерживает payload, обеспечь честный fallback: открыть бота и явно объяснить «Нажмите Start и отправьте ссылку/название товара».
- Не показывай «заявка отправлена», если данные фактически никуда не отправились.
- Все CTA должны работать без JS как обычные ссылки, где это возможно.

### 8. Контент и достоверность

Разрешённые trust facts из текущих материалов:

- рейтинг 5,0 на Avito;
- 33 отзыва на Avito;
- на рынке с ноября 2011 года;
- 120+ отзывов на площадках;
- доставка по России;
- официальный профиль Avito и Telegram channels.

Добавь рядом с изменяемыми метриками источник/дату проверки или держи их в централизованном site data.

Не используй три длинные цитаты «Юля/Анастасия/Елена» из старых сайтов как verified без фактической сверки. В `CONTEXT-AVITO (2).MD` явно приведены две реальные beauty-релевантные цитаты; допустимо использовать их дословно без выдуманного года:

- Юля, 2 мая, Gisou маска для волос 230: «Спасибо!⚘️⚘️⚘️ Штрих-код пробивается, оригинальное средство!»
- Анастасия, 22 апреля, Gisou масло для губ: «Все отлично) Спасибо большое ☺️»

Не писать:

- «официальный дилер/представитель/поставщик», если нет документов;
- «закупаем только у авторизованных дистрибьюторов», если это не подтверждено;
- «тысячи клиентов», «температурная упаковка», «ответ за 1/10 минут», если владелец не подтвердил;
- что Charlotte Tilbury — американский бренд. Корректно: продукт привезён/поставляется из США.

Medical/cosmetic claims формулировать осторожно: «помогает улучшить вид», «визуально», «по данным бренда». Не обещать лечение. Для ретинола и SPF добавить корректные cautions, основанные на official source, без самодельных медицинских назначений.

### 9. Assets

- Сначала проведи image inventory в `/new` и `/s`.
- Предпочитай точные реальные/проектные packshots exact SKU.
- Можно переиспользовать оптимизированные project-owned WebP из `/new` и лучшие галереи из `/s`, но проверь соответствие товара и документируй provenance.
- Не генерируй фальшивую упаковку, не меняй логотип/маркировку товара и не создавай изображение, которое можно принять за фото конкретного экземпляра.
- AI-generated backgrounds допустимы только как явно editorial visuals; actual item photo/packshot должен быть точным.
- Никакого runtime hotlinking official brand CDN.
- Подготовь responsive AVIF/WebP, `srcset`, width/height, lazy loading ниже fold.
- LCP image preload/fetchpriority — только для действительно используемого hero asset.
- Создай отдельный 1200×630 OG image.
- Удали дубликаты и не переноси raw originals/zip без необходимости.
- Добавь `CONTENT_SOURCES.md` с URL и назначением каждого внешнего factual/image source.

### 10. Accessibility

Обеспечь WCAG 2.2 AA:

- semantic landmarks и один H1 на страницу;
- skip link;
- полная keyboard navigation;
- видимый focus;
- кнопки/targets минимум около 44×44;
- contrast AA;
- meaningful alt или пустой alt для декора;
- корректный accessible mobile menu;
- filters как настоящая форма/controls, а не ложные tabs;
- modal: `aria-modal`, label/description, focus trap, Escape, backdrop close, возврат фокуса;
- status/live region для динамического результата;
- `prefers-reduced-motion`;
- без horizontal overflow на 320 px;
- работоспособность при 200% zoom.

### 11. SEO

- Static HTML для каждой страницы.
- Уникальные title/description/canonical/OG/Twitter metadata.
- `lang="ru"`.
- Clean product routes, никаких обязательных `?slug=`.
- `sitemap.xml` со всеми индексируемыми страницами и 13 товарами.
- `robots.txt` с корректным абсолютным sitemap URL.
- JSON-LD: Store/Organization/BreadcrumbList/Product только с проверенными полями.
- Не добавлять fake review schema.
- Canonical и assets должны учитывать GitHub project base `/ARENA.AI/`.
- Не ставить canonical на старые `/new/` или `/s/`.
- 404 должна работать на GitHub Pages настолько корректно, насколько позволяет static hosting.

### 12. Performance

Цели после реального измерения, а не декларации:

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95;
- LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms в разумном test environment;
- минимальный client JS; не гидратировать статические секции;
- CSS без огромного utility/runtime layer;
- self-host шрифтов только с лицензией и нужным Cyrillic subset либо используй устойчивый system fallback;
- не загружать все галереи на главной;
- no console errors, failed local assets или 404 internal links.

Если Lighthouse запустить невозможно, не выдумывай score: сообщи, что именно измерено, а что осталось target.

### 13. Privacy и security

- Не хранить PII на устройстве без необходимости.
- Не подключать analytics до получения реального counter ID и privacy decision.
- Можно создать небольшой analytics adapter/event taxonomy без отправки данных: `catalog_filter`, `product_view`, `product_order_click`, `quiz_start`, `quiz_complete`, `avito_click`.
- Если аналитики нет, не показывать лишний cookie banner. Если появится non-essential tracking, consent должен быть реальным и до загрузки tracker.
- Все внешние `_blank` ссылки: `rel="noopener noreferrer"`.
- Не использовать `dangerouslySetInnerHTML` для непроверенных данных.
- Не публиковать секреты, токены, персональные данные или юридические реквизиты, которых нет.
- Privacy text должен честно сообщать, что переход в Telegram/Avito ведёт во внешний сервис с его политикой.

### 14. GitHub Pages и repository delivery

Текущий production fallback URL:

`https://beautyvibe1.github.io/ARENA.AI/`

Пока custom domain не подтверждён:

- настрой static site `site`/`base` под этот project Pages path;
- не создавай `CNAME` для непроверенного домена;
- добавь CI workflow для PR/push: install, typecheck, lint, tests, build, link/content validation;
- добавь Pages deploy workflow через official GitHub Actions artifact, с deploy после merge/push в default branch;
- не коммить generated `dist/`, если workflow его строит;
- попробуй настроить GitHub Pages source = GitHub Actions через `gh`, если права позволяют; если нет — не маскируй ошибку, дай владельцу один точный ручной шаг.

Работай только в текущей Arena-ветке, назначенной сессии. Не переключайся и не пушь в чужую ветку. Сделай осмысленные commit(s), push текущей ветки и PR в `main`, если разрешено.

## ПРИОРИТЕТЫ

### P0

1. Достоверность фактов, SKU, цен, отзывов и legal wording.
2. Полная IA и 13 статических product pages.
3. Premium mobile-first UX и рабочий Telegram funnel.
4. Accessibility/readability.
5. SEO и GitHub Pages base/deploy.
6. Build/tests/link validation без ошибок.

### P1

1. Фильтры/search/URL state.
2. Quick view + избранное.
3. Non-PII beauty quiz.
4. Responsive galleries и polished microinteractions.
5. Content provenance и verification docs.

### P2

1. Analytics adapter без фиктивной интеграции.
2. Blog/beauty guide, только если P0/P1 полностью завершены.
3. Дополнительные декоративные эффекты, только если не ухудшают performance/accessibility.

## ОГРАНИЧЕНИЯ

- GitHub Pages — статический hosting, backend отсутствует.
- Не создавать фиктивный checkout, inventory API или отправку формы.
- Не выдумывать отзывы, реквизиты, сертификаты, партнёрства, гарантированные сроки и medical claims.
- Не копировать старый код вслепую.
- Не удалять исходные context documents целевого repo.
- Не переносить старые zip, `.git`, `node_modules`, generated docs/dist, 30 МБ originals и неиспользуемые 15 МБ PNG.
- Не использовать query-only product pages.
- Не делать сайт зависимым от JS для чтения каталога.
- Не оставлять placeholder/TODO в пользовательском интерфейсе.
- Внутренние unresolved business/legal items фиксировать в `CONTENT_VERIFICATION.md`, а не подменять вымышленными значениями.
- Не считать задачу выполненной, если есть broken internal links, console errors, build failure или неработающие Telegram CTA.

## СТРУКТУРА ФАЙЛОВ РЕПОЗИТОРИЯ

Ожидаемая структура при Astro; допустимы аргументированные небольшие изменения:

```text
ARENA.AI/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── pages.yml
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── images/
│   │   ├── og/beauty-supply-og.jpg
│   │   └── products/<slug>/...
│   └── fonts/...                 # только если self-hosted и лицензированы
├── scripts/
│   ├── check-links.mjs
│   └── validate-content.mjs
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── catalog/
│   │   ├── product/
│   │   ├── trust/
│   │   └── interactive/
│   ├── data/
│   │   ├── site.ts
│   │   ├── products.ts
│   │   ├── reviews.ts
│   │   └── faq.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── telegram.ts
│   │   ├── seo.ts
│   │   └── analytics.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── catalog/index.astro
│   │   ├── products/[slug].astro
│   │   ├── about/index.astro
│   │   ├── delivery/index.astro
│   │   ├── reviews/index.astro
│   │   ├── preorder/index.astro
│   │   ├── contacts/index.astro
│   │   ├── legal/privacy.astro
│   │   ├── legal/returns.astro
│   │   └── 404.astro
│   └── styles/
│       ├── tokens.css
│       └── global.css
├── tests/
│   └── e2e/
├── .gitignore
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── playwright.config.ts
├── README.md
├── CONTENT_SOURCES.md
├── CONTENT_VERIFICATION.md
├── CONTEXT-AVITO (2).MD
└── CONTEXT_BeautySupplyMSK.md.pdf
```

Не создавай декоративную сложность ради структуры. Главное — ясное разделение data/content/layout/interaction.

## ДОПОЛНИТЕЛЬНЫЕ ИНСТРУКЦИИ — НАИБОЛЕЕ ВАЖНЫЕ

1. **Сначала evidence matrix, потом код.** Зафиксируй для каждого изменяемого claim источник и confidence. Это внутренняя рабочая стадия; не трать весь ответ на план.
2. **Проверь exact SKU.** Особое внимание: BODY Sculpt official URL сейчас может быть устаревшим; Pillow Talk должен ссылаться на exact palette, а не bundle; Curator должен быть refill 1 г, если именно он продаётся.
3. **Не путай визуал и доказательство.** AI/editorial product visual нельзя выдавать за фото конкретного экземпляра. Для доверия используй реальный packshot и предложи «запросить фото конкретного товара».
4. **Не храни контакт в localStorage.** Квиз собирает только безопасные предпочтения; личность уже известна Telegram после перехода.
5. **Не публикуй ложный success.** Открытие Telegram — handoff, а не отправленная заявка.
6. **Quick view не заменяет URL.** Каждому товару нужна статическая SEO-страница.
7. **Дизайн должен оставаться премиальным после исправления accessibility.** Не решай читаемость превращением сайта в generic Bootstrap catalog.
8. **Используй динамические значения.** Counts, year, categories и prices выводятся из данных. Никаких «13» в нескольких несвязанных местах без derivation.
9. **Проверь nested base.** Собранный сайт должен работать именно под `/ARENA.AI/`, а не только на localhost `/`.
10. **Выполни visual QA.** Запусти dev server на `0.0.0.0`, открой live preview, проверь минимум 320, 390, 768, 1024 и 1440 px; hero, menu, catalog, filters, modal, quiz, product page, footer.
11. **Выполни keyboard QA.** Tab order, menu, filters, modal focus trap/return, Escape.
12. **Выполни production QA:** clean install, typecheck, lint, unit/content tests, build, serve generated output, internal link check, asset check, Playwright smoke; axe/Lighthouse, если доступны.
13. **Не заявляй непроверенное.** В финале приведи точные команды и реальные результаты. Не пиши «Lighthouse 98», если отчёт не запускался.
14. **Доведи GitHub delivery до конца:** status/diff, commit, push текущей Arena-ветки, PR URL, Pages status. Если platform permission блокирует последний шаг, покажи точную ошибку и один минимальный manual action.
15. **Не останавливайся ради вопросов**, если можно принять безопасное обратимое решение. Спрашивай только если без ответа пришлось бы выдумать критический business/legal факт. Всё остальное реализуй автономно.

### Acceptance checklist

Считать задачу завершённой только если:

- [ ] 13 товаров есть в data source, каталоге, sitemap и на 13 static pages.
- [ ] Все цены и объёмы согласованы с current truth; availability wording не противоречит UI.
- [ ] Все product order CTA имеют валидные уникальные bot payload.
- [ ] Нет PII в localStorage/sessionStorage/URL.
- [ ] Нет неподтверждённых attributed reviews или official-dealer claims.
- [ ] Нет пустой «оферты» и fake legal details.
- [ ] Основной контент доступен без JS.
- [ ] Нет текста 6–10 px и критичных contrast violations.
- [ ] Mobile/desktop не имеют horizontal overflow и перекрывающего sticky UI.
- [ ] Все internal links/assets проходят проверку.
- [ ] Build/typecheck/tests проходят с exit code 0.
- [ ] Canonical/sitemap/robots используют production URL/base.
- [ ] CI и Pages workflows добавлены.
- [ ] README объясняет local development, content update и deployment.
- [ ] Изменения committed и pushed в текущую Arena-ветку; PR создан или дана точная причина, почему нет.

## ФОРМАТ ОТВЕТА

Ответь по-русски, кратко, но доказательно, в следующей структуре:

1. **Что реализовано** — страницы, функции, дизайн, данные, accessibility, SEO.
2. **Решения по достоверности** — какие claims/reviews/contacts исключены или помечены для подтверждения и почему.
3. **Ключевая структура файлов** — без полного дампа каждого файла.
4. **Проверки** — точные команды и реальные результаты: install/typecheck/lint/test/build/link/e2e/Lighthouse.
5. **Live preview** — URL и что проверено визуально.
6. **Git/GitHub** — branch, commit SHA, push status, PR URL.
7. **GitHub Pages** — production URL/status или один точный ручной шаг, если не хватило прав.
8. **Оставшиеся только внешние blockers** — например, юридические реквизиты, analytics ID, подтверждение email/domain. Не называй незавершённый технический scope «внешним blocker».

Не вставляй в ответ огромные листинги кода. Сам код, assets, docs, tests и workflows должны находиться в репозитории.

---

## 11. Ожидаемый результат от этого промпта

После выполнения новым Agent Mode в `ARENA.AI` должен появиться не ещё один красивый демо-лендинг, а **полноценный, проверяемый и развёртываемый premium catalog site**:

- визуально сильнее `/s/`;
- функционально и SEO-полнее `/new/`;
- легче и чище обеих версий;
- без вымышленных отзывов, реквизитов и статусов;
- с 13 индексируемыми товарами;
- с честным Telegram handoff;
- с CI/CD и готовностью к GitHub Pages.
