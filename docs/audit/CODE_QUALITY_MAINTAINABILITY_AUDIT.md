# Code Quality & Maintainability Audit
## AI Studio Photo — Marketing Website

**Audit Date:** February 23, 2025  
**Scope:** Stateless marketing website (landing, features, pricing, help, chatbot proxy)  
**Excluded:** Unfinished UI assets, missing redirects, SaaS product features

---

## Executive Summary

The AI Studio Photo marketing codebase is **structurally sound** and demonstrates solid engineering practices for a stateless marketing site. The architecture is coherent, the backend is security-conscious, and the frontend follows modern Vue/Nuxt patterns. However, several technical debt items and configuration inconsistencies could impact long-term maintainability if left unaddressed.

**Overall:** The codebase is **safe to evolve** into a high-conversion marketing engine with **targeted refactoring** rather than a full rewrite.

---

## 1. Architecture & Structure (Frontend)

### 1.1 Folder Structure Coherence

```
frontend/
├── pages/           # File-based routing (8 pages)
├── components/      # common/ | features/ | marketing/
├── composables/     # useChatbot, useTranslation, useReveal, useI18n
├── config/          # site, hero, saas, visual-proof, etc.
├── layouts/         # marketing.vue
├── locales/         # fr.json, en.json
├── plugins/         # translation.ts
└── assets/css/      # main.css (design tokens)
```

**Strengths:**
- Clear separation: `common/` (shared UI), `features/` (feature-specific), `marketing/` (page components)
- Config-driven design: `site.config.ts`, `hero.config.ts`, `saas.config.ts`, `visual-proof.config.ts`
- Single source of truth for SaaS URLs (`saas.config.ts`)

**Weaknesses:**
- `site.config.ts` defines `navigation` and `features` but **AppHeader** builds its own navigation from i18n keys — **duplication of structure**
- `FeaturePageTemplate` receives 20+ props; could be simplified with a config object per feature

### 1.2 Separation of Concerns

| Layer | Concern | Status |
|-------|---------|--------|
| Pages | Composition, routing, meta | ✅ Clean |
| Components | UI, props, events | ✅ Clear boundaries |
| Composables | Reusable logic | ✅ Well-scoped |
| Config | Centralized data | ✅ Good |

### 1.3 Page vs Component Boundaries

- **Feature pages** (`studio-virtuel`, `mannequin-virtuel`, `motion-studio`) correctly delegate to `FeaturePageTemplate` with props
- **Index page** composes multiple sections; some inline logic (steps, features) could be moved to config

### 1.4 Reusability

- **FeaturePageTemplate** is highly reusable; all feature pages follow the same pattern
- **CTA buttons** are repeated with similar markup across pages; a `CTAButton` component would reduce duplication
- **RiskReversalChips** and **LanguageSwitcher** are reusable

### 1.5 State Management

- Stateless site — no global state management needed

### 1.6 Config vs Hardcoded Logic

- **Good:** SaaS URLs, hero videos, feature visuals, before/after examples are config-driven
- **Issue:** `gallery.vue` has inline URLs that duplicate `visual-proof.config` and `hero.config` — should derive from config

### Scores

| Criterion | Score | Notes |
|-----------|-------|-------|
| Architecture clarity | 8/10 | Clear structure; minor nav duplication |
| Modularity | 8/10 | Good separation; some prop drilling |
| Reusability | 7/10 | FeaturePageTemplate excellent; CTA buttons duplicated |

---

## 2. Code Quality (Frontend)

### 2.1 Component Readability

- Components use `<script setup>` and TypeScript
- Props are typed with `defineProps<>` and interfaces
- `FeaturePageTemplate` has a `@deprecated` note for `ctaLabel` — good documentation

### 2.2 Prop Typing / TypeScript

- **TypeScript** throughout; `vue-tsc` in package.json
- Interfaces exported from config files (`SiteConfig`, `BeforeAfterItem`, `FeatureVisuals`)

### 2.3 Duplication Patterns

| Pattern | Location | Recommendation |
|---------|----------|-----------------|
| CTA button markup | index.vue, FeaturePageTemplate, HeroSection, etc. | Extract `CTAButton` component |
| Navigation structure | site.config vs AppHeader (i18n) | Unify: use site.config as source, i18n for labels only |
| Gallery items | gallery.vue | Derive from `visual-proof.config` |

### 2.4 Magic Values

| Value | Location | Context |
|-------|----------|---------|
| ~~Magic numbers~~ | — | ✅ Centralisés (Mission 2: app-limits.ts, limits.go) |
| `60` | openai_service.go | HTTP client timeout |

**Recommendation:** Centralize in shared constants (e.g. `frontend/config/api.constants.ts`, backend `internal/config/limits.go`).

### 2.5 Inline Styling

- **ChatInterface.vue:** `style="min-height: 52px; max-height: 200px;"` — acceptable for dynamic sizing
- **ChatInterface.vue:** `style="animation-delay: 0.2s"` — could use Tailwind `animation-delay-200`
- **FeaturePageTemplate:** `:style="\`transition-delay: ${i * 120}ms\`"` — inline for dynamic delays; acceptable

### 2.6 Tailwind Consistency

- Design tokens in `main.css` (`@theme` with `--color-primary-*`, `--color-surface`)
- **Primary:** `#912efb` (violet-purple)
- Consistent use of `primary-500`, `primary-600`, `surface` classes

### 2.7 Naming Conventions

- `PascalCase` for components
- `camelCase` for composables and variables
- `kebab-case` for file names (Vue convention)

### 2.8 Dead Code

- **AppHeader:** Commented-out "Free Gems Badge" block (lines 184–191)
- **site.config.stats:** `users: '437,822'`, `generations: '5,215,977'` — marked as pre-launch placeholder in JSDoc

### 2.9 Anti-Patterns

- **ChatInterface:** Hardcoded French string `"Questions suggérées :"` — should use i18n
- **Plugin:** `translation.ts` provides `$t` globally; `useI18n()` is an alias for `useTranslation()` — slight redundancy but acceptable

### Scores

| Criterion | Score | Notes |
|-----------|-------|-------|
| Readability | 8/10 | Clear structure; some long components |
| Cleanliness | 8/10 | Duplicate config, dead code (magic numbers centralisés) |

**Risk Level:** **Medium** — manageable with cleanup; no critical blockers.

---

## 3. Backend Quality (Go + Gin)

### 3.1 Handler Structure

```go
// ChatbotHandler: dependency injection, clear request/response structs
type ChatbotHandler struct {
    openaiService *services.OpenAIService
}
```

- Request validation via `ShouldBindJSON`
- Proper HTTP status codes (400, 413, 429, 504)
- Context propagation for timeout/cancellation

### 3.2 Middleware Correctness

| Middleware | Purpose | Assessment |
|------------|---------|------------|
| CORS | Explicit origin allowlist, rejects wildcard | ✅ Correct |
| RateLimiter | 15 req/min per IP, token bucket, 10min cleanup | ✅ Correct |
| MaxBodySize | 64KB limit | ✅ Correct |
| RequestTimeout | 20s context cancellation | ✅ Correct |

### 3.3 Error Handling

- `MaxBytesError` handled explicitly
- `context.DeadlineExceeded` / `context.Canceled` → 504
- OpenAI errors → 200 with `"Je ne sais pas."` (graceful degradation)

### 3.4 Logging Strategy

- Logs question length, response length, errors
- **No structured logging** (JSON, log levels) — acceptable for current scale

### 3.5 Environment Variable Management

- `godotenv.Load()` for dev
- `CORS_ORIGINS`, `PORT`, `OPENAI_API_KEY`, `ASSISTANT_ID`, `GIN_MODE`, `APP_ENV`
- Production safety: blocks `GIN_MODE=debug` when not in development

### 3.6 Security Baseline

| Check | Status |
|-------|--------|
| Hardcoded secrets | ✅ None |
| Rate limits | ✅ 15 req/min |
| Body size limit | ✅ 64KB |
| CORS wildcard | ✅ Rejected |
| Timeout | ✅ 20s |

### 3.7 OpenAI Service Coupling

- **OpenAI HTTP client timeout:** 60s
- **Request middleware timeout:** 20s
- **Potential issue:** Handler context cancels at 20s, but `OpenAIService` has 60s client timeout — the context will propagate and cancel the request, so the 60s is an upper bound. **Acceptable.**

### 3.8 API Response Language

- Error messages: French (`"Le champ 'q' (question) est requis"`)
- For a marketing site with French primary audience, this is acceptable.

### 3.9 Module Name Mismatch

- **go.mod:** `module github.com/TheoHrd02/nuxt-go-boilerplate`
- **Project:** AI Studio Photo
- **Recommendation:** Rename to `github.com/TheoHrd02/ai-studio-photo` or similar for clarity.

### Scores

| Criterion | Score | Notes |
|-----------|-------|-------|
| API structure | 9/10 | Clean handlers, middleware, DI |
| Security hygiene | 9/10 | Strong baseline |
| Production readiness | 8/10 | Missing structured logging, module rename |

---

## 4. Docker & Dev Environment

### 4.1 Dockerfile Structure

**Backend:**
- Base: `golang:1.23-alpine`
- Air for hot-reload
- Single-stage (dev only)

**Frontend:**
- Base: `node:20-alpine`
- Corepack + pnpm
- `pnpm install --frozen-lockfile`
- Single-stage (dev only)

### 4.2 Layer Optimization

- Dependency copy before `COPY . .` — correct
- No multi-stage build (dev-only)

### 4.3 Production Build

- **No production Dockerfile** — both are dev-oriented
- For production: need multi-stage build (e.g. `nuxt build` + `node server` for frontend, `go build` for backend)

### 4.4 Environment Isolation

- **docker-compose.yml:** `env_file: ./backend/.env` for backend
- **Frontend:** `NUXT_PUBLIC_API_BASE: http://localhost:8080/api/v1` — **hardcoded** in compose
- **Issue:** `localhost:8080` works for browser from host; `NUXT_GO_API_URL: http://backend:8080` is correct for SSR. For production, these should come from env files.

### 4.5 Volume Configuration

- `./backend:/app` and `./frontend:/app` — standard dev mounts
- `frontend: /app/node_modules` — anonymous volume to avoid host overwrite; correct

### 4.6 Risks

| Risk | Severity | Notes |
|------|----------|-------|
| No prod Dockerfile | Medium | Need separate prod build |
| Hardcoded API URL in compose | Low | Works for dev; use env for prod |
| No .dockerignore for frontend lockfiles | Low | `.dockerignore` excludes bun/yarn.lock, keeps pnpm |

---

## 5. Technical Debt Mapping

### Critical

| Item | Location | Action |
|------|----------|--------|
| — | — | None identified |

### Important

| Item | Location | Action |
|------|----------|--------|
| Go module name | go.mod | Rename to project-specific |
| Navigation duplication | site.config vs AppHeader | Unify: site.config as structure, i18n for labels |
| ~~Magic numbers~~ | — | ✅ Centralisés (Mission 2) |
| Production Docker | — | Add multi-stage Dockerfiles |

### Cosmetic

| Item | Location | Action |
|------|----------|--------|
| "Questions suggérées :" | ChatInterface.vue | Move to i18n |
| Commented Free Gems Badge | AppHeader.vue | Remove or implement |
| Gallery inline URLs | gallery.vue | Derive from config |

---

## 6. Long-Term Maintainability Projection

### If No Refactor — What Breaks First?

1. **Adding a new feature page** — Low friction. `FeaturePageTemplate` + config + i18n keys — pattern is clear.
2. **Adding a new nav item** — Must update both `site.config` (if used) and AppHeader (i18n) — **duplication risk**.
3. **Changing API limits** — Must update 3 places (backend handler, middleware, frontend useChatbot) — **magic number risk**.

### Where Complexity Explodes?

- **i18n** — Large `fr.json`/`en.json`; adding new pages will grow these. No namespacing by page; could become unwieldy.
- **FeaturePageTemplate** — 20+ props; adding a new section type requires more props. Consider config object.

### What Becomes Unmaintainable?

- **Gallery** — Hardcoded items; adding/removing items requires manual edits. Should be config-driven.
- **CSP** — `nuxt.config.ts` has hardcoded URLs; adding new domains (e.g. analytics) requires code change.

### What Blocks SEO Growth?

- **Meta tags** — `useHead()` used per page; good.
- **SSR** — Nuxt default; good.
- **Sitemap** — Not visible; may need to add for SEO.
- **Structured data** — Not visible; consider JSON-LD for product/organization.

### What Blocks Performance Scaling?

- **Frontend** — Stateless; scales horizontally.
- **Backend** — Stateless; scales horizontally.
- **Chatbot** — OpenAI API is the bottleneck; rate limiting per IP is appropriate.
- **Images** — Using Cloudinary + Unsplash; CDN is in place.

---

## 7. Final Verdict

### Overall Codebase Maturity Score: **78/100**

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Architecture | 25% | 82 | 20.5 |
| Code Quality | 25% | 75 | 18.75 |
| Backend | 25% | 87 | 21.75 |
| Docker | 15% | 65 | 9.75 |
| Technical Debt | 10% | 70 | 7.0 |

### Maintainability Score: **80/100**

- Clear patterns, config-driven, good separation of concerns.
- Deductions: duplication, magic numbers, no production Docker.

### Risk Profile: **Medium**

- No critical security or architectural risks.
- Technical debt is manageable; refactor in phases.

### Recommended Refactor Strategy: **Structured Refactor**

Not a full rewrite. Prioritize:

1. **Phase 1 (1–2 days):** ~~Extract magic numbers to constants~~ ✅, remove commented code.
2. **Phase 2 (2–3 days):** Unify navigation (site.config as source), extract CTAButton component, derive gallery from config.
3. **Phase 3 (1–2 days):** Add production Dockerfiles, rename Go module.
4. **Phase 4 (ongoing):** Consider i18n namespacing, add sitemap if needed for SEO.

---

## Appendix: File-by-File Summary

| File | Purpose | Quality |
|------|---------|---------|
| nuxt.config.ts | Config, security headers | ✅ |
| site.config.ts | Site metadata, nav, features | ⚠️ Nav duplicated in AppHeader |
| saas.config.ts | SaaS URLs | ✅ |
| hero.config.ts | Hero videos | ✅ |
| visual-proof.config.ts | Before/after, feature visuals | ✅ |
| useChatbot.ts | Chatbot API client | ✅ |
| useTranslation.ts | i18n | ✅ |
| useReveal.ts | Scroll animations | ✅ |
| FeaturePageTemplate.vue | Feature page layout | ✅ |
| chatbot_handler.go | Chatbot API | ✅ |
| openai_service.go | OpenAI integration | ✅ |
| middleware/* | CORS, rate limit, body, timeout | ✅ |
| docker-compose.yml | Dev orchestration | ⚠️ Hardcoded env |

---

*Audit conducted per framework: Architecture, Code Quality, Backend, Docker, Technical Debt, Maintainability Projection.*
