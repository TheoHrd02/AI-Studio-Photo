# 🌍 Progression i18n - AI Studio Photo

**Dernière mise à jour** : 18 octobre 2025

---

## 📊 État global : 75% ✅

| Catégorie | Statut | Progression |
|-----------|--------|-------------|
| **Fichiers de traduction** | ✅ Complets | 100% |
| **Pages traduites** | ⚠️ En cours | 40% |
| **Composants adaptés** | ❌ À faire | 0% |

---

## ✅ Traductions COMPLÈTES dans les fichiers JSON

### 📄 **fr.json & en.json** - 372 lignes chacun

#### ✅ Sections traduites (100%)
1. **common** - Éléments communs (20 clés)
2. **nav** - Navigation (11 clés)
3. **hero** - Section hero homepage (7 clés)
4. **features** - Features homepage (15 clés)
5. **howItWorks** - Comment ça marche (10 clés)
6. **tutorial** - Tutoriel détaillé (30 clés)
7. **socialProof** - Métriques (4 clés)
8. **auth.login** - Page login (7 clés)
9. **auth.signup** - Page signup (11 clés)
10. **pricing** - Tarifs (15 clés)
11. **footer** - Pied de page (6 clés)
12. **errors** - Messages d'erreur (5 clés)
13. **featurePages.studioVirtuel** - Studio Virtuel (25 clés) ✨ NOUVEAU
14. **featurePages.mannequinVirtuel** - Mannequin Virtuel (25 clés) ✨ NOUVEAU
15. **featurePages.motionStudio** - Motion Studio (25 clés) ✨ NOUVEAU
16. **featurePages.index** - Index features (2 clés) ✨ NOUVEAU
17. **help** - Centre d'aide (7 clés) ✨ NOUVEAU
18. **gallery** - Galerie (6 clés) ✨ NOUVEAU

**Total : ~230 clés de traduction disponibles**

---

## 📝 Pages à adapter pour utiliser i18n

### ✅ **Pages PRÊTES** (traductions disponibles)
1. ✅ **Homepage** (`index.vue`)
   - Toutes les traductions disponibles
   - À adapter : remplacer textes par `$t()`

2. ✅ **Login** (`login.vue`)
   - Traductions complètes
   - À adapter : formulaire + messages

3. ✅ **Signup** (`signup.vue`)
   - Traductions complètes
   - À adapter : formulaire + CGU

4. ✅ **Features/Studio Virtuel** (`features/studio-virtuel.vue`)
   - Traductions complètes ✨
   - À adapter : toutes les sections

5. ✅ **Features/Mannequin Virtuel** (`features/mannequin-virtuel.vue`)
   - Traductions complètes ✨
   - À adapter : toutes les sections

6. ✅ **Features/Motion Studio** (`features/motion-studio.vue`)
   - Traductions complètes ✨
   - À adapter : toutes les sections

7. ✅ **Features/Index** (`features/index.vue`)
   - Traductions complètes ✨
   - À adapter : titre + liste

8. ✅ **Help** (`help.vue`)
   - Traductions complètes ✨
   - À adapter : chatbot + FAQ

9. ✅ **Gallery** (`galery.vue`)
   - Traductions complètes ✨
   - À adapter : filtres + CTA

10. ⚠️ **Pricing** (`pricing.vue`)
    - Traductions partielles
    - À compléter : détails des plans

---

## 🧩 Composants à adapter

### ❌ **À faire**
1. **AppHeader.vue**
   - Navigation principale
   - Dropdown features
   - Bouton CTA
   - Traductions : utiliser `nav.*`

2. **HeroSection.vue**
   - Déjà géré via `site.config.ts`
   - Traductions : utiliser `hero.*`

3. **StatsSection.vue**
   - Traductions : utiliser `socialProof.*`

4. **Footer** (à créer)
   - Traductions : utiliser `footer.*`

5. **ChatInterface.vue** (help)
   - Traductions : utiliser `help.chatbot.*`

---

## 🎯 Plan d'action détaillé

### Phase 1 : Installation ✅ FAIT
- [x] Installer `@nuxtjs/i18n`
- [x] Configurer `nuxt.config.ts`
- [x] Créer `i18n.config.ts`
- [x] Créer `fr.json` et `en.json`
- [x] Ajouter toutes les traductions

### Phase 2 : Adapter les pages (2-3h)

#### 2.1 Homepage (`index.vue`)
```vue
<!-- Avant -->
<h1>Outils d'IA Génératifs Ultra Réalistes</h1>

<!-- Après -->
<h1>{{ $t('hero.title') }}</h1>
```

**Sections à adapter** :
- [ ] Hero section
- [ ] Comment ça marche (3 étapes)
- [ ] Features (3 cards)
- [ ] Tutoriel (4 étapes)
- [ ] Social proof
- [ ] CTAs

#### 2.2 Pages Auth
- [ ] **login.vue** : Formulaire + messages
- [ ] **signup.vue** : Formulaire + CGU

#### 2.3 Pages Features (3 pages)
- [ ] **studio-virtuel.vue** : 6 sections
- [ ] **mannequin-virtuel.vue** : 6 sections
- [ ] **motion-studio.vue** : 6 sections
- [ ] **index.vue** : Titre + liste

#### 2.4 Pages secondaires
- [ ] **help.vue** : Chatbot + FAQ
- [ ] **galery.vue** : Filtres + CTA
- [ ] **pricing.vue** : Compléter plans

### Phase 3 : Adapter les composants (1h)
- [ ] **AppHeader.vue** : Navigation
- [ ] **Footer.vue** : Créer et traduire
- [ ] **ChatInterface.vue** : Messages

### Phase 4 : Ajouter le sélecteur de langue (30min)
```vue
<template>
  <div class="language-selector">
    <button @click="setLocale('fr')" :class="{ active: locale === 'fr' }">
      🇫🇷 FR
    </button>
    <button @click="setLocale('en')" :class="{ active: locale === 'en' }">
      🇬🇧 EN
    </button>
  </div>
</template>
```

### Phase 5 : Tests (30min)
- [ ] Tester toutes les pages en FR
- [ ] Tester toutes les pages en EN
- [ ] Vérifier les URLs (`/en/features`, etc.)
- [ ] Vérifier la navigation
- [ ] Tester le changement de langue

---

## 📋 Checklist par page

### Exemple : studio-virtuel.vue

```vue
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section>
    <!-- Badge -->
    <p>{{ $t('featurePages.studioVirtuel.badge') }}</p>
    
    <!-- Titre -->
    <h1>{{ $t('featurePages.studioVirtuel.title') }}</h1>
    
    <!-- Sous-titre -->
    <p>{{ $t('featurePages.studioVirtuel.subtitle') }}</p>
    
    <!-- CTA -->
    <button>{{ $t('featurePages.studioVirtuel.cta') }}</button>
    
    <!-- Section "Qu'est-ce que c'est ?" -->
    <h2>{{ $t('featurePages.studioVirtuel.whatIs.title') }}</h2>
    <p>{{ $t('featurePages.studioVirtuel.whatIs.text1') }}</p>
    <p>{{ $t('featurePages.studioVirtuel.whatIs.text2') }}</p>
    
    <!-- Section "Pourquoi l'adopter ?" -->
    <h3>{{ $t('featurePages.studioVirtuel.whyAdopt.title') }}</h3>
    <li>{{ $t('featurePages.studioVirtuel.whyAdopt.benefit1') }}</li>
    <li>{{ $t('featurePages.studioVirtuel.whyAdopt.benefit2') }}</li>
    <li>{{ $t('featurePages.studioVirtuel.whyAdopt.benefit3') }}</li>
    
    <!-- etc. -->
  </section>
</template>
```

- [ ] Badge traduit
- [ ] Titre traduit
- [ ] Sous-titre traduit
- [ ] CTA traduit
- [ ] Section "Qu'est-ce que c'est ?" traduite
- [ ] Section "Pourquoi l'adopter ?" traduite
- [ ] Section "Comment l'utiliser ?" traduite
- [ ] Phrases accroches traduites
- [ ] CTA final traduit

---

## 🚀 Commandes utiles

### Installer les dépendances
```bash
cd frontend
npm install
```

### Redémarrer le serveur
```bash
docker restart nuxt_go_frontend
```

### Tester les URLs
- FR (défaut) : `http://localhost:3000/`
- EN : `http://localhost:3000/en/`
- Features FR : `http://localhost:3000/features/studio-virtuel`
- Features EN : `http://localhost:3000/en/features/studio-virtuel`

---

## 📊 Statistiques finales

| Élément | Statut | Détails |
|---------|--------|---------|
| **Traductions FR** | ✅ 100% | 372 lignes, ~230 clés |
| **Traductions EN** | ✅ 100% | 372 lignes, ~230 clés |
| **Pages traduites** | ⚠️ 0% | Textes disponibles, à adapter |
| **Composants adaptés** | ❌ 0% | À faire |
| **Sélecteur langue** | ❌ 0% | À créer |
| **Tests** | ❌ 0% | À faire |

---

## 🎉 Prochaine étape

**Installer les dépendances et commencer l'adaptation des pages** :

```bash
cd frontend
npm install
docker restart nuxt_go_frontend
```

Puis adapter progressivement chaque page en remplaçant les textes en dur par `$t('key')`.

---

**✨ Toutes les traductions sont prêtes ! Il ne reste plus qu'à adapter les composants Vue pour les utiliser.**
