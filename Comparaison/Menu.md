Exemple d'implémentation de menu :
L'extension et le userscript créent tous deux des menus interactifs, mais avec des architectures distinctes.

    L’extension utilise l’API native contextMenus de Chrome, intégrant directement des options dans le menu contextuel du navigateur (clic droit). Elle repose sur un service worker en arrière-plan pour gérer les événements et créer les menus.
    En revanche, le userscript injecte un menu flottant HTML directement dans les pages web à l’aide de la manipulation du DOM et de la stylisation CSS via GM_addStyle.

Bien que les deux approches permettent d’ajouter des menus fonctionnels :

    L’extension offre une expérience utilisateur plus native, mieux intégrée au navigateur.
    Le userscript est plus personnalisable visuellement, mais peut être perçu comme plus intrusif car il modifie directement le contenu des pages web.

---

```js   
// EXTENSION
// manifest.json
{
  "manifest_version": 3,
  "name": "Enhanced Menu Extension",
  "version": "1.0",
  "permissions": ["contextMenus", "storage"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  }
}

// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Create main context menu
  chrome.contextMenus.create({
    id: "mainMenu",
    title: "My Tools",
    contexts: ["all"]
  });

  // Create submenu items
  chrome.contextMenus.create({
    id: "search",
    parentId: "mainMenu",
    title: "Search Selection",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "save",
    parentId: "mainMenu",
    title: "Save Page Info",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch(info.menuItemId) {
    case "search":
      chrome.tabs.create({
        url: `https://google.com/search?q=${encodeURIComponent(info.selectionText)}`
      });
      break;
    case "save":
      chrome.tabs.sendMessage(tab.id, { action: "savePage" });
      break;
  }
});
```
```js
// USERSCRIPT
// ==UserScript==
// @name         Enhanced Menu UserScript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a floating menu with various tools
// @grant        GM_addStyle
// @match        https://*/*
// ==/UserScript==

(function() {
    'use strict';

    // Add styles
    GM_addStyle(`
        .floating-menu {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .floating-menu button {
            display: block;
            width: 100%;
            margin: 5px 0;
            padding: 8px 15px;
            border: none;
            background: #f0f0f0;
            cursor: pointer;
            border-radius: 3px;
        }
        .floating-menu button:hover {
            background: #e0e0e0;
        }
        .submenu {
            display: none;
            margin-left: 15px;
        }
        .submenu.active {
            display: block;
        }
    `);

    // Create menu structure
    const menuHTML = `
        <div class="floating-menu" id="userscriptMenu">
            <button id="mainMenuBtn">☰ My Tools</button>
            <div class="submenu" id="submenu">
                <button id="searchBtn">🔍 Search Selection</button>
                <button id="saveBtn">💾 Save Page Info</button>
                <button id="customBtn">⚙️ Custom Action</button>
            </div>
        </div>
    `;

    // Add menu to page
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    // Add event listeners
    const mainMenuBtn = document.getElementById('mainMenuBtn');
    const submenu = document.getElementById('submenu');
    const searchBtn = document.getElementById('searchBtn');
    const saveBtn = document.getElementById('saveBtn');

    mainMenuBtn.addEventListener('click', () => {
        submenu.classList.toggle('active');
    });

    searchBtn.addEventListener('click', () => {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            window.open(`https://google.com/search?q=${encodeURIComponent(selectedText)}`);
        } else {
            alert('Please select some text first!');
        }
    });

    saveBtn.addEventListener('click', () => {
        const pageInfo = {
            title: document.title,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('savedPage', JSON.stringify(pageInfo));
        alert('Page info saved!');
    });
})();
```