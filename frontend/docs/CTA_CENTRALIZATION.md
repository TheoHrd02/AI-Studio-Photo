# CTA Centralization — Source of Truth

## Chosen Approach: **Option A (i18n)**

**Rationale:** The project already uses `@nuxtjs/i18n` with `locales/fr.json` and `locales/en.json`. All marketing copy is i18n-driven. A dedicated `cta` namespace in i18n provides:
- Single source of truth for all CTA copy
- Built-in FR/EN support
- No additional config layer
- Consistency with existing architecture

---

## New i18n Structure: `cta` Namespace

All CTA copy lives under the `cta` key in `locales/fr.json` and `locales/en.json`:

```json
{
  "cta": {
    "primary": "Commencer gratuitement — sans carte",
    "clarification": "Après le clic : compte gratuit → 5 crédits → première création en 30s",
    "login": "Déjà un compte ? Se connecter",
    "loginShort": "J'ai déjà un compte",
    "pricing": "Voir les tarifs",
    "pricingLink": "Voir tous les tarifs",
    "discover": "Découvrir",
    "header": "Commencer gratuitement — sans carte",
    "plans": {
      "free": { "label": "Commencer gratuitement — sans carte", "note": "Aucune carte requise" },
      "pro": { "label": "Démarrer l'essai — 7 jours gratuits", "note": "Sans engagement" },
      "enterprise": { "label": "Contacter l'équipe commerciale", "note": "Démo personnalisée offerte" }
    },
    "help": { "chat": "Démarrer une conversation" },
    "finalSection": {
      "title": "Prêt à créer vos premiers visuels ?",
      "subtitle": "Commencez gratuitement et découvrez la puissance de l'IA pour vos créations"
    }
  }
}
```

---

## Final CTA Map

| Location | CTA Text Key | Purpose | URL |
|----------|--------------|---------|-----|
| **AppHeader** (desktop + mobile) | `cta.header` | Primary signup | `saasConfig.signupUrl` |
| **HeroSection** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **HeroSection** | `cta.clarification` | After-click helper | — |
| **HeroSection** | `cta.login` | Login link | `saasConfig.loginUrl` |
| **index.vue — How it works** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **index.vue — How it works** | `cta.clarification` | After-click helper | — |
| **index.vue — Final CTA** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **index.vue — Final CTA** | `cta.clarification` | After-click helper | — |
| **index.vue — Final CTA** | `cta.pricing` | Pricing link (demoted) | `/pricing` |
| **index.vue — Features** | `cta.discover` | Feature discover | `/features/*` |
| **index.vue — Final section** | `cta.finalSection.title` | Section title | — |
| **index.vue — Final section** | `cta.finalSection.subtitle` | Section subtitle | — |
| **BeforeAfterSection** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **BeforeAfterSection** | `cta.clarification` | After-click helper | — |
| **PricingTeaser** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **PricingTeaser** | `cta.clarification` | After-click helper | — |
| **PricingTeaser** | `cta.pricingLink` | Pricing link (demoted) | `/pricing` |
| **FeatureCTA** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **FeatureCTA** | `cta.clarification` | After-click helper | — |
| **FeatureCTA** | `cta.pricingLink` | Pricing link (demoted) | `/pricing` |
| **FeaturePageTemplate** (hero + final) | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **FeaturePageTemplate** | `cta.clarification` | After-click helper | — |
| **FeaturePageTemplate** | `cta.pricing` | Pricing link (demoted) | `/pricing` |
| **FeatureHero** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **FeatureHero** | `cta.clarification` | After-click helper | — |
| **FeatureLayout** (2 CTAs) | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **FeatureLayout** | `cta.clarification` | After-click helper | — |
| **gallery.vue** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **gallery.vue** | `cta.clarification` | After-click helper | — |
| **pricing.vue — Free plan** | `cta.plans.free.label` | Plan CTA | `saasConfig.signupUrl` |
| **pricing.vue — Free plan** | `cta.plans.free.note` | Plan note | — |
| **pricing.vue — Pro plan** | `cta.plans.pro.label` | Plan CTA | `saasConfig.signupUrl` |
| **pricing.vue — Pro plan** | `cta.plans.pro.note` | Plan note | — |
| **pricing.vue — Enterprise** | `cta.plans.enterprise.label` | Plan CTA | `saasConfig.enterpriseContactUrl` |
| **pricing.vue — Enterprise** | `cta.plans.enterprise.note` | Plan note | — |
| **pricing.vue — Final CTA** | `cta.primary` | Primary signup | `saasConfig.signupUrl` |
| **pricing.vue — Final CTA** | `cta.clarification` | After-click helper | — |
| **pricing.vue — Final CTA** | `cta.loginShort` | Login link (demoted) | `saasConfig.loginUrl` |
| **help.vue** | `cta.help.chat` | Chat/support CTA | `#` (placeholder) |
| **Feature pages** (studio, mannequin, motion) | `cta.primary` | Hero CTA label (prop) | — |
| **Feature pages** | `cta.finalSection.title` | Final section title | — |
| **Feature pages** | `cta.finalSection.subtitle` | Final section subtitle | — |

---

## Files Modified

| File | Changes |
|------|---------|
| `locales/fr.json` | Added `cta` namespace |
| `locales/en.json` | Added `cta` namespace |
| `components/marketing/AppHeader.vue` | `nav.launchApp` → `cta.header` |
| `components/marketing/HeroSection.vue` | `hero.ctaPrimary` → `cta.primary`, `hero.ctaSecondary` → `cta.login`, `common.ctaClarification` → `cta.clarification` |
| `pages/index.vue` | All CTAs → `cta.*` keys |
| `components/marketing/BeforeAfterSection.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification` |
| `components/marketing/PricingTeaser.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification`, `pricingTeaser.link` → `cta.pricingLink` |
| `components/features/FeatureCTA.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification`, `pricingTeaser.link` → `cta.pricingLink` |
| `components/FeaturePageTemplate.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification`, `tutorial.cta.buttonSecondary` → `cta.pricing` |
| `components/features/FeatureHero.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification` |
| `components/marketing/FeatureLayout.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification` |
| `pages/gallery.vue` | `common.ctaPrimary` → `cta.primary`, `common.ctaClarification` → `cta.clarification` |
| `pages/pricing.vue` | Plans `cta`/`ctaNote` → `t('cta.plans.*.label')`/`t('cta.plans.*.note')`, final CTA → `cta.primary`, `cta.clarification`, `cta.loginShort` |
| `pages/help.vue` | Hardcoded "Démarrer une conversation" → `cta.help.chat` |
| `pages/features/studio-virtuel.vue` | `featurePages.studioVirtuel.cta` → `cta.primary`, `featurePages.studioVirtuel.finalCta.*` → `cta.finalSection.*`, `cta.primary`, `cta.pricing` |
| `pages/features/mannequin-virtuel.vue` | Same as studio-virtuel |
| `pages/features/motion-studio.vue` | Same as studio-virtuel |

---

## Remaining Hardcoded Strings

**Zero** CTA strings remain hardcoded in Vue components.

**Explicitly justified exceptions:**
- `help.vue`: "Vous préférez discuter en direct ?" — intro text above CTA, not the CTA itself. Can be moved to `help.preferredChat` if desired.
- `pricing.vue`: Plan names (Gratuit, Pro, Entreprise), taglines, feature lists — outside CTA scope; can be i18n'd separately.

---

## How to Edit CTA Copy

1. Open `frontend/locales/fr.json` or `frontend/locales/en.json`
2. Edit the `cta` object at the root
3. All CTAs across the site update automatically

Example: change primary signup CTA everywhere:
```json
"cta": {
  "primary": "Nouveau libellé — sans engagement",
  ...
}
```
