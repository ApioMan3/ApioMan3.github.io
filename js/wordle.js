const listaPersonajes = [
    { nombre: "KARIN", descripcion: "Maestro que vive en la torre.", imagen: "img/dragondle/KARIN.png" },
    { nombre: "PIANO", descripcion: "Hijo del Rey Demonio Piccolo.", imagen: "img/dragondle/PIANO.png" },
    { nombre: "VADOS", descripcion: "Angel del 6to universo.", imagen: "img/dragondle/VADOS.png" },
    { nombre: "BUJIN", descripcion: "Secuaz de Bojack.", imagen: "img/dragondle/BUJIN.png" },
    { nombre: "GOKUA", descripcion: "Secuaz de Bojack.", imagen: "img/dragondle/GOKUA.png" },
    { nombre: "CARGO", descripcion: "Namek hermano de Dende.", imagen: "img/dragondle/CARGO.png" },
    { nombre: "DENDE", descripcion: "Namek, nuevo Kamisama de la tierra.", imagen: "img/dragondle/DENDE.png" },
    { nombre: "MOORI", descripcion: "Namek, nuevo patriatca del Namekusei.", imagen: "img/dragondle/MOORI.png" },
    { nombre: "BULMA", descripcion: "Aventurera, trabajadora de la Corporación Cápsula.", imagen: "img/dragondle/BULMA.png" },
    { nombre: "MARON", descripcion: "Ex-novia de Krillin.", imagen: "img/dragondle/MARON.png" },
    { nombre: "ROSHI", descripcion: "Maestro de las artes marciales.", imagen: "img/dragondle/ROSHI.png" },
    { nombre: "SATAN", descripcion: "Campeón de múltiples torneos de artes marciales.", imagen: "img/dragondle/SATAN.png" },
    { nombre: "PIZZA", descripcion: "Asistente de Mr.Satán.", imagen: "img/dragondle/PIZZA.png" },
    { nombre: "VIDEL", descripcion: "Guerrera terrícola hija del campeón mundial.", imagen: "img/dragondle/VIDEL.png" },
    { nombre: "NAPPA", descripcion: "Saiyan élite, compañero de Vegeta.", imagen: "img/dragondle/NAPPA.png" },
    { nombre: "CABBA", descripcion: "Saiyan del 6to universo.", imagen: "img/dragondle/CABBA.png" },
    { nombre: "KEFLA", descripcion: "Fusion saiyan del 6to universo.", imagen: "img/dragondle/KEFLA.png" },
    { nombre: "GOHAN", descripcion: "Primer hijo de Goku y Milk.", imagen: "img/dragondle/GOHAN.png" },
    { nombre: "GOTEN", descripcion: "Segundo hijo de Goku y Milk.", imagen: "img/dragondle/GOTEN.png" },
    { nombre: "ARALE", descripcion: "Invitada recurrente de Dr.Slump.", imagen: "img/dragondle/ARALE.png" },
    { nombre: "DOORE", descripcion: "Soldado del escuadrón de Cooler.", imagen: "img/dragondle/DOORE.png" },
    { nombre: "SALZA", descripcion: "Soldado del escuadrón de Cooler.", imagen: "img/dragondle/SALZA.png" },
    { nombre: "SIDRA", descripcion: "Dios de la Destrucción.", imagen: "img/dragondle/SIDRA.png" },
    { nombre: "JEREZ", descripcion: "Diosa de la Destrucción.", imagen: "img/dragondle/JEREZ.png" },
    { nombre: "OLIBU", descripcion: "Alumno del Kaio del Norte.", imagen: "img/dragondle/OLIBU.png" },
    { nombre: "GINYU", descripcion: "Soldado de Freezer que lidera su escuadrón.", imagen: "img/dragondle/GINYU.png" },
    { nombre: "GULDO", descripcion: "Miembro de las 'Fuerzas Ginyu'.", imagen: "img/dragondle/GULDO.png" },
    { nombre: "JEICE", descripcion: "Miembro de las 'Fuerzas Ginyu'.", imagen: "img/dragondle/JEICE.png" },
    { nombre: "GOWAS", descripcion: "Kaiosama del 10mo universo.", imagen: "img/dragondle/GOWAS.png" },
    { nombre: "ZAMAS", descripcion: "Asistente de Gowas, principal villano de su arco.", imagen: "img/dragondle/ZAMAS.png" },
    { nombre: "BLACK", descripcion: "Una versión alternativa de Zamas, en el cuerpo de Goku.", imagen: "img/dragondle/BLACK.png" },
    { nombre: "DISPO", descripcion: "Miembro de las tropas del orgullo.", imagen: "img/dragondle/DISPO.png" },
    { nombre: "JIREN", descripcion: "Miembro de las tropas del orgullo.", imagen: "img/dragondle/JIREN.png" },
    { nombre: "BASIL", descripcion: "Miembro del trio del peligro.", imagen: "img/dragondle/BASIL.png" },
    { nombre: "BILLS", descripcion: "Dios de la Destrucción.", imagen: "img/dragondle/BILLS.png" },
    { nombre: "BROLY", descripcion: "El Super Saiyan Legendario.", imagen: "img/dragondle/BROLY.png" },
    { nombre: "TOPPO", descripcion: "Miembro de las tropas del orgullo.", imagen: "img/dragondle/TOPPO.png" },
    { nombre: "FROST", descripcion: "Combatiente del 6to universo.", imagen: "img/dragondle/FROST.png" }
];
//eligiendo un personaje del arreglo y iniciando intentos.
let aleatorio = Math.floor(Math.random() * listaPersonajes.length);
let pjRandom = listaPersonajes[aleatorio];
let nombrepjRandom = pjRandom.nombre;
let intentos = 0;

//asignando el botón enter al botón
document.getElementById('nombre').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      enviarPersonaje(); // Llama a la función del botón
    }
  });

//funcion para terminar el juego y cambiar la página    
function terminarJuego(){
    var nombrePJ = document.getElementById("NombrePJ");
    var imagenPJ = document.getElementById("ImagenPJ");
    var descripciónPJ = document.getElementById("descripcionPJ");
    nombrePJ.innerText = pjRandom.nombre;
    imagenPJ.src = pjRandom.imagen;
    descripciónPJ.innerText = pjRandom.descripcion;

    var nombreInput = document.getElementById("nombre");
    var boton = document.getElementById("boton");
    nombreInput.disabled = true;
    boton.disabled = true;
}


function enviarPersonaje() {
    let patron = /^[a-zA-Z]{5}$/;
    if(patron.test(document.forms["formulario"]["nombre"].value)){
        intentos++;
        introducirPersonaje();

    } else {
        let error = document.getElementById("error");
        error.innerHTML = "Escriba el nombre del personaje correctamente"
        setTimeout(function() {
            error.innerHTML = "";
        }, 2000);
    }
}

function introducirPersonaje(){
    let juego = document.getElementById("wordle");
    //crear el div
    let div = document.createElement("div");
    let campo = document.forms["formulario"]["nombre"];
    let ingreso = campo.value.toUpperCase();
    campo.value = "";
    div.id = "juego";

    //crear spans
    let letra1 = document.createElement("span");
    let letra2 = document.createElement("span");
    let letra3 = document.createElement("span");
    let letra4 = document.createElement("span");
    let letra5 = document.createElement("span");
    
    //asignar la letra a cada span
    letra1.innerText = ingreso[0];
    letra2.innerText = ingreso[1];
    letra3.innerText = ingreso[2];
    letra4.innerText = ingreso[3];
    letra5.innerText = ingreso[4];

    //letra 1
    if (ingreso[0] == nombrepjRandom[0]) {
        letra1.id = "letraCorrecta"
    }
    else if (ingreso[0] == nombrepjRandom[1] ||
        ingreso[0] == nombrepjRandom[2] ||
        ingreso[0] == nombrepjRandom[3] ||
        ingreso[0] == nombrepjRandom[4]) {
        letra1.id = "letraPosible"
    } else {
        letra1.id = "letra";
    }

    //letra 2
    if (ingreso[1] == nombrepjRandom[1]) {
        letra2.id = "letraCorrecta"
    }
    else if (ingreso[1] == nombrepjRandom[0] ||
        ingreso[1] == nombrepjRandom[2] ||
        ingreso[1] == nombrepjRandom[3] ||
        ingreso[1] == nombrepjRandom[4]) {
        letra2.id = "letraPosible"
    } else {
        letra2.id = "letra";
    }

    //letra 3
    if (ingreso[2] == nombrepjRandom[2]) {
        letra3.id = "letraCorrecta"
    }
    else if (ingreso[2] == nombrepjRandom[0] ||
        ingreso[2] == nombrepjRandom[1] ||
        ingreso[2] == nombrepjRandom[3] ||
        ingreso[2] == nombrepjRandom[4]) {
        letra3.id = "letraPosible"
    } else {
        letra3.id = "letra";
    }

    //letra 4
    if (ingreso[3] == nombrepjRandom[3]) {
        letra4.id = "letraCorrecta"
    }
    else if (ingreso[3] == nombrepjRandom[0] ||
        ingreso[3] == nombrepjRandom[1] ||
        ingreso[3] == nombrepjRandom[2] ||
        ingreso[3] == nombrepjRandom[4]) {
        letra4.id = "letraPosible"
    } else {
        letra4.id = "letra";
    }

    //letra 5
    if (ingreso[4] == nombrepjRandom[4]) {
        letra5.id = "letraCorrecta"
    }
    else if (ingreso[4] == nombrepjRandom[0] ||
        ingreso[4] == nombrepjRandom[1] ||
        ingreso[4] == nombrepjRandom[2] ||
        ingreso[4] == nombrepjRandom[3]) {
        letra5.id = "letraPosible"
    } else {
        letra5.id = "letra";
    }

    //añadir las letras al div
    div.appendChild(letra1);
    div.appendChild(letra2);
    div.appendChild(letra3);
    div.appendChild(letra4);
    div.appendChild(letra5);

    //añadir el div al section
    juego.appendChild(div);
    
    //comprobación para cerrar el juego
    if (ingreso[0] == nombrepjRandom[0] &&
        ingreso[1] == nombrepjRandom[1] &&
        ingreso[2] == nombrepjRandom[2] &&
        ingreso[3] == nombrepjRandom[3] &&
        ingreso[4] == nombrepjRandom[4]){
        terminarJuego();
    }

    if(intentos==6){
        terminarJuego();
    }

}