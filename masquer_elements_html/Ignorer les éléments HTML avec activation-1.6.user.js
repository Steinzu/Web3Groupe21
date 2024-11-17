// ==UserScript==
// @name         Ignorer les éléments HTML avec activation
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Masquer des parties du code HTML en cliquant dessus avec un encadré visuel et un bouton d'activation/désactivation, uniquement sur la page principale
// @author       Julien
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const highlightColor = 'red';
    const originalBorderStyle = '2px solid ' + highlightColor;

    let lastHoveredElement = null;
    let hideModeEnabled = false; // Mode masquage initialisé à "désactivé"
    let buttonVisible = false; // État d'affichage du bouton (par défaut, invisible)

    // Fonction pour masquer l'élément cliqué
    function hideElement(event) {
        if (!hideModeEnabled) return;
        if (event.target === toggleButton) return;

        event.preventDefault();
        event.stopPropagation();

        event.target.style.display = 'none';
        alert('Élément masqué');
    }

    // Fonction pour afficher un encadré lors du survol
    function highlightElement(event) {
        if (!hideModeEnabled) return;
        if (event.target === toggleButton) return;

        if (lastHoveredElement) {
            lastHoveredElement.style.outline = '';
        }

        event.target.style.outline = originalBorderStyle;
        lastHoveredElement = event.target;
    }

    // Fonction pour retirer l'encadré
    function removeHighlight(event) {
        event.target.style.outline = '';
        lastHoveredElement = null;
    }

    // Fonction pour basculer le mode masquage
    function toggleHideMode() {
        hideModeEnabled = !hideModeEnabled;
        toggleButton.textContent = hideModeEnabled ? 'Désactiver' : 'Activer';
    }

    // Fonction pour afficher ou masquer le bouton, et désactiver le mode si le bouton est masqué
    function toggleButtonVisibility() {
        buttonVisible = !buttonVisible;
        toggleButton.style.display = buttonVisible ? 'block' : 'none';

        // Si le bouton est masqué, désactiver également le mode masquage
        if (!buttonVisible && hideModeEnabled) {
            hideModeEnabled = false;
            toggleButton.textContent = 'Activer'; // Remettre le texte par défaut
        }
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
    toggleButton.style.display = 'none'; // Par défaut, invisible

    // Ajouter l'événement de clic pour basculer le mode
    toggleButton.addEventListener('click', toggleHideMode);

    // Ajouter le bouton au corps du document
    document.body.appendChild(toggleButton);

    // Ajouter les écouteurs d'événements pour surligner et masquer
    document.body.addEventListener('mouseover', highlightElement, true);
    document.body.addEventListener('mouseout', removeHighlight, true);
    document.body.addEventListener('click', hideElement, true);

    // Ajouter un écouteur pour le raccourci clavier
    document.addEventListener('keydown', (event) => {
        // Vérifier si la touche est "Ctrl + B" (modifiez selon vos besoins)
        if (event.ctrlKey && event.key === 'b') {
            toggleButtonVisibility();
        }
    });

    // Fonction pour gérer les iFrames
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

    // Ajouter les écouteurs aux iFrames existants
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