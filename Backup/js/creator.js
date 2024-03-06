var listaCabeza = [
    { imagen: "img/cac/head/001.png" },
    { imagen: "img/cac/head/002.png" },
    { imagen: "img/cac/head/003.png" },
    { imagen: "img/cac/head/004.png" },
    { imagen: "img/cac/head/005.png" },
    { imagen: "img/cac/head/006.png" },
    { imagen: "img/cac/head/007.png" },
    { imagen: "img/cac/head/008.png" },
    { imagen: "img/cac/head/009.png" },
    { imagen: "img/cac/head/010.png" },
    { imagen: "img/cac/head/011.png" },
    { imagen: "img/cac/head/012.png" },
    { imagen: "img/cac/head/013.png" },
    { imagen: "img/cac/head/014.png" },
    { imagen: "img/cac/head/015.png" },
    { imagen: "img/cac/head/016.png" },
    { imagen: "img/cac/head/017.png" },
    { imagen: "img/cac/head/018.png" },
    { imagen: "img/cac/head/019.png" },
    { imagen: "img/cac/head/020.png" },
    { imagen: "img/cac/head/021.png" },
    { imagen: "img/cac/head/022.png" },
    { imagen: "img/cac/head/023.png" },
    { imagen: "img/cac/head/024.png" },
    { imagen: "img/cac/head/025.png" },
    { imagen: "img/cac/head/026.png" },
    { imagen: "img/cac/head/027.png" },
    { imagen: "img/cac/head/028.png" },
    { imagen: "img/cac/head/029.png" },
    { imagen: "img/cac/head/030.png" },
    { imagen: "img/cac/head/031.png" },
    { imagen: "img/cac/head/032.png" },
    { imagen: "img/cac/head/033.png" },
    { imagen: "img/cac/head/034.png" },
    { imagen: "img/cac/head/035.png" },
    { imagen: "img/cac/head/036.png" },
    { imagen: "img/cac/head/037.png" },
    { imagen: "img/cac/head/038.png" }
];

var listaPant = [
    { imagen: "img/cac/pant/001.png" },
    { imagen: "img/cac/pant/002.png" },
    { imagen: "img/cac/pant/003.png" },
    { imagen: "img/cac/pant/004.png" },
    { imagen: "img/cac/pant/005.png" },
    { imagen: "img/cac/pant/006.png" },
    { imagen: "img/cac/pant/007.png" },
    { imagen: "img/cac/pant/008.png" },
    { imagen: "img/cac/pant/009.png" },
    { imagen: "img/cac/pant/010.png" },
    { imagen: "img/cac/pant/011.png" },
    { imagen: "img/cac/pant/012.png" },
    { imagen: "img/cac/pant/013.png" },
    { imagen: "img/cac/pant/014.png" },
    { imagen: "img/cac/pant/015.png" }
];

var listaBody = [
    { imagen: "img/cac/body/001.png" },
    { imagen: "img/cac/body/002.png" },
    { imagen: "img/cac/body/003.png" },
    { imagen: "img/cac/body/004.png" },
    { imagen: "img/cac/body/005.png" },
    { imagen: "img/cac/body/006.png" },
    { imagen: "img/cac/body/007.png" },
    { imagen: "img/cac/body/008.png" },
    { imagen: "img/cac/body/009.png" },
    { imagen: "img/cac/body/010.png" },
    { imagen: "img/cac/body/011.png" },
    { imagen: "img/cac/body/012.png" },
    { imagen: "img/cac/body/013.png" },
    { imagen: "img/cac/body/014.png" },
    { imagen: "img/cac/body/015.png" },
    { imagen: "img/cac/body/016.png" },
    { imagen: "img/cac/body/017.png" },
    { imagen: "img/cac/body/018.png" },
    { imagen: "img/cac/body/019.png" },
    { imagen: "img/cac/body/020.png" },
    { imagen: "img/cac/body/021.png" },
    { imagen: "img/cac/body/022.png" },
    { imagen: "img/cac/body/023.png" }
];

let pos = [0, 0, 0];
randomizar()

function cargarPersonaje() {
    var cabeza = document.getElementById("headZ");
    cabeza.src = listaCabeza[pos[0]].imagen;
    var cuerpo = document.getElementById("bodyZ");
    cuerpo.src = listaBody[pos[1]].imagen;
    var pantalon = document.getElementById("pantZ");
    pantalon.src = listaPant[pos[2]].imagen;
}


function cabezaIzquierda() {
    if (pos[0] == 0) {
        pos[0] = listaCabeza.length - 1;
    } else {
        pos[0]--;
    }
cargarPersonaje();
}

function cuerpoIzquierda() {
    if (pos[1] == 0) {
        pos[1] = listaBody.length - 1;
    } else {
        pos[1]--;
    }
cargarPersonaje();
}

function pantalonIzquierda() {
    if (pos[2] == 0) {
        pos[2] = listaPant.length - 1;
    } else {
        pos[2]--;}
cargarPersonaje();
}


function cabezaDerecha() {
    if (pos[0] == listaCabeza.length - 1) {
        pos[0] = 0;
    } else {
        pos[0]++;
    }
cargarPersonaje();
}

function cuerpoDerecha() {
    if (pos[1] == listaBody.length - 1) {
        pos[1] = 0;
    } else {
        pos[1]++;
    }
cargarPersonaje();
}

function pantalonDerecha() {
    if (pos[2] == listaPant.length - 1) {
        pos[2] = 0;
    } else {
        pos[2]++
    }
cargarPersonaje();
}

function randomizar(){
    pos[0] = (Math.floor(Math.random() * listaCabeza.length));
    pos[1] = (Math.floor(Math.random() * listaBody.length));
    pos[2] = (Math.floor(Math.random() * listaPant.length));
    cargarPersonaje()
}