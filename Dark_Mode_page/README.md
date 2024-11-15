# Ignorer les éléments HTML avec UserScript

## Description
Ce UserScript vous permet mettre un dark mode sur votre page web ouverte si celle si est en light mode et garde le dark mode si on quitte la page.

## Fonctionnalités
- rendre le fond noir de la page web pour un confort visuel.
- change le texte en blanc pour eviter d'avoir du texte de meme couleur que le fond.

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
2. Un bouton avec ce symbole "☀️" apparaitra en bas a droite de la page cliquer dessu pour changer le mode de la page.
3. Cliquer de nouveau sur bouton maintenant avec ce symbole "🌙"  pour revenir au theme principal du site web.

## Limites connues
- Certains sites web très interactifs peuvent interférer avec le script.
- Le dark mode peut ne pas fonctionner correctement avec des éléments HTML ayant des styles très complexes.
- Le scripte ne fonctionne pas sur les pages Google par exemple la page principale de Google ou Lorsque l'on fait une recherche.

## Personnalisation
Vous pouvez modifier certains aspects du script pour l'adapter à vos besoins :
- **gestion du dark mode** : Changez le css dans la constante `darkStyle` afin de modiffier le comportement du dark mode (ex: si vous voulez que la page soit rose à la place de noir).
- **affichage du bouton dark mode** : Ajustez le style CSS directement dans le code (`toggleButton.innerHTML`).

## Auteur
**Tarik**

