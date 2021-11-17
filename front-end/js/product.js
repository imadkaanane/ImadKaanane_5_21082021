//Mise à jour du panier
basketPreview();

// récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
const newUrl = `http://localhost:3000/api/teddies/${newId}`;

fetch(newUrl)
.then((response) => response.json())
.then((data) => {
    const product = data;
    addCard(data);
    addColors(data);
    addAmount();

    // ajout du produit dans le panier
    const buttonAddBasket = document.getElementById("btnAddBasket");
    buttonAddBasket.addEventListener("click", function(e) {
        e.preventDefault();
        const list = document.getElementById("option");
        const quantity = document.getElementById("quantity");
        
        // créer un nouveau produit
        let objectProduct = new Product(
            newId,
            product.name,
            product.description,
            product.price,
            list.value,
            quantity.value,
            product.imageUrl
        );
          
        // vérifie s'il est déja présent
        // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
        let isAlreadyPresent;
        let indexModification;
        for (products of basket) {
            if (products.name == product.name && products.option == list.value) {
                isAlreadyPresent = true;
                indexModification = basket.indexOf(products);
            } 
        }

        // si déjaPresent incrémente seulement la quantité
        if (isAlreadyPresent) {
            basket[indexModification].quantity += +quantity.value;
            localStorage.setItem("teddies", JSON.stringify(basket));
            // si non, ajoute le produit au localStorage
        } else {
            basket.unshift(objectProduct);
            localStorage.setItem("teddies", JSON.stringify(basket));
        }

        basketPreview();

        // Afichage du modal pour confirmer l'adoption du produitchoisi
        function modalAddProductToBasket(product){
            const productAlertMessage = document.getElementById("modal-dialog");
            productAlertMessage.innerHTML = `
            <div class="modal-content">
                <div class="modal-header" >
                    <h3 class="modal-title h5" id="exampleModalLabel">L'achat de ${product.name}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${product.imageUrl}"  alt="${product.name}" class="w-100">
                    <hr>
                    Vous avez décidé d'acheter <strong>${quantity.value}</strong> ourson <strong>${product.name}</strong>
                    de couleur <strong>${list.value}</strong>
                    pour un montant de <strong>${convertPrice(quantity.value * product.price)}</strong>
                </div>
                <div class="modal-footer">
                
                    <a href="index.html" class="btn btn--success" >Continuer mes achats</a>
                    <a href="panier.html" class="btn btn--cancel " >Voir mon panier</a>
                    
                </div>
            </div>`  
        }
        modalAddProductToBasket(data);
    });
})
.catch(e => {
    errorMessage();
});

    
    

    