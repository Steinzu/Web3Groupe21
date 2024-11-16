Exemple de tableau de bord météo :
Les deux solutions affichent des informations météo, mais diffèrent dans leur gestion des requêtes réseau et leur intégration UI (interface utilisateur).

    L’extension utilise l’API native fetch, capable d’effectuer des requêtes interdomaines (CORS) lorsqu’elle est configurée dans le fichier manifest. Les informations météo sont intégrées dans une interface popup dédiée à l’extension.
    Le userscript doit utiliser GM_xmlhttpRequest pour contourner les restrictions CORS, et injecte un widget flottant directement dans les pages web.

Les différences principales :

    L’extension est confinée aux éléments UI du navigateur, offrant de meilleures garanties de sécurité et un affichage plus classique.
    Le userscript offre une liberté totale dans la personnalisation et le placement de l’interface, mais nécessite une gestion manuelle des requêtes interdomaines.

---

```js
// EXTENSION
// manifest.json
{
  "manifest_version": 3,
  "name": "Weather Dashboard Extension",
  "version": "1.0",
  "permissions": ["https://api.weather.com/*"],
  "host_permissions": ["https://api.weather.com/*"],
  "action": {
    "default_popup": "popup.html"
  }
}

// weather-api.js
class WeatherAPI {
    constructor() {
        this.baseURL = 'https://api.weather.com';
    }

    async getWeatherData(city) {
        try {
            // Extensions can use fetch directly
            const response = await fetch(`${this.baseURL}/current/${city}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.displayWeather(data);
            return data;

        } catch (error) {
            console.error('Failed to fetch weather:', error);
            // Handle error in UI
            document.getElementById('weather').innerHTML = 
                `<p class="error">Failed to load weather data</p>`;
        }
    }

    displayWeather(data) {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <h2>${data.city}</h2>
            <p class="temperature">${data.temperature}°C</p>
            <p class="condition">${data.condition}</p>
            <p class="humidity">Humidity: ${data.humidity}%</p>
        `;
    }
}

// Usage in popup.html
const weatherAPI = new WeatherAPI();
weatherAPI.getWeatherData('London');

```
```js
// USERSCRIPT
// ==UserScript==
// @name         Weather Dashboard UserScript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Display weather information on websites
// @grant        GM_xmlhttpRequest
// @connect      api.weather.com
// @match        https://*/*
// ==/UserScript==

class WeatherAPI {
    constructor() {
        this.baseURL = 'https://api.weather.com';
        this.setupUI();
    }

    setupUI() {
        // Create floating weather widget
        const weatherWidget = document.createElement('div');
        weatherWidget.id = 'weather-widget';
        weatherWidget.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 9999;
        `;
        document.body.appendChild(weatherWidget);
    }

    getWeatherData(city) {
        // Userscripts must use GM_xmlhttpRequest
        GM_xmlhttpRequest({
            method: 'GET',
            url: `${this.baseURL}/current/${city}`,
            headers: {
                'Content-Type': 'application/json'
            },
            onload: (response) => {
                if (response.status >= 200 && response.status < 300) {
                    try {
                        const data = JSON.parse(response.responseText);
                        this.displayWeather(data);
                    } catch (error) {
                        console.error('Failed to parse weather data:', error);
                        this.displayError();
                    }
                } else {
                    console.error('HTTP error:', response.status);
                    this.displayError();
                }
            },
            onerror: (error) => {
                console.error('Failed to fetch weather:', error);
                this.displayError();
            }
        });
    }

    displayWeather(data) {
        const weatherWidget = document.getElementById('weather-widget');
        weatherWidget.innerHTML = `
            <h2>${data.city}</h2>
            <p class="temperature">${data.temperature}°C</p>
            <p class="condition">${data.condition}</p>
            <p class="humidity">Humidity: ${data.humidity}%</p>
        `;
    }

    displayError() {
        const weatherWidget = document.getElementById('weather-widget');
        weatherWidget.innerHTML = `
            <p class="error">Failed to load weather data</p>
        `;
    }
}

// Initialize and use
const weatherAPI = new WeatherAPI();
weatherAPI.getWeatherData('London');
```