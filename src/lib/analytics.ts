// Lightweight analytics adapter without external tracking by default
type EventName =
  | "catalog_filter"
  | "product_view"
  | "product_order_click"
  | "quiz_start"
  | "quiz_complete"
  | "avito_click"
  | "telegram_click";

interface AnalyticsEvent {
  name: EventName;
  params?: Record<string, string | number | boolean>;
}

export function track(event: AnalyticsEvent) {
  // No-op until real counter ID provided
  // Keep console only in dev — avoid import.meta typing issues
  try {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      console.debug("[analytics]", event.name, event.params);
    }
  } catch {}
  // Future: push to Yandex Metrica / GA when ID verified
  // if (window.ym) { ym(counterId, 'reachGoal', event.name, event.params) }
}

export function trackProductView(slug: string) {
  track({ name: "product_view", params: { slug } });
}

export function trackProductOrderClick(slug: string, source: string) {
  track({ name: "product_order_click", params: { slug, source } });
}

export function trackCatalogFilter(filter: string, value: string) {
  track({ name: "catalog_filter", params: { filter, value } });
}

export function trackAvitoClick(location: string) {
  track({ name: "avito_click", params: { location } });
}
