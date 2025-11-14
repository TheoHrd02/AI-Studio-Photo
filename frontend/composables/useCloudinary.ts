export interface CloudinaryUploadResult {
  public_id: string
  url: string
  secure_url: string
  format: string
  width: number
  height: number
  bytes: number
  type: string
}

export interface CloudinaryResource {
  public_id: string
  format: string
  url: string
  secure_url: string
  width: number
  height: number
  bytes: number
  created_at: string
  type: string
}

export interface CloudinaryListResult {
  resources: CloudinaryResource[]
  next_cursor?: string
}

export const useCloudinary = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl || 'http://localhost:8080'

  /**
   * Upload un fichier (image ou vidéo) sur Cloudinary
   */
  const uploadFile = async (file: File, folder?: string): Promise<CloudinaryUploadResult> => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) {
      formData.append('folder', folder)
    }

    const { data, error } = await useFetch<{
      code: number
      message: string
      data: CloudinaryUploadResult
    }>(`${baseURL}/api/v1/cloudinary/upload`, {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      throw new Error(error.value.message || 'Failed to upload file')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Upload failed')
    }

    return data.value.data
  }

  /**
   * Upload une image sur Cloudinary
   */
  const uploadImage = async (file: File, folder: string = 'images'): Promise<CloudinaryUploadResult> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const { data, error } = await useFetch<{
      code: number
      message: string
      data: CloudinaryUploadResult
    }>(`${baseURL}/api/v1/cloudinary/upload/image`, {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      throw new Error(error.value.message || 'Failed to upload image')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Upload failed')
    }

    return data.value.data
  }

  /**
   * Upload une vidéo sur Cloudinary
   */
  const uploadVideo = async (file: File, folder: string = 'videos'): Promise<CloudinaryUploadResult> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const { data, error } = await useFetch<{
      code: number
      message: string
      data: CloudinaryUploadResult
    }>(`${baseURL}/api/v1/cloudinary/upload/video`, {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      throw new Error(error.value.message || 'Failed to upload video')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Upload failed')
    }

    return data.value.data
  }

  /**
   * Supprime une ressource de Cloudinary
   */
  const deleteResource = async (publicId: string, type: 'image' | 'video' = 'image'): Promise<void> => {
    const { data, error } = await useFetch<{
      code: number
      message: string
    }>(`${baseURL}/api/v1/cloudinary/resource/${publicId}?type=${type}`, {
      method: 'DELETE',
    })

    if (error.value) {
      throw new Error(error.value.message || 'Failed to delete resource')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Delete failed')
    }
  }

  /**
   * Liste toutes les images d'un dossier
   */
  const listImages = async (folder?: string, maxResults: number = 50, nextCursor?: string): Promise<CloudinaryListResult> => {
    const params = new URLSearchParams()
    if (folder) params.append('folder', folder)
    params.append('max_results', maxResults.toString())
    if (nextCursor) params.append('next_cursor', nextCursor)

    const { data, error } = await useFetch<{
      code: number
      message: string
      data: CloudinaryListResult
    }>(`${baseURL}/api/v1/cloudinary/images?${params.toString()}`)

    if (error.value) {
      throw new Error(error.value.message || 'Failed to list images')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Failed to list images')
    }

    return data.value.data
  }

  /**
   * Liste toutes les vidéos d'un dossier
   */
  const listVideos = async (folder?: string, maxResults: number = 50, nextCursor?: string): Promise<CloudinaryListResult> => {
    const params = new URLSearchParams()
    if (folder) params.append('folder', folder)
    params.append('max_results', maxResults.toString())
    if (nextCursor) params.append('next_cursor', nextCursor)

    const { data, error } = await useFetch<{
      code: number
      message: string
      data: CloudinaryListResult
    }>(`${baseURL}/api/v1/cloudinary/videos?${params.toString()}`)

    if (error.value) {
      throw new Error(error.value.message || 'Failed to list videos')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Failed to list videos')
    }

    return data.value.data
  }

  /**
   * Récupère une ressource par son public_id
   */
  const getResource = async (publicId: string, type: 'image' | 'video' = 'image'): Promise<CloudinaryResource> => {
    const { data, error } = await useFetch<{
      code: number
      message: string
      data: CloudinaryResource
    }>(`${baseURL}/api/v1/cloudinary/resource/${publicId}?type=${type}`)

    if (error.value) {
      throw new Error(error.value.message || 'Failed to get resource')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Failed to get resource')
    }

    return data.value.data
  }

  /**
   * Teste la connexion à Cloudinary
   */
  const testConnection = async (): Promise<boolean> => {
    try {
      const { data, error } = await useFetch<{
        code: number
        message: string
      }>(`${baseURL}/api/v1/cloudinary/ping`)

      if (error.value || !data.value || data.value.code !== 200) {
        return false
      }

      return true
    } catch {
      return false
    }
  }

  return {
    uploadFile,
    uploadImage,
    uploadVideo,
    deleteResource,
    listImages,
    listVideos,
    getResource,
    testConnection,
  }
}
