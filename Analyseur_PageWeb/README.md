# Analyseur de Page Web

**Description :** Cette extension de navigateur offre un moyen pratique pour analyser rapidement les pages web, en fournissant des statistiques de contenu, des vérifications SEO, et des recommandations de performance.

---

## Fonctionnalités

- **Analyse du contenu :**
  - Compte le nombre de mots, d'images avec ou sans attribut `alt`, et de liens.

- **SEO :**
  - Affiche la longueur et le contenu des balises `<title>` et `<meta description>`.
  - Montre la structure des balises de titre (H1, H2, H3).

- **Performance :**
  - Mesure le temps de chargement de la page et sa taille.
  - Liste les ressources externes (avec le nombre et les détails).

- **Accessibilité et validation HTML :**
  - Détecte les balises HTML incorrectes ou non fermées.
  - Fournit des suggestions pour améliorer l'accessibilité et le SEO.

---

## Installation

1. **Téléchargez les fichiers du projet :**
   - Vous pouvez cloner le dépôt ou télécharger les fichiers directement.

   Pour cloner :
   ```bash
   git clone https://github.com/Steinzu/Web3Groupe21.git
   cd Analyseur_PageWeb
   ```

2. **Ajoutez l'extension à Firefox :**
   - Ouvrez Firefox et allez sur `about:debugging#/runtime/this-firefox`.
   - Cliquez sur "Charger un module complémentaire temporaire".
   - Sélectionnez le fichier `manifest.json` dans le dossier du projet.

---

## Utilisation

1. **Ouvrez la page web que vous souhaitez analyser.**
2. **Cliquez sur l'icône de l'extension dans la barre d'outils de votre navigateur.**
3. **Parcourez les différents onglets pour voir :**
   - **Contenu :** Détails sur les mots, images et liens.
   - **SEO :** Informations sur les balises titre et meta description.
   - **Performance :** Temps de chargement, taille de la page, et recommandations.
   - **Aide :** Conseils pour utiliser l'extension.

---

## Technologies utilisées

- **HTML, CSS :** Pour structurer et styliser l'interface de l'extension.
- **JavaScript :** Pour analyser le contenu et traiter les données.
- **API WebExtension :** Pour interagir avec le navigateur et stocker les données.

---

## Structure du projet

- **`manifest.json` :** Fichier de configuration de l'extension, définissant ses permissions.
- **`content.js` :** Script d'analyse injecté dans chaque page web.
- **`popup.html` :** Interface utilisateur de l'extension.
- **`popup.js` :** Script qui gère l'affichage et les interactions dans l'interface utilisateur.

---

## Limitations et Comportements Variables

### Pourquoi les résultats peuvent varier ?

Selon le navigateur utilisé (Firefox, Chrome, Opera, etc.) et le type de site analysé, les résultats peuvent parfois différer. Voici pourquoi :

- **Chargement dynamique du contenu :** Certains sites chargent des éléments (images, texte, liens) de manière asynchrone ou via JavaScript. Si le contenu n’est pas chargé au moment de l’analyse, l'extension pourrait ne pas le détecter.

- **Images de fond CSS et éléments non-standard :** Seules les images intégrées dans des balises `<img>` sont comptées. Les images en arrière-plan CSS ou générées par JavaScript ne sont pas incluses, ce qui peut expliquer des différences avec ce que vous voyez à l'écran.

- **Politiques de sécurité (CSP) :** Certains sites limitent l’accès à leurs ressources pour des raisons de sécurité, ce qui peut empêcher l'extension de capturer toutes les informations.

- **Différences entre navigateurs :** Les navigateurs interprètent et chargent les pages de manière légèrement différente. Par exemple, Firefox et Chrome peuvent gérer le contenu asynchrone différemment, ce qui explique pourquoi les résultats sont souvent plus cohérents sur Firefox.

### Conseils d'utilisation :

- Pour des résultats plus stables, nous recommandons d'utiliser l'extension sur Firefox, car elle semble mieux s'adapter aux méthodes d'analyse DOM utilisées.
- Si vous analysez un site très dynamique, vous pouvez essayer de rafraîchir la page pour capturer le contenu complet.

---

## Remarques

- Le projet a été principalement testé sur Firefox, où il fonctionne de manière optimale. Si vous souhaitez l'essayer sur Chrome, rendez-vous sur `chrome://extensions/` et chargez l'extension en mode développeur.
- **Attention :** Les résultats d'analyse peuvent varier en fonction du navigateur. Par exemple, des différences significatives ont été constatées dans le nombre de mots, d'images et de liens détectés entre Firefox, Chrome et Opera. Firefox reste le navigateur le plus fiable pour cette extension.