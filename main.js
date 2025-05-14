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

/*
function esconder () {
    home.classList.add("hide")
    nav.classList.add("hide")
    quiz.classList.add("hide")
    final.classList.add("hide")
}
*/

botonComienzo.addEventListener("click",soloQuiz)
botonHome.addEventListener("click",soloHome)
botonSiguiente.addEventListener("click", soloFinal)
botonVolveraComenzar.addEventListener("click",soloHome)

//let preguntaActual;

let preguntasApi;

axios.get(urlApi)
     .then((res) => {preguntasApi = res.data; console.log(preguntasApi)})
     .catch((err) => console.error(err))

function pintaPregunta (nodo) {
    document.getElementById("correcta").innerText    = nodo.correct_answer
    document.getElementById("enunciado").innerText   = nodo.question
    document.getElementById("incorrecta").innerText  = nodo.incorrect_answers [ 0 ]
    document.getElementById("incorrecta2").innerText = nodo.incorrect_answers [ 1 ]
    document.getElementById("incorrecta3").innerText = nodo.incorrect_answers [ 2 ]
 }





//document.getElementById("correcta").innerText=nodo.correct_answer
//document.getElementById("enunciado").innerText=nodo.question
//document.getElementById("incorrecta").innerText=nodo.incorrect_answers
//document.getElementById("incorrecta2").innerText=nodo.incorrect_answers
//document.getElementById("incorrecta3").innerText=preguntasApi.results[2].incorrect_answers