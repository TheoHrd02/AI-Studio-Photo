/**
 * Single source of truth for indexable sitemap URLs.
 * Add new pages here when creating new marketing routes.
 */
import { siteConfig } from './site.config'

function collectHrefs(): string[] {
  const hrefs = new Set<string>()

  // Home
  hrefs.add('/')

  // Nav items
  for (const item of siteConfig.navigation) {
    if (item.href && !item.href.startsWith('#')) hrefs.add(item.href)
    for (const child of item.children ?? []) {
      if (child.href) hrefs.add(child.href)
    }
  }

  // Footer links (indexable only). Legal texts live on the app (siteConfig.footer.legal): not in this sitemap.
  for (const col of siteConfig.footer.columns) {
    for (const link of col.links) {
      const path = link.href.split('#')[0] // '/help#contact' → '/help'
      // /blog and articles: added per language by server/api/__sitemap__/urls.get.ts
      if (path?.startsWith('/') && path !== '/blog') hrefs.add(path)
    }
  }

  return Array.from(hrefs).sort()
}

export const SITEMAP_URLS = collectHrefs()
