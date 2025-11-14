# 🌐 Configuration Cloudinary - Guide Complet

## 📋 Vue d'ensemble

Ce guide explique comment utiliser l'intégration Cloudinary complète pour uploader, supprimer et gérer vos images et vidéos.

## 🔧 Installation et Configuration

### 1️⃣ Backend (Go)

#### Installation des dépendances

```bash
cd backend
go mod tidy
go mod download
```

Cela installera automatiquement le SDK Cloudinary `github.com/cloudinary/cloudinary-go/v2`.

#### Configuration des variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```bash
cd backend
cp .env.example .env
```

Remplissez vos credentials Cloudinary :

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dfk9cemb0
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

**Comment obtenir ces credentials ?**
1. Allez sur [Cloudinary Dashboard](https://cloudinary.com/console)
2. Dans "Account Details", copiez :
   - Cloud name
   - API Key
   - API Secret

### 2️⃣ Frontend (Nuxt 3)

Aucune configuration spéciale n'est nécessaire ! Le composable `useCloudinary` est prêt à l'emploi.

## 🚀 Démarrage

### Backend

```bash
cd backend
go run cmd/main.go
```

Ou avec Air (hot reload) :

```bash
cd backend
air
```

Le serveur démarre sur `http://localhost:8080`

### Frontend

```bash
cd frontend
npm run dev
```

Le frontend démarre sur `http://localhost:3000`

## 📡 API Routes Backend

### Test de connexion
```http
GET /api/v1/cloudinary/ping
```

### Upload
```http
POST /api/v1/cloudinary/upload
POST /api/v1/cloudinary/upload/image
POST /api/v1/cloudinary/upload/video
```

**Body (multipart/form-data):**
- `file`: Le fichier à uploader
- `folder`: (optionnel) Dossier de destination

**Exemple de réponse:**
```json
{
  "code": 200,
  "message": "File uploaded successfully",
  "data": {
    "public_id": "hero-1_ngveqt",
    "url": "http://res.cloudinary.com/...",
    "secure_url": "https://res.cloudinary.com/...",
    "format": "mp4",
    "width": 1920,
    "height": 1080,
    "bytes": 5242880,
    "type": "video"
  }
}
```

### Liste des ressources
```http
GET /api/v1/cloudinary/images?folder=images&max_results=50
GET /api/v1/cloudinary/videos?folder=videos&max_results=50
```

### Récupération d'une ressource
```http
GET /api/v1/cloudinary/resource/:public_id?type=image
```

### Suppression
```http
DELETE /api/v1/cloudinary/resource/:public_id?type=video
```

## 🎨 Utilisation Frontend (Nuxt 3)

### Dans un composant Vue

```vue
<script setup lang="ts">
const { 
  uploadImage, 
  uploadVideo, 
  listVideos, 
  deleteResource 
} = useCloudinary()

const uploadFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  try {
    // Upload automatique (détecte image ou vidéo)
    const result = await uploadImage(file, 'mon-dossier')
    console.log('Uploaded:', result.secure_url)
  } catch (error) {
    console.error('Upload failed:', error)
  }
}

const loadVideos = async () => {
  try {
    const result = await listVideos('', 10)
    console.log('Videos:', result.resources)
  } catch (error) {
    console.error('Failed to load videos:', error)
  }
}

const removeVideo = async (publicId: string) => {
  try {
    await deleteResource(publicId, 'video')
    console.log('Video deleted')
  } catch (error) {
    console.error('Delete failed:', error)
  }
}
</script>

<template>
  <div>
    <input type="file" @change="uploadFile" accept="image/*,video/*" />
    <button @click="loadVideos">Charger les vidéos</button>
  </div>
</template>
```

## 📚 Méthodes disponibles

### `uploadFile(file: File, folder?: string)`
Upload automatique (détecte si c'est une image ou vidéo).

### `uploadImage(file: File, folder?: string)`
Upload spécifique pour les images.

### `uploadVideo(file: File, folder?: string)`
Upload spécifique pour les vidéos.

### `deleteResource(publicId: string, type: 'image' | 'video')`
Supprime une ressource.

### `listImages(folder?: string, maxResults?: number, nextCursor?: string)`
Liste toutes les images.

### `listVideos(folder?: string, maxResults?: number, nextCursor?: string)`
Liste toutes les vidéos.

### `getResource(publicId: string, type: 'image' | 'video')`
Récupère les infos d'une ressource spécifique.

### `testConnection()`
Teste la connexion à Cloudinary.

## 🎬 Exemple : Upload avec Preview

```vue
<script setup lang="ts">
const { uploadVideo } = useCloudinary()
const uploading = ref(false)
const videoUrl = ref('')

const handleUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  uploading.value = true
  
  try {
    const result = await uploadVideo(file, 'hero-videos')
    videoUrl.value = result.secure_url
    console.log('✅ Upload réussi:', result)
  } catch (error) {
    console.error('❌ Upload échoué:', error)
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="upload-zone">
    <input 
      type="file" 
      @change="handleUpload" 
      accept="video/*"
      :disabled="uploading"
    />
    
    <div v-if="uploading">
      <p>Upload en cours...</p>
    </div>
    
    <video v-if="videoUrl" :src="videoUrl" controls class="mt-4" />
  </div>
</template>
```

## 🔐 Sécurité

### Backend (Routes protégées)

Pour protéger vos routes (authentification requise), ajoutez un middleware :

```go
// Dans main.go
cloudinary := v1.Group("/cloudinary")
cloudinary.Use(authMiddleware()) // Middleware d'authentification
{
    cloudinary.POST("/upload", cloudinaryHandler.UploadFile)
    // ...
}
```

### Upload côté client vs serveur

**Option 1 : Upload via API (recommandé)**
- ✅ Sécurisé
- ✅ Contrôle total
- ✅ Validation serveur

**Option 2 : Upload direct (signed upload)**
- ⚡ Plus rapide
- 🔒 Nécessite signature

## 📊 Limites et Quotas

Cloudinary Free Plan :
- 25 GB de stockage
- 25 GB de bande passante/mois
- 25,000 transformations/mois

## 🐛 Troubleshooting

### Erreur : "Cloudinary connection failed"

Vérifiez vos credentials dans `.env` :
```bash
# Backend
cd backend
cat .env | grep CLOUDINARY
```

### Erreur : "CORS policy"

Vérifiez que `CORS_ORIGINS` dans `.env` inclut votre frontend :
```env
CORS_ORIGINS=http://localhost:3000
```

### Upload échoue sans erreur

1. Vérifiez la taille du fichier (max 100MB en free tier)
2. Vérifiez le format du fichier
3. Vérifiez les logs backend

### Les vidéos ne se chargent pas

1. Vérifiez que les URLs sont correctes dans `hero.config.ts`
2. Testez l'URL directement dans le navigateur
3. Vérifiez que les vidéos sont `public` sur Cloudinary

## 📝 Structure des URLs Cloudinary

```
https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{version}/{public_id}.{format}
```

Exemple :
```
https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-1_ngveqt.mp4
```

- `cloud_name`: dfk9cemb0
- `resource_type`: video
- `version`: v1760031098
- `public_id`: hero-1_ngveqt
- `format`: mp4

## 🎯 Transformations Cloudinary

Vous pouvez transformer vos images/vidéos directement dans l'URL :

```typescript
// Redimensionner une image
const url = 'https://res.cloudinary.com/dfk9cemb0/image/upload/w_500,h_500,c_fill/sample.jpg'

// Optimiser automatiquement
const url = 'https://res.cloudinary.com/dfk9cemb0/image/upload/q_auto,f_auto/sample.jpg'

// Appliquer un filtre
const url = 'https://res.cloudinary.com/dfk9cemb0/image/upload/e_grayscale/sample.jpg'
```

## 🚀 En Production

1. **Utilisez HTTPS** pour toutes les URLs
2. **Activez les signed uploads** pour plus de sécurité
3. **Configurez un CDN** (Cloudinary inclut déjà un CDN global)
4. **Optimisez vos assets** avec `q_auto` et `f_auto`
5. **Mettez en cache** les URLs côté client

## 📚 Ressources

- [Documentation Cloudinary](https://cloudinary.com/documentation)
- [SDK Go Cloudinary](https://github.com/cloudinary/cloudinary-go)
- [Transformations Guide](https://cloudinary.com/documentation/image_transformations)

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées en production
- [ ] Limites de taille de fichier définies
- [ ] Routes d'upload protégées par authentification
- [ ] Validation des types de fichiers
- [ ] Gestion des erreurs et logs
- [ ] Tests de charge effectués
- [ ] CDN configuré
- [ ] Backup des assets critiques

Votre intégration Cloudinary est maintenant **complète et prête pour la production** ! 🎉
