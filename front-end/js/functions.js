// Variables Globales
const url = "http://localhost:3000/api/teddies";
const basket = JSON.parse(localStorage.getItem("teddies")) || [];


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

// supprimer le Panier
function clearBasket() {
    localStorage.clear();
}
// fonction message d'erreur
function errorMessage() {
    document.querySelector(".error").innerHTML += `
    <h1 class="section__error text-center text-danger"><b>"Nous ne parvenons pas à vous connecter, vérifiez votre réseau et reessayer"<b></h1>
    `;
}