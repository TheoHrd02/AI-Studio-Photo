@echo off
echo 🧹 Nettoyage du frontend...
cd frontend
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
if exist .nuxt rmdir /s /q .nuxt
echo ✅ Frontend nettoyé

echo.
echo 📦 Installation des dépendances...
call npm install
echo ✅ Dépendances installées

echo.
echo 🐳 Arrêt des containers Docker...
cd ..
docker-compose down
echo ✅ Containers arrêtés

echo.
echo 🚀 Rebuild et démarrage des containers...
docker-compose up -d --build
echo ✅ Containers démarrés

echo.
echo 🎉 Terminé ! Votre application devrait être prête sur http://localhost:3000
pause
