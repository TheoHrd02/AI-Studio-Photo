<script setup lang="ts">
definePageMeta({
  layout: 'marketing',
})

useHead({
  title: 'Galerie - AI Studio Photo',
})

// Mélange d'images et vidéos pour la galerie
const galleryItems = [
  { type: 'image', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop', alt: 'Produit 1' },
  { type: 'video', src: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4', alt: 'Vidéo produit 1' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop', alt: 'Produit 2' },
  { type: 'video', src: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-2_wx3qic.mp4', alt: 'Produit 3' },
  { type: 'video', src: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-3_cz26fe.mp4', alt: 'Vidéo produit 2' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=800&fit=crop', alt: 'Produit 4' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop', alt: 'Produit 5' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop', alt: 'Produit 6' },
  { type: 'video', src: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-2_wx3qic.mp4', alt: 'Vidéo produit 3' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop', alt: 'Produit 7' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=800&fit=crop', alt: 'Produit 8' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&h=800&fit=crop', alt: 'Produit 9' },
  { type: 'video', src: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-4_upmywa.mp4', alt: 'Produit 10' },
  { type: 'video', src: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-2_wx3qic.mp4', alt: 'Produit 11' },
]
</script>

<template>
  <div class="min-h-screen bg-white pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Title -->
      <div class="mx-auto max-w-4xl text-center mb-16">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Retrouvez des exemples de nos photos
        </h1>
        <p class="mt-6 text-xl text-gray-600">
          Découvrez la qualité de nos créations IA
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
            index % 5 === 0 && index % 7 !== 0 ? 'md:row-span-2' : ''
          ]"
        >
          <div class="gallery-item-inner">
            <!-- Image -->
            <template v-if="item.type === 'image'">
              <img
                :src="item.src"
                :alt="item.alt"
                class="gallery-media"
                loading="lazy"
              />
            </template>

            <!-- Vidéo -->
            <template v-else>
              <video
                :src="item.src"
                :alt="item.alt"
                class="gallery-media"
                autoplay
                loop
                muted
                playsinline
              />
            </template>

            <!-- Overlay au hover -->
            <div class="gallery-overlay">
              <div class="gallery-overlay-content">
                <p class="text-sm font-semibold text-white">{{ item.alt }}</p>
                <span v-if="item.type === 'video'" class="mt-1 inline-flex items-center gap-1 text-xs text-white/80">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
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
        <NuxtLink
          to="/app"
          class="inline-flex items-center rounded-lg bg-[#912efb] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#7e1fe0] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#912efb] ring-offset-2"
        >
          Créer mes propres visuels
        </NuxtLink>
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

