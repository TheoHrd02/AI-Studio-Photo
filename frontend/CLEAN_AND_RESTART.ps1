# Script de nettoyage complet pour Windows PowerShell

Write-Host "🧹 Nettoyage complet en cours..." -ForegroundColor Cyan

# Arrêter le serveur
Get-Process | Where-Object { $_.CommandLine -like "*bun*dev*" } | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "✅ Serveur arrêté" -ForegroundColor Green

# Supprimer tous les caches
Remove-Item -Recurse -Force .nuxt -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force i18n -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\@nuxtjs\i18n -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\vue-i18n -ErrorAction SilentlyContinue
Write-Host "✅ Caches supprimés" -ForegroundColor Green

# Réinstaller les dépendances
Write-Host "📦 Réinstallation des dépendances..." -ForegroundColor Yellow
bun install

Write-Host ""
Write-Host "✅ Nettoyage terminé !" -ForegroundColor Green
Write-Host ""
Write-Host "Pour démarrer le serveur :" -ForegroundColor Cyan
Write-Host "  bun run dev" -ForegroundColor White

