import { defineSitemapEventHandler } from '#imports'
import { SITEMAP_URLS } from '~/config/sitemap-urls'

export default defineSitemapEventHandler(() => {
  return SITEMAP_URLS.map(loc => ({ loc, lastmod: new Date() }))
})
