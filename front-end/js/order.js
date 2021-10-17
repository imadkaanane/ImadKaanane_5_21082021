
const order = JSON.parse(localStorage.getItem("order")) || [];
const date = JSON.parse(localStorage.getItem("date")) || [];

// affiche Mes informations
const informations = document.getElementById("contact");
informations.innerHTML += `
    <div class="col text-center my-5 py-3">
        <h1 class="text-center fs-2 my-5 bg-title text-white">Félicitations</h1>
        <img src="../back-end/images/happyTeddy.jpg" class="img-fluid w-25" >
        <p>Votre commande a bien été prise en compte, Merci de nous avoir fait confiance.</p>
    </div>
    <h1 class="text-center fs-2 my-5 bg-title text-white">Mes informations</h1>
    <div class="">
        <p class="fs-5"><span class="fw-bold text-capitalize">${order.contact.firstName}  ${order.contact.lastName}</span>, merci pour votre achat sur notre site !
        <br>
        Votre commande passée le <span class="fw-bold">${date[0].date}</span> à <span class="fw-bold">${date[0].hours}</span> d'un montant total de <span class="fw-bold">${convertPrice(displayTotalBasket())}</span> a été validée.
        <br>
        Elle porte la référence <span class="fw-bold">${order.orderId}</span>.
        <br>
        Votre facture va vous être transmise par mail à : <span class="fw-bold">${order.contact.email}</span>.
        <br>
        Votre commande sera envoyée à l'adresse suivante :</p>
    </div>
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}</p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
    
    `;

//affiche Récapitulatif de ma commande
for (product of basket) {
    displayProductListTable(product);
}
// supression des icones plus et moins
const deletedItem = document.getElementsByClassName("rounded");
for(element of deletedItem) {
    element.classList.add("d-none");
}

//affiche le prix total
totalPrice();

//bouton imprimer 
const print = document.getElementById("print");
print.addEventListener("click",(e) =>{
    e.preventDefault;
    window.print();
});

// vide le localstorage
const clickHome = document.getElementById("acceuil");
clickHome.addEventListener("click", () => {
    clearBasket();
});

const clickBasket = document.getElementById("basketPreviewEnd");

clickBasket.addEventListener("click", ( ) => {
    clearBasket();
});