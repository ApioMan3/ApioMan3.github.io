var juegoactivo = true;
var cartas = document.querySelectorAll('.carta');
var iniciar = document.querySelector('#iniciar')
var min = document.querySelector('#min')
var seg = document.querySelector('#seg')
var seg_aux = 0;
var min_aux = 0;
var tiempo = document.querySelector('#temporizador')
var tarjetasDestapadas = 0;
var tarjeta1;
var tarjeta2;
var resultado1;
var resultado2;
var movimientos = 0;
var mostrarMovimientos = document.getElementById("contador_movimientos")
var aciertos = 0;
var mostrarAciertos = document.getElementById("contador_aciertos")
var record;
var mostrarRecord = document.getElementById("record");
var imagenes = [
    "img/memorama/broly.png",
    "img/memorama/broly.png",
    "img/memorama/bulma.jpg",
    "img/memorama/bulma.jpg",
    "img/memorama/freezer.jpg",
    "img/memorama/freezer.jpg",
    "img/memorama/ginyu.jpg",
    "img/memorama/ginyu.jpg",
    "img/memorama/goham.jpg",
    "img/memorama/goham.jpg",
    "img/memorama/goku.png",
    "img/memorama/goku.png",
    "img/memorama/gokua.jpg",
    "img/memorama/gokua.jpg",
    "img/memorama/karin.png",
    "img/memorama/karin.png",
    "img/memorama/krillin.png",
    "img/memorama/krillin.png",
    "img/memorama/nappa.jpg",
    "img/memorama/nappa.jpg",
    "img/memorama/olibu.png",
    "img/memorama/olibu.png",
    "img/memorama/piccolo.jpg",
    "img/memorama/piccolo.jpg",
    "img/memorama/pizza.png",
    "img/memorama/pizza.png",
    "img/memorama/satan.jpg",
    "img/memorama/satan.jpg",
    "img/memorama/vegeta.jpg",
    "img/memorama/vegeta.jpg",
    "img/memorama/videl.jpg",
    "img/memorama/videl.jpg",
]
var imagenesJuego = []
var comienzo;

document.addEventListener("DOMContentLoaded", function () {
    iniciar_app();
    mostrar_record();
})
iniciar.addEventListener("click", function () {
    cronometro();
    desordenarImagenes(imagenes, imagenesJuego);
})

function iniciar_app() {
    bloquearTarjetas();
}

function mostrar_record () {
    let record = localStorage.getItem("ultimo_record");
    if(record==null){
        mostrarRecord.innerHTML = "-";
    }else{
        mostrarRecord.innerHTML = record.toString();
    }
}
function bloquearTarjetas() {
    for (let i = 0; i < cartas.length; i++) {
        cartas[i].disabled = true;
        cartas[i].classList.add("disabled");
    }
}

function cronometro() {
    desbloquear_cartas()
    iniciar.disabled = true;
    iniciar.classList.add("disabled");
    comienzo = setInterval(temporizador, 1000);
}

function temporizador() {
    if (min_aux < 3) {
        if (seg_aux < 59) {
            seg_aux++;
        } else {
            min_aux++;
            seg_aux = 0;
        }
        if (min_aux == 2 && seg_aux == 30) {
            tiempo.classList.add("poco_tiempo")
        }
        if (min_aux == 2 && seg_aux == 50) {
            tiempo.classList.add("ultimos_segundos")
        }
        seg.innerHTML = seg_aux.toString().padStart(2, "0");
        min.innerHTML = min_aux;
    } else {
        clearInterval(comienzo)
        bloquearTarjetas();
        window.location.href = 'perdiste.html';
    }
}

function desbloquear_cartas() {
    for (let i = 0; i < cartas.length; i++) {
        cartas[i].disabled = false;
        cartas[i].classList.remove("disabled");
    }
}

function desordenarImagenes(array1, array2) {
    let imagenesDuplicadas = array1.slice();
    let numerosDisponibles = [];
    let aux;
    let num;
    for (let i = 0; i < imagenesDuplicadas.length; i++) {
        numerosDisponibles[i] = i;
    }
    for (let j = 0; j < imagenesDuplicadas.length; j++) {
        aux = Math.floor(Math.random() * numerosDisponibles.length);
        num = numerosDisponibles[aux]
        array2[j] = imagenesDuplicadas[num]
        numerosDisponibles.splice(aux, 1);
    }
}

function destapar(id) {

    if(juegoactivo){
    tarjetasDestapadas++;
    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        resultado1 = imagenesJuego[id];
        tarjeta1.style.border = '3px solid #954300';
        tarjeta1.style.backgroundImage = 'url(' + resultado1 + ')';
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        resultado2 = imagenesJuego[id];
        tarjeta2.style.border = '3px solid #954300';
        tarjeta2.style.backgroundImage = 'url(' + resultado2 + ')';
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = movimientos;
        if (resultado1 == resultado2) {
            tarjeta1.style.border = '4px solid green';
            tarjeta2.style.border = '4px solid green';
            tarjeta1.style.cursor = 'not-allowed';
            tarjeta2.style.cursor = 'not-allowed';
            aciertos++;
            mostrarAciertos.innerHTML = aciertos
            juegoactivo = true;
            if(aciertos==16){
                clearInterval(comienzo);
                window.location.href = 'ganaste.html';
                record = min_aux + ":" + seg_aux.toString().padStart(2, "0");
                localStorage.setItem("ultimo_record", record);
            }
        } else {
            setTimeout(() => {
                tarjeta1.style.border = '4px solid red';
                tarjeta2.style.border = '4px solid red';
            }, 750)

            setTimeout(() => {
                tarjeta1.style.backgroundImage = 'url(img/memorama/card.png )';
                tarjeta2.style.backgroundImage = 'url(img/memorama/card.png )';
                tarjeta1.style.border = '';
                tarjeta2.style.border = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                juegoactivo = true;
            }, 1500)
            juegoactivo = false;
        }
        tarjetasDestapadas = 0;
    }
}else{
    
}
}