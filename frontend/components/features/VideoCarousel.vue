<script setup lang="ts">
interface Props {
  videos: string[]
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  interval: 5000,
})

const currentVideoIndex = ref(0)
const isTransitioning = ref(false)
const videoRefs = ref<HTMLVideoElement[]>([])

// Auto-rotation des vidéos
const rotateVideo = () => {
  isTransitioning.value = true
  
  setTimeout(() => {
    currentVideoIndex.value = (currentVideoIndex.value + 1) % props.videos.length
    isTransitioning.value = false
  }, 1000)
}

// Setup interval pour la rotation
let intervalId: NodeJS.Timeout | null = null

onMounted(() => {
  intervalId = setInterval(rotateVideo, props.interval)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

// Preload de la prochaine vidéo pour transition fluide
const nextVideoIndex = computed(() => (currentVideoIndex.value + 1) % props.videos.length)
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <!-- Overlay sombre pour améliorer la lisibilité du texte -->
    <div class="absolute inset-0 bg-black/40 z-10" />
    
    <!-- Vidéos avec transition -->
    <div 
      v-for="(video, index) in videos" 
      :key="video"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="{
        'opacity-100 z-[1]': index === currentVideoIndex && !isTransitioning,
        'opacity-0 z-0': index !== currentVideoIndex || isTransitioning,
      }"
    >
      <video
        :ref="el => { if (el) videoRefs[index] = el as HTMLVideoElement }"
        :src="video"
        class="h-full w-full object-cover"
        autoplay
        loop
        muted
        playsinline
        :preload="index === currentVideoIndex || index === nextVideoIndex ? 'auto' : 'none'"
      />
    </div>
  </div>
</template>
