// ==UserScript==
// @name         Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Change le fond en sombre et les textes en blanc
// @author       Tarik
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

//(*://*.wikipedia.org/*)

(function() {
    'use strict';

    let isDarkMode = GM_getValue('darkMode', false);

    const darkStyle = `
        /* Reset général pour tous les conteneurs principaux */
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
        #main,
        .vector-body,
        .mw-page-container,
        .mw-content-container,
        .parsoid-body,
        .mw-parser-output,
        [class*="content-"],
        [class*="container-"] {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
        }

        /* Ciblage spécifique des divs avec background inline */
        div[style*="background"],
        section[style*="background"],
        article[style*="background"],
        aside[style*="background"] {
            background-color: #1a1a1a !important;
            background-image: none !important;
        }

        /* Headers et navigation */
        header,
        nav,
        .header,
        .navigation,
        #mw-head,
        #mw-panel,
        .vector-header,
        .navbar,
        .nav-wrapper {
            background-color: #222 !important;
            color: #ffffff !important;
        }

        /* Textes et liens */
        h1, h2, h3, h4, h5, h6,
        p, span, div, li, td, th,
        .title, .heading,
        [class*="title"]:not(a):not(a *),
        [class*="heading"]:not(a):not(a *),
        [class*="text"]:not(a):not(a *) {
            color: #ffffff !important;
        }

        /* Liens */
        a:not(:hover) {
            color: #6ea8fe !important;
        }

        a:visited:not(:hover) {
            color: #b589d6 !important;
        }

        a:hover {
            color: #8bb9fe !important;
        }

        /* Éléments de formulaire */
        input, textarea, select {
            color: #ffffff !important;
            background-color: #333 !important;
            border-color: #444 !important;
        }

        /* Tables */
        table, tr, td, th {
            background-color: #222 !important;
            border-color: #444 !important;
        }

        /* Barres latérales et widgets */
        aside,
        .sidebar,
        .widget,
        #mw-panel,
        .vector-menu-portal,
        .vector-menu-content {
            background-color: #222 !important;
            color: #ffffff !important;
        }

        /* Boîtes de code et préformatage */
        pre, code, .code {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
            border-color: #444 !important;
        }

        /* Images et médias */
        img {
            opacity: 0.9;
        }

        /* Popups et modals */
        .popup,
        .modal,
        .dialog,
        [class*="popup"],
        [class*="modal"],
        [class*="dialog"] {
            background-color: #222 !important;
            color: #ffffff !important;
            border-color: #444 !important;
        }

        /* Spécifique à Wikipedia */
        .mw-wiki-logo {
            filter: invert(1) brightness(0.9);
        }

        #mw-page-base,
        #mw-head-base {
            background-color: #222 !important;
        }
    `;

    // Le reste du code reste identique
    const styleElement = document.createElement('style');
    styleElement.id = 'simple-dark-mode';
    styleElement.textContent = darkStyle;

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

    document.body.appendChild(toggleButton);
    if (isDarkMode) {
        document.head.appendChild(styleElement);
    }

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