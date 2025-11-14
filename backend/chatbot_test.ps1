# 🧪 Script de test pour le chatbot support (Windows PowerShell)
# Usage: .\chatbot_test.ps1

$API_URL = "http://localhost:8080/api/v1/ask"

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🤖 Tests du Chatbot Support" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Test 1: Question valide
Write-Host "📋 Test 1: Question valide" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$body1 = @{
    q = "Comment fonctionne votre service ?"
} | ConvertTo-Json

Invoke-RestMethod -Uri $API_URL -Method Post -Body $body1 -ContentType "application/json" | ConvertTo-Json
Write-Host ""
Write-Host ""

# Test 2: Question vide (devrait échouer)
Write-Host "📋 Test 2: Question vide (400 attendu)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$body2 = @{
    q = ""
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri $API_URL -Method Post -Body $body2 -ContentType "application/json" | ConvertTo-Json
} catch {
    Write-Host "Erreur (attendue): $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# Test 3: Champ manquant (devrait échouer)
Write-Host "📋 Test 3: Champ 'q' manquant (400 attendu)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$body3 = @{} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri $API_URL -Method Post -Body $body3 -ContentType "application/json" | ConvertTo-Json
} catch {
    Write-Host "Erreur (attendue): $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""
Write-Host ""

# Test 4: Question longue
Write-Host "📋 Test 4: Question détaillée" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$body4 = @{
    q = "Pouvez-vous m'expliquer en détail comment utiliser votre API et quelles sont les limitations ?"
} | ConvertTo-Json

Invoke-RestMethod -Uri $API_URL -Method Post -Body $body4 -ContentType "application/json" | ConvertTo-Json
Write-Host ""
Write-Host ""

# Test 5: Question avec caractères spéciaux
Write-Host "📋 Test 5: Question avec accents et ponctuation" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$body5 = @{
    q = "Où puis-je trouver la documentation ? Est-ce gratuit ?"
} | ConvertTo-Json

Invoke-RestMethod -Uri $API_URL -Method Post -Body $body5 -ContentType "application/json" | ConvertTo-Json
Write-Host ""
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Tests terminés" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
