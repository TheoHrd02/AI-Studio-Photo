// Signale à Bing (et aux autres moteurs IndexNow, dont l'index sert à ChatGPT search / Copilot)
// les URL nouvelles ou modifiées. À lancer après un déploiement (Google ne lit pas IndexNow).
//   pnpm indexnow               → URL du sitemap en ligne dont lastmod date de moins de 7 jours
//   pnpm indexnow <url> [...]   → ces URL (ex. un article supprimé, pour qu'il soit retiré)
//   --dry-run                   → affiche les URL sans rien envoyer
// Clé : public/<clé>.txt (publique par conception, sert à prouver qu'on contrôle le domaine).
import { readdirSync } from 'node:fs'

const site = (process.env.NUXT_PUBLIC_SITE_URL || 'https://glintstudio.ai').replace(/\/$/, '')
const keyFile = readdirSync(new URL('../public/', import.meta.url)).find(f => /^[0-9a-f]{32}\.txt$/.test(f))
if (!keyFile) throw new Error('Clé IndexNow introuvable dans public/')
const key = keyFile.slice(0, -4)

const fetchText = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return res.text()
}

async function recentSitemapUrls(days = 7) {
  const since = Date.now() - days * 86_400_000
  const index = await fetchText(`${site}/sitemap_index.xml`)
  const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  const urls = []
  for (const sitemap of sitemaps) {
    for (const [, block] of (await fetchText(sitemap)).matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]
      const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]
      if (loc && lastmod && Date.parse(lastmod) >= since) urls.push(loc)
    }
  }
  return urls
}

const args = process.argv.slice(2).filter(a => a !== '--dry-run')
const urlList = args.length ? args : await recentSitemapUrls()
if (!urlList.length || process.argv.includes('--dry-run')) {
  console.log(urlList.length ? urlList.join('\n') : 'Aucune URL modifiée ces 7 derniers jours.')
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
})
console.log(`IndexNow HTTP ${res.status} (200/202 = reçu) pour ${urlList.length} URL :\n${urlList.join('\n')}`)
if (!res.ok) process.exit(1)
