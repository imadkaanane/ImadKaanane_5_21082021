// Mise a jour du panier
basketPreview();
// Chercher (fetch) l'URL
fetch(url)
.then((response) => response.json())
.then((data) => {
    addCards(data);
})
.catch(e => {
    const title = document.querySelector(".cards__title");   
    title.style.display = "none";
    errorMessage();
});

// fonction pour la création des cards de la page d'accueil
function addCards(data) {

    //boucle pour chaque iteration d'un produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("article");
        //convertit le prix
        const price = convertPrice(produit.price);
        card.innerHTML += `
        
        <div class="cards__container col-sm-12 col-md-12 col-lg-6 my-3">
            <div class="card border  shadow">
                <div class="card-body">
                    <div class="row">
                        <a href="product.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="card__img img-fluid img-thumbnail" alt="${produit.name}"></a>
                        <div class="col-6 col-sm-7 mt-3" >
                            <h4 class="card-title text-white">${produit.name}</h4>
                        </div>
                        <div class="col-6 col-sm-5 text-end mt-3">
                            <h4 class="card-title text-white">${price}</h4>
                        </div>
                    </div>
                    <p class="card-text text-white">${produit.description}</p>
                    <div class="d-flex justify-content-end">
                        <a href="product.html?_id=${produit._id}" class="btn btn--choice">Acheter ce produit</a>
                    </div>
                </div>
            </div>
        </div>`;
    }
}