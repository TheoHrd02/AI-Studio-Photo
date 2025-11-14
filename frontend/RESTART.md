# Instructions pour redémarrer après suppression de i18n

## Étapes à suivre :

1. **Arrêter le serveur** (Ctrl+C dans le terminal du serveur)

2. **Supprimer les dossiers de cache et i18n** :
```bash
cd frontend
rm -rf .nuxt i18n node_modules/@nuxtjs/i18n
```

Ou sous Windows PowerShell :
```powershell
cd frontend
Remove-Item -Recurse -Force .nuxt, i18n, node_modules/@nuxtjs -ErrorAction SilentlyContinue
```

3. **Réinstaller les dépendances** :
```bash
bun install
```

4. **Redémarrer le serveur** :
```bash
bun run dev
```

## Ce qui a été fait :

✅ Supprimé @nuxtjs/i18n de nuxt.config.ts
✅ Supprimé @nuxtjs/i18n de package.json
✅ Créé un système de traduction simple avec :
  - `composables/useTranslation.ts` - Logique de traduction
  - `composables/useI18n.ts` - Alias pour compatibilité
  - `plugins/translation.ts` - Plugin global
  - `types/translation.d.ts` - Types TypeScript

✅ Les fichiers JSON de traduction sont conservés dans `locales/`

## Utilisation dans le code :

Le code existant continue de fonctionner :
- `const { t } = useI18n()` dans les composants
- `{{ $t('hero.title') }}` dans les templates

