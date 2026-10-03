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

  // Footer links (indexable only)
  for (const col of siteConfig.footer.columns) {
    for (const link of col.links) {
      // /blog excluded while empty (noindex in pages/blog.vue)
      if (link.href.startsWith('/') && link.href !== '/blog') hrefs.add(link.href)
    }
  }

  return Array.from(hrefs).sort()
}

export const SITEMAP_URLS = collectHrefs()
