/**
 * Lightweight scroll-reveal composable using the native IntersectionObserver API.
 * No third-party library. SSR-safe (observer runs only on client via onMounted).
 *
 * Usage:
 *   const r = useReveal()
 *   <section :ref="r.el" :class="r.cls('duration-700')">…</section>
 *
 *   For staggered children, bind :style="`transition-delay:${i*100}ms`" on each child
 *   and apply the same r.revealed toggle on their classes.
 */
export function useReveal(threshold = 0.12) {
  const el = ref<HTMLElement | null>(null)
  const revealed = ref(false)

  onMounted(() => {
    if (!el.value) return

    if (typeof IntersectionObserver === 'undefined') {
      revealed.value = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed.value = true
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin: '-40px 0px' },
    )

    observer.observe(el.value)
    onUnmounted(() => observer.disconnect())
  })

  /**
   * Returns Tailwind classes for the reveal transition.
   * @param extra  Additional Tailwind duration/ease classes, e.g. 'duration-700 ease-out'
   */
  const cls = (extra = 'duration-700 ease-out') =>
    `transition-all ${extra} ${revealed.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`

  return { el, revealed, cls }
}
