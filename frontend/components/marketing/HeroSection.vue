<script setup lang="ts">
import { heroVideos, videoRotationInterval } from '~/config/hero.config'
import { saasConfig } from '~/config/saas.config'

// Arguments marketing pour le carousel - utilise les clés directement
const marketingKeys = ['hero.carousel.arg1', 'hero.carousel.arg2', 'hero.carousel.arg3', 'hero.carousel.arg4']

// État du carousel
const currentIndex = ref(0)

// Rotation automatique toutes les 3 secondes
onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % marketingKeys.length
  }, 3000)
})
</script>

<template>
  <section class="relative h-screen min-h-[600px] overflow-hidden">
    <!-- Video Carousel Background -->
    <FeaturesVideoCarousel :videos="heroVideos" :interval="videoRotationInterval" />
    
    <!-- Contenu Hero (au-dessus de la vidéo) -->
    <div class="relative z-20 flex h-full items-center">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Hero Title -->
        <div class="text-center">
          <h1 class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
            {{ $t('hero.title') }}
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md sm:text-xl">
            {{ $t('hero.subtitle') }}
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            :href="saasConfig.signupUrl"
            class="inline-flex items-center justify-center rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500 w-full sm:w-auto"
          >
            {{ $t('hero.ctaPrimary') }}
          </a>
          <a
            :href="saasConfig.loginUrl"
            class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent w-full sm:w-auto"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {{ $t('hero.ctaSecondary') }}
          </a>
        </div>

        <!-- Marketing Arguments Carousel -->
        <div class="mt-12 flex items-center justify-center">
          <div class="relative w-80 h-14 overflow-hidden">
            <TransitionGroup
              name="slide"
              tag="div"
              class="relative w-full h-full"
            >
              <div
                v-for="(key, index) in marketingKeys"
                v-show="index === currentIndex"
                :key="index"
                class="absolute inset-0 flex items-center justify-center"
              >
                <span class="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-lg font-semibold text-white shadow-lg">
                  {{ $t(key) }}
                </span>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Transition slide : sort à gauche, entre par la droite */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
