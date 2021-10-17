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

    // fonction pour la création de la card de la page produit
    function addCard(product) {
        const cardSelected = document.getElementById('cardSelected');
        cardSelected.innerHTML = `
        <div class="card px-0 mx-3 my-4 border-0">
            <div class="row g-0 shadow p-3 rounded " id="product">
                <div class="col-md-7" id="productImage">
                    <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
                </div>
                <div class="col-md-5 d-flex justify-content-center align-items-center">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 col-sm-7 mt-3" id="productName">
                                <h3 class="card-title">${product.name}</h3>
                            </div>
                            <div class="col-6 col-sm-5 text-end mt-3" id="productPrice">
                                <h3 class="card-title">${convertPrice(product.price)}</h3>
                            </div>
                        </div>
                        <select id="option" class="form-select mb-3" aria-label="choisir la version">
                        </select>
                        <div class="mb-3" id="productDescription">
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="row">
                            <div class="col-5 col-sm-3 col-md-5 col-lg-4 col-xl-3 my-auto">
                                <p>Quantité :</p>
                            </div>
                            <div class="col-4 col-sm-3 col-md-4 col-lg-3 ">
                                <select id="quantity" class="form-select mb-3" aria-label="Quantité">
                                    <option selected value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>

                        <div class="d-flex align-items-end justify-content-end">
                            <button id="btnAddBasket" class="btn btn--choice" aria-controls="productModal"  data-bs-toggle="modal"
                                data-bs-target="#productModal">Ajouter au panier</button>
                        </div>        
                    </div>

                </div>
            </div>
        </div>`;
    }

    // fonction pour l'ajout de la couleur du produit
    function addColors(product) {
        const versionChoice = document.getElementById("option");
        for (let colors of product.colors) {
            versionChoice.innerHTML += `<option value="${colors}">${colors}</option>`;
        }
    }
    addCard(data);
    addColors(data);


    // ajout du produit dans le panier
    const buttonAddBasket = document.getElementById("btnAddBasket");
    buttonAddBasket.addEventListener("click", (e) => {
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
            if (products.name == objectProduct.name && products.option == objectProduct.option) {
                isAlreadyPresent = true;
                indexModification = basket.indexOf(products);
            } else {
                isAlreadyPresent = false;
            }
        }

        // si déjaPresent incrémente seulement la quantité
        if (isAlreadyPresent) {
            basket[indexModification].quantity =
                +basket[indexModification].quantity + +objectProduct.quantity;
            localStorage.setItem("teddies", JSON.stringify(basket));
            // si non, ajoute le produit au localStorage
        } else {
            basket.push(objectProduct);
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
    const card = document.getElementById("product");   
    card.style.display = "none";
    document.querySelector(".error").innerHTML += `
    <h1 class="section__error my-5 text-center text-danger"><b>"Le produit demandé est introuvable "<b></h1>
    `;
});

    
    

    