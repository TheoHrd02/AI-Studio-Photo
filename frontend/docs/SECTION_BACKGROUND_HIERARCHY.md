# Section Background Hierarchy — Audit & Design Rule

## PHASE 1 — Visual Hierarchy Map

### Landing Page (index.vue)

| # | Section | Component | Current Background | Tone |
|---|---------|-----------|-------------------|------|
| 1 | Hero | HeroSection | Dark (video) | DARK |
| 2 | Product demo | ProductDemoSection | `bg-white` | WHITE |
| 3 | Product walkthrough | ProductWalkthroughSection | `bg-gradient-to-b from-surface to-white` | SURFACE→WHITE |
| 4 | Before/After | BeforeAfterSection | `bg-white` | WHITE |
| 5 | How it works | inline | `bg-gradient-to-b from-white to-surface` | WHITE→SURFACE |
| 6 | Features | inline | `bg-white` | WHITE |
| 7 | Pricing teaser | PricingTeaser | `bg-surface` | SURFACE |
| 8 | Testimonials | TestimonialSection | `bg-surface` | SURFACE |
| 9 | Social proof | SocialProofBar | `bg-white` | WHITE |
| 10 | Final CTA | inline | `bg-white` | WHITE |

### Consecutive Similar Backgrounds (Conflicts)

| Boundary | Section A | Section B | Issue |
|----------|------------|-----------|-------|
| 3→4 | ProductWalkthrough (ends white) | BeforeAfter (white) | Both white at boundary |
| 7→8 | PricingTeaser (surface) | Testimonials (surface) | Both surface |
| 9→10 | SocialProofBar (white) | Final CTA (white) | Both white |

### Pricing Page (pricing.vue)

| # | Section | Current Background | Tone |
|---|---------|-------------------|------|
| 1 | Hero | inherits `bg-white` | WHITE |
| 2 | Pricing cards | inherits | WHITE |
| 3 | Included in all plans | `bg-surface` | SURFACE |
| 4 | FAQ | inherits | WHITE |
| 5 | Final CTA | inherits | WHITE |

**Conflicts:** 4→5 both white; 1→2 both white.

---

## PHASE 2 — Design Rule

### Alternation System

- **White** (`bg-white`)
- **Light grey** (`bg-surface` = #eff0f0)

**Rule:** No two adjacent sections share the same background tone.

### Constraints

- Use only existing tokens: `white`, `surface` (from theme)
- No new colors
- Contrast: surface (#eff0f0) on white (#ffffff) — sufficient
- Gradients: Replace with solid colors to avoid boundary conflicts

---

## PHASE 3 — Implementation Plan

### Landing Page Target Sequence

| # | Section | Before | After |
|---|---------|--------|-------|
| 1 | Hero | dark | dark (unchanged) |
| 2 | Product demo | white | white |
| 3 | Product walkthrough | gradient surface→white | **surface** |
| 4 | Before/After | white | white |
| 5 | How it works | gradient white→surface | **surface** |
| 6 | Features | white | white |
| 7 | Pricing teaser | surface | surface |
| 8 | Testimonials | surface | **white** |
| 9 | Social proof | white | **surface** |
| 10 | Final CTA | white | white |

**Result:** DARK · W · S · W · S · W · S · W · S · W

### Pricing Page Target Sequence

| # | Section | Before | After |
|---|---------|--------|-------|
| 1 | Hero | white | white |
| 2 | Pricing cards | white | **surface** |
| 3 | Included | surface | **white** |
| 4 | FAQ | white | **surface** |
| 5 | Final CTA | white | white |

**Result:** W · S · W · S · W

---

## Before/After Summary

### Landing Page
- ProductWalkthrough: gradient → solid surface
- How it works: gradient → solid surface
- Testimonials: surface → white
- SocialProofBar: white → surface

### Pricing Page
- Pricing cards: added bg-surface, pt-16
- Included: surface → white, border-gray-100 → border-gray-200
- FAQ: added bg-surface
- Final CTA: added bg-white

### Contrast
- surface (#eff0f0) vs white (#ffffff): ΔE sufficient for WCAG
- No new colors introduced
