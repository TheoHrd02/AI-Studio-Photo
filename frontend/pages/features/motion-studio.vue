<script setup lang="ts">
import { featureVisuals } from '~/config/visual-proof.config'

const { t } = useI18n()

definePageMeta({ layout: 'marketing' })

useHead({ title: 'Motion Studio – AI Studio Photo' })

const visuals = featureVisuals.motionStudio!

const benefits = computed(() => [
  { icon: 'heroicons:play-circle', text: t('featurePages.motionStudio.whyAdopt.benefit1') },
  { icon: 'heroicons:bolt', text: t('featurePages.motionStudio.whyAdopt.benefit2') },
  { icon: 'heroicons:share', text: t('featurePages.motionStudio.whyAdopt.benefit3') },
])

const steps = computed(() => [
  t('featurePages.motionStudio.howToUse.step1'),
  t('featurePages.motionStudio.howToUse.step2'),
  t('featurePages.motionStudio.howToUse.step3'),
  t('featurePages.motionStudio.howToUse.step4'),
])

const quotes = computed(() => [
  t('featurePages.motionStudio.quotes.quote1'),
  t('featurePages.motionStudio.quotes.quote2'),
  t('featurePages.motionStudio.quotes.quote3'),
])
</script>

<template>
  <FeaturePageTemplate
    icon="heroicons:play-circle"
    :badge="$t('featurePages.motionStudio.badge')"
    :title="$t('featurePages.motionStudio.title')"
    :subtitle="$t('featurePages.motionStudio.subtitle')"
    :cta-label="$t('cta.primary')"
    :what-is-title="$t('featurePages.motionStudio.whatIs.title')"
    :what-is-text1="$t('featurePages.motionStudio.whatIs.text1')"
    :what-is-text2="$t('featurePages.motionStudio.whatIs.text2')"
    :concept-image-url="visuals.output"
    :concept-image-alt="$t('featurePages.motionStudio.conceptImageAlt')"
    :before-image-url="visuals.before"
    :before-image-alt="$t('featurePages.motionStudio.beforeImageAlt')"
    :workflow-image-url="visuals.workflow"
    :workflow-image-alt="$t('featurePages.motionStudio.workflowImageAlt')"
    :why-title="$t('featurePages.motionStudio.whyAdopt.title')"
    :benefits="benefits"
    :how-title="$t('featurePages.motionStudio.howToUse.title')"
    :steps="steps"
    :quotes="quotes"
    :final-cta-title="$t('cta.finalSection.title')"
    :final-cta-sub="$t('cta.finalSection.subtitle')"
    :final-cta-btn-primary="$t('cta.primary')"
    :final-cta-btn-secondary="$t('cta.pricing')"
  />
</template>
