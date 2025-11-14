<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'marketing',
})

useHead({
  title: t('auth.signup.title') + ' - AI Studio Photo',
})

const router = useRouter()
const { register, loginWithGoogle } = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const isLoading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = t('errors.passwordMismatch', 'Les mots de passe ne correspondent pas')
    return
  }

  if (form.password.length < 8) {
    error.value = t('errors.passwordTooShort', 'Le mot de passe doit contenir au moins 8 caractères')
    return
  }

  isLoading.value = true

  try {
    await register(form.email, form.password, form.name)
    await router.push('/app')
  } catch (err: any) {
    error.value = err.message || t('errors.generic')
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = async () => {
  error.value = ''
  // await loginWithGoogle()
  error.value = 'Google OAuth à implémenter côté backend'
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">{{ $t('auth.signup.title') }}</h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ $t('auth.signup.subtitle') }}
          <NuxtLink to="/login" class="font-medium text-[#912efb] hover:text-[#7e1fe0]">
            {{ $t('auth.signup.loginLink') }}
          </NuxtLink>
        </p>
      </div>

      <div class="mt-8 rounded-lg bg-white px-8 py-10 shadow">
        <div v-if="error" class="mb-4 rounded-lg bg-red-50 p-4">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>

        <button
          @click="handleGoogleLogin"
          type="button"
          class="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {{ $t('auth.signup.withGoogle') }}
        </button>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">{{ $t('common.or', 'ou') }}</span>
          </div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.signup.name') }}
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#912efb] focus:outline-none focus:ring-[#912efb]"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.signup.email') }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#912efb] focus:outline-none focus:ring-[#912efb]"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.signup.password') }}
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#912efb] focus:outline-none focus:ring-[#912efb]"
            />
            <p class="mt-1 text-xs text-gray-500">{{ $t('auth.signup.passwordHint') }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.signup.confirmPassword') }}
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#912efb] focus:outline-none focus:ring-[#912efb]"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center rounded-lg bg-[#912efb] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#7e1fe0] focus:outline-none focus:ring-2 focus:ring-[#912efb] focus:ring-offset-2 disabled:opacity-50"
          >
            <span v-if="!isLoading">{{ $t('auth.signup.submit') }}</span>
            <span v-else>{{ $t('auth.signup.loading') }}</span>
          </button>

          <p class="text-xs text-center text-gray-500">
            {{ $t('auth.signup.terms') }}
            <NuxtLink to="/terms" class="text-[#912efb] hover:text-[#7e1fe0]">{{ $t('auth.signup.termsLink') }}</NuxtLink>
            {{ $t('auth.signup.and') }}
            <NuxtLink to="/privacy" class="text-[#912efb] hover:text-[#7e1fe0]">{{ $t('auth.signup.privacyLink') }}</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
