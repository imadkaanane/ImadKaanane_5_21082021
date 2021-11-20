// Mise a jour du panier
basketPreview();

// Chercher (fetch) l'URL pour afficher les produits
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        addCards(data);
    })
    .catch(e => {
        errorMessage();
    }
);