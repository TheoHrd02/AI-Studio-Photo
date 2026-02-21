# Pricing Page Structural Clarity Upgrade

## Before/After Structural Comparison

### PHASE 1 — Above-the-Fold Optimization

| Element | Before | After |
|---------|--------|-------|
| Hero padding | pt-32 pb-16 | pt-24 pb-8 |
| Pricing section | pt-16 pb-24 | pt-8 pb-12 |
| **Estimated fold** | ~950px | ~750px |
| **3 cards visible** | Often below fold | Above fold on 1440px |

### PHASE 2 — Header Compression

| Element | Before | After |
|---------|--------|-------|
| Eyebrow badge | Above headline | **Moved below pricing cards** (trust strip) |
| Headline | "Le plan qui" + "vous correspond" (wraps) | Single line on md+ (`md:whitespace-nowrap`) |
| Subtitle | 3 lines with `<br>` | Single line: "Commencez gratuitement. Évoluez sans contrainte. Annulez à tout moment." |
| Trust strip | Above pricing | **Below pricing cards** as reinforcement |

### PHASE 3 — Included Section Grid

| Breakpoint | Before | After |
|------------|--------|-------|
| Mobile | grid-cols-2 (uneven) | grid-cols-1 (clean stack) |
| Tablet | grid-cols-3 | grid-cols-2 (4 rows of 2) |
| Desktop | grid-cols-6 (1 row + 2) | grid-cols-4 (2 rows of 4) |
| Container | max-w-4xl | max-w-5xl |
| Card alignment | Variable | Equal width, gap-4, symmetric |

### PHASE 4 — Validation

- **Visual balance:** Hero compressed, pricing prominent, trust strip reinforces
- **Conversion elements:** CTAs unchanged, risk reversal intact
- **Cognitive load:** Single-line subtitle, clearer hierarchy
