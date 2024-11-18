# Recherche Rapide

**Description :** Cette extension web permet de faire rapidement des recherche sur plusieurs sites avec possiblités d'en ajouter manuellement.

---

## Fonctionnalités

- **Recherche rapidement :**
  - Ecrivez ce qui vous interesse sur la barre de recherche en haut de l'extension et puis cliquez sur les sites sur lesquelles vous voulez voir les résultats.

- **Ajout manuel de site :**
  - Ecrivez le nom du site que vous voulez ajouter. *(Requis)*
  - Copiez collez l'URL du site en question, avec le `{query}` dans le parametre. *(Requis)*

- **Sauvegarde dans le LocalStorage :**
  - Les sites que vous avez rajoutez reste sauvegarder, même après la fermeture du navigateur.

---

## Installation

1. **Téléchargez les fichiers du projet :**
   - Vous pouvez cloner le dépôt ou télécharger les fichiers directement.

   Pour cloner :
   ```bash
   git clone https://github.com/Steinzu/Web3Groupe21.git
   cd recherche_rapide
   ```

2. **Ajoutez l'extension à Firefox :**
   - Ouvrez Firefox et allez sur `about:debugging#/runtime/this-firefox`.
   - Cliquez sur "Charger un module complémentaire temporaire".
   - Sélectionnez le fichier `manifest.json` dans le dossier du projet. *(Cela ne va pas garder l'extension lorsque le navigateur sera fermé)*.

---

## Utilisation

1. **Accedez a l'extension depuis n'importe quelle page web**
    - Vous pouvez épingler l'extension, pour cela cliquez sur le boutton "Extensions" dans la barre d'outil de votre navigateur, cliquez sur l'engrenage de l'extension, puis sur "Epinglez à la barre d'outils.

    - Ou alors ouvrir l'interface de l'extension avec le raccourcis clavier `CTRL + Y` (Cela ne marche pas sur tout les sites).

---

## Technologies utilisées

- **HTML, CSS :** Pour structurer et styliser l'interface de l'extension.
- **JavaScript :** Pour sauvegarder et charger les sites ajouter manuellement, effectuer une recherche sur les sites spécifique en remplacant le query de l'URL par la recherche voulue.

---

## Structure du projet

- **`manifest.json` :** Fichier de configuration de l'extension, définissant ses permissions.
- **`popup.html` :** Interface utilisateur de l'extension.
- **`style.css` :** Styliser l'interface de l'extension.
- **`popup.js` :** Script qui gère la logique du programme (Sauvegarder les sites, les charger et faire les recherches dessus).

---

## Limitations et Comportements Variables

### Pourquoi les résultats peuvent varier ?

Selon le navigateur utilisé (Firefox, Chrome, Opera, etc.) et le type de site, les résultats peuvent parfois différer. Voici pourquoi :

- **Bloqueur de script :** Certains sites détecte que ce n'est pas un humain qui a ouvert et fait la recherche dessus, et demande un captcha pour en être certain et pouvoir continuer (Ex : Stack Overflow).

- **Structure de la zone de recherche :** Certaines barre de recherches ont des suggestions préconstruites, donc l'utilisateur de peut pas entrer ce qu'il veut (Ex : W3School).

- **Différences entre navigateurs :** Les navigateurs interprètent et chargent les pages de manière légèrement différente. Par exemple, Firefox et Chrome peuvent gérer le contenu asynchrone différemment, ce qui explique pourquoi les résultats sont souvent plus cohérents sur Firefox.

## Remarques

- Le projet a été principalement testé sur Firefox, où il fonctionne de manière optimale. Si vous souhaitez l'essayer sur Chrome, rendez-vous sur `chrome://extensions/` et chargez l'extension en mode développeur cependant des bugs inattendu peuvent apparaitre.