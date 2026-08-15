export interface VerifiedReview {
  author: string;
  date: string; // без года, как в источнике
  product: string;
  text: string;
  source: string;
  verified: boolean;
}

export const verifiedReviews: VerifiedReview[] = [
  {
    author: "Юля",
    date: "2 мая",
    product: "Gisou маска для волос 230",
    text: "Спасибо!⚘️⚘️⚘️ Штрих-код пробивается, оригинальное средство!",
    source: "Avito",
    verified: true,
  },
  {
    author: "Анастасия",
    date: "22 апреля",
    product: "Gisou масло для губ",
    text: "Все отлично) Спасибо большое ☺️",
    source: "Avito",
    verified: true,
  },
];

export const avitoMetrics = {
  rating: "5,0",
  reviewsCount: 33,
  since: "ноябрь 2011",
  totalReviewsMention: "120+ отзывов на площадках",
  profileUrl: "https://www.avito.ru/user/7d5cc17e554a6f4d901ec51bdd907f7b/profile",
  verifiedDate: "2026-08-14",
  note: "Метрики взяты из официального профиля Avito и CONTEXT-AVITO (2).MD. Дата проверки: 2026-08-14",
};
