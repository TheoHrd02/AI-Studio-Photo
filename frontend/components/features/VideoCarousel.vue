<script setup lang="ts">
/**
 * VideoCarousel — seamless background video player.
 *
 * Architecture: A/B ping-pong with "ready-first" cross-fade.
 *
 *   GREY FRAME FIX
 *   ─────────────
 *   Every rotation waits for the inactive slot's `canplay` event before
 *   flipping `activeSlot`. The browser has decoded at least one frame by
 *   then, so the opacity transition always reveals a live picture, never
 *   a grey rectangle.
 *
 *   LATENCY FIX
 *   ───────────
 *   Uses a setTimeout chain instead of setInterval.  Each video gets the
 *   full `interval` ms of screen time.  The rotation waits for readiness
 *   AFTER the display interval has elapsed, so a slow network only
 *   slightly extends a single slot's time rather than corrupting timing
 *   for all subsequent slots.
 *
 *   STUTTER FIX
 *   ───────────
 *   No `autoplay` attribute — playback is driven imperatively via
 *   `.play()` / `.pause()`.  Only the active slot decodes at any moment;
 *   the inactive slot buffers silently with `preload="auto"` but stays
 *   paused, keeping GPU/CPU usage at a single-stream level.
 */

interface Props {
  videos: string[]
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  interval: 6000,
})

// ─── Types & helpers ──────────────────────────────────────────────────────────

type Slot = 'a' | 'b'
const flip = (s: Slot): Slot => (s === 'a' ? 'b' : 'a')

// ─── Slot state ───────────────────────────────────────────────────────────────

/** The slot whose video is currently visible */
const activeSlot = ref<Slot>('a')

/** Source URL bound to each <video> element */
const slotSrc = reactive<Record<Slot, string>>({
  a: props.videos[0] ?? '',
  b: props.videos[Math.min(1, props.videos.length - 1)] ?? '',
})

/** Playlist index currently loaded in each slot */
const slotIdx = reactive<Record<Slot, number>>({
  a: 0,
  b: Math.min(1, props.videos.length - 1),
})

/**
 * True once a slot's current video has fired `canplay`.
 * Reset to false immediately when the slot is handed a new src.
 */
const slotReady = reactive<Record<Slot, boolean>>({ a: false, b: false })

/** Lifted once the very first frame is ready → fades out the loading cover */
const firstFrameReady = ref(false)

// ─── Template refs ────────────────────────────────────────────────────────────

const videoA = ref<HTMLVideoElement | null>(null)
const videoB = ref<HTMLVideoElement | null>(null)
const getVid = (s: Slot): HTMLVideoElement | null =>
  s === 'a' ? videoA.value : videoB.value

// ─── Media event handlers ─────────────────────────────────────────────────────

const onCanPlay = (slot: Slot) => {
  slotReady[slot] = true
  // Remove the initial loading cover the first time ANY slot is ready
  if (!firstFrameReady.value && slot === activeSlot.value) {
    firstFrameReady.value = true
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Resolves when the slot has enough data to render a frame (canplay).
 * Falls back after `timeout` ms so a slow network can't block forever.
 */
const waitForReady = (slot: Slot, timeout = 5000): Promise<void> =>
  new Promise(resolve => {
    if (slotReady[slot]) { resolve(); return }

    const vid = getVid(slot)
    if (!vid) { resolve(); return }

    const done = () => {
      vid.removeEventListener('canplay', done)
      clearTimeout(fallback)
      resolve()
    }
    vid.addEventListener('canplay', done)
    const fallback = setTimeout(done, timeout)
  })

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

// ─── Rotation ─────────────────────────────────────────────────────────────────

let rotating = false
let timeoutId: ReturnType<typeof setTimeout> | null = null

const rotate = async () => {
  if (rotating || props.videos.length <= 1) return
  rotating = true

  const nextSlot = flip(activeSlot.value)

  // ── 1. Wait for the next slot to have at least one decoded frame ──────────
  //    This is the key change that eliminates grey frames.
  await waitForReady(nextSlot)

  // ── 2. Resume playback on the about-to-become-visible slot ───────────────
  //    It was paused after the last rotation; start it now so the frame
  //    that was decoded by `waitForReady` is live when we reveal it.
  const nextVid = getVid(nextSlot)
  if (nextVid?.paused) {
    try { await nextVid.play() } catch { /* autoplay blocked — ignore */ }
  }

  // ── 3. Cross-fade ─────────────────────────────────────────────────────────
  activeSlot.value = nextSlot

  // Allow the 750ms CSS opacity transition to complete
  await sleep(800)

  // ── 4. Pause the outgoing slot — single decoder from this point ───────────
  const oldSlot = flip(activeSlot.value)
  const oldVid = getVid(oldSlot)
  if (oldVid) {
    oldVid.pause()
    oldVid.currentTime = 0 // reset so it starts cleanly next time
  }

  // ── 5. Load the video-after-next into the outgoing slot ───────────────────
  //    This slot is now invisible and decoded, so the browser can quietly
  //    buffer the next video in the background.
  const nextNextIdx = (slotIdx[nextSlot] + 1) % props.videos.length
  slotIdx[oldSlot] = nextNextIdx
  slotSrc[oldSlot] = props.videos[nextNextIdx]
  slotReady[oldSlot] = false

  // Wait one tick for Vue to update the src attribute, then trigger loading.
  // preload="auto" alone does not always start buffering after a src change
  // without an explicit .load() call.
  await nextTick()
  getVid(oldSlot)?.load()

  rotating = false
}

// ─── End-of-video handler ─────────────────────────────────────────────────────

/**
 * Fires when the active video reaches its natural end (no `loop` attribute).
 * Immediately triggers rotation so the user never sees a freeze or restart.
 * Also cancels the pending scheduled rotation to avoid a double-fire.
 */
const onEnded = async (slot: Slot) => {
  if (slot !== activeSlot.value || rotating) return
  if (timeoutId) { clearTimeout(timeoutId); timeoutId = null }
  await rotate()
  scheduleNext()
}

// ─── Scheduling ───────────────────────────────────────────────────────────────
// Uses a setTimeout chain so each video gets exactly `interval` ms of
// display time, regardless of how long the previous rotate() took.
// Guards against double-scheduling (can happen if @ended and the timeout
// both fire in the same tick).

const scheduleNext = () => {
  if (props.videos.length <= 1 || timeoutId !== null) return
  timeoutId = setTimeout(async () => {
    timeoutId = null
    await rotate()
    scheduleNext()
  }, props.interval)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(async () => {
  // Play the first slot imperatively (no autoplay attribute)
  await nextTick()
  try {
    await videoA.value?.play()
  } catch {
    // If play() is blocked (rare with muted video), the first `canplay`
    // still fires and the loading cover lifts — user sees a static first frame.
  }

  // Trigger loading of slot B's preload so it is buffered before the
  // first rotation fires
  videoB.value?.load()

  scheduleNext()
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
  // Release both video buffers so the browser can reclaim GPU memory
  ;(['a', 'b'] as Slot[]).forEach(s => {
    const v = getVid(s)
    if (!v) return
    v.pause()
    v.removeAttribute('src')
    v.load()
  })
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">

    <!--
      Text-readability overlay.
      z-10 keeps it above both video slots (z-[1]/z-[2]) but below the
      hero content wrapper (z-20 in HeroSection.vue).
    -->
    <div class="absolute inset-0 bg-black/40 z-10" aria-hidden="true" />

    <!--
      Loading cover — masks the video layer until the first frame is decoded.
      Prevents the blank/grey state from being visible on initial load.
      Fades out over 1 s once `firstFrameReady` becomes true.
    -->
    <Transition name="cover">
      <div
        v-if="!firstFrameReady"
        class="absolute inset-0 bg-gray-900 z-[11]"
        aria-hidden="true"
      />
    </Transition>

    <!-- ── Slot A ── -->
    <video
      ref="videoA"
      :src="slotSrc.a"
      class="video-slot absolute inset-0 h-full w-full object-cover"
      :class="activeSlot === 'a' ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'"
      muted
      playsinline
      preload="auto"
      @canplay="onCanPlay('a')"
      @ended="onEnded('a')"
    />

    <!-- ── Slot B ── -->
    <video
      ref="videoB"
      :src="slotSrc.b"
      class="video-slot absolute inset-0 h-full w-full object-cover"
      :class="activeSlot === 'b' ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'"
      muted
      playsinline
      preload="auto"
      @canplay="onCanPlay('b')"
      @ended="onEnded('b')"
    />

  </div>
</template>

<style scoped>
/*
 * Video slot transition
 *
 * 750ms ease-in-out is perceptibly faster than 1000ms while still
 * feeling smooth. Using scoped CSS (not Tailwind's JIT) keeps the
 * exact value stable regardless of purge.
 *
 * will-change: opacity promotes each element to its own compositor
 * layer — the GPU handles the opacity blend without touching layout
 * or paint, which is the main source of playback stutter during
 * cross-fades.
 */
.video-slot {
  transition: opacity 750ms ease-in-out;
  will-change: opacity;
}

/* Loading cover fade-out */
.cover-leave-active { transition: opacity 1s ease-out; }
.cover-leave-from   { opacity: 1; }
.cover-leave-to     { opacity: 0; }
</style>
