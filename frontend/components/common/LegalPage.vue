<script setup lang="ts">
/**
 * Layout partagé des pages légales.
 * Les passages entre <mark> sont des champs à compléter avant la mise en ligne.
 */
const props = defineProps<{
  title: string
  description: string
  /** Date de dernière mise à jour, ex. "3 octobre 2026" */
  updatedAt: string
}>()

useHead({ title: `${props.title} – AI Studio Photo` })
useSeoMeta({ description: props.description })
</script>

<template>
  <div class="bg-white pt-32 pb-20">
    <article class="legal mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">
        {{ title }}
      </h1>
      <p class="mt-3 text-sm text-gray-500">
        Dernière mise à jour : {{ updatedAt }}
      </p>
      <div class="mt-10 space-y-10 text-gray-700 leading-relaxed">
        <slot />
      </div>
    </article>
  </div>
</template>

<style>
/* Non scopé : stylise le contenu fourni par les pages via le slot */
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

.legal a {
  color: var(--color-primary-600);
  text-decoration: underline;
}

.legal mark {
  background: #fef3c7;
  color: #92400e;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}
</style>
