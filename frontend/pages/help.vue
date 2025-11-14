<script setup lang="ts">
definePageMeta({
  layout: 'marketing',
})

useHead({
  title: 'Aide - AI Studio Photo',
  meta: [
    {
      name: 'description',
      content: 'Posez vos questions à notre assistant IA et obtenez des réponses instantanées sur AI Studio Photo.',
    },
  ],
})

// Questions pré-sélectionnées personnalisées pour AI Studio Photo
const suggestedQuestions = [
  'Comment fonctionne AI Studio Photo ?',
  'Quels sont les tarifs et les plans disponibles ?',
  'Comment créer une photo studio professionnelle ?',
  'Puis-je ajouter des mannequins virtuels à mes photos ?',
  'Comment créer des animations et vidéos promotionnelles ?',
  'Quels formats de fichiers sont supportés ?',
]
</script>

<template>
  <div class="bg-white">
    <!-- Chatbot Section - Plein écran -->
    <section class="min-h-screen relative">
      <div class="h-screen pt-16">
        <FeaturesChatInterface
          :suggested-questions="suggestedQuestions"
          placeholder="Posez votre question sur AI Studio Photo..."
          empty-state-title="Comment puis-je vous aider ?"
          empty-state-description="Posez-moi n'importe quelle question sur AI Studio Photo et je vous répondrai instantanément à partir de notre documentation."
        />
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-16">
            <div class="inline-block p-3 bg-[#912efb]/10 rounded-2xl mb-6">
              <svg class="w-12 h-12 text-[#912efb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Besoin d'aide supplémentaire ?
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter directement.
            </p>
          </div>

          <!-- Contact Cards -->
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <!-- Email Support -->
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div class="w-12 h-12 bg-[#912efb]/10 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-[#912efb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Email Support
              </h3>
              <p class="text-gray-600 mb-4 text-sm">
                Réponse sous 24h en semaine
              </p>
              <a href="mailto:support@aistudiophoto.com" class="text-[#912efb] hover:text-[#7e1fe0] font-medium inline-flex items-center group">
                support@aistudiophoto.com
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <!-- Sales -->
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div class="w-12 h-12 bg-[#912efb]/10 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-[#912efb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Ventes & Partenariats
              </h3>
              <p class="text-gray-600 mb-4 text-sm">
                Pour les entreprises et revendeurs
              </p>
              <a href="mailto:sales@aistudiophoto.com" class="text-[#912efb] hover:text-[#7e1fe0] font-medium inline-flex items-center group">
                sales@aistudiophoto.com
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <!-- Press -->
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div class="w-12 h-12 bg-[#912efb]/10 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-[#912efb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Presse & Médias
              </h3>
              <p class="text-gray-600 mb-4 text-sm">
                Relations presse et demandes média
              </p>
              <a href="mailto:press@aistudiophoto.com" class="text-[#912efb] hover:text-[#7e1fe0] font-medium inline-flex items-center group">
                press@aistudiophoto.com
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <!-- FAQ Rapide -->
          <div class="bg-[#eff0f0] rounded-2xl p-8 mb-16">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
              Questions Fréquentes
            </h3>
            <div class="space-y-4">
              <details class="group bg-white rounded-xl p-6 cursor-pointer">
                <summary class="font-semibold text-gray-900 flex justify-between items-center">
                  Quels sont les délais de réponse ?
                  <svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p class="mt-4 text-gray-600 text-sm">
                  Notre équipe répond généralement sous 24h en semaine. Pour les questions urgentes, contactez-nous directement par email.
                </p>
              </details>

              <details class="group bg-white rounded-xl p-6 cursor-pointer">
                <summary class="font-semibold text-gray-900 flex justify-between items-center">
                  Puis-je obtenir une démo personnalisée ?
                  <svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p class="mt-4 text-gray-600 text-sm">
                  Absolument ! Contactez notre équipe sales pour planifier une démonstration adaptée à vos besoins.
                </p>
              </details>

              <details class="group bg-white rounded-xl p-6 cursor-pointer">
                <summary class="font-semibold text-gray-900 flex justify-between items-center">
                  Proposez-vous un support en français ?
                  <svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p class="mt-4 text-gray-600 text-sm">
                  Oui ! Notre support est disponible en français et en anglais, 7j/7.
                </p>
              </details>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center">
            <p class="text-gray-600 mb-6">
              Vous préférez discuter en direct ?
            </p>
            <a href="#" class="inline-flex items-center px-8 py-4 bg-[#912efb] text-white rounded-xl font-semibold hover:bg-[#7e1fe0] transition-colors shadow-lg hover:shadow-xl">
              Démarrer une conversation
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
