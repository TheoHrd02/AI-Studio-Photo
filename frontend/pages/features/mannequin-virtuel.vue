<script setup lang="ts">
import { featureVisuals } from '~/config/visual-proof.config'

const { t } = useI18n()

definePageMeta({ layout: 'marketing' })

useHead({ title: 'Mannequin Virtuel – AI Studio Photo' })

const visuals = featureVisuals.mannequinVirtuel!

const benefits = computed(() => [
  { icon: 'heroicons:heart', text: t('featurePages.mannequinVirtuel.whyAdopt.benefit1') },
  { icon: 'heroicons:arrows-pointing-out', text: t('featurePages.mannequinVirtuel.whyAdopt.benefit2') },
  { icon: 'heroicons:chart-bar-square', text: t('featurePages.mannequinVirtuel.whyAdopt.benefit3') },
])

const steps = computed(() => [
  t('featurePages.mannequinVirtuel.howToUse.step1'),
  t('featurePages.mannequinVirtuel.howToUse.step2'),
  t('featurePages.mannequinVirtuel.howToUse.step3'),
  t('featurePages.mannequinVirtuel.howToUse.step4'),
])

const quotes = computed(() => [
  t('featurePages.mannequinVirtuel.quotes.quote1'),
  t('featurePages.mannequinVirtuel.quotes.quote2'),
  t('featurePages.mannequinVirtuel.quotes.quote3'),
])
</script>

<template>
  <FeaturePageTemplate
    icon="heroicons:user-circle"
    :badge="$t('featurePages.mannequinVirtuel.badge')"
    :title="$t('featurePages.mannequinVirtuel.title')"
    :subtitle="$t('featurePages.mannequinVirtuel.subtitle')"
    :cta-label="$t('cta.primary')"
    :what-is-title="$t('featurePages.mannequinVirtuel.whatIs.title')"
    :what-is-text1="$t('featurePages.mannequinVirtuel.whatIs.text1')"
    :what-is-text2="$t('featurePages.mannequinVirtuel.whatIs.text2')"
    :concept-image-url="visuals.output"
    :concept-image-alt="$t('featurePages.mannequinVirtuel.conceptImageAlt')"
    :before-image-url="visuals.before"
    :before-image-alt="$t('featurePages.mannequinVirtuel.beforeImageAlt')"
    :workflow-image-url="visuals.workflow"
    :workflow-image-alt="$t('featurePages.mannequinVirtuel.workflowImageAlt')"
    :why-title="$t('featurePages.mannequinVirtuel.whyAdopt.title')"
    :benefits="benefits"
    :how-title="$t('featurePages.mannequinVirtuel.howToUse.title')"
    :steps="steps"
    :quotes="quotes"
    :final-cta-title="$t('cta.finalSection.title')"
    :final-cta-sub="$t('cta.finalSection.subtitle')"
    :final-cta-btn-primary="$t('cta.primary')"
    :final-cta-btn-secondary="$t('cta.pricing')"
  />
</template>
