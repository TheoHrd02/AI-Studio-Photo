<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
</script>

<template>
  <CommonLegalPage
    title="Mentions légales"
    description="Informations légales sur l'éditeur et l'hébergeur du site AI Studio Photo."
    updated-at="[à compléter]"
  >
    <section>
      <h2>Éditeur du site</h2>
      <p>
        Le site aistudiophoto.com est édité par <mark>[raison sociale, forme juridique]</mark>,
        au capital de <mark>[montant]</mark>, immatriculée sous le numéro <mark>[n° d'immatriculation]</mark>,
        dont le siège est situé <mark>[adresse]</mark>.
      </p>
      <ul>
        <li>N° de TVA intracommunautaire : <mark>[n° TVA]</mark></li>
        <li>Email : <mark>[email de contact]</mark></li>
        <li>Directeur de la publication : <mark>[nom]</mark></li>
      </ul>
    </section>

    <section>
      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <mark>[nom de l'hébergeur]</mark>, <mark>[adresse]</mark>,
        <mark>[téléphone ou site web]</mark>.
      </p>
    </section>

    <section>
      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus du site (textes, visuels, vidéos, logos, marques) est la propriété
        de <mark>[raison sociale]</mark> ou de ses partenaires. Toute reproduction ou représentation,
        totale ou partielle, sans autorisation écrite préalable est interdite.
      </p>
    </section>

    <section>
      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles est décrit dans la
        <NuxtLink to="/confidentialite">politique de confidentialité</NuxtLink>.
      </p>
    </section>
  </CommonLegalPage>
</template>
