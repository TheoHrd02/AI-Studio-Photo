# Pre-Launch Trust Architecture — Analysis & Strategy

## PHASE 1 — Trust Risk Analysis

### Trust-Risk Map

| Element | Location | Current State | Risk Type | Severity |
|---------|----------|---------------|-----------|----------|
| **Metrics: 5.2M+ / 437K users** | Hero trust chips, SocialProofBar, siteConfig.stats | Implied platform traction | Over-promise / Exaggeration | **HIGH** |
| **"Trusted by"** | SocialProofBar | Header implies logos; only metric shown | Expectation mismatch | **MEDIUM** |
| **Before/After images** | BeforeAfterSection | Unsplash placeholders; badge "Illustrative preview" | Credibility drop if discovered | **LOW** (mitigated) |
| **Testimonials** | TestimonialSection | Framed as "Typical use cases" / "What you could achieve"; no names | Perceived as fake if misread | **LOW** (mitigated) |
| **Product walkthrough mockups** | ProductWalkthroughSection | Framed "final interface under development" | Expectation calibration | **LOW** (mitigated) |
| **Benefit claims** | howItWorks.benefits, FeaturePageTemplate | "-90% costs", "100x faster", "+40% conversions" | Industry-level claims, not verified | **MEDIUM** |
| **StatsSection** | Not currently used | siteConfig: 437K users, 5.2M generations | Would amplify risk if added | **HIGH** (dormant) |

### Over-Promise Risks

- **5.2M+ creations / 437K users**: Pre-launch product cannot have these numbers. Visitors who later discover the product is new will experience a credibility collapse.
- **"Trusted by"**: Implies third-party validation (logos). No logos = empty claim.

### Perceived Exaggeration Risk

- Benefit metrics (-90%, 100x, +40%) are industry benchmarks, not product-specific. Acceptable if framed as "typical" or "industry average"; risky if read as promises.

### Credibility-Drop Vulnerabilities

- Metrics in hero and SocialProofBar are the primary vulnerability.
- Before/After and testimonials are already well-framed with transparency labels.

---

## PHASE 2 — Pre-Launch Safe Trust Strategy

### Tier A — Transparency Anchoring

| Principle | Implementation | Conversion Impact | Risk Reduction |
|-----------|----------------|-------------------|----------------|
| **Honesty bias** (Cialdini) | Add "illustrative preview" / "in development" framing where visuals are placeholders | Neutral to slight positive (trust > hype for considered purchases) | **High** |
| **Expectation calibration** | Clarify development stage without underselling | Reduces post-signup disappointment | **High** |
| **Transparency anchoring** | One clear "we're building" signal anchors all other claims | Visitors interpret other claims through honest lens | **High** |

**Actions:**
- Remove or reframe inflated metrics (5.2M, 437K)
- Replace "Trusted by" with neutral platform framing
- Strengthen illustrative labels where needed
- Add optional "Building in public" / "Early access" badge

### Tier B — Builder Credibility (Structure Only)

| Principle | Implementation | Conversion Impact | Risk Reduction |
|-----------|----------------|-------------------|----------------|
| **Signaling theory** | Founder/team presence signals commitment | Moderate (builds legitimacy) | Moderate |
| **Product philosophy** | "Why we built this" narrative | Low to moderate | Moderate |
| **Technical seriousness** | Stack, architecture, roadmap cues | Low (technical audience) | Low |

**Structure to prepare:**
- `AboutSection.vue` or footer "About" block
- Props: `founderName`, `philosophyText`, `roadmapUrl` (optional)
- Do NOT add fake bios or credentials

### Tier C — Product Legitimacy Signals (Structure Only)

| Principle | Implementation | Conversion Impact | Risk Reduction |
|-----------|----------------|-------------------|----------------|
| **Scarcity / exclusivity** | "Early access" / "Beta" framing | Moderate (FOMO) | Low |
| **Roadmap visibility** | Public roadmap = commitment signal | Low to moderate | Moderate |
| **Waitlist** | Alternative to signup when product not ready | Depends on funnel | Low |

**Structure to prepare:**
- Config flag: `showEarlyAccessBadge`
- Optional roadmap link in footer
- No fabrication

---

## PHASE 3 — Implementation Summary

### Tier A (Implemented)

| Change | Before | After |
|--------|--------|-------|
| **Hero trust chip** | "5.2M+ creations generated" | "Early access — join the beta" |
| **Hero eyebrow** | "5 free credits · No skills needed · 30 seconds" | "Early access · 5 free credits · 30 seconds" |
| **SocialProofBar** | "Trusted by" + "5.2M+ creations" | "Platform" + "AI-powered product visuals in 30 seconds" + "Early access — we're building in public" |
| **Pricing finalCtaLine** | "Over 5 million creations... 7-day trial" | "Early access. 7-day trial. No card required." |
| **FeaturePageTemplate trust chip** | "5.2M+ creations" | "Early access — join the beta" |
| **visual-proof.config** | Generic comment | Pre-launch transparency comment added |
| **siteConfig.stats** | — | Documented as post-launch only |

### Tier B (Structure Prepared)

- **trust.config.ts**: `TrustConfig` with `preLaunch`, `founder`, `roadmapUrl`, `showEarlyAccessBadge`
- Ready for founder/philosophy content when available

### Tier C (Structure Prepared)

- `trustConfig.showEarlyAccessBadge: true`
- `trustConfig.roadmapUrl` (optional, commented out)
- No fake waitlist or traction

---

## Before/After Trust Strength Assessment

| Dimension | Before | After |
|-----------|--------|-------|
| **Metric honesty** | HIGH RISK (5.2M, 437K) | LOW RISK (removed) |
| **Expectation calibration** | Mixed | Anchored (Early access, building in public) |
| **Transparency** | Partial (Before/After, Testimonials OK) | Full (all visuals framed) |
| **Credibility drop risk** | HIGH | LOW |

## Risk Mitigation Summary

- **Over-promise**: Inflated metrics removed from all user-facing surfaces
- **Expectation mismatch**: "Trusted by" replaced with honest "Platform" framing
- **Placeholder images**: Already framed; config comment strengthened
- **Testimonials**: Already framed as "Typical use cases" — unchanged
