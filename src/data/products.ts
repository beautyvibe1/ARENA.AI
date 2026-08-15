export type ProductCategory = "care" | "spf" | "makeup" | "body";
export type ProductGoal = "lifting" | "firming" | "anti-age" | "hydration" | "glow" | "spf" | "contour" | "volume-loss" | "even-tone";

export interface Product {
  slug: string;
  brand: string;
  brandLine?: string; // e.g. VOL.U.LIFT, VITAL C, AGELESS+, IMAGE MD, Luxury Palette
  originalName: string;
  russianName: string;
  volume: string;
  price: number;
  currency: "RUB";
  category: ProductCategory;
  goals: ProductGoal[];
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  howToUse: string;
  cautions?: string;
  officialUrl: string;
  officialUrlNote?: string;
  image: string; // relative to public/images/products/
  gallery?: string[];
  tags: string[];
  lastVerified: string;
}

export const products: Product[] = [
  {
    slug: "image-body-sculpt-firm-treatment",
    brand: "IMAGE Skincare",
    brandLine: "VOL.U.LIFT BODY",
    originalName: "VOL.U.LIFT BODY GLP-1/GIP Sculpt + Firm Treatment Complex",
    russianName: "Лифтинг-комплекс для тела BODY Sculpt + Firm Treatment",
    volume: "170 г",
    price: 7799,
    currency: "RUB",
    category: "body",
    goals: ["lifting", "firming", "hydration"],
    shortDescription:
      "Скульптурирующий комплекс для тела: помогает визуально улучшить упругость и тонус, смягчить вид креповой текстуры и поддержать увлажнение.",
    fullDescription:
      "VOL.U.LIFT BODY — средство для тела, разработанное пластическим хирургом для визуальной коррекции признаков потери упругости, связанной в том числе с быстрым снижением веса. По данным бренда, формула сочетает пептиды, bakuchiol, HA Silanol и растительные экстракты для более подтянутого и увлажнённого вида кожи.",
    benefits: [
      "Помогает визуально улучшить упругость и плотность кожи тела",
      "Поддерживает увлажнение и более гладкую текстуру",
      "Формула разработана пластическим хирургом, по данным бренда",
    ],
    howToUse:
      "Наносите утром и вечером на очищенную кожу проблемных зон (живот, руки, бёдра, ягодицы) лёгкими восходящими движениями до полного впитывания, по рекомендации бренда.",
    cautions:
      "Только для наружного применения. Избегайте контакта с глазами. При раздражении прекратите использование. Не является лекарственным средством.",
    officialUrl: "https://imageskincare.com/products/vol-u-lift-body",
    officialUrlNote: "Актуальная страница VOL.U.LIFT BODY на сайте бренда — проверяйте точный объём/версию",
    image: "volu-lift-body.webp",
    gallery: ["volu-lift-body.webp"],
    tags: ["image", "body", "volulift"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-glp-1-4d-skin-rebound-complex",
    brand: "IMAGE Skincare",
    brandLine: "VOL.U.LIFT",
    originalName: "VOL.U.LIFT GLP-1 4D Skin Rebound Complex",
    russianName: "Комплекс для плотности кожи GLP-1 4D Skin Rebound",
    volume: "57 г",
    price: 11599,
    currency: "RUB",
    category: "care",
    goals: ["firming", "lifting", "hydration", "volume-loss", "anti-age"],
    shortDescription:
      "Многомерный уход, созданный для визуальной коррекции потери объёма лица — помогает улучшить вид упругости, увлажнённости и плотности.",
    fullDescription:
      "VOL.U.LIFT GLP-1 4D Skin Rebound Complex — средство, разработанное пластическим хирургом, нацелено на 4 проявления: дефляция, глубокие морщины, обезвоженность и снижение плотности. В составе, по данным бренда: next-generation hyaluronic acid (HA Silanol), биомиметические фрагменты коллагена, bakuchiol, аминокислоты и XOSM Technology.",
    benefits: [
      "Помогает визуально восстановить ощущение объёма и упругости",
      "Поддерживает увлажнение и более плотный вид кожи",
      "Формула с XOSM Technology — по данным бренда улучшает действие антиоксидантов",
    ],
    howToUse:
      "Наносите небольшое количество на очищенную кожу лица и шеи утром и/или вечером после сыворотки, по рекомендации бренда.",
    cautions: "Только для наружного применения. Не наносить на повреждённую кожу.",
    officialUrl: "https://imageskincare.com/products/vol-u-lift-glp-1-4d-skin-rebound-complex",
    image: "volu-lift-face.webp",
    gallery: ["volu-lift-face.webp"],
    tags: ["image", "volulift", "face"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-vital-c-hydrating-repair-creme",
    brand: "IMAGE Skincare",
    brandLine: "VITAL C",
    originalName: "VITAL C Hydrating Repair Crème",
    russianName: "Восстанавливающий крем с витамином C VITAL C",
    volume: "57 г",
    price: 7799,
    currency: "RUB",
    category: "care",
    goals: ["hydration", "glow", "even-tone", "anti-age"],
    shortDescription:
      "Ночной крем с витаминами C и E, гиалуроновой кислотой и керамидами — для ощущения питания, увлажнения и более сияющего вида.",
    fullDescription:
      "VITAL C Hydrating Repair Crème — бестселлер IMAGE Skincare для сухой кожи. По данным бренда, формула сочетает стабильный витамин C, керамиды и гиалуроновую кислоту, помогает удерживать влагу, поддерживая вид эластичности и ровного тона.",
    benefits: [
      "Помогает удерживать влагу и смягчить ощущение сухости",
      "Поддерживает вид упругости и сияния",
      "Текстура с лёгким цитрусовым ароматом, по данным бренда",
    ],
    howToUse:
      "Наносите обильно на очищенную кожу вечером после сыворотки. Не забывайте про дневную защиту SPF.",
    cautions: "Только для наружного применения. Избегайте области глаз при чувствительности.",
    officialUrl: "https://imageskincare.com/products/hydrating-repair-cr-me",
    image: "vital-c.webp",
    gallery: ["vital-c.webp"],
    tags: ["image", "vital c", "night"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-ageless-retinol-repair-creme-0-3",
    brand: "IMAGE Skincare",
    brandLine: "AGELESS+",
    originalName: "AGELESS+ Retinol Repair Crème 0.3% Retinol Complex",
    russianName: "Ночной крем с ретинолом 0.3% AGELESS+",
    volume: "50 г",
    price: 8000,
    currency: "RUB",
    category: "care",
    goals: ["anti-age", "even-tone", "firming"],
    shortDescription:
      "Крем с 0.3% ретиноловым комплексом (0.1% ретиноид + 0.2% bakuchiol) и XOSM Technology — помогает улучшить вид тона, текстуры и морщин.",
    fullDescription:
      "AGELESS+ retinol repair crème 0.3% — low-dose ретиноловый комплекс по данным бренда. Содержит смесь AHA, ниацинамид, koji-кислоту и успокаивающие ингредиенты для более ровного и сияющего вида при регулярном ночном применении.",
    benefits: [
      "Комплекс 0.3% ретинол + bakuchiol с XOSM Technology по данным бренда",
      "Помогает визуально выровнять тон и улучшить вид пор и пигментации",
      "Формула для постепенного введения ретинола",
    ],
    howToUse:
      "Вечером наносите 1–2 нажатия на очищенную сухую кожу. Вводите постепенно, увеличивая до ежедневного по переносимости. Днём обязательно используйте SPF.",
    cautions:
      "Содержит ретинол. Может повышать чувствительность к солнцу. Используйте SPF днём. Не используйте при беременности/лактации без консультации врача. Избегайте сочетания с другими сильными активами без консультации.",
    officialUrl: "https://imageskincare.com/products/ageless-retinol-repair-cream",
    image: "ageless-retinol.webp",
    gallery: ["ageless-retinol.webp"],
    tags: ["image", "retinol", "ageless"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-pure-mineral-hydrating-spf-30",
    brand: "IMAGE Skincare",
    brandLine: "DAILY PREVENTION",
    originalName: "Pure Mineral Hydrating SPF 30",
    russianName: "Минеральный увлажняющий крем SPF 30",
    volume: "73 г",
    price: 5200,
    currency: "RUB",
    category: "spf",
    goals: ["spf", "hydration"],
    shortDescription:
      "Минеральный дневной крем с SPF 30 — увлажняет и помогает защитить от UVA/UVB при правильном применении.",
    fullDescription:
      "Pure Mineral Hydrating SPF 30 — увлажняющий дневной крем с минеральными фильтрами. По данным бренда, подходит для ежедневного использования и поддерживает ощущение увлажнённости.",
    benefits: [
      "Минеральная защита UVA/UVB при корректном нанесении",
      "Увлажняющая текстура для ежедневного дневного ухода",
    ],
    howToUse:
      "Наносите обильно как последний этап утреннего ухода за 15 минут до выхода на солнце. Обновляйте каждые 2 часа при длительном пребывании на солнце, по рекомендации бренда.",
    cautions:
      "Не находитесь на солнце слишком долго, даже при использовании солнцезащитного средства. Избегайте контакта с глазами.",
    officialUrl: "https://imageskincare.com/products/pure-mineral-hydrating-moisturizer-spf-30",
    officialUrlNote: "Уточняйте точный URL варианта 73 г на официальном сайте",
    image: "spf30.webp",
    gallery: ["spf30.webp"],
    tags: ["image", "spf", "daily"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-advanced-smartblend-mineral-spf-75",
    brand: "IMAGE Skincare",
    brandLine: "DAILY PREVENTION",
    originalName: "Advanced Smartblend Mineral SPF 75",
    russianName: "Усиленный минеральный смарт-крем SPF 75",
    volume: "48 г",
    price: 6000,
    currency: "RUB",
    category: "spf",
    goals: ["spf", "anti-age"],
    shortDescription:
      "Высокозащитный минеральный крем SPF 75 — для усиленной ежедневной защиты и увлажнения.",
    fullDescription:
      "Advanced Smartblend Mineral SPF 75 — минеральный крем с высокой степенью защиты. По данным бренда, подходит для активного образа жизни и помогает защитить кожу от фотостарения при правильном применении.",
    benefits: [
      "Высокий SPF для ежедневной защиты",
      "Минеральные фильтры, увлажняющая основа",
    ],
    howToUse:
      "Наносите обильно утром как последний этап ухода. Обновляйте защиту при длительном пребывании на солнце.",
    cautions:
      "Солнцезащитное средство не обеспечивает 100% защиты. Не оставайтесь на солнце слишком долго.",
    officialUrl: "https://imageskincare.com/products/daily-prevention-advanced-smartblend-mineral-moisturizer-spf-75",
    image: "spf75.webp",
    gallery: ["spf75.webp"],
    tags: ["image", "spf", "smartblend"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-md-restoring-youth-serum",
    brand: "IMAGE MD",
    brandLine: "IMAGE MD",
    originalName: "Restoring Youth Serum",
    russianName: "Восстанавливающая сыворотка молодости",
    volume: "30 мл",
    price: 10800,
    currency: "RUB",
    category: "care",
    goals: ["anti-age", "firming", "even-tone", "glow"],
    shortDescription:
      "Сыворотка с пептидами и осветляющими компонентами — помогает улучшить вид упругости и ровного тона.",
    fullDescription:
      "IMAGE MD Restoring Youth Serum — клиническая сыворотка линейки MD. По данным бренда, сочетание пептидов, осветляющих активов и антиоксидантов поддерживает вид упругой, более ровной кожи.",
    benefits: [
      "Пептидный комплекс для ощущения упругости",
      "Помогает визуально выровнять тон",
      "Лёгкая сыворотка для ежедневного применения",
    ],
    howToUse:
      "Наносите несколько капель утром и/или вечером на очищенную кожу до крема.",
    cautions: "Только для наружного применения.",
    officialUrl: "https://imageskincare.com/products/image-md-restoring-youth-serum",
    image: "restoring-youth-serum.webp",
    gallery: ["restoring-youth-serum.webp"],
    tags: ["image md", "serum"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "ct-luxury-palette-pillow-talk",
    brand: "Charlotte Tilbury",
    brandLine: "Luxury Palette",
    originalName: "Luxury Palette — Pillow Talk",
    russianName: "Палетка теней Luxury Palette Pillow Talk",
    volume: "5,2 г",
    price: 7500,
    currency: "RUB",
    category: "makeup",
    goals: ["glow"],
    shortDescription:
      "Культовая палетка 4 оттенков Pillow Talk — розово-нюдовые сатиновые и сияющие текстуры для дневного и вечернего образа.",
    fullDescription:
      "Luxury Palette Pillow Talk — 4 оттенка с разными финишами: soft matte, shimmer и sparkle. По данным бренда, формула легко растушёвывается и подходит для создания эффекта Pillow Talk.",
    benefits: [
      "4 универсальных оттенка в одной палетке",
      "Сатиновые и сияющие финиши",
      "Компактный формат для макияжа на каждый день",
    ],
    howToUse:
      "Наносите светлый оттенок на всё веко как базу, средние — в складку, тёмный — для глубины внешнего уголка. Наносите кистью или пальцами.",
    cautions: "Только для наружного применения. При раздражении прекратите использование.",
    officialUrl: "https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk",
    image: "pillow-talk.webp",
    gallery: ["pillow-talk.webp"],
    tags: ["charlotte tilbury", "pillow talk", "eyeshadow"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "hourglass-curator-eyeshadow-refill-minimalist",
    brand: "Hourglass",
    brandLine: "Curator",
    originalName: "Curator Eyeshadow Refill — Minimalist",
    russianName: "Тени-рефил Curator Minimalist",
    volume: "1 г",
    price: 6500,
    currency: "RUB",
    category: "makeup",
    goals: ["glow"],
    shortDescription:
      "Веганский рефил теней 1 г в оттенке Minimalist — матовая формула, кастомная система палеток Curator.",
    fullDescription:
      "Curator Eyeshadow Refill — коллекция из 40 оттенков с 4 финишами. По данным бренда, тальк-фри, веганская, высокопигментированная текстура легко наносится и растушёвывается. Палетки Curator приобретаются отдельно.",
    benefits: [
      "Кастомная refill-система — 40 оттенков",
      "Веганская, cruelty-free формула по данным бренда",
      "Бархатистый матовый финиш Minimalist",
    ],
    howToUse:
      "Вставьте рефил в палетку Curator. Наносите кистью на веко, растушёвывайте по желанию.",
    cautions: "Только для наружного применения.",
    officialUrl: "https://www.hourglasscosmetics.com/products/curator-eyeshadow-refill",
    image: "curator-eyeshadow.webp",
    gallery: ["curator-eyeshadow.webp"],
    tags: ["hourglass", "curator", "eyeshadow"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "hourglass-ambient-lighting-palette",
    brand: "Hourglass",
    brandLine: "Ambient Lighting",
    originalName: "Ambient Lighting Palette",
    russianName: "Палетка финишных пудр Ambient Lighting",
    volume: "3 × 3 г",
    price: 7500,
    currency: "RUB",
    category: "makeup",
    goals: ["glow"],
    shortDescription:
      "Палетка из трёх финишных пудр с эффектом рассеянного света — для мягкого свечения.",
    fullDescription:
      "Ambient Lighting Palette — три пудры с технологией Photoluminescent для эффекта мягкого фокуса. По данным бренда, подходит для фиксации и придания свечения.",
    benefits: [
      "Эффект мягкого рассеянного света",
      "Три оттенка для разных зон",
      "Веганская и cruelty-free по данным бренда",
    ],
    howToUse:
      "Наносите лёгкими движениями поверх тона или как финиш. Можно использовать оттенки отдельно или смешивать.",
    cautions: "Только для наружного применения.",
    officialUrl: "https://www.hourglasscosmetics.com/products/ambient-lighting-palette",
    image: "ambient-palette.webp",
    gallery: ["ambient-palette.webp"],
    tags: ["hourglass", "palette", "glow"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "hourglass-ambient-lighting-blush",
    brand: "Hourglass",
    brandLine: "Ambient Lighting",
    originalName: "Ambient Lighting Blush",
    russianName: "Запечённые румяна Ambient Lighting Blush",
    volume: "4,2 г",
    price: 3700,
    currency: "RUB",
    category: "makeup",
    goals: ["glow"],
    shortDescription:
      "Запечённые румяна с эффектом Ambient Lighting — цвет + мягкое свечение.",
    fullDescription:
      "Ambient Lighting Blush сочетает пигмент румян и пудру Ambient Lighting. По данным бренда, создаёт естественный румянец с эффектом внутреннего свечения.",
    benefits: [
      "Цвет и подсветка в одном продукте",
      "Мягкая растушёвка",
      "Подходит для повседневного макияжа",
    ],
    howToUse: "Наносите на яблочки щёк и растушёвывайте к вискам кистью для румян.",
    cautions: "Только для наружного применения.",
    officialUrl: "https://www.hourglasscosmetics.com/products/ambient-lighting-blush",
    image: "ambient-blush.webp",
    gallery: ["ambient-blush.webp"],
    tags: ["hourglass", "blush"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "ct-hollywood-contour-wand",
    brand: "Charlotte Tilbury",
    brandLine: "Hollywood",
    originalName: "Hollywood Contour Wand",
    russianName: "Жидкий скульптор Hollywood Contour Wand",
    volume: "12 мл",
    price: 3500,
    currency: "RUB",
    category: "makeup",
    goals: ["contour", "glow"],
    shortDescription:
      "Жидкий контур с кушон-аппликатором — для мягкой скульптуры и эффекта лифтинга.",
    fullDescription:
      "Hollywood Contour Wand — кремовый скульптор с лёгкой растушёвкой. По данным бренда, удобен для контуринга скул, носа и линии челюсти с естественным финишем.",
    benefits: [
      "Кремовая текстура, лёгкая растушёвка",
      "Кушон-аппликатор для дозирования",
      "Естественный контур без пятен",
    ],
    howToUse:
      "Нанесите небольшое количество на скулы, виски, линию челюсти и растушуйте кистью или спонжем.",
    cautions: "Только для наружного применения.",
    officialUrl: "https://www.charlottetilbury.com/us/product/hollywood-contour-wand",
    image: "hollywood-contour.webp",
    gallery: ["hollywood-contour.webp"],
    tags: ["charlotte tilbury", "contour", "hollywood"],
    lastVerified: "2026-08-14",
  },
  {
    slug: "image-md-biotech-longevity-creme",
    brand: "IMAGE MD",
    brandLine: "IMAGE MD",
    originalName: "Biotech Longevity Crème",
    russianName: "Биотех-крем для упругости Biotech Longevity",
    volume: "50 г",
    price: 11800,
    currency: "RUB",
    category: "care",
    goals: ["firming", "anti-age", "lifting", "hydration"],
    shortDescription:
      "Новый крем IMAGE MD с биотех-комплексом — помогает улучшить вид упругости, плотности и увлажнённости.",
    fullDescription:
      "Biotech Longevity Crème — новинка 2026 линейки IMAGE MD. По данным бренда, содержит биотехнологичные активы, поддерживающие вид упругой и более плотной кожи при регулярном применении.",
    benefits: [
      "Биотех-комплекс для ощущения упругости",
      "Поддерживает увлажнение и вид плотности",
      "Клиническая линейка IMAGE MD",
    ],
    howToUse:
      "Наносите утром и/или вечером на очищенную кожу лица и шеи после сыворотки.",
    cautions: "Только для наружного применения.",
    officialUrl: "https://imageskincare.com/products/image-md-biotech-longevity-creme",
    officialUrlNote: "Проверьте точный URL на imageskincare.com — новинка 2026",
    image: "biotech-longevity.webp",
    gallery: ["biotech-longevity.webp"],
    tags: ["image md", "biotech", "longevity"],
    lastVerified: "2026-08-14",
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const categories = [
  { id: "care", label: "Уход за лицом", count: products.filter((p) => p.category === "care").length },
  { id: "body", label: "Уход за телом", count: products.filter((p) => p.category === "body").length },
  { id: "spf", label: "SPF защита", count: products.filter((p) => p.category === "spf").length },
  { id: "makeup", label: "Макияж", count: products.filter((p) => p.category === "makeup").length },
] as const;

export const brands = ["IMAGE Skincare", "IMAGE MD", "Charlotte Tilbury", "Hourglass"] as const;

export const goals = [
  { id: "lifting", label: "Лифтинг" },
  { id: "firming", label: "Упругость" },
  { id: "anti-age", label: "Anti-age" },
  { id: "hydration", label: "Увлажнение" },
  { id: "glow", label: "Сияние" },
  { id: "spf", label: "SPF" },
  { id: "contour", label: "Контуринг" },
  { id: "volume-loss", label: "Потеря объёма" },
  { id: "even-tone", label: "Ровный тон" },
] as const;
