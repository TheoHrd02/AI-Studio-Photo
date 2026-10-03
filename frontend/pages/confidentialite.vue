<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
</script>

<template>
  <CommonLegalPage
    title="Politique de confidentialité"
    description="Comment AI Studio Photo collecte et traite les données personnelles des visiteurs du site."
    updated-at="[à compléter]"
  >
    <section>
      <h2>Responsable du traitement</h2>
      <p>
        <mark>[raison sociale]</mark>, <mark>[adresse]</mark>.
        Contact pour toute question relative à vos données : <mark>[email]</mark>.
      </p>
      <p>
        Cette politique couvre le site vitrine aistudiophoto.com. L'utilisation de l'application
        AI Studio Photo est régie par sa propre politique de confidentialité.
      </p>
    </section>

    <section>
      <h2>Données traitées sur ce site</h2>
      <ul>
        <li>
          <strong>Questions posées à l'assistant (page Aide)</strong> : le texte de la question est
          transmis à OpenAI pour générer la réponse. Il n'est pas enregistré par ce site et la
          conservation côté OpenAI est désactivée (<mark>[vérifier les conditions OpenAI en vigueur]</mark>).
          N'y saisissez pas de données personnelles.
        </li>
        <li>
          <strong>Adresse IP</strong> : utilisée temporairement en mémoire pour limiter le nombre de
          questions par minute (prévention des abus). Elle n'est pas enregistrée.
        </li>
        <li>
          <strong>Journaux techniques de l'hébergeur</strong> : <mark>[nature et durée de conservation selon l'hébergeur]</mark>.
        </li>
        <li>
          <strong>Emails</strong> : si vous nous écrivez, votre adresse et votre message sont utilisés
          pour vous répondre et conservés <mark>[durée]</mark>.
        </li>
      </ul>
      <p>
        Le site n'utilise ni outil de mesure d'audience, ni cookie publicitaire
        (voir la <NuxtLink to="/cookies">politique cookies</NuxtLink>).
      </p>
    </section>

    <section>
      <h2>Bases légales</h2>
      <p>
        Intérêt légitime (fonctionnement et sécurité du site, réponse aux demandes de support)
        <mark>[à valider]</mark>.
      </p>
    </section>

    <section>
      <h2>Destinataires et sous-traitants</h2>
      <ul>
        <li>Hébergement : <mark>[hébergeur, pays]</mark></li>
        <li>Assistant : OpenAI (États-Unis) — <mark>[garanties de transfert : clauses contractuelles types / DPF]</mark></li>
        <li>Diffusion des images et vidéos : Cloudinary — <mark>[pays, garanties]</mark></li>
      </ul>
    </section>

    <section>
      <h2>Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation
        et de portabilité de vos données. Pour les exercer : <mark>[email]</mark>.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de l'autorité de contrôle compétente
        (<mark>[CNIL en France / autorité du pays du siège]</mark>).
      </p>
    </section>
  </CommonLegalPage>
</template>
