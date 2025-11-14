# 🚀 Installation Backend

## 📦 Installation des dépendances

```bash
# Depuis le dossier backend
cd backend

# Télécharger toutes les dépendances (incluant Cloudinary)
go mod tidy
go mod download

# Vérifier que tout est installé
go mod verify
```

## 🔧 Configuration

1. **Créer le fichier .env**
```bash
cp .env.example .env
```

2. **Remplir les credentials Cloudinary**
```env
CLOUDINARY_CLOUD_NAME=dfk9cemb0
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

## 🏃 Démarrage

### Option 1 : Avec Air (hot reload - recommandé pour dev)
```bash
air
```

### Option 2 : Avec go run
```bash
go run cmd/main.go
```

### Option 3 : Build puis exécuter
```bash
go build -o server cmd/main.go
./server
```

## ✅ Test de l'installation

Une fois le serveur démarré, testez :

```bash
# Test basique
curl http://localhost:8080/health

# Test Cloudinary
curl http://localhost:8080/api/v1/cloudinary/ping
```

Vous devriez voir :
```json
{
  "code": 200,
  "message": "Cloudinary connection successful"
}
```

## 🐛 Troubleshooting

### Erreur : "no required module provides package"
```bash
go mod tidy
go clean -modcache
go mod download
```

### Erreur : "Cloudinary connection failed"
Vérifiez que vos credentials sont corrects dans `.env`

### Port déjà utilisé
Changez le port dans `.env` :
```env
PORT=8081
```

## 📚 Structure créée

```
backend/
├── cmd/
│   └── main.go                     # Point d'entrée (✅ mis à jour)
├── internal/
│   ├── config/
│   │   └── cloudinary.go           # ✨ Configuration Cloudinary
│   ├── services/
│   │   └── cloudinary_service.go   # ✨ Service Cloudinary
│   └── handlers/
│       └── cloudinary_handler.go   # ✨ Handlers API
├── go.mod                          # ✅ Cloudinary SDK ajouté
├── .env.example                    # ✅ Credentials Cloudinary ajoutés
└── .env                            # À créer avec vos credentials
```

Tout est prêt ! 🎉
