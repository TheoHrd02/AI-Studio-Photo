<script setup lang="ts">
import { articleSlug } from '~/config/blog.config'

definePageMeta({
  layout: 'marketing',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const { data } = await useFetch('/api/blog/articles', { query: { locale: locale.value } })

const articles = computed(() => data.value?.articles ?? [])

// Indexed (and listed as hreflang alternate) only in languages that have articles
usePageAlternates().value = {
  path: route.path,
  paths: Object.fromEntries((data.value?.locales ?? []).map(code => [code, localePath('/blog', code as typeof locale.value)])),
}
usePageSeo(() => ({ title: t('blog.title'), description: t('blog.subtitle'), noindex: !articles.value.length }))
</script>

<template>
  <div class="bg-white pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900">
          {{ $t('blog.title') }}
        </h1>
        <p class="mt-4 text-xl text-gray-600">
          {{ $t('blog.subtitle') }}
        </p>
      </div>

      <div
        v-if="articles.length"
        class="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLinkLocale
          v-for="article in articles"
          :key="article.path"
          :to="`/blog/${articleSlug(article.path)}`"
          class="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-primary-500 hover:shadow-xl"
        >
          <img
            v-if="article.image"
            :src="article.image"
            :alt="article.imageAlt ?? ''"
            width="1200"
            height="630"
            loading="lazy"
            class="aspect-[1200/630] w-full object-cover"
          >
          <div class="flex flex-1 flex-col p-6">
            <p
              v-if="article.feature"
              class="text-xs font-semibold uppercase tracking-wide text-primary-500"
            >
              {{ $t(`nav.${article.feature}.label`) }}
            </p>
            <h2 class="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-500">
              {{ article.title }}
            </h2>
            <p class="mt-3 flex-1 text-gray-600">
              {{ article.description }}
            </p>
            <time
              :datetime="article.date"
              class="mt-4 text-sm text-gray-500"
            >
              {{ formatArticleDate(article.date, locale) }}
            </time>
          </div>
        </NuxtLinkLocale>
      </div>

      <div
        v-else
        class="mt-16 text-center text-gray-500"
      >
        <p>{{ $t('blog.empty') }}</p>
      </div>
    </div>
  </div>
</template>
