# Ignorer les éléments HTML avec UserScript

## Description
Ce UserScript vous permet de masquer facilement des éléments HTML d'une page web, y compris des iframes, en cliquant dessus. Une option d'activation et de désactivation est incluse, ainsi qu'un encadré visuel pour identifier la zone qui sera masquée. Le bouton d’activation peut être affiché ou masqué à l’aide d’un raccourci clavier "Ctrl + B".

## Fonctionnalités
- Masquer n'importe quel élément HTML ou iframe en cliquant dessus.
- Afficher un encadré en surbrillance pour indiquer l'élément sélectionné.
- Activer ou désactiver la fonctionnalité via un bouton flottant.
- Affichez ou masquez le bouton flottant avec un raccourci clavier, désactivant également le mode masquage si le bouton est masqué.
- Support des iframes et des éléments dynamiques ajoutés après le chargement initial de la page.

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
2.	Utilisez le raccourci clavier Ctrl + B (ou un autre configuré dans le script) pour afficher le bouton “Activer/Désactiver”.
3. Un bouton "Activer/Désactiver" apparaît en haut à droite de la page.
4. Cliquez sur "Activer" pour entrer en mode masquage.
5. Survolez les éléments que vous souhaitez masquer : un encadré rouge apparaîtra autour.
6. Cliquez sur un élément pour le masquer. Un message de confirmation s'affichera.
7. Pour quitter le mode masquage, cliquez à nouveau sur "Désactiver" ou refaites le raccourci clavier Ctrl + B.

## Limites connues
- Certains sites web très interactifs peuvent interférer avec le script.
- Le mode masquage peut ne pas fonctionner correctement avec des éléments HTML ayant des styles très complexes.

## Personnalisation
Vous pouvez modifier certains aspects du script pour l'adapter à vos besoins :
- **Couleur de surbrillance** : Changez la valeur de `highlightColor` dans le script.
- **Comportement du bouton flottant** : Ajustez le style CSS directement dans le code.

## Auteur
**Julien de Jacquier de Rosée**

