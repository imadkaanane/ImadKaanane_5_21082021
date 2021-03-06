//Mise à jour du basketPreview
basketPreview();
const titleBasket = document.getElementById("titleBasket");
const fullBasket = document.getElementById("basket");
// indique que le panier est vide
if (basket.length < 1) {
    //Construction d'un panier vide...
    titleBasket.innerHTML = `Votre panier est vide`
    fullBasket.innerHTML = `
        <div class="col text-center">
            <img src="../back-end/images/sadTeddy.jpg" class="img-fluid">
            <h3>Oups!! Votre panier semble être vide pour revenir à l'acceuil veuillez cliquez ci dessous </h3>
            <a href="index.html" class="btn btn--choice btn-block stretched-link">revenir à l'accueil</a>
        </div>`;

    // sinon affiche le tableau avec les produits
} else {
    titleBasket.innerHTML = `Contenu du panier`;
    fullBasket.classList.add("row", "p-0", "m-0", "align-items-center");
    for (product of basket) {
        displayProductListTable(product);
    }
    
    // ajouter produit
    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        basket[index].quantity++;
        localStorage.setItem("teddies", JSON.stringify(basket));
        location.reload();
    }

    const buttonAdd = document.getElementsByClassName("plus");
    for (add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    //supprimer un produit
    function minusProduct(event) {
        const index = event.target.getAttribute("data-index");
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        localStorage.setItem("teddies", JSON.stringify(basket));
        location.reload();
    }

    const buttonMinus = document.getElementsByClassName("minus");
    for (minus of buttonMinus) {
        minus.addEventListener("click", minusProduct);
    }

    //affiche le prix total
    totalPrice();

    //vide le panier
    const buttonClearBasket = document.getElementById("clearBasket");
    buttonClearBasket.addEventListener("click", () => {
        clearBasket();
        location.reload();
    });

    //validation du formulaire et envoie en POST
    const order = document.getElementById("order");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const checkBox = document.getElementById("invalidCheck2");

    order.addEventListener("click", (event) => {
        // on prépare les infos pour l'envoie en POST
        
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };
        // on valide que le formulaire soit correctement rempli
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) &
            (checkBox.checked == true)
        ) {
            event.preventDefault();
            // on stocke l'heure et la date de la commande
            var d = new Date();
            var date = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
            var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            const fullDate = { date, hours };
            const infoOrder = JSON.parse(localStorage.getItem("date")) || [];
            infoOrder.push(fullDate);
            localStorage.setItem("date", JSON.stringify(infoOrder));

            let products = [];
            for (listId of basket) {
                products.push(listId.id);
            }

            // on envoie en POST
            fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "order.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        } else {
            alert(
                "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
            );
        }
    });
}
