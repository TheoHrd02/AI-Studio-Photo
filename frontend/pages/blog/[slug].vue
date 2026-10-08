<script setup lang="ts">
import { articleLocale, articleSlug, blogAuthors } from '~/config/blog.config'
import { saasConfig } from '~/config/saas.config'
import { navFeatures } from '~/config/site.config'

definePageMeta({
  layout: 'marketing',
})

const route = useRoute()
const { t, locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const { public: { siteUrl } } = useRuntimeConfig()
const slug = String(route.params.slug)

const { data, error } = await useFetch('/api/blog/article', { query: { locale: locale.value, slug } })
if (error.value) throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
// Language switcher on an untranslated article (same slug, other locale): translation or blog index
if (data.value && 'redirect' in data.value) await navigateTo(localePath(data.value.redirect), { replace: true })

const page = computed(() => data.value && 'article' in data.value ? data.value : undefined)
const article = computed(() => page.value?.article)
const feature = computed(() => navFeatures.find(f => f.id === article.value?.feature))
const author = computed(() => article.value && blogAuthors[article.value.author])
const tocLinks = computed(() => article.value?.body.toc?.links ?? [])

usePageAlternates().value = {
  path: route.path,
  paths: Object.fromEntries((page.value?.translations ?? []).map(({ path }) => {
    const code = articleLocale(path)
    return [code, localePath(`/blog/${articleSlug(path)}`, code as typeof locale.value)]
  })),
}

// seo.title (frontmatter, optional): shorter <title> when the H1 is long
usePageSeo(() => ({ title: article.value?.seo?.title || article.value?.title, description: article.value?.description ?? '' }))
useSeoMeta({
  robots: 'max-image-preview:large', // large previews in Discover / image results
  ogType: 'article',
  articlePublishedTime: () => article.value?.date,
  articleModifiedTime: () => article.value?.updated ?? article.value?.date,
  ogImage: () => article.value?.image && `${siteUrl}${article.value.image}`,
  ogImageAlt: () => article.value?.imageAlt,
  twitterImage: () => article.value?.image && `${siteUrl}${article.value.image}`,
})

const jsonLd = () => {
  const a = article.value
  if (!a || !author.value) return []
  const url = `${siteUrl}${route.path}`
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': a.title,
      'description': a.description,
      'image': a.image ? [`${siteUrl}${a.image}`] : undefined,
      'datePublished': a.date,
      'dateModified': a.updated ?? a.date,
      'inLanguage': localeProperties.value.language,
      'mainEntityOfPage': url,
      'author': {
        '@type': 'Person',
        'name': author.value.name,
        'jobTitle': t(`blog.authors.${a.author}.role`),
        'sameAs': author.value.sameAs.length ? author.value.sameAs : undefined,
      },
      'publisher': { '@type': 'Organization', '@id': `${siteUrl}/#organization`, 'name': 'Glint Studio', 'logo': `${siteUrl}/icon-512.png` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': t('nav.home'), 'item': `${siteUrl}${localePath('/')}` },
        { '@type': 'ListItem', 'position': 2, 'name': t('blog.title'), 'item': `${siteUrl}${localePath('/blog')}` },
        { '@type': 'ListItem', 'position': 3, 'name': a.title, 'item': url },
      ],
    },
  ]
  if (a.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': a.faq.map(({ question, answer }) => ({
        '@type': 'Question',
        'name': question,
        'acceptedAnswer': { '@type': 'Answer', 'text': answer },
      })),
    })
  }
  return schemas
}

useHead(() => ({ script: jsonLd().map(jsonLdScript) }))
</script>

<template>
  <div
    v-if="article"
    class="bg-white pt-32 pb-20"
  >
    <article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <nav
        :aria-label="$t('blog.breadcrumb')"
        class="text-sm text-gray-500"
      >
        <NuxtLinkLocale
          to="/"
          class="hover:text-primary-500"
        >
          {{ $t('nav.home') }}
        </NuxtLinkLocale>
        <span class="mx-2">/</span>
        <NuxtLinkLocale
          to="/blog"
          class="hover:text-primary-500"
        >
          {{ $t('blog.title') }}
        </NuxtLinkLocale>
      </nav>

      <header class="mt-6">
        <p
          v-if="feature"
          class="text-sm font-semibold uppercase tracking-wide text-primary-500"
        >
          {{ $t(`nav.${feature.id}.label`) }}
        </p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {{ article.title }}
        </h1>
        <p class="mt-6 text-xl leading-relaxed text-gray-600">
          {{ article.description }}
        </p>
        <p class="mt-6 text-sm text-gray-500">
          {{ $t('blog.by') }} <span class="font-medium text-gray-900">{{ author?.name }}</span>
          · {{ $t('blog.published') }}
          <time :datetime="article.date">{{ formatArticleDate(article.date, locale) }}</time>
          <template v-if="article.updated && article.updated !== article.date">
            · {{ $t('blog.updated') }}
            <time :datetime="article.updated">{{ formatArticleDate(article.updated, locale) }}</time>
          </template>
        </p>
      </header>

      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.imageAlt ?? ''"
        width="1200"
        height="630"
        fetchpriority="high"
        class="mt-10 aspect-[1200/630] w-full rounded-2xl object-cover"
      >

      <aside
        v-if="article.takeaways?.length"
        class="mt-10 rounded-2xl border border-primary-200 bg-primary-50 p-6"
      >
        <h2 class="text-lg font-bold text-gray-900">
          {{ $t('blog.takeaways') }}
        </h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li
            v-for="item in article.takeaways"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </aside>

      <nav
        v-if="tocLinks.length > 2"
        :aria-label="$t('blog.toc')"
        class="mt-10 border-l-2 border-gray-200 pl-6"
      >
        <p class="font-semibold text-gray-900">
          {{ $t('blog.toc') }}
        </p>
        <ol class="mt-3 space-y-2 text-gray-600">
          <li
            v-for="link in tocLinks"
            :key="link.id"
          >
            <a
              :href="`#${link.id}`"
              class="hover:text-primary-500"
            >{{ link.text }}</a>
          </li>
        </ol>
      </nav>

      <ContentRenderer
        :value="article"
        :prose="false"
        class="article-body mt-10"
      />

      <section
        v-if="article.faq?.length"
        class="article-body mt-12"
      >
        <h2 id="faq">
          {{ $t('blog.faq') }}
        </h2>
        <template
          v-for="item in article.faq"
          :key="item.question"
        >
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </template>
      </section>

      <aside class="mt-12 rounded-2xl bg-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-wide text-gray-500">
          {{ $t('blog.aboutAuthor') }}
        </p>
        <p class="mt-2 font-bold text-gray-900">
          {{ author?.name }}
          <span class="font-normal text-gray-600">— {{ $t(`blog.authors.${article.author}.role`) }}</span>
        </p>
        <p class="mt-2 text-gray-600">
          {{ $t(`blog.authors.${article.author}.bio`) }}
        </p>
      </aside>

      <aside class="mt-8 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white">
        <p class="text-2xl font-bold">
          {{ feature ? $t(`nav.${feature.id}.label`) : $t('cta.finalSection.title') }}
        </p>
        <p class="mt-2 text-white/80">
          {{ feature ? $t(`nav.${feature.id}.description`) : $t('cta.finalSection.subtitle') }}
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <CommonCTAButton
            :href="saasConfig.signupUrl"
            variant="primary-inverted"
          >
            {{ $t('cta.primary') }}
          </CommonCTAButton>
          <NuxtLinkLocale
            v-if="feature"
            :to="feature.href"
            class="font-semibold text-white/90 hover:text-white"
          >
            {{ $t('cta.discover') }} →
          </NuxtLinkLocale>
        </div>
      </aside>
    </article>

    <section
      v-if="page?.related.length"
      class="mx-auto mt-20 max-w-5xl px-4 sm:px-6 lg:px-8"
    >
      <h2 class="text-2xl font-bold text-gray-900">
        {{ $t('blog.related') }}
      </h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <NuxtLinkLocale
          v-for="item in page.related"
          :key="item.path"
          :to="`/blog/${articleSlug(item.path)}`"
          class="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-primary-500 hover:shadow-lg"
        >
          <p class="font-bold text-gray-900 group-hover:text-primary-500">
            {{ item.title }}
          </p>
          <p class="mt-2 text-sm text-gray-600">
            {{ item.description }}
          </p>
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>

<style>
/* Not scoped: article HTML comes from ContentRenderer (plain tags, no Prose components) */
.article-body {
  color: var(--color-gray-700);
  font-size: 1.125rem;
  line-height: 1.8;
}

.article-body h2 {
  margin-top: 3rem;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-gray-900);
  scroll-margin-top: 6rem;
}

.article-body h3 {
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gray-900);
  scroll-margin-top: 6rem;
}

.article-body p,
.article-body ul,
.article-body ol,
.article-body table,
.article-body blockquote,
.article-body img {
  margin-top: 1.25rem;
}

.article-body h2 + *,
.article-body h3 + * { /* after the generic margins above: wins on equal specificity */
  margin-top: 0.75rem;
}

.article-body ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.article-body ol {
  list-style: decimal;
  padding-left: 1.5rem;
}

.article-body li + li {
  margin-top: 0.5rem;
}

.article-body a {
  color: var(--color-primary-600);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.article-body strong {
  font-weight: 600;
  color: var(--color-gray-900);
}

.article-body img {
  width: 100%;
  border-radius: 1rem;
}

.article-body blockquote {
  border-left: 3px solid var(--color-primary-500);
  padding-left: 1.25rem;
  font-style: italic;
}

.article-body table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

/* Wide tables scroll inside the column instead of the page */
@media (max-width: 640px) {
  .article-body table {
    display: block;
    overflow-x: auto;
  }
}

.article-body th,
.article-body td {
  border: 1px solid var(--color-gray-200);
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.article-body th {
  background: var(--color-gray-50);
  font-weight: 600;
  color: var(--color-gray-900);
}
</style>
