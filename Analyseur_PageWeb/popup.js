document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe "active" de tous les onglets et contenus
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Ajouter la classe "active" à l'onglet et au contenu cliqués
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            console.log(`Onglet actif: ${tab.dataset.tab}`);
        });
    });

    // Charger les données au démarrage
    loadData();
});

// Fonction pour mettre à jour l'interface avec les données de l'analyse
function updateUI(data) {

    // Affichage des données de Contenu
    document.getElementById('wordCount').textContent = data.wordCount || '0';
    document.getElementById('linkCount').textContent = data.linkCount || '0';
    document.getElementById('totalImages').textContent = data.imageCount || '0';
    document.getElementById('imagesWithAlt').textContent = data.imagesWithAlt || '0';
    document.getElementById('imagesWithoutAlt').textContent = data.imagesWithoutAlt || '0';

    // Affichage des données SEO
    document.getElementById('pageTitle').textContent = data.pageTitle || '-';
    document.getElementById('titleLength').textContent = `${data.titleLength || 0} caractères`;
    document.getElementById('metaDesc').textContent = data.metaDesc || '-';
    document.getElementById('metaDescLength').textContent = `${data.metaDescriptionLength || 0} caractères`;
    document.getElementById('headings').textContent =
        `H1: ${data.headings?.h1 || 0}, H2: ${data.headings?.h2 || 0}, H3: ${data.headings?.h3 || 0}`;

    // Affichage des données de Performance
    document.getElementById('loadTime').textContent = `${data.loadTime || 0} ms`;
    document.getElementById('pageSize').textContent = data.pageSize || '0 KB';

    // Affichage des ressources externes
    const resourcesElement = document.getElementById('externalResources');
    resourcesElement.innerHTML = data.externalResources.length > 0
        ? data.externalResources.map(resource => `<li>${resource}</li>`).join('')
        : "<li>Aucune ressource externe trouvée</li>";
    document.getElementById('externalResourcesSize').textContent = data.externalResourcesSize;

    // Affichage des recommandations
    const recommendationsElement = document.getElementById('recommendations');
    recommendationsElement.innerHTML = data.recommendations.length > 0
        ? data.recommendations.map(rec => `<li>${rec}</li>`).join('')
        : "<li>Aucune recommandation spécifique</li>";

    // Affichage des erreurs HTML (nouvelle fonctionnalité)
    const htmlErrorsElement = document.getElementById('htmlValidationErrors');
    if (data.htmlErrors && data.htmlErrors.length > 0) {
        htmlErrorsElement.innerHTML = data.htmlErrors.map(error => `<li>${error}</li>`).join('');
    } else {
        htmlErrorsElement.innerHTML = "<li>Aucune erreur HTML détectée</li>";
    }
}

// Fonction pour charger les données depuis chrome.storage
function loadData() {
    chrome.storage.local.get(['pageAnalysis'], (result) => {
        if (chrome.runtime.lastError) {
            console.error("Erreur lors de la récupération des données :", chrome.runtime.lastError);
        } else {
            if (result.pageAnalysis) {
                updateUI(result.pageAnalysis);
            } else {
                console.warn("Aucune donnée trouvée dans chrome.storage");
            }
        }
    });
}
