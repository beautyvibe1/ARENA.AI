export const siteConfig = {
  name: "Beauty Supply",
  shortName: "BEAUTY SUPPLY",
  tagline: "Недоступное — теперь ваше",
  description:
    "Кураторский premium beauty-магазин: оригинальная косметика, привезённая из США. Проверка каждого товара, персональный beauty-консьерж и доставка по всей России.",
  lang: "ru",
  siteUrl: "https://beautyvibe1.github.io",
  basePath: "/ARENA.AI/",
  productionUrl: "https://beautyvibe1.github.io/ARENA.AI/",
  lastVerified: "2026-08-14",
  contacts: {
    telegramBot: "https://t.me/BEAUTYSUPPLYMSKBOT",
    telegramChannel: "https://t.me/beautysupplymsk",
    avitoProfile: "https://www.avito.ru/user/7d5cc17e554a6f4d901ec51bdd907f7b/profile",
    instagram: "https://instagram.com/beautysupplymsk", // требует проверки принадлежности, пока не рекламируем как основной
    // supportEmail не подтверждён, не публикуем
  },
  trust: {
    rating: "5,0",
    ratingSource: "Avito",
    reviewsCount: 33,
    reviewsSource: "Avito",
    since: "ноябрь 2011",
    totalReviewsMention: "120+ отзывов на площадках",
    // Все метрики проверены 2026-08-14 по CONTEXT-AVITO (2).MD
    verifiedDate: "2026-08-14",
  },
  delivery: {
    cities: ["Москва", "Санкт-Петербург", "Казань", "Сочи", "Екатеринбург", "Новосибирск"],
    methods: ["Курьер по Москве", "СДЭК", "Avito Доставка"],
  },
  pricesNote: "Финальную цену и наличие подтверждает менеджер в Telegram",
} as const;

export type SiteConfig = typeof siteConfig;
