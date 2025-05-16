const urlApi                = "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
const nav                   = document.getElementById ( "nav" )
const home                  = document.getElementById ( "home" )
const quiz                  = document.getElementById ( "quiz" )
const final                 = document.getElementById ( "final" )
const resultados            = document.getElementById ( "resultadoFinal" )
const botonComienzo         = document.getElementById ( "comienzo" )
const botonAtras            = document.getElementById ( "volver" )
const botonSiguiente        = document.getElementById ( "continuar" )
const botonVolveraComenzar  = document.getElementById ( "reinicio" )
const botonHome             = document.getElementById ( "boton-home" )
const Alternativa0          = document.getElementById ( "alternativa0" )
const Alternativa1          = document.getElementById ( "alternativa1" )
const Alternativa2          = document.getElementById ( "alternativa2" )
const Alternativa3          = document.getElementById ( "alternativa3" )
let   preguntaActiva        = 0;

//funciones SPA

function soloHome  ( ){
    esconder ( )
    home.classList.remove ( "hide" )
}   //  soloHome

function soloQuiz  ( ) {
    esconder ( )
    nav.classList.remove ( "hide" )
    quiz.classList.remove ( "hide" )
}   //  soloQuiz

function soloFinal  ( ) {
    esconder ( )
    nav.classList.remove ( "hide" )
    final.classList.remove ( "hide" )
    resultados.innerHTML = `Tuviste ${respuestasCorrectas} respuesta(s) correcta de ${preguntasApi.length} preguntas!` 
    respuestasCorrectas = 0;
    preguntaActiva      = 0;
}   //  soloFinal

function esconder  ( ) {
    home.classList.add ( "hide" )
    nav.classList.add ( "hide" )
    quiz.classList.add ( "hide" )
    final.classList.add ( "hide" )
}   //  esconder

//  funciones SPA

function randomIntFromInterval ( min, max ) 
{
    return Math.floor ( Math.random ( ) * ( max - min + 1 ) + min );
}   //  randomIntFromInterval

function encontrar (arr, num)
{
    for (let i = 0; i < arr.length; i++)
    {
        if (num == arr[i])
        {
            return true
        }
    }
    return false
}   //  encontrar

function llenarArreglo () 
{
    let arreglo = [ ]
    let contador = 0
    let numeroRandom
    while (contador < 4)
    {
        numeroRandom = randomIntFromInterval ( 0, 3 )
        if  ( ! encontrar(arreglo, numeroRandom) )
        {
            arreglo.push(numeroRandom)
            contador ++
        }
    }
    return (arreglo)
}   //llenarArreglo

function ConvierteArreglo  (  listaInicial  )
{
    listaDestino =  [ ];
    listaInicial.forEach ( element => {
        nuevoOrden   = llenarArreglo ( )
        alternativas =  [ ];
        alternativas.push  (  { 'alternativa' : element.correct_answer, 'correcta' : true }  );
        alternativas.push  (  { 'alternativa' : element.incorrect_answers  [  0  ], 'correcta' : false }  );
        alternativas.push  (  { 'alternativa' : element.incorrect_answers  [  1  ], 'correcta' : false }  );
        alternativas.push  (  { 'alternativa' : element.incorrect_answers  [  2  ], 'correcta' : false }  );

        let nuevo = [ ]
        for ( let i = 0; i < 4; i ++ )
        {
            nuevo.push ( alternativas [ nuevoOrden [ i ] ] );
        }        

        pregunta = { 'Enunciado' : element.question, 'Alternativas' : nuevo };
        listaDestino.push  (  pregunta  );
    } );

    return  (  listaDestino  );

}   //  ConvierteArreglo

//Pintar preguntas 


let preguntasApi;

axios.get ( urlApi )
     .then (  ( res ) => {
        preguntasApi = ConvierteArreglo  (  res.data.results  ); 
        console.log ( preguntasApi )
        pintaPregunta ( preguntasApi  [  preguntaActiva  ]  )
     } )
     .catch (  ( err ) => console.error ( err ) )

const colorInicial = ( ) => {
    const elements = document.querySelectorAll ( '.altern' );
    elements.forEach ( element => {
        element.style.backgroundColor = "#e49147";
    } )

}   //  colorInicial

function pintaPregunta  ( nodo ) 
{
    document.getElementById ( "enunciado" ).innerText    = nodo.Enunciado
    document.getElementById ( "alternativa0" ).innerText = nodo.Alternativas  [  0  ].alternativa;
    document.getElementById ( "alternativa1" ).innerText = nodo.Alternativas  [  1  ].alternativa;
    document.getElementById ( "alternativa2" ).innerText = nodo.Alternativas  [  2  ].alternativa;
    document.getElementById ( "alternativa3" ).innerText = nodo.Alternativas  [  3  ].alternativa;

 }  //    pintaPregunta

 const siguientePregunta =  ( ) => {
    if  (  preguntaActiva < preguntasApi.length - 1  )
    {
        preguntaActiva ++ 
        pintaPregunta ( preguntasApi  [  preguntaActiva  ]  );
    } 
    else 
    {
        soloFinal()
    }
    colorInicial ( );
 } //   siguientePregunta

 const anteriorPregunta =  ( ) => {
    if  (  preguntaActiva > 0  )
    {
        preguntaActiva = preguntaActiva - 1;
        pintaPregunta ( preguntasApi  [  preguntaActiva  ]  );
    }
    colorInicial ( );
 }  //  anteriorPregunta
 


let respuestasCorrectas = 0

const alternativa =  ( event ) => 
{
    let idButton = event.srcElement.id;
    let indice   = parseInt ( idButton [ idButton.length - 1 ] );
    const elements = document.querySelectorAll ( '.altern' );
    for ( let i = 0; i < 4; i ++ )
    {
        if  ( preguntasApi [ preguntaActiva ].Alternativas [ i ].correcta )
        {
            elements [ i ].style.backgroundColor = "green"
            if ( i == indice )
            {
                respuestasCorrectas ++
            }
        }
        else
        {
            elements [ i ].style.backgroundColor = "red"                
        }
    }

}   // alternativa


botonComienzo.addEventListener ( "click",soloQuiz )
botonHome.addEventListener ( "click",soloHome )
botonSiguiente.addEventListener ( "click", siguientePregunta )
botonVolveraComenzar.addEventListener ( "click",soloHome )
botonAtras.addEventListener ( "click", anteriorPregunta )
Alternativa0.addEventListener ( "click", alternativa )
Alternativa1.addEventListener ( "click", alternativa )
Alternativa2.addEventListener ( "click", alternativa )
Alternativa3.addEventListener ( "click", alternativa )

