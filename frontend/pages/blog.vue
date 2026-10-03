<script setup lang="ts">
definePageMeta({
  layout: 'marketing',
})

const { t } = useI18n()

// TODO(content): remove noindex and re-add /blog to the sitemap once articles exist
usePageSeo(() => ({ title: t('blog.title'), description: t('blog.subtitle'), noindex: true }))
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

      <div class="mt-16 text-center text-gray-500">
        <p>{{ $t('blog.empty') }}</p>
      </div>
    </div>
  </div>
</template>
