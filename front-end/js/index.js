// Mise a jour du panier
basketPreview();

// Chercher (fetch) l'URL
fetch(url)
.then((response) => response.json())
.then((data) => {
    addCards(data);
})
.catch(e => {
    hero = document.getElementById('hero');
    products = document.getElementById('products');
    hero.style.display = 'none';
    products.style.display = 'none';
    errorMessage();
});