<script setup lang="ts">
/**
 * Page légale rendue depuis les traductions : legal.{page}.title / description / updatedAt / sections.
 * Mini-format du texte des sections (pas de HTML dans les traductions) :
 *   paragraphes séparés par une ligne vide, lignes "- " = liste,
 *   **gras**, [à compléter] = champ surligné à remplir avant la mise en ligne.
 */
const props = defineProps<{
  page: 'legalNotice' | 'privacy' | 'terms' | 'cookies'
}>()

const { t, tm } = useI18n()

const sectionKeys = computed(() => Object.keys(tm(`legal.${props.page}.sections`) as Record<string, unknown>))

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const inline = (s: string) =>
  escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>')

const render = (text: string) =>
  text.split(/\n\s*\n/).map((block) => {
    const lines = block.trim().split('\n')
    return lines.every(l => l.startsWith('- '))
      ? `<ul>${lines.map(l => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`
      : `<p>${inline(lines.join(' '))}</p>`
  }).join('')

usePageSeo(() => ({ title: t(`legal.${props.page}.title`), description: t(`legal.${props.page}.description`) }))
</script>

<template>
  <div class="bg-white pt-32 pb-20">
    <article class="legal mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">
        {{ $t(`legal.${page}.title`) }}
      </h1>
      <p class="mt-3 text-sm text-gray-500">
        {{ $t('legal.updatedAt') }} {{ $t(`legal.${page}.updatedAt`) }}
      </p>
      <div class="mt-10 space-y-10 text-gray-700 leading-relaxed">
        <section
          v-for="key in sectionKeys"
          :key="key"
        >
          <h2>{{ $t(`legal.${page}.sections.${key}.title`) }}</h2>
          <!-- eslint-disable-next-line vue/no-v-html -- escaped in render() -->
          <div v-html="render($t(`legal.${page}.sections.${key}.body`))" />
        </section>
      </div>
    </article>
  </div>
</template>

<style>
/* Non scopé : le contenu des sections est injecté via v-html */
.legal h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 0.75rem;
}

.legal p + p,
.legal p + ul,
.legal ul + p {
  margin-top: 0.75rem;
}

.legal ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.legal mark {
  background: #fef3c7;
  color: #92400e;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}
</style>
