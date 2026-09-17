<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'
import { galleryItems, FALLBACK_IMAGE } from '~/config/visual-proof.config'

definePageMeta({
  layout: 'marketing',
})

useHead({
  title: 'Galerie - AI Studio Photo',
})

const videoLoadFailed = ref<Set<number>>(new Set())

function onImageError(e: Event) {
  const el = e.target as HTMLImageElement
  if (el && el.src !== FALLBACK_IMAGE) {
    el.src = FALLBACK_IMAGE
  }
}

function onVideoError(index: number) {
  videoLoadFailed.value = new Set([...videoLoadFailed.value, index])
}
</script>

<template>
  <div class="min-h-screen bg-white pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Title -->
      <div class="mx-auto max-w-4xl text-center mb-16">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          {{ $t('gallery.title') }}
        </h1>
        <p class="mt-6 text-xl text-gray-600">
          {{ $t('gallery.subtitle') }}
        </p>
      </div>

      <!-- Galerie -->
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="gallery-item"
          :class="[
            index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : '',
            index % 5 === 0 && index % 7 !== 0 ? 'md:row-span-2' : '',
          ]"
        >
          <div class="gallery-item-inner">
            <!-- Image (ou fallback si vidéo en erreur) -->
            <template v-if="item.type === 'image' || videoLoadFailed.has(index)">
              <img
                :src="item.type === 'image' ? item.src : FALLBACK_IMAGE"
                :alt="item.alt"
                class="gallery-media"
                loading="lazy"
                @error="onImageError"
              >
            </template>

            <!-- Vidéo -->
            <template v-else>
              <video
                :src="item.src"
                class="gallery-media"
                autoplay
                loop
                muted
                playsinline
                @error="() => onVideoError(index)"
              />
            </template>

            <!-- Overlay au hover -->
            <div class="gallery-overlay">
              <div class="gallery-overlay-content">
                <p class="text-sm font-semibold text-white">
                  {{ item.alt }}
                </p>
                <span
                  v-if="item.type === 'video'"
                  class="mt-1 inline-flex items-center gap-1 text-xs text-white/80"
                >
                  <svg
                    class="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Vidéo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center">
        <CommonCTAButton
          :href="saasConfig.signupUrl"
          variant="primary"
          size="lg"
        >
          {{ $t('cta.primary') }}
        </CommonCTAButton>
        <p class="mt-3 text-sm text-gray-500">
          {{ $t('cta.clarification') }}
        </p>
        <CommonRiskReversalChips class="mt-4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container de la galerie */
.gallery-item {
  aspect-ratio: 3/4;
  position: relative;
  cursor: pointer;
}

.gallery-item:nth-child(7n) {
  aspect-ratio: 3/2;
}

.gallery-item:nth-child(5n):not(:nth-child(7n)) {
  aspect-ratio: 3/5;
}

/* Inner wrapper pour l'effet */
.gallery-item-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: #f3f4f6;
  will-change: transform;
  transform: scale(1);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-item:hover .gallery-item-inner {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  z-index: 10;
}

/* Media (image/video) */
.gallery-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
  transform: scale(1);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-item:hover .gallery-media {
  transform: scale(1.1);
}

/* Overlay */
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  transform: translateY(10px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}

.gallery-item:hover .gallery-overlay-content {
  transform: translateY(0);
}

/* Performance optimizations */
@media (prefers-reduced-motion: no-preference) {
  .gallery-item-inner,
  .gallery-media {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000px;
    -webkit-perspective: 1000px;
  }
}

/* Désactiver les transitions si l'utilisateur préfère */
@media (prefers-reduced-motion: reduce) {
  .gallery-item-inner,
  .gallery-media,
  .gallery-overlay,
  .gallery-overlay-content {
    transition: none !important;
  }
}
</style>
