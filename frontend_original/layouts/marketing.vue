<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <MarketingAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <MarketingAppFooter />
  </div>
</template>
