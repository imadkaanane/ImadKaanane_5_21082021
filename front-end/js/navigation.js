var btnContainer = document.getElementById("myNavbar");

// Obtenez tous les boutons avec class="btn" à l'intérieur du conteneur
var btns = btnContainer.getElementsByClassName("nav-link");

// Parcourez les boutons et ajoutez la classe active au bouton actuel/cliqué
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
