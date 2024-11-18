// ==UserScript==
// @name         Supprimer éléments HTML et iframes avec calque optimisé
// @namespace    http://tampermonkey.net/
// @version      1.15
// @description  Supprimer les éléments HTML et les iframes avec un calque optimisé. Activer/désactiver avec Ctrl+B et affichage d'un indicateur visuel du mode masquage.
// @author       Julien
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const highlightColor = 'red';
    const originalBorderStyle = '2px solid ' + highlightColor;
    const overlayClass = 'iframe-overlay-blocker';

    let hideModeEnabled = false; // Mode masquage initialisé à "désactivé"
    let lastHoveredElement = null; // Dernier élément survolé

    // Fonction pour masquer un élément cliqué
    function hideElement(event) {
        if (!hideModeEnabled) return;

        event.preventDefault();
        event.stopPropagation();

        // Si l'utilisateur clique sur un calque, on supprime l'iframe associée
        if (event.target.classList.contains(overlayClass)) {
            const iframe = event.target.relatedIframe; // Lien vers l'iframe associée
            if (iframe) {
                iframe.style.display = 'none';
                event.target.remove(); // Supprimer aussi le calque
            }
        } else {
            // Sinon, supprimer l'élément HTML normal
            event.target.style.display = 'none';
        }
        alert('Élément masqué');
    }

    // Afficher un encadré visuel lors du survol
    function highlightElement(event) {
        if (!hideModeEnabled) return;

        if (lastHoveredElement) {
            lastHoveredElement.style.outline = ''; // Retirer l'encadré précédent
        }

        if (!event.target.classList.contains(overlayClass)) {
            event.target.style.outline = originalBorderStyle;
            lastHoveredElement = event.target;
        }
    }

    // Retirer l'encadré visuel
    function removeHighlight(event) {
        if (event.target.style) {
            event.target.style.outline = '';
        }
        lastHoveredElement = null;
    }

    // Activer/désactiver le mode masquage avec un raccourci clavier
    function toggleHideMode() {
        hideModeEnabled = !hideModeEnabled;
        updateIndicator();
        if (hideModeEnabled) {
            addIframeOverlays();
        } else {
            removeIframeOverlays();
        }
    }

    // Ajouter les calques au-dessus des iframes
    function addIframeOverlays() {
        document.querySelectorAll('iframe').forEach(iframe => {
            if (!iframe.closest('.' + overlayClass)) { // Vérifie qu'un calque n'existe pas déjà
                const overlay = document.createElement('div');
                overlay.className = overlayClass;
                overlay.style.position = 'absolute';
                overlay.style.top = iframe.offsetTop + 'px';
                overlay.style.left = iframe.offsetLeft + 'px';
                overlay.style.width = iframe.offsetWidth + 'px';
                overlay.style.height = iframe.offsetHeight + 'px';
                overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                overlay.style.border = originalBorderStyle;
                overlay.style.zIndex = '9999';
                overlay.style.cursor = 'pointer';

                // Lier le calque à l'iframe pour la suppression
                overlay.relatedIframe = iframe;

                iframe.parentNode.style.position = 'relative'; // Assure un positionnement correct
                iframe.parentNode.appendChild(overlay);
            }
        });
    }

    // Supprimer les calques au-dessus des iframes
    function removeIframeOverlays() {
        document.querySelectorAll('.' + overlayClass).forEach(overlay => overlay.remove());
    }

    // Créer un indicateur visuel du mode masquage
    const indicator = document.createElement('div');
    indicator.textContent = 'Mode masquage : désactivé';
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px'; // Placé en bas
    indicator.style.right = '10px'; // Placé à droite
    indicator.style.zIndex = '1000';
    indicator.style.padding = '10px';
    indicator.style.backgroundColor = '#ff4444';
    indicator.style.color = '#fff';
    indicator.style.borderRadius = '5px';
    indicator.style.fontSize = '14px';
    indicator.style.pointerEvents = 'none'; // Rendre non cliquable
    indicator.style.opacity = '0.7';
    document.body.appendChild(indicator);

    // Mettre à jour l'indicateur en fonction de l'état du mode masquage
    function updateIndicator() {
        if (hideModeEnabled) {
            indicator.textContent = 'Mode masquage : activé';
            indicator.style.backgroundColor = '#44cc44'; // Vert clair
        } else {
            indicator.textContent = 'Mode masquage : désactivé';
            indicator.style.backgroundColor = '#ff4444'; // Rouge clair
        }
    }

    // Raccourci clavier pour activer/désactiver
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'b') {
            toggleHideMode();
        }
    });

    // Ajouter les écouteurs pour surligner et masquer
    document.body.addEventListener('mouseover', highlightElement, true);
    document.body.addEventListener('mouseout', removeHighlight, true);
    document.body.addEventListener('click', hideElement, true);

    // Observer les ajouts d'éléments dynamiques dans le DOM
    const observer = new MutationObserver((mutations) => {
        if (hideModeEnabled) {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName && node.tagName.toLowerCase() === 'iframe') {
                        addIframeOverlays();
                    }
                });
            });
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();