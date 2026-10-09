<!-- Base de connaissance du chatbot /help du site vitrine (server/api/ask.post.ts) : envoyée en entier à chaque
     question, garder ce fichier dense, factuel et sans chiffre non vérifié.
     Source : dépôt de l'application AI-Studio-Photo-App, vérifiée le 2026-10-09 : backend/config/models.json (modèles et
     coûts), backend/internal/config/*.go (paliers, limites, durées), frontend/i18n/locales/fr.json
     (libellés et parcours), backend/internal/legal/content (CGU, CGV, confidentialité), docs/prompting-guide*.md.
     Mise à jour : à chaque changement de l'application (modèle, coût, palier, limite, parcours), vérifier dans le code puis
     corriger ici ET dans backend/internal/services/chatbot_prompt.md de l'application (même faits, en anglais ; ses chiffres
     sont injectés depuis la configuration). Ne jamais ajouter de prix : ils viennent de Stripe et s'affichent dans l'app. -->

# Documentation support — Glint Studio

## 1. Présentation

Glint Studio est une application web (https://app.glintstudio.ai) qui génère, avec des modèles d'intelligence
artificielle, des images et des vidéos de produits. Elle s'adresse aux organisations : marques, e-commerçants, agences.
Les crédits, l'abonnement, les générations et l'historique appartiennent à une organisation, partagée par ses membres.

Trois studios :
- **Studio Virtuel** : met en scène la photo d'un produit dans un décor. Résultat : une image.
- **Motion Studio** : anime une image de départ. Résultat : une vidéo MP4 de 5 ou 10 secondes.
- **Mannequin Virtuel** : présentation d'un article de mode sur un mannequin généré. Ce studio est affiché dans
  l'application mais **actuellement indisponible** : aucune génération ne peut y être lancée.

L'usage se compte en crédits : chaque génération coûte un nombre de crédits affiché avant le lancement. Les crédits
viennent d'un abonnement mensuel (Starter, Pro ou Business) ou, sur le plan gratuit Free, d'une dotation unique offerte
à l'inscription. Les générations sont produites par des modèles tiers (Seedream de ByteDance, MiniMax, Wan d'Alibaba,
Gemini de Google), appelés par l'intermédiaire du fournisseur fal.ai.

Menu de l'application : Studio Virtuel, Mannequin Virtuel, Motion Studio, Historique, Bibliothèque, Mon Compte,
Abonnements, Paramètres, Profil, Aide. Une visite guidée du Studio Virtuel est proposée à la première connexion : elle
crée une photo de démonstration à partir d'images d'exemple et coûte 0 crédit. Elle peut être relancée depuis la page
Aide de l'application (sur ordinateur).

## 2. Créer un compte et se connecter

- **Pas de mot de passe.** La connexion se fait uniquement par un fournisseur d'identité : Google, GitHub ou Microsoft
  (la page de connexion affiche les fournisseurs proposés). Page : https://app.glintstudio.ai/signin.
- **La première connexion crée le compte.** Après le retour du fournisseur, l'écran « Créer votre compte » demande :
  - de vérifier les informations transmises par le fournisseur ;
  - le nom de l'organisation (prérempli « Espace de travail de <nom> », modifiable plus tard dans Paramètres) ;
  - de cocher l'acceptation des Conditions générales d'utilisation et de la Politique d'usage acceptable, et la prise
    de connaissance de la Politique de confidentialité. Sans cette case, aucun compte n'est créé.
  L'inscription doit être terminée dans le délai affiché (60 minutes), prolongeable avant son échéance avec « Prolonger
  le délai ». Passé ce délai, il faut se reconnecter avec le fournisseur. « Refuser » annule l'inscription.
- **À la création** : le compte, une organisation personnelle dont vous êtes Propriétaire, et 10 crédits offerts une
  seule fois (plan Free). Aucune carte bancaire n'est demandée.
- **Adresse vérifiée obligatoire** : si le fournisseur ne transmet pas d'adresse email vérifiée, la connexion est
  refusée. Vérifiez l'adresse chez le fournisseur ou choisissez-en un autre.
- **Un seul compte par adresse** : se connecter par un autre fournisseur qui transmet la même adresse vérifiée mène au
  même compte, et ce fournisseur y est lié.
- **Fournisseurs liés** : Mon Compte, onglet Connexions, section « Fournisseurs de connexion ». On peut lier un autre
  fournisseur ou en retirer un. Le seul fournisseur actif ne peut pas être retiré ; retirer un fournisseur ferme vos
  autres sessions ouvertes.
- **Durée de session** : la session prend fin après 7 jours sans activité, et au plus tard 30 jours après son ouverture.
  Si la session expire dans un studio, le travail en cours est conservé et retrouvé après reconnexion dans le même
  onglet ; une image dont l'import n'était pas terminé doit être importée de nouveau.
- L'adresse email du compte ne peut pas être modifiée.
- Quand des textes légaux importants sont mis à jour, l'application demande de les accepter pour continuer.
- Une personne invitée sans compte crée son compte depuis le lien de l'invitation, puis revient à l'invitation.

## 3. Organisations, rôles et invitations

**Rôles** (un par membre et par organisation) :
- **Propriétaire (Owner)** : tous les droits. Seul à voir et gérer la facturation et l'abonnement, à transférer la
  propriété et à supprimer l'organisation. Une organisation a un seul Propriétaire.
- **Administrateur** : génère, gère l'équipe et les paramètres. Invite des Administrateurs, Membres et Lecteurs, change
  les rôles, retire les Membres et Lecteurs, mais jamais un autre Administrateur. Peut supprimer tout contenu.
- **Membre** : génère, consomme les crédits de l'organisation, supprime le contenu qu'il a généré.
- **Lecteur** : lecture seule. Consulte l'historique et la bibliothèque, télécharge les médias. Ne peut ni générer, ni
  importer d'image, ni utiliser l'assistant de la page Aide de l'application.

**Inviter** (Paramètres, réservé au Propriétaire et aux Administrateurs) : saisir l'adresse email et le rôle, puis
« Envoyer l'invitation ». On ne peut pas proposer un rôle supérieur au sien. Une invitation est valable 7 jours ; elle
peut être renvoyée (ce qui la renouvelle), révoquée, ou supprimée une fois expirée. La personne invitée accepte depuis le
lien reçu par email, connectée avec un compte qui porte la même adresse email que l'invitation.

**Sièges** : chaque palier fixe un nombre maximal de membres (voir section 5). Les sièges comptent tous les membres,
quel que soit leur rôle, et les invitations en attente. Quota atteint : l'invitation est refusée.

**Gestion de l'équipe** :
- Un changement de rôle prend effet immédiatement : le membre est déconnecté et reçoit un email.
- Un membre retiré perd l'accès tout de suite ; ses générations restent dans l'historique. Pour revenir, il lui faut une
  nouvelle invitation.
- Administrateur, Membre et Lecteur peuvent quitter une organisation. Le Propriétaire ne peut pas : il doit d'abord
  transférer la propriété ou supprimer l'organisation.
- **Transfert de propriété** : le Propriétaire désigne un Administrateur ou un Membre (pas un Lecteur) et choisit le
  rôle qu'il gardera ensuite. Il reste Propriétaire tant que le destinataire n'a pas accepté. La demande est valable 7
  jours ; son renvoi la prolonge de 7 jours. Une seule demande à la fois ; impossible si l'organisation est en impayé ou
  suspendue.

**Plusieurs organisations** : « + Créer une organisation » dans le menu (nom et identifiant de 3 à 48 caractères :
minuscules, chiffres, tirets). Chaque organisation a son propre solde de crédits, ses membres et son abonnement. Un
utilisateur sans abonnement payant actif ne peut être Propriétaire que d'une seule organisation ; le nombre
d'organisations rejointes sur invitation n'est pas limité. L'organisation active se choisit dans le menu.

**Supprimer une organisation** : Propriétaire seulement, Paramètres, zone « Zone dangereuse », en tapant le nom de
l'organisation. Irréversible : tous ses médias sont effacés définitivement, l'abonnement est annulé immédiatement sans
remboursement, et les crédits restants sont perdus sans compensation.

## 4. Crédits

- Chaque génération coûte des crédits. Le coût dépend du modèle et, pour une vidéo, de sa durée. Il est affiché avant
  le lancement et fixé au moment du lancement.
- Le solde appartient à l'organisation. Mon Compte affiche le solde total, le montant retenu par les générations en
  cours et le solde disponible.
- **Retenue puis débit** : au lancement, le coût est retenu sur le solde. Il n'est débité qu'à la livraison du résultat.
  Si la génération échoue, pour quelque raison que ce soit (service indisponible, contenu refusé, délai dépassé, échec
  inattendu), la retenue est libérée et **aucun crédit n'est débité**.
- Un lancement est refusé si le solde disponible est inférieur à son coût.
- **Pas de report** : les crédits non consommés sont perdus à la fin de chaque période de facturation. Le plan Free n'a
  pas de période : ses crédits offerts ne sont pas perdus avec le temps, mais ne sont jamais renouvelés.
- Pas d'achat de crédits à l'unité ni de recharge : les crédits viennent uniquement de l'allocation mensuelle du palier
  (et de la dotation unique du plan Free).
- **Alertes** : « Solde bientôt épuisé » quand le solde disponible descend à 20 % de l'allocation ou moins ; « Solde
  épuisé » quand il ne permet plus aucun lancement. Ces alertes peuvent aussi arriver par email. Le Propriétaire reçoit un
  rappel 7 jours avant la fin de la période de facturation.
- **Suivi** : Mon Compte, onglet Utilisation : historique des mouvements de crédits (générations débitées, allocation de
  la période, prorata de changement de palier, dotation, crédits offerts, pertes à l'échéance, remboursements), avec
  filtre par dates. La carte « Capacité restante » estime le nombre de générations encore possibles par studio.

## 5. Paliers et abonnement

Quatre paliers, et aucun autre : Free, Starter, Pro, Business. Valeurs en vigueur au 2026-10-09 (la page Abonnements de
l'application fait foi) :

- **Free** : 10 crédits offerts une seule fois à la création du compte, non renouvelés ; 1 membre ; 1 génération
  simultanée ; 200 Mo de stockage.
- **Starter** : 50 crédits par mois ; jusqu'à 2 membres ; 2 générations simultanées ; 1 Go de stockage.
- **Pro** : 150 crédits par mois ; jusqu'à 4 membres ; 4 générations simultanées ; 3 Go de stockage.
- **Business** : 400 crédits par mois ; jusqu'à 8 membres ; 8 générations simultanées ; 8 Go de stockage.

En dehors de ces chiffres, tous les paliers donnent accès aux mêmes studios et aux mêmes modèles. Le stockage compte le
volume des médias conservés par l'organisation : une fois la limite atteinte, les nouveaux lancements sont refusés, les
médias déjà stockés restent disponibles. Les générations simultanées sont celles en attente ou en cours en même temps
dans l'organisation.

**Prix** : ils ne figurent pas dans cette documentation. Ils sont affichés dans l'application, page Abonnements
(réservée au Propriétaire de l'organisation, une fois connecté). Facturation au mois uniquement : pas d'offre annuelle.
Sans engagement, résiliable à tout moment.

- **Souscrire** : le Propriétaire, page Abonnements, « Choisir Starter / Pro / Business », puis paiement sur la page du
  prestataire de paiement (Stripe). Les crédits sont ajoutés dès que le prestataire confirme le paiement, en général en
  quelques instants.
- **Passer à un palier supérieur** : Mon Compte, « Changer de palier ». Un aperçu détaille avant confirmation le prorata
  ajouté au solde, les crédits éventuellement perdus au changement et le prix facturé à la date du changement. Une
  nouvelle période commence à cette date. Le temps non utilisé de l'ancien palier n'est pas remboursé. Rien ne change
  avant la confirmation du paiement.
- **Passer à un palier inférieur** : pas de changement direct. Il faut résilier l'abonnement en cours (retour au plan
  Free à la fin de la période), puis souscrire le palier voulu.
- **Résilier** : Mon Compte, « Résilier l'abonnement ». La fin intervient à la fin de la période en cours ; jusque-là,
  le palier et le solde restent disponibles. À cette date, les crédits restants sont perdus et l'organisation passe au
  plan Free. Aucun remboursement de la période en cours. Les médias continuent d'expirer selon la durée de conservation.
  La résiliation peut être annulée avant son échéance (« Annuler la résiliation »).
- **Consommateurs** : les Conditions générales de vente prévoient un droit de rétractation de 14 jours ; les modalités y
  sont décrites (https://app.glintstudio.ai/legal/sales).
- **Facturation** (Propriétaire uniquement) : Mon Compte, onglet Facturation : factures (consultables chez le
  prestataire de paiement), remplacement du moyen de paiement, pays de facturation (obligatoire) et numéro de TVA
  intracommunautaire (facultatif).
- **Paiement échoué** : un bandeau « Paiement de l'abonnement en souffrance » s'affiche, avec le bouton « Régulariser
  le paiement ». Pendant 7 jours, tout reste disponible. À partir du 7e jour, lancer une génération, importer une image et
  inviter un membre sont suspendus. À partir du 14e jour, l'organisation est suspendue (gestion des membres et paramètres
  aussi) ; l'historique et les téléchargements restent accessibles. Au 21e jour, l'abonnement est annulé et
  l'organisation passe en Free.

## 6. Studio Virtuel

Met en scène la photo d'un produit (packshot) dans un décor, pour une photo commerciale. Une image par lancement.

**Entrées** :
- **Produit** (obligatoire) : la photo du produit, importée ou choisie dans la bibliothèque. Conseil : une photo
  montrant un seul produit, photographié seul. Le produit est conservé à l'identique (forme, couleurs, textes, logos).
- **Décor** (facultatif) : il remplace l'arrière-plan. Au choix : un décor du catalogue Glint Studio, une image de la
  bibliothèque, ou une image importée.
- **Objets** (facultatif) : jusqu'à 8 accessoires placés autour du produit, à l'échelle, sans le masquer.
- **Consigne** (prompt) : facultative avec un décor du catalogue ou une image de décor ; obligatoire sans décor.
  4 000 caractères au plus.
- Au total, de 1 à 10 images par lancement.

**Catalogue de décors (19)**, en 4 catégories :
- E-commerce neutre : Fond blanc épuré, Gris neutre, Studio professionnel, Fond dégradé.
- Luxe : Marbre et or, Velours noir, Bois noble, Pierre et végétaux, Miroir et lumière.
- Contexte d'usage : Bureau moderne, Cuisine contemporaine, Salon cosy, Salle de bain, Extérieur terrasse.
- Saisonnier : Noël et fêtes, Printemps floral, Été plage, Automne chaleureux, Saint-Valentin.

**Formats de sortie** : Carré 1:1 (2048 × 2048 px, fiche produit et marketplaces), Portrait 4:5 (2048 × 2560 px,
réseaux sociaux), Paysage 16:9 (3413 × 1920 px, site web et en-tête), Bannière 3:1 (4096 × 1365 px, bannière de site ou
d'email).

**Modèles et coût par image** : Seedream 4.5, Seedream 4.0 et Seedream 5.0 Lite : 2 crédits ; Seedream 5.0 Pro :
10 crédits.

**Dossier** : on peut choisir le dossier où ranger la génération (voir section 10).

## 7. Motion Studio

Anime une image de départ selon une consigne de mouvement (mode « Animer une image »).

**Entrées** :
- **Image de départ** (obligatoire, une seule) : fichier importé, URL d'image, ou image choisie dans l'historique.
- **Consigne** (obligatoire) : le mouvement et la scène souhaités, 4 000 caractères au plus.
- **Durée** : 5 ou 10 secondes.
- **Format et résolution** selon le modèle (ci-dessous).

**Modèles et coût par vidéo** :
- MiniMax H3 : 23 crédits (5 s) ou 45 crédits (10 s). Résolution 768P ; la vidéo garde le format de l'image source.
- Wan 3.0 : 38 crédits (5 s) ou 75 crédits (10 s). Formats 16:9, 9:16 ou 1:1 ; 720p.
- Gemini Omni Flash 1.1 : 38 crédits (5 s) ou 75 crédits (10 s). Formats 16:9 ou 9:16 ; 720p.

**Sortie** : vidéo MP4 de la durée choisie, au moins 720 px sur le plus petit côté, 50 Mo au plus.

Une vidéo prend plus de temps qu'une image. L'application affiche le temps écoulé ; on peut quitter la page sans
interrompre la génération.

## 8. Mannequin Virtuel

Studio prévu pour présenter un article de mode porté par un mannequin généré : photo de l'article
(seul, à plat, sur cintre ou sur un mannequin de vitrine, sans personne), puis choix du genre, de l'âge apparent, de la
morphologie, de la carnation, de la pose, du fond et du format. **Il est actuellement indisponible** : aucune date
d'ouverture n'est communiquée ici.

## 9. Bien rédiger une consigne

**Bouton « Améliorer »** (Studio Virtuel et Motion Studio) : reformule votre consigne pour le modèle choisi. C'est
gratuit (aucun crédit), limité à 30 demandes par minute. La consigne améliorée est rédigée en anglais, la langue la
mieux suivie par les modèles ; vous pouvez écrire la vôtre en français. Relisez-la avant de lancer ; « Revenir à ma
consigne » restaure votre texte. Si vous changez de modèle ou de réglage, « Reformuler pour ce réglage » l'adapte.

**Studio Virtuel** :
- Commencez par le cadrage : type de plan, distance, hauteur et angle de la caméra, place du produit dans l'image.
- Décrivez seulement la partie du décor visible dans ce cadrage, pas toute la pièce. Ensuite : sur quoi le produit est
  posé, les matières du décor, la lumière (source, direction, moment de la journée), puis le rendu (profondeur de champ,
  arrière-plan flou).
- Phrases simples plutôt que listes de mots-clés ; du concret plutôt que des adjectifs (« lumière douce venant d'une
  fenêtre à gauche » plutôt que « magnifique »). Court vaut mieux que long.
- Inutile de répéter ce que l'application impose déjà : produit identique, pas de texte ajouté, échelle des objets.
- N'écrivez pas le format ou la résolution (« 16:9 », « 4K ») : ils se règlent dans le formulaire.
- Ne demandez pas plusieurs vues, une série ou un avant-après : chaque lancement produit une image.
- Un texte à faire apparaître se met entre guillemets, à l'identique ; son rendu reste incertain.
- Limites connues : un profil strict du produit n'est pas tenu (rendu de trois quarts) ; une face cachée sur la photo
  d'origine est inventée par le modèle. Vérifiez toujours la fidélité du produit sur le résultat.

**Motion Studio** :
- Décrivez une vidéo, pas une image : ce qui bouge, dans quel ordre, et l'état final. Ne redécrivez pas l'image de
  départ.
- Un seul plan et un seul mouvement de caméra, lent (rapprochement, arc, orbite) ou un plan fixe.
- Précisez ce qui ne doit pas changer : forme, étiquette, couleur, logo du produit.
- Pour un produit seul, précisez qu'il n'y a ni musique, ni dialogue, ni bruitage superflu : les modèles peuvent
  générer du son.
- Durée et format se règlent dans le formulaire, pas dans la consigne. Changez un seul élément à la fois entre deux
  essais.

## 10. Images importées, bibliothèque et dossiers

**Images importées** : JPEG, PNG ou WebP, 10 Mo au plus, chaque côté entre 512 et 6 000 pixels. Import par
glisser-déposer ou sélection de fichier ; certains champs acceptent aussi une URL d'image. Une image importée directement
dans un studio ne sert qu'à cette génération : elle n'est pas ajoutée à la bibliothèque.

**Bibliothèque** (menu Bibliothèque) : images communes à tous les membres de l'organisation, réutilisables dans les
studios. Catégories : Image source, Décor, Objet. 500 images au plus par organisation ; 100 dossiers au plus, sur un seul
niveau. Une image de la bibliothèque est conservée jusqu'à ce qu'un membre la supprime (elle n'expire pas au bout de
30 jours) ; la supprimer ne change pas les générations déjà faites. Le Lecteur consulte sans importer ni ranger.

**Dossiers** : les mêmes dossiers servent à la bibliothèque et à l'historique (par exemple un dossier par client). Dans
chaque studio, on choisit le dossier de destination, ou on en crée un ; le choix est mémorisé par le navigateur. Dans
l'historique, une ou plusieurs entrées se déplacent avec « Déplacer vers… ». Une relance garde le dossier d'origine ; une
génération lancée depuis Claude est rangée sans dossier.

## 11. Historique et téléchargements

**Historique de l'organisation** : toutes les générations de l'organisation, visibles par tous ses membres. Filtres :
studio, statut (réussie, échouée, expirée), membre, période, dossier ; tri du plus récent au plus ancien ou l'inverse.
Le détail d'une entrée montre le studio, le modèle, la date, l'auteur, la consigne, les images d'entrée, les paramètres,
le coût débité et la date d'expiration. Le badge « Claude » signale une génération lancée depuis Claude.

**Actions** :
- **Télécharger** un média. Les liens de téléchargement sont temporaires : ils ne doivent pas servir à publier ou
  héberger un média durablement.
- **Téléchargement groupé** : sélectionner jusqu'à 50 entrées, puis « Télécharger l'archive » (ZIP, 1 Gio au plus).
  Seules les entrées réussies dont le média est encore disponible sont incluses.
- **Relancer** : relance à l'identique, au coût affiché. Impossible si le modèle n'est plus proposé, si le studio est
  désactivé ou si la génération est trop ancienne.
- **Supprimer** : la génération, son média, sa consigne et ses images d'entrée sont supprimés définitivement.
- Le Lecteur consulte et télécharge, sans lancer ni ranger.

## 12. Conservation des médias

- Les médias générés et les fichiers importés dans les studios sont conservés **30 jours**, puis effacés
  définitivement, **quel que soit le plan**, Free compris. Cette durée ne peut pas être prolongée.
- Un avertissement est envoyé 7 jours avant l'expiration (email, et mention « Expire bientôt » dans l'historique).
- Glint Studio n'est pas un service d'archivage : téléchargez ce que vous voulez garder avant l'expiration.
- Une résiliation ne supprime pas les médias existants ; une suppression d'organisation les efface tous.
- Les résultats portent une métadonnée indiquant qu'ils sont générés par IA (champ IPTC « DigitalSourceType ») ; les
  CGU interdisent de la retirer.

## 13. Langues, profil et emails

- Langues de l'application et des emails : English, Français, Español, Deutsch, Italiano. Profil, section Langue.
- Profil : nom affiché (1 à 80 caractères, visible par les membres de vos organisations), avatar, langue, préférences
  d'email. L'adresse email ne peut pas être modifiée.
- **Préférences d'email** (Profil) : alertes de solde bas, alertes d'expiration des médias, avis aux administrateurs.
  Le choix vaut pour toutes vos organisations. Les emails liés au compte, aux paiements et aux accès sont toujours
  envoyés. Se désabonner d'une alerte ne retire pas les avertissements affichés dans l'application.

## 14. Compte, données personnelles et textes légaux

- **Exporter ses données** : Profil, section « Mes données », « Télécharger mes données ». Fichier JSON avec les données
  du compte et les générations que vous avez lancées dans vos organisations actuelles, accompagné d'un résumé de leur
  finalité, de leurs destinataires et de leur durée de conservation.
- **Supprimer son compte** : Profil, section Compte, « Supprimer mon compte ». Avant de confirmer, l'application montre
  ce qu'il advient de chaque organisation. La suppression est immédiate et définitive ; elle se confirme en saisissant
  l'adresse email du compte. Elle efface nom, adresse email, avatar et fournisseurs liés, et ferme toutes les sessions.
  - Les organisations dont vous êtes Propriétaire et qui ont d'autres membres doivent d'abord être transférées ou
    supprimées.
  - Celles dont vous êtes le seul membre sont supprimées avec le compte, avec tout leur contenu.
  - Les organisations dont vous n'êtes que membre sont conservées : vous les quittez.
  - Une organisation suspendue bloque la suppression : contacter le support.
  - Une réinscription ultérieure avec la même adresse ne donne pas de nouveaux crédits offerts.
- **Entraînement** : Glint Studio n'utilise pas vos images, vos consignes ni vos résultats pour entraîner des modèles
  d'IA. Le traitement par fal.ai et les fournisseurs de modèles est décrit dans la Politique de confidentialité.
- **Droits sur les résultats** : selon les CGU (section 6), Glint Studio vous cède les droits qu'il pourrait détenir sur
  les résultats, utilisables à toute fin licite sous réserve des CGU, de la Politique d'usage acceptable et des licences
  des fournisseurs de modèles. Pour toute question juridique, renvoyer vers les textes ou le support.
- **Textes légaux** (publics, en cinq langues ; la version anglaise fait foi en cas de divergence) :
  - Conditions générales d'utilisation : https://app.glintstudio.ai/legal/terms
  - Conditions générales de vente : https://app.glintstudio.ai/legal/sales
  - Politique de confidentialité (RGPD, données, sous-traitants) : https://app.glintstudio.ai/legal/privacy
  - Politique en matière de cookies : https://app.glintstudio.ai/legal/cookies
  - Politique d'usage acceptable : https://app.glintstudio.ai/legal/acceptable-use
  - Mentions légales : https://app.glintstudio.ai/legal/notice
  - Signaler un contenu abusif : https://app.glintstudio.ai/report-abuse

## 15. Connexion à Claude (MCP)

Glint Studio peut être connecté à Claude pour créer des images et des vidéos en conversation. Mon Compte, onglet
Connexions, section « Connexions Claude », bouton « Ajouter à Claude » : Claude s'ouvre sur l'ajout du connecteur ;
après confirmation, connectez-vous à Glint Studio, choisissez l'organisation et les limites, puis autorisez l'accès.
- Claude Desktop reprend les connecteurs de claude.ai. Pour Claude Code, la page donne une commande à lancer, puis /mcp.
  Tout autre client MCP peut ajouter le serveur distant dont l'adresse est affichée sur la page.
- Depuis Claude : lister les modèles, lire le solde, lancer une génération, la suivre, obtenir un lien de
  téléchargement, consulter l'historique. La facturation, les membres et le catalogue de décors ne sont pas accessibles
  depuis Claude. Claude agit avec les droits de votre rôle : un Lecteur ne peut rien lancer.
- Chaque connexion donne accès à une seule organisation, avec un plafond de crédits (200 par défaut) et un seuil de
  confirmation (30 crédits par défaut) : au-delà, Claude demande votre accord avant de lancer. Les deux limites se
  modifient dans « Modifier les limites ».
- Une connexion expire après 7 jours sans utilisation et peut être révoquée à tout moment (« Révoquer »).

## 16. Dépannage

- **Génération échouée** : l'historique et la notification indiquent la cause : délai dépassé (10 minutes pour une
  image, 30 minutes pour une vidéo), service de génération indisponible ou saturé, style de rendu introuvable, contenu
  refusé par la politique du fournisseur, échec inattendu. Dans tous les cas, aucun crédit n'est débité. Actions :
  « Relancer à l'identique », ou « Modifier la demande » (notamment pour un contenu refusé). Si le service est
  indisponible, réessayer dans quelques minutes.
- **« Crédits insuffisants »** : le solde disponible (solde total moins les crédits retenus par les générations en
  cours) est inférieur au coût. Choisir un modèle ou une durée moins chers, attendre la prochaine allocation, ou changer
  de palier (Propriétaire ; les autres rôles doivent le lui demander).
- **Limite de générations simultanées atteinte** : attendre la fin d'une génération en cours, ou passer à un palier
  supérieur.
- **Limite de stockage atteinte** : supprimer des entrées de l'historique, attendre l'expiration de médias, ou changer
  de palier.
- **Import refusé** : vérifier le format (JPEG, PNG, WebP), le poids (10 Mo au plus) et les dimensions (côtés entre 512
  et 6 000 px). « Trop d'imports » : attendre quelques secondes.
- **Modèle ou studio indisponible** : bandeau « Ce style de rendu est momentanément indisponible » ; les générations en
  cours se poursuivent, réessayer plus tard.
- **Aperçu expiré** dans l'historique : bouton « Rafraîchir ».
- **Connexion impossible** : connexion annulée chez le fournisseur, fournisseur injoignable, tentative expirée
  (réessayer), adresse non vérifiée (voir section 2), fournisseur retiré du compte (se connecter avec un autre
  fournisseur lié, puis le lier de nouveau).
- **Invitation** : lien invalide, expiré, déjà utilisé ou révoqué : demander une nouvelle invitation. « Associée à une
  autre adresse email » : se connecter avec le compte qui porte l'adresse invitée.
- **Après paiement, crédits pas encore visibles** : la confirmation du prestataire prend en général quelques instants ;
  utiliser « Vérifier à nouveau » sur la page de confirmation ou recharger Mon Compte.
- **Paiement échoué** : voir section 5 ; régulariser depuis le bandeau.
- **Bouton Générer grisé** : produit manquant, consigne manquante sans décor, rôle Lecteur, solde insuffisant ou
  génération déjà en cours.
- **« Aucune organisation »** : si vous n'avez plus d'organisation accessible, l'application l'indique ; acceptez une
  invitation ou créez une organisation.

## 17. Contact

Page contact du site : https://glintstudio.ai/help#contact
- Support : support@glint-studio.com
- Ventes, partenariats, presse : contact@glint-studio.com

## 18. Ce que l'assistant ne sait pas : quand renvoyer vers le support

L'assistant ne voit ni le compte, ni l'organisation, ni le solde, ni les générations, ni les factures de l'utilisateur,
et ne peut rien faire dans l'application. Il explique où se trouve une action.

Il ne connaît pas et ne doit pas inventer :
- les prix des paliers (page Abonnements de l'application) ;
- les dates de sortie (Mannequin Virtuel, nouveaux modèles, nouvelles fonctions) ;
- un geste commercial, une offre entreprise ou une démonstration (écrire à contact@glint-studio.com) ;
- l'état d'une génération, d'un paiement ou d'une facture précis ;
- un avis juridique, fiscal ou financier.

Renvoyer vers support@glint-studio.com pour : facture contestée ou remboursement, rétractation, problème de paiement non
résolu, organisation suspendue, demande sur les données personnelles (RGPD), compte inaccessible, génération bloquée ou
crédits qui ne correspondent pas à l'historique, et toute question absente de cette documentation. Pour un contenu
abusif : le formulaire https://app.glintstudio.ai/report-abuse.
