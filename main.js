const urlApi = "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
const nav = document.getElementById("nav")
const home = document.getElementById("home")
const quiz = document.getElementById("quiz")
const final = document.getElementById("final")
const botonComienzo = document.getElementById("comienzo")
const botonAtras = document.getElementById("volver")
const botonSiguiente = document.getElementById("continuar")
const botonVolveraComenzar = document.getElementById("reinicio")
const botonHome = document.getElementById("boton-home")

function soloHome (){
    home.classList.remove("hide")
    nav.classList.add("hide")
    quiz.classList.add("hide")
    final.classList.add("hide")
}

function soloQuiz () {
    home.classList.add("hide")
    nav.classList.remove("hide")
    quiz.classList.remove("hide")
    final.classList.add("hide")
}

function soloFinal () {
    home.classList.add("hide")
    nav.classList.remove("hide")
    quiz.classList.add("hide")
    final.classList.remove("hide")
}

botonComienzo.addEventListener("click",soloQuiz)
botonHome.addEventListener("click",soloHome)
//botonComienzo.addEventListener("click",soloQuiz)