# 🌍 Inventaire i18n - Textes à traduire

## ✅ Configuration

- **Langues** : Français (défaut) + Anglais
- **Stratégie** : `prefix_except_default` (FR sans préfixe, EN avec `/en`)
- **Détection** : Cookie + détection navigateur
- **Module** : `@nuxtjs/i18n` v8.5.5

---

## 📋 Inventaire complet des textes

### 🏠 **Homepage (index.vue)**

#### Hero Section
- [x] Titre principal
- [x] Sous-titre
- [x] Bouton CTA primaire
- [x] Bouton CTA secondaire (Google)
- [x] Arguments marketing carousel (4 items)

#### Section "Comment ça marche"
- [x] Badge
- [x] Titre
- [x] 3 étapes (titre + description)
- [x] Bouton CTA

#### Section Features
- [x] Titre section
- [x] Sous-titre
- [x] 3 features (titre + description + stats)
- [x] Bouton "Découvrir"

#### Section Tutoriel
- [x] Badge
- [x] Titre
- [x] Sous-titre
- [x] 4 étapes détaillées (titre + description + 3 features chacune)
- [x] CTA final (titre + sous-titre + 2 boutons)

#### Social Proof
- [x] 4 métriques (nombre + label)

---

### 🔐 **Pages d'authentification**

#### Login (login.vue)
- [x] Titre
- [x] Sous-titre + lien inscription
- [x] Labels formulaire (email, password)
- [x] Lien "Mot de passe oublié"
- [x] Bouton submit
- [x] Bouton Google OAuth
- [x] Messages d'erreur

#### Signup (signup.vue)
- [x] Titre
- [x] Sous-titre + lien connexion
- [x] Labels formulaire (nom, email, password, confirm)
- [x] Hint mot de passe
- [x] Bouton submit
- [x] Bouton Google OAuth
- [x] Texte CGU/Privacy
- [x] Messages d'erreur

---

### 📄 **Pages Features**

#### Studio Virtuel (features/studio-virtuel.vue)
- [ ] Badge "Photographie IA"
- [ ] Titre
- [ ] Sous-titre
- [ ] Bouton CTA
- [ ] Section "Qu'est-ce que c'est ?" (titre + 2 paragraphes)
- [ ] Section "Pourquoi l'adopter ?" (titre + 3 bénéfices)
- [ ] Section "Comment l'utiliser ?" (titre + 4 étapes)
- [ ] 3 phrases accroches
- [ ] CTA final (titre + sous-titre + 2 boutons)

#### Mannequin Virtuel (features/mannequin-virtuel.vue)
- [ ] Badge "Modélisation IA"
- [ ] Titre
- [ ] Sous-titre
- [ ] Bouton CTA
- [ ] Section "Qu'est-ce que c'est ?" (titre + 2 paragraphes)
- [ ] Section "Pourquoi l'adopter ?" (titre + 3 bénéfices)
- [ ] Section "Comment l'utiliser ?" (titre + 4 étapes)
- [ ] 3 phrases accroches
- [ ] CTA final (titre + sous-titre + 2 boutons)

#### Motion Studio (features/motion-studio.vue)
- [ ] Badge "Vidéo IA"
- [ ] Titre
- [ ] Sous-titre
- [ ] Bouton CTA
- [ ] Section "Qu'est-ce que c'est ?" (titre + 2 paragraphes)
- [ ] Section "Pourquoi l'adopter ?" (titre + 3 bénéfices)
- [ ] Section "Comment l'utiliser ?" (titre + 4 étapes)
- [ ] 3 phrases accroches
- [ ] CTA final (titre + sous-titre + 2 boutons)

#### Features Index (features/index.vue)
- [ ] Titre
- [ ] Sous-titre
- [ ] Liste des features (titres + descriptions)

---

### 💰 **Page Pricing (pricing.vue)**
- [ ] Titre
- [ ] Sous-titre
- [ ] Toggle Mensuel/Annuel
- [ ] Plans (noms, descriptions, prix, features)
- [ ] Boutons CTA

---

### 🖼️ **Page Gallery (galery.vue)**
- [ ] Titre
- [ ] Filtres
- [ ] Bouton CTA

---

### ❓ **Page Help (help.vue)**
- [ ] Titre
- [ ] Questions fréquentes
- [ ] Réponses
- [ ] Interface chatbot

---

### 🧩 **Composants**

#### AppHeader (components/marketing/AppHeader.vue)
- [ ] Logo/Nom app
- [ ] Menu navigation (6 items)
- [ ] Dropdown features (3 items avec descriptions)
- [ ] Bouton "Lance AI Studio Photo"

#### HeroSection (components/marketing/HeroSection.vue)
- [x] Déjà géré via config

#### StatsSection (components/marketing/StatsSection.vue)
- [x] Labels stats (déjà dans socialProof)

#### Footer (à créer)
- [ ] Description
- [ ] Sections (Produit, Entreprise, Légal)
- [ ] Liens
- [ ] Copyright

---

### ⚙️ **Fichiers de configuration**

#### site.config.ts
- [ ] Nom du site
- [ ] Description
- [ ] Navigation
- [ ] Features
- [ ] Hero texts
- [ ] Stats

#### theme.config.ts
- ✅ Pas de textes à traduire (uniquement couleurs)

---

## 📊 Statistiques

| Catégorie | Textes traduits | Textes restants | Total |
|-----------|-----------------|-----------------|-------|
| **Homepage** | ✅ 100% | 0 | ~50 |
| **Auth** | ✅ 100% | 0 | ~30 |
| **Features pages** | ❌ 0% | ~120 | ~120 |
| **Pricing** | ✅ 50% | ~15 | ~30 |
| **Help** | ❌ 0% | ~50 | ~50 |
| **Composants** | ❌ 20% | ~40 | ~50 |
| **Config** | ❌ 0% | ~30 | ~30 |
| **TOTAL** | **~40%** | **~255** | **~360** |

---

## 🚀 Prochaines étapes

### Phase 1 : Configuration ✅
- [x] Installer @nuxtjs/i18n
- [x] Configurer nuxt.config.ts
- [x] Créer i18n.config.ts
- [x] Créer fr.json et en.json de base
- [x] Traduire homepage et auth

### Phase 2 : Pages principales (Priorité haute)
- [ ] Traduire les 3 pages features détaillées
- [ ] Traduire site.config.ts
- [ ] Adapter les composants pour utiliser $t()

### Phase 3 : Composants (Priorité moyenne)
- [ ] AppHeader avec dropdown
- [ ] Footer
- [ ] Composants features (FeatureHero, FeatureCTA, etc.)

### Phase 4 : Pages secondaires (Priorité basse)
- [ ] Help/FAQ
- [ ] Gallery
- [ ] Blog (si applicable)

### Phase 5 : Finalisation
- [ ] Ajouter sélecteur de langue dans le header
- [ ] Tester toutes les pages
- [ ] Vérifier les URLs (/en/features, etc.)
- [ ] SEO multilingue (hreflang)

---

## 💡 Utilisation

### Dans les composants Vue
```vue
<template>
  <h1>{{ $t('hero.title') }}</h1>
  <p>{{ $t('hero.subtitle') }}</p>
</template>
```

### Dans le script
```ts
const { t } = useI18n()
const title = t('hero.title')
```

### Changement de langue
```ts
const { locale, setLocale } = useI18n()
setLocale('en')
```

---

## 📝 Notes

- Les textes de la homepage et auth sont déjà traduits
- Les fichiers JSON sont structurés par sections logiques
- Utiliser des clés descriptives (pas de `text1`, `text2`)
- Garder la même structure dans fr.json et en.json
- Penser aux pluriels et variables dynamiques si nécessaire
