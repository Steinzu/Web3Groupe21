Exemple de gestion des données :
Les deux implémentations permettent de stocker les préférences utilisateur, mais en utilisant des API et des mécanismes de persistance différents.

    L’extension utilise les API storage.sync et storage.local de Chrome, permettant une synchronisation automatique des données entre appareils et une persistance native avec le navigateur.
    Le userscript, quant à lui, repose sur les API de stockage de Tampermonkey (GM_setValue, GM_getValue), avec un système de préfixes personnalisés et une gestion des sauvegardes.

Ainsi :

    L’extension offre une synchronisation robuste entre différents appareils, idéale pour les utilisateurs changeant souvent de machine.
    Le userscript permet un contrôle plus détaillé des données, notamment grâce à la gestion des sauvegardes, mais reste limité à l’environnement du script.

---

```js
// EXTENSION
// manifest.json
{
  "manifest_version": 3,
  "name": "Data Storage Extension",
  "version": "1.0",
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html"
  }
}

// storage-manager.js
class StorageManager {
  static async saveUserPreferences(preferences) {
    try {
      await chrome.storage.local.set({
        userPreferences: preferences
      });
      
      // Also save to sync storage for cross-device access
      await chrome.storage.sync.set({
        lastUpdated: new Date().toISOString(),
        userPreferences: preferences
      });
      
      return { success: true };
    } catch (error) {
      console.error('Storage error:', error);
      return { success: false, error };
    }
  }

  static async getUserPreferences() {
    try {
      // Try sync storage first
      const syncData = await chrome.storage.sync.get(['userPreferences']);
      if (syncData.userPreferences) {
        return syncData.userPreferences;
      }

      // Fall back to local storage
      const localData = await chrome.storage.local.get(['userPreferences']);
      return localData.userPreferences || this.getDefaultPreferences();
    } catch (error) {
      console.error('Retrieval error:', error);
      return this.getDefaultPreferences();
    }
  }

  static getDefaultPreferences() {
    return {
      theme: 'light',
      notifications: true,
      autoSave: false,
      language: 'en',
      lastAccess: new Date().toISOString()
    };
  }

  static async clearAllData() {
    try {
      await Promise.all([
        chrome.storage.local.clear(),
        chrome.storage.sync.clear()
      ]);
      return { success: true };
    } catch (error) {
      console.error('Clear error:', error);
      return { success: false, error };
    }
  }
}
```
```js
// USERSCRIPT
// ==UserScript==
// @name         Data Storage UserScript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Advanced data storage management
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==

class UserScriptStorageManager {
    constructor() {
        this.PREFIX = 'USM_'; // Prefix for all storage keys
    }

    saveUserPreferences(preferences) {
        try {
            // Add metadata
            const dataToSave = {
                ...preferences,
                lastUpdated: new Date().toISOString(),
                version: '1.0'
            };

            // Save main data
            GM_setValue(this.PREFIX + 'userPreferences', JSON.stringify(dataToSave));

            // Save a backup
            GM_setValue(this.PREFIX + 'backup_' + new Date().toISOString(),
                       JSON.stringify(dataToSave));

            // Cleanup old backups (keep last 5)
            this.cleanupOldBackups();

            return { success: true };
        } catch (error) {
            console.error('Storage error:', error);
            return { success: false, error: error.message };
        }
    }

    getUserPreferences() {
        try {
            const savedData = GM_getValue(this.PREFIX + 'userPreferences');
            if (savedData) {
                return JSON.parse(savedData);
            }
            return this.getDefaultPreferences();
        } catch (error) {
            console.error('Retrieval error:', error);
            return this.getDefaultPreferences();
        }
    }

    getDefaultPreferences() {
        return {
            theme: 'light',
            notifications: true,
            autoSave: false,
            language: 'en',
            lastAccess: new Date().toISOString()
        };
    }

    cleanupOldBackups() {
        const allKeys = GM_listValues();
        const backupKeys = allKeys.filter(key => 
            key.startsWith(this.PREFIX + 'backup_')
        ).sort();

        // Keep only last 5 backups
        while (backupKeys.length > 5) {
            GM_deleteValue(backupKeys.shift());
        }
    }

    clearAllData() {
        try {
            const allKeys = GM_listValues();
            allKeys.forEach(key => {
                if (key.startsWith(this.PREFIX)) {
                    GM_deleteValue(key);
                }
            });
            return { success: true };
        } catch (error) {
            console.error('Clear error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Usage example
const storage = new UserScriptStorageManager();
storage.saveUserPreferences({
    theme: 'dark',
    notifications: true
});
```
