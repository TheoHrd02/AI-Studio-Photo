// CSP with a per-request nonce: Nuxt injects inline scripts (window.__NUXT__, color mode)
// that a plain `script-src 'self'` blocks, which prevents hydration. SSR only — a static
// `nuxt generate` build would need hashes instead.
const directives = (nonce: string) => [
  'default-src \'self\'',
  `script-src 'self' 'nonce-${nonce}'`,
  'style-src \'self\' \'unsafe-inline\'',
  'font-src \'self\'',
  'img-src \'self\' data: blob: https://res.cloudinary.com https://images.unsplash.com https://placehold.co',
  'media-src \'self\' blob: https://res.cloudinary.com https://videos.pexels.com',
  'connect-src \'self\'',
  'frame-ancestors \'none\'',
  'base-uri \'self\'',
  'form-action \'self\'',
  'object-src \'none\'',
].join('; ')

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const nonce = crypto.randomUUID().replaceAll('-', '')
    const addNonce = (chunk: string) => chunk.replace(/<script(?![^>]*\snonce=)/g, `<script nonce="${nonce}"`)

    html.head = html.head.map(addNonce)
    html.bodyPrepend = html.bodyPrepend.map(addNonce)
    html.body = html.body.map(addNonce)
    html.bodyAppend = html.bodyAppend.map(addNonce)

    setResponseHeader(event, 'Content-Security-Policy', directives(nonce))
  })
})
