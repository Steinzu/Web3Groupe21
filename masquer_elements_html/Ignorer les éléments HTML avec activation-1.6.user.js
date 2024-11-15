// ==UserScript==
// @name         Ignorer les éléments HTML avec activation
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Masquer des parties du code HTML en cliquant dessus avec un encadré visuel et un bouton d'activation/désactivation, uniquement sur la page principale
// @author       Julien
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Couleur de l'encadré pour l'élément survolé
    const highlightColor = 'red';
    const originalBorderStyle = '2px solid ' + highlightColor;

    // Variable pour garder une référence de l'élément en survol
    let lastHoveredElement = null;
    let hideModeEnabled = false; // Mode masquage initialisé à "désactivé"

    // Fonction pour masquer l'élément cliqué
    function hideElement(event) {
        if (!hideModeEnabled) return; // Ne rien faire si le mode est désactivé

        // Vérifie que l'élément cliqué n'est pas le bouton lui-même
        if (event.target === toggleButton) return;

        event.preventDefault();
        event.stopPropagation();

        // Appliquer un style "display: none" à l'élément cliqué
        event.target.style.display = 'none';

        alert('Élément masqué');
    }

    // Fonction pour afficher un encadré lors du survol
    function highlightElement(event) {
        if (!hideModeEnabled) return; // Ne pas surligner si le mode est désactivé

        // Vérifie que l'élément survolé n'est pas le bouton lui-même
        if (event.target === toggleButton) return;

        // Supprimer l'encadré de l'élément précédemment survolé
        if (lastHoveredElement) {
            lastHoveredElement.style.outline = '';
        }

        // Ajouter un encadré à l'élément actuellement survolé
        event.target.style.outline = originalBorderStyle;
        lastHoveredElement = event.target;
    }

    // Fonction pour retirer l'encadré lorsque la souris quitte l'élément
    function removeHighlight(event) {
        event.target.style.outline = '';
        lastHoveredElement = null;
    }

    // Fonction pour basculer le mode masquage
    function toggleHideMode() {
        hideModeEnabled = !hideModeEnabled;
        toggleButton.textContent = hideModeEnabled ? 'Désactiver' : 'Activer';
    }

    // Créer le bouton d'activation/désactivation
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Activer';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.zIndex = '1000';
    toggleButton.style.padding = '10px';
    toggleButton.style.backgroundColor = '#007bff';
    toggleButton.style.color = '#fff';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';

    // Ajouter l'événement de clic pour basculer le mode
    toggleButton.addEventListener('click', toggleHideMode);

    // Ajouter le bouton au corps du document
    document.body.appendChild(toggleButton);

    // Ajouter les écouteurs d'événements pour surligner et masquer
    document.body.addEventListener('mouseover', highlightElement, true);
    document.body.addEventListener('mouseout', removeHighlight, true);
    document.body.addEventListener('click', hideElement, true);

    // Fonction pour ajouter les écouteurs d'événements aux iFrames
    function addIframeListeners(iframe) {
        iframe.addEventListener('mouseover', function(event) {
            if (!hideModeEnabled) return;
            if (lastHoveredElement) {
                lastHoveredElement.style.outline = '';
            }
            iframe.style.outline = originalBorderStyle;
            lastHoveredElement = iframe;
        }, true);

        iframe.addEventListener('mouseout', function(event) {
            iframe.style.outline = '';
            lastHoveredElement = null;
        }, true);

        iframe.addEventListener('click', function(event) {
            if (!hideModeEnabled) return;
            event.preventDefault();
            event.stopPropagation();
            iframe.style.display = 'none';
            alert('iFrame masqué');
        }, true);
    }

    // Ajouter les écouteurs d'événements à tous les iFrames existants
    document.querySelectorAll('iframe').forEach(addIframeListeners);

    // Observer les ajouts d'iFrames dynamiques
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'IFRAME') {
                    addIframeListeners(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();


