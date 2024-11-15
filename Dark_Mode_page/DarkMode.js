// ==UserScript==
// @name         Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change le fond en sombre et les textes en blanc
// @author       Votre nom
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Récupérer l'état du dark mode (cette ligne sert a stocké l'état du site dans la session de l'utilisateur)
    let isDarkMode = GM_getValue('darkMode', false);

    // Style du dark mode avec gestion des hovers
    const darkStyle = `
        /* Fonds principaux */
        body,
        #content,
        #mw-content-text,
        .mw-body,
        main,
        article,
        .content,
        .main-content,
        div[role="main"],
        #main-content,
        #main {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
        }

        /* Conteneurs avec fond blanc */
        div[style*="background-color: white"],
        div[style*="background-color: #fff"],
        div[style*="background-color: #ffffff"],
        div[style*="background: white"],
        div[style*="background: #fff"],
        div[style*="background: #ffffff"] {
            background-color: #1a1a1a !important;
        }

        /* Tous les textes et titres */
        h1, h2, h3, h4, h5, h6,
        p, span, div,
        .title, .heading,
        [class*="title"]:not(a):not(a *),
        [class*="heading"]:not(a):not(a *),
        [class*="text"]:not(a):not(a *) {
            color: #ffffff !important;
        }

        /* Liens noirs uniquement (pas de modification des liens colorés) */
        a[style*="color: black"],
        a[style*="color: #000"],
        a[style*="color:#000"],
        a[style*="color: rgb(0, 0, 0)"],
        a[style="color: black"],
        a.text-black,
        a.text-dark {
            color: #ffffff !important;
        }

        /* Pour les liens qui n'ont pas de couleur définie et sont noirs par défaut */
        a:not([style*="color"]):not([class*="color"]):not(:hover) {
            color: #ffffff !important;
        }

        /* Texte dans les éléments input */
        input, textarea, select {
            color: #ffffff !important;
            background-color: #333 !important;
        }

        /* Elements spécifiques pour les sites de contenu */
        .meta-title:not(a),
        .titlebar-title:not(a),
        .title-text:not(a),
        .synopsis:not(a),
        .synopsis-text:not(a),
        .movie-card-title:not(a),
        [class*="titlebar"]:not(a),
        [class*="meta-title"]:not(a) {
            color: #ffffff !important;
        }
    `;

    // Créer l'élément style
    const styleElement = document.createElement('style');
    styleElement.id = 'simple-dark-mode';
    styleElement.textContent = darkStyle;

    // Ajouter le bouton (à modifier si vous le souhaiter)
    const toggleButton = document.createElement('div');
    toggleButton.innerHTML = `
        <button id="dark-mode-toggle" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            border: none;
            background: #333;
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        ">
            ${isDarkMode ? '☀️' : '🌙'}
        </button>
    `;

    // Ajouter les éléments à la page
    document.body.appendChild(toggleButton);
    if (isDarkMode) {
        document.head.appendChild(styleElement);
    }

    // Gérer le clic sur le bouton
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        GM_setValue('darkMode', isDarkMode);

        if (isDarkMode) {
            document.head.appendChild(styleElement);
            this.innerHTML = '☀️';
        } else {
            if (document.getElementById('simple-dark-mode')) {
                document.head.removeChild(styleElement);
            }
            this.innerHTML = '🌙';
        }
    });
})();