// Variables Globales
const url = "http://localhost:3000/api/teddies";
const basket = JSON.parse(localStorage.getItem("teddies")) || [];

// calcul du basketPreview compteur panier
function basketPreview() {
    let addBasketPreview = document.getElementById("basketPreview");
    if (basket.length == 0) {
        addBasketPreview.innerHTML = `Panier <span
        class="badge rounded-pill bg-title  align-middle my-auto">0</span>`;
    } else {
        let calculBasketPreview = 0;
        for (product of basket) {
            calculBasketPreview += product.quantity;
        }
        addBasketPreview.innerHTML = `Panier <span class="badge rounded-pill bg-title align-middle my-auto">${calculBasketPreview}</span>`;

    }
}

// ANIMATION TEXT
var textAnimated = document.querySelector(".typing")
var text = ""
var textArr = ["Orinoco", "Bienvenue sur Ori-bears !"]
var currentTextIndex = -1
var letterIndex = -1

function addLetter() {  // incrémenter letterIndex pour passer à la lettre suivante
    letterIndex++
    if (letterIndex < text.length) {  //AJOUTER UN DELAI
        setTimeout(function () { // ajouter une lettre
            textAnimated.textContent += text[letterIndex]
            // l'appeler
            addLetter()
        }, 100)
    } else {  // appeler removeLetter après un délai
        setTimeout(function () {removeLetter()}, 2000)
    }
}

function removeLetter() {
    // décrémenter letterIndex pour passer à la lettre suivante
    letterIndex--
    if (letterIndex >= 0) {
        //AJOUTER UN RETARD
        setTimeout(function () {
            // supprimer la lettre
            textAnimated.textContent = text.slice(0, letterIndex)
            // l'appeler 
            removeLetter()
        }, 100)
    } else {
        // plus de lettres à supprimer
        // ne plus appeler addLetter
        // appelez updateText à la place
        updateText()
    }
}

function updateText() {
    //incrémenter currentTextIndex pour passer à la phrase suivante
    currentTextIndex++
    //aller au premier index de chaîne lorsque currentTextIndex a atteint le dernier
    if (currentTextIndex === textArr.length) {
        currentTextIndex = 0
    }
    //mettre à jour le texte 
    text = textArr[currentTextIndex]
    //appelez addLetter et lancez l'animation
    addLetter()
}
//l'appel initial pour tout commencer
updateText();

// Convertion du prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
    //boucle pour chaque iteration d'un produit
    for (teddies of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("article");
        //convertit le prix
        const price = convertPrice(teddies.price);
        card.innerHTML += `
        
        <div class="cards__container col-sm-12 col-md-12 col-lg-6 my-3">
            <div class="card border  shadow">
                <div class="card-body">
                    <div class="row">
                        <a href="product.html?_id=${teddies._id}">
                            <img src="${teddies.imageUrl}" class="card__img img-fluid img-thumbnail" alt="${teddies.name}">
                        </a>
                        <div class="col-6 col-sm-7 mt-3" >
                            <h4 class="card-title text-white">${teddies.name}</h4>
                        </div>
                        <div class="col-6 col-sm-5 text-end mt-3">
                            <h4 class="card-title text-white">${price}</h4>
                        </div>
                    </div>
                    <p class="card-text text-white">${teddies.description}</p>
                    <div class="d-flex justify-content-end">
                        <a href="product.html?_id=${teddies._id}" class="btn btn--choice">Acheter ce produit</a>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

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
// fonction pour la quantité du produit qu'on peut selectionner
function addAmount() {
    const Amount = document.getElementById("quantity");
    for (let numbers = 1; numbers <= 10; numbers++) {
        Amount.innerHTML += `<option value="${numbers}">${numbers}</option>`;
    }
}




// création de la class produit
class Product {
    constructor(id, name, description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price;
        this.option = option;
        this.quantity = +quantity;
        this.imgurl = imgurl;
    }
}

//ajoute le tableau de commande
function displayProductListTable(product) {
    const indexProduct = basket.indexOf(product);
    const productList = document.getElementById("productsBasket");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imgurl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-minus-square text-warning" data-index="${indexProduct}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-plus-square text-primary" data-index="${indexProduct}"></span></button>
        </td>
        <td class="align-middle">
            <span>${convertPrice(product.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(product.quantity * product.price)}</span>
        </td>
    </tr>`;
}

// calcul du total
function displayTotalBasket() {
    let totalBasket = 0;
    basket.forEach((product) => {
        totalBasket = totalBasket + product.price * product.quantity;
    });
    return totalBasket;
}


//affiche le totalBasket
function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${convertPrice(displayTotalBasket())}`;
}



// supprimer le Panier
function clearBasket() {
    localStorage.clear();
}
// fonction message d'erreur
function errorMessage() {
    main = document.getElementById("main");
    main.innerHTML = `
    <h1 class="mt-5 text-center text-danger"><b>"Nous ne parvenons pas à vous connecter, vérifiez votre réseau et reessayer"<b></h1>
    `;
}