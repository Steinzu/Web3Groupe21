# Ignorer les éléments HTML avec UserScript

## Description
Ce UserScript vous permet de masquer facilement des éléments HTML ou des iframes sur une page web en cliquant dessus. Il inclut une option d'activation/désactivation, un encadré visuel pour identifier les éléments sélectionnés, ainsi qu'un indicateur discret de l'état du mode masquage.

## Fonctionnalités
- **Masquez des éléments HTML ou des iframes** : Cliquez sur un élément pour le supprimer visuellement de la page.
- **Surbrillance intuitive** : Un encadré rouge vous montre les éléments qui seront masqués.
- **Raccourci clavier (Ctrl + B)** : Activez ou désactivez le mode masquage et affichez l'indicateur visuel.
- **Support des éléments dynamiques** : Les iframes ajoutées après le chargement initial sont également prises en charge.
- **Indicateur visuel discret** : Un témoin situé en bas à droite vous informe si le mode masquage est activé ou désactivé.

## Prérequis
- **Navigateur pris en charge** : Chrome, Firefox ou tout autre navigateur compatible avec [Tampermonkey](https://www.tampermonkey.net/).
- **Extension requise** : [Tampermonkey](https://www.tampermonkey.net/) ou [Greasemonkey](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/).

## Installation
1. Installez l'extension Tampermonkey sur votre navigateur :
   - [Tampermonkey pour Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey pour Firefox](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/)

2. Créez un nouveau script Tampermonkey :
   - Cliquez sur l'icône de Tampermonkey dans la barre d'outils de votre navigateur.
   - Sélectionnez **"Créer un nouveau script"**.
   - Copiez et collez le code du UserScript dans l'éditeur.

3. Sauvegardez le script en cliquant sur **"Fichier" > "Enregistrer"** ou utilisez le raccourci `Ctrl + S` / `Cmd + S`.

## Utilisation
1. Activez le script sur une page web.
2.	Utilisez le raccourci clavier `Ctrl + B` (ou un autre configuré dans le script) pour afficher le bouton “Activer/Désactiver”.
3. Survolez les éléments : un encadré rouge apparaît autour des éléments sélectionnés.
4. Cliquez sur un élément ou une iframe pour le masquer.
5. Appuyez de nouveau sur `Ctrl + B` pour désactiver le mode masquage.

## Limites connues
- Certains sites web très interactifs peuvent interférer avec le script.
- Le mode masquage peut ne pas fonctionner correctement avec des éléments HTML ayant des styles très complexes.

## Personnalisation
Vous pouvez modifier certains aspects du script pour l'adapter à vos besoins :
- **Couleur de surbrillance** : Modifiez la variable `highlightColor` dans le script.
- **Position de l'indicateur** : Changez les propriétés CSS `bottom` et `right` de l'indicateur.
- **Raccourci clavier** : Personnalisez la combinaison clavier en modifiant l'écouteur d'événements `keydown`.

## Auteur
**Julien de Jacquier de Rosée**

