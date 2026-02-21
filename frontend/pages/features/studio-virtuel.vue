<script setup lang="ts">
import { featureVisuals } from '~/config/visual-proof.config'

const { t } = useI18n()

definePageMeta({ layout: 'marketing' })

useHead({ title: 'Studio Virtuel – AI Studio Photo' })

const visuals = featureVisuals.studioVirtuel!

const benefits = computed(() => [
  { icon: 'heroicons:currency-dollar', text: t('featurePages.studioVirtuel.whyAdopt.benefit1') },
  { icon: 'heroicons:bolt', text: t('featurePages.studioVirtuel.whyAdopt.benefit2') },
  { icon: 'heroicons:sparkles', text: t('featurePages.studioVirtuel.whyAdopt.benefit3') },
])

const steps = computed(() => [
  t('featurePages.studioVirtuel.howToUse.step1'),
  t('featurePages.studioVirtuel.howToUse.step2'),
  t('featurePages.studioVirtuel.howToUse.step3'),
  t('featurePages.studioVirtuel.howToUse.step4'),
])

const quotes = computed(() => [
  t('featurePages.studioVirtuel.quotes.quote1'),
  t('featurePages.studioVirtuel.quotes.quote2'),
  t('featurePages.studioVirtuel.quotes.quote3'),
])
</script>

<template>
  <FeaturePageTemplate
    icon="heroicons:camera"
    :badge="$t('featurePages.studioVirtuel.badge')"
    :title="$t('featurePages.studioVirtuel.title')"
    :subtitle="$t('featurePages.studioVirtuel.subtitle')"
    :cta-label="$t('cta.primary')"
    :what-is-title="$t('featurePages.studioVirtuel.whatIs.title')"
    :what-is-text1="$t('featurePages.studioVirtuel.whatIs.text1')"
    :what-is-text2="$t('featurePages.studioVirtuel.whatIs.text2')"
    :concept-image-url="visuals.output"
    :concept-image-alt="$t('featurePages.studioVirtuel.conceptImageAlt')"
    :before-image-url="visuals.before"
    :before-image-alt="$t('featurePages.studioVirtuel.beforeImageAlt')"
    :workflow-image-url="visuals.workflow"
    :workflow-image-alt="$t('featurePages.studioVirtuel.workflowImageAlt')"
    :why-title="$t('featurePages.studioVirtuel.whyAdopt.title')"
    :benefits="benefits"
    :how-title="$t('featurePages.studioVirtuel.howToUse.title')"
    :steps="steps"
    :quotes="quotes"
    :final-cta-title="$t('cta.finalSection.title')"
    :final-cta-sub="$t('cta.finalSection.subtitle')"
    :final-cta-btn-primary="$t('cta.primary')"
    :final-cta-btn-secondary="$t('cta.pricing')"
  />
</template>
