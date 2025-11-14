<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Dashboard - AI Studio Photo',
})

const { user, logout } = useAuth()
const router = useRouter()
const isLoggingOut = ref(false)

const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    await logout()
    await router.push('/')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">
          Bienvenue, {{ user?.name || user?.email }}
        </p>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">Informations du compte</h2>
          <button
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {{ isLoggingOut ? 'Déconnexion...' : 'Se déconnecter' }}
          </button>
        </div>
        <div class="mt-4 space-y-2">
          <p class="text-gray-600"><span class="font-medium">Email:</span> {{ user?.email }}</p>
          <p class="text-gray-600"><span class="font-medium">Rôle:</span> {{ user?.role }}</p>
          <p class="text-gray-600"><span class="font-medium">Membre depuis:</span> {{ new Date(user?.createdAt || '').toLocaleDateString('fr-FR') }}</p>
        </div>
      </div>

      <div class="mt-8 text-gray-500">
        <p>Espace application à développer...</p>
      </div>
    </div>
  </div>
</template>
