<script setup lang="ts">
import type { CloudinaryUploadResult } from '~/composables/useCloudinary'

interface Props {
  folder?: string
  accept?: string
  type?: 'image' | 'video' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  folder: '',
  accept: 'image/*,video/*',
  type: 'auto',
})

const emit = defineEmits<{
  uploaded: [result: CloudinaryUploadResult]
  error: [error: Error]
}>()

const { uploadFile, uploadImage, uploadVideo } = useCloudinary()

const uploading = ref(false)
const progress = ref(0)
const uploadedUrl = ref('')
const error = ref<string | null>(null)

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  uploading.value = true
  progress.value = 0
  error.value = null
  uploadedUrl.value = ''

  try {
    // Simuler une progression
    const progressInterval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10
      }
    }, 200)

    let result: CloudinaryUploadResult

    // Upload selon le type spécifié
    if (props.type === 'image') {
      result = await uploadImage(file, props.folder)
    } else if (props.type === 'video') {
      result = await uploadVideo(file, props.folder)
    } else {
      result = await uploadFile(file, props.folder)
    }

    clearInterval(progressInterval)
    progress.value = 100

    uploadedUrl.value = result.secure_url
    emit('uploaded', result)

    // Reset après 3 secondes
    setTimeout(() => {
      progress.value = 0
      uploading.value = false
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Upload failed'
    emit('error', err instanceof Error ? err : new Error('Upload failed'))
    uploading.value = false
    progress.value = 0
  }
}

const resetUpload = () => {
  uploadedUrl.value = ''
  error.value = null
  progress.value = 0
}
</script>

<template>
  <div class="cloudinary-upload">
    <!-- Zone d'upload -->
    <div
      class="upload-zone"
      :class="{
        'upload-zone--uploading': uploading,
        'upload-zone--success': uploadedUrl && !uploading,
        'upload-zone--error': error,
      }"
    >
      <input
        type="file"
        :accept="accept"
        :disabled="uploading"
        @change="handleFileChange"
        class="file-input"
      />

      <!-- Icône et texte -->
      <div v-if="!uploading && !uploadedUrl && !error" class="upload-prompt">
        <svg class="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p class="upload-text">
          <span class="font-semibold">Cliquez pour uploader</span>
          ou glissez-déposez
        </p>
        <p class="upload-hint">PNG, JPG, MP4, WebM jusqu'à 100MB</p>
      </div>

      <!-- Progression -->
      <div v-if="uploading" class="upload-progress">
        <svg class="spinner" viewBox="0 0 50 50">
          <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        </svg>
        <p class="progress-text">Upload en cours... {{ progress }}%</p>
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: `${progress}%` }" />
        </div>
      </div>

      <!-- Succès -->
      <div v-if="uploadedUrl && !uploading" class="upload-success">
        <svg class="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="success-text">Upload réussi !</p>
        <button @click="resetUpload" class="reset-button">
          Uploader un autre fichier
        </button>
      </div>

      <!-- Erreur -->
      <div v-if="error" class="upload-error">
        <svg class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="error-text">{{ error }}</p>
        <button @click="resetUpload" class="reset-button">
          Réessayer
        </button>
      </div>
    </div>

    <!-- Prévisualisation -->
    <div v-if="uploadedUrl" class="preview-container">
      <p class="preview-label">URL Cloudinary :</p>
      <div class="url-display">
        <input
          :value="uploadedUrl"
          readonly
          class="url-input"
        />
        <button
          @click="() => navigator.clipboard.writeText(uploadedUrl)"
          class="copy-button"
          title="Copier l'URL"
        >
          <svg class="copy-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cloudinary-upload {
  @apply w-full;
}

.upload-zone {
  @apply relative flex items-center justify-center w-full min-h-[200px] px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg transition-all cursor-pointer hover:border-[#912efb] bg-gray-50;
}

.upload-zone--uploading {
  @apply border-[#912efb] bg-[#912efb]/10 cursor-not-allowed;
}

.upload-zone--success {
  @apply border-green-500 bg-green-50 cursor-default;
}

.upload-zone--error {
  @apply border-red-500 bg-red-50 cursor-default;
}

.file-input {
  @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed;
}

.upload-prompt {
  @apply flex flex-col items-center text-center;
}

.upload-icon {
  @apply w-12 h-12 text-gray-400 mb-3;
}

.upload-text {
  @apply text-sm text-gray-600;
}

.upload-hint {
  @apply text-xs text-gray-500 mt-1;
}

.upload-progress {
  @apply flex flex-col items-center;
}

.spinner {
  @apply w-12 h-12 animate-spin mb-3;
}

.spinner-path {
  @apply stroke-[#912efb];
  stroke-linecap: round;
  animation: spinner-dash 1.5s ease-in-out infinite;
}

@keyframes spinner-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.progress-text {
  @apply text-sm font-medium text-[#912efb] mb-2;
}

.progress-bar {
  @apply w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden;
}

.progress-bar-fill {
  @apply h-full bg-[#912efb] transition-all duration-300;
}

.upload-success {
  @apply flex flex-col items-center;
}

.success-icon {
  @apply w-12 h-12 text-green-500 mb-3;
}

.success-text {
  @apply text-sm font-medium text-green-700 mb-3;
}

.upload-error {
  @apply flex flex-col items-center;
}

.error-icon {
  @apply w-12 h-12 text-red-500 mb-3;
}

.error-text {
  @apply text-sm font-medium text-red-700 mb-3;
}

.reset-button {
  @apply px-4 py-2 text-sm font-medium text-white bg-[#912efb] rounded-lg hover:bg-[#7e1fe0] transition-colors;
}

.preview-container {
  @apply mt-4 p-4 bg-white border border-gray-200 rounded-lg;
}

.preview-label {
  @apply text-sm font-medium text-gray-700 mb-2;
}

.url-display {
  @apply flex gap-2;
}

.url-input {
  @apply flex-1 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#912efb];
}

.copy-button {
  @apply px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors;
}

.copy-icon {
  @apply w-5 h-5 text-gray-600;
}
</style>
