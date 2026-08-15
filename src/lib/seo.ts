import { siteConfig } from "../data/site";

export function canonicalUrl(path: string): string {
  const base = siteConfig.productionUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function ogImageUrl(): string {
  return canonicalUrl("/images/og/beauty-supply-og.jpg");
}

export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return `${siteConfig.name} — ${siteConfig.tagline}`;
  return `${pageTitle} | ${siteConfig.name}`;
}
