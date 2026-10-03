/**
 * Workaround: Ensure ~payloadReducers is initialized before revive-payload runs.
 * Fixes "Cannot set properties of undefined (setting 'NuxtError')" when ssrContext
 * is created in edge cases (proxy, Docker, etc.).
 */
export default defineNuxtPlugin({
  name: 'payload-context-init',
  enforce: 'pre',
  async setup(nuxtApp) {
    const ctx = nuxtApp.ssrContext
    if (ctx && !ctx['~payloadReducers']) {
      ;(ctx as Record<string, unknown>)['~payloadReducers'] = {}
    }
  },
})
