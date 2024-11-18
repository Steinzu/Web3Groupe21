document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const buttonsContainer = document.getElementById('buttons');
    const siteNameInput = document.getElementById('site-name');
    const siteUrlInput = document.getElementById('site-url');
    const addSiteButton = document.getElementById('add-site');
  
    // Sites par défaut
    const defaultSites = [
      { name: "Google", url: "https://www.google.com/search?q={query}" },
      { name: "YouTube", url: "https://www.youtube.com/results?search_query={query}" },
      { name: "Wikipedia", url: "https://fr.wikipedia.org/wiki/{query}" },
      { name: "GitHub", url: "https://github.com/search?q={query}"},
      { name: "Amazon", url: "https://www.amazon.fr/s?k={query}" },
      { name: "Twitter", url: "https://twitter.com/search?q={query}" },
      { name: "Reddit", url: "https://www.reddit.com/search?q={query}" },
    ];
  
    // Charger les sites
    function loadSites() {
      const sites = JSON.parse(localStorage.getItem('customSites')) || defaultSites;
      buttonsContainer.innerHTML = '';
  
      sites.forEach(site => {
        const button = document.createElement('button');
        button.textContent = site.name;
        button.addEventListener('click', () => {
          const query = encodeURIComponent(searchInput.value);
          if (query) {
            window.open(site.url.replace('{query}', query), '_blank');
          } else {
            alert("Veuillez entrer une recherche !");
          }
        });
        buttonsContainer.appendChild(button);
      });
    }
  
    // Ajouter un site
    addSiteButton.addEventListener('click', () => {
      const name = siteNameInput.value.trim();
      const url = siteUrlInput.value.trim();
  
      if (name && url.includes('{query}')) {
        const sites = JSON.parse(localStorage.getItem('customSites')) || defaultSites;
        sites.push({ name, url });
        localStorage.setItem('customSites', JSON.stringify(sites));
        siteNameInput.value = '';
        siteUrlInput.value = '';
        loadSites();
      } else {
        alert("Veuillez fournir un nom et une URL valide (avec {query}) !");
      }
    });
  
    loadSites();
  });
  