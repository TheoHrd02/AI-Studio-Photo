<script setup lang="ts">
import { productDemoVideoUrl } from '~/config/demo.config'

const isPlaying = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const togglePlay = () => {
  if (!videoRef.value) return
  if (isPlaying.value) {
    videoRef.value.pause()
  }
  else {
    videoRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const onVideoEnded = () => {
  isPlaying.value = false
}
</script>

<template>
  <section class="py-12 md:py-16 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="text-center mb-10">
          <div class="inline-block px-4 py-2 bg-primary-500/10 rounded-full text-primary-500 font-semibold text-sm mb-4">
            {{ $t('productDemo.badge') }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {{ $t('productDemo.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ $t('productDemo.subtitle') }}
          </p>
        </div>

        <!-- Video container with play overlay -->
        <div
          class="relative aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-2xl ring-1 ring-gray-200/50 cursor-pointer group"
          @click="!isPlaying && togglePlay()"
        >
          <video
            ref="videoRef"
            :src="productDemoVideoUrl"
            class="w-full h-full object-cover"
            muted
            playsinline
            @ended="onVideoEnded"
            @click.stop="togglePlay"
          />

          <!-- Play overlay (hidden when playing) -->
          <Transition name="fade">
            <div
              v-show="!isPlaying"
              class="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/30"
            >
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110">
                <svg
                  class="h-10 w-10 text-primary-500 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </Transition>

          <!-- Duration hint -->
          <div
            v-show="!isPlaying"
            class="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
          >
            {{ $t('productDemo.watchHint') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
