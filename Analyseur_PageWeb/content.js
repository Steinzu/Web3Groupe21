function analyzePage() {
    console.log("Début de l'analyse de la page...");

    try {
        // Analyse du contenu
        const words = document.body.innerText.trim().split(/\s+/);
        const images = Array.from(document.getElementsByTagName('img'));
        const links = document.getElementsByTagName('a');

        // Dénombrement des images avec et sans attribut alt pour l'accessibilité
        const imagesWithAlt = images.filter(img => img.hasAttribute('alt')).length;
        const imagesWithoutAlt = images.length - imagesWithAlt;

        // Analyse SEO
        const title = document.title || 'Sans titre';
        const metaDescription = document.querySelector('meta[name="description"]')?.content || 'Non définie';

        const headings = {
            h1: document.getElementsByTagName('h1').length,
            h2: document.getElementsByTagName('h2').length,
            h3: document.getElementsByTagName('h3').length
        };

        // Vérification de la longueur du titre et de la meta description (SEO)
        const titleLength = title.length;
        const metaDescriptionLength = metaDescription.length;

        // Analyse de la performance
        const loadTime = window.performance.now().toFixed(2);
        const pageSize = document.documentElement.outerHTML.length;
        const resources = Array.from(document.querySelectorAll("img[src], script[src], link[href]"));
        const externalResources = resources.filter(resource => {
            const src = resource.getAttribute("src") || resource.getAttribute("href");
            return src && !src.includes(window.location.hostname);
        }).map(resource => resource.getAttribute("src") || resource.getAttribute("href"));

        const externalResourcesSize = externalResources.length;

        // Génération des recommandations
        const recommendations = [];
        if (loadTime > 3000) {
            recommendations.push("Temps de chargement élevé : envisagez de réduire le nombre de scripts ou de charger certains scripts en mode 'async' ou 'defer'.");
        }
        if (pageSize > 500 * 1024) {
            recommendations.push("Taille de la page élevée : envisagez de compresser les images et de minifier les scripts.");
        }
        if (titleLength < 50 || titleLength > 60) {
            recommendations.push("Longueur du titre non optimale : ajustez la longueur entre 50 et 60 caractères pour un meilleur SEO.");
        }
        if (metaDescriptionLength < 150 || metaDescriptionLength > 160) {
            recommendations.push("Longueur de la description meta non optimale : ajustez la longueur entre 150 et 160 caractères.");
        }
        if (imagesWithoutAlt > 0) {
            recommendations.push("Certaines images n'ont pas d'attribut 'alt' : ajoutez des attributs 'alt' pour améliorer l'accessibilité.");
        }

        // Validation HTML basique
        const htmlErrors = validateHTML();

        const pageData = {
            wordCount: words.length,
            imageCount: images.length,
            imagesWithAlt,
            imagesWithoutAlt,
            linkCount: links.length,
            pageTitle: title,
            titleLength,
            metaDesc: metaDescription,
            metaDescriptionLength,
            headings,
            loadTime,
            pageSize: Math.round(pageSize / 1024) + " KB",
            externalResources,
            externalResourcesSize,
            recommendations,
            htmlErrors // Ajout des erreurs HTML
        };

        chrome.storage.local.set({ pageAnalysis: pageData }, () => {
            if (chrome.runtime.lastError) {
                console.error("Erreur lors de la sauvegarde des données:", chrome.runtime.lastError);
            } else {
                console.log("Données sauvegardées avec succès dans chrome.storage", pageData);
            }
        });
    } catch (error) {
        console.error("Erreur lors de l'analyse:", error);
    }
}

// Fonction de validation HTML basique
function validateHTML() {
    const errors = [];
    document.querySelectorAll("*").forEach(element => {
        if (!element.closest("html")) {
            errors.push(`Erreur HTML : balise <${element.tagName.toLowerCase()}> mal positionnée ou non fermée`);
        }
    });
    return errors;
}

window.onload = analyzePage;
setTimeout(analyzePage, 1000);
console.log("Content script chargé");
