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
const respuestaCorrecta = document.getElementById("correcta")
const respuestaIncorrecta = document.getElementById("incorrecta")
const respuestaIncorrecta2 = document.getElementById("incorrecta2")
const respuestaIncorrecta3 = document.getElementById("incorrecta3")
let   preguntaActiva       = 0;
//funciones SPA

function soloHome (){
    esconder()
    home.classList.remove("hide")
}

function soloQuiz () {
    esconder()
    nav.classList.remove("hide")
    quiz.classList.remove("hide")
}

function soloFinal () {
    esconder()
    nav.classList.remove("hide")
    final.classList.remove("hide")
}

function esconder () {
    home.classList.add("hide")
    nav.classList.add("hide")
    quiz.classList.add("hide")
    final.classList.add("hide")
}

//  const correctaIncorrecta = (element) => {
//    element.classList.add("correct");
//  }


// preguntasApi = [{ 'Enunciado' : 'texto', 'correcta': false }, {} ]
//hacer una función para mostrar respuesta correcta?


function ConvierteArreglo ( listaInicial )
{
    listaDestino = [];
    listaInicial.forEach(element => {
        alternativas = [ ];
        alternativas.push ( { 'alternativa' : element.correct_answer, 'correcta' : true } );
        alternativas.push ( { 'alternativa' : element.incorrect_answers [ 0 ], 'correcta' : false } );
        alternativas.push ( { 'alternativa' : element.incorrect_answers [ 1 ], 'correcta' : false } );
        alternativas.push ( { 'alternativa' : element.incorrect_answers [ 2 ], 'correcta' : false } );
        //
        //  Aquí si quieres, se desordena el arreglo alternativas
        //
        pregunta = { 'Enunciado' : element.question, 'Alternativas' : alternativas };
        listaDestino.push ( pregunta );
    });

    return ( listaDestino );

}   //  ConvierteArreglo

//Pintar preguntas 


let preguntasApi;

axios.get(urlApi)
     .then((res) => {
        preguntasApi = ConvierteArreglo ( res.data.results ); 
        console.log(preguntasApi)
        pintaPregunta(preguntasApi [ preguntaActiva ] )
     })
     .catch((err) => console.error(err))

function pintaPregunta (nodo) {
    document.getElementById("enunciado").innerText   = nodo.Enunciado
    document.getElementById("alternativa0").innerText    = nodo.Alternativas [ 0 ].alternativa;
    document.getElementById("alternativa1").innerText  = nodo.Alternativas [ 1 ].alternativa;
    document.getElementById("alternativa2").innerText = nodo.Alternativas [ 2 ].alternativa;
    document.getElementById("alternativa3").innerText = nodo.Alternativas [ 3 ].alternativa;
 }

 const siguientePregunta = ( ) => {
    if ( preguntaActiva < preguntasApi.length - 1 )
    {
        preguntaActiva = preguntaActiva + 1;
        pintaPregunta(preguntasApi [ preguntaActiva ] );
    }
 }

 const anteriorPregunta = ( ) => {
    if ( preguntaActiva > 0 )
    {
        preguntaActiva = preguntaActiva - 1;
        pintaPregunta(preguntasApi [ preguntaActiva ] );
    }
 }
 //pintar la respuesta verde o rojo si es la correcta o no

botonComienzo.addEventListener("click",soloQuiz)
botonHome.addEventListener("click",soloHome)
botonSiguiente.addEventListener("click", siguientePregunta)
botonVolveraComenzar.addEventListener("click",soloHome)
botonAtras.addEventListener("click", anteriorPregunta)




//document.getElementById("correcta").innerText=nodo.correct_answer
//document.getElementById("enunciado").innerText=nodo.question
//document.getElementById("incorrecta").innerText=nodo.incorrect_answers
//document.getElementById("incorrecta2").innerText=nodo.incorrect_answers
//document.getElementById("incorrecta3").innerText=preguntasApi.results[2].incorrect_answers