var textAnimated = document.querySelector(".typing")

var text = ""

var textArr = [
  "Orinoco",
  "Bienvenue sur Ori-bears !"
]

var currentTextIndex = -1
var letterIndex = -1

function addLetter(){
  // incrémenter letterIndex pour passer à la lettre suivante
  letterIndex++
  //
  if(letterIndex < text.length) {
    //AJOUTER UN DELAI
    setTimeout( function() {
      // ajouter une lettre
      textAnimated.textContent += text[letterIndex]
      // l'appeler
      addLetter()
    }, 100)
  }else {
    // appeler removeLetter après un délai
    setTimeout( function() {
    removeLetter()
    }, 2000)
  }
}

function removeLetter(){
  // décrémenter letterIndex pour passer à la lettre suivante
  letterIndex--
  //
  if(letterIndex >= 0) {
    //AJOUTER UN RETARD
    setTimeout( function() {
      // supprimer la lettre
      textAnimated.textContent = text.slice(0, letterIndex)
      // l'appeler 
      removeLetter()
    }, 100)
  }else {
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
  if(currentTextIndex === textArr.length) {
    currentTextIndex = 0
  }
    //mettre à jour le texte 
    text = textArr[currentTextIndex]
    //appelez addLetter et lancez l'animation
    addLetter()
}

//l'appel initial pour tout commencer
updateText()




