var hppiccolo = 100;
var hpgoku = 100;
var kipiccolo = 100;
var kigoku = 100;

var atkgoku = document.getElementById("atkgoku");
atkgoku.disabled = true;
var atkpiccolo = document.getElementById("atkpiccolo");
atkpiccolo.disabled = true;
var recarga = document.getElementById("recarga");
recarga.disabled = true;


function iniciarPelea() {
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/start.gif";
    arena.appendChild(img);
    var iniciar = document.getElementById("iniciar");
    iniciar.disabled = true;
    atkgoku.disabled = false;
    atkpiccolo.disabled = false;
    recarga.disabled = false; 
}

function ataquePiccolo() {
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/ataquepiccolo.gif";
    arena.appendChild(img);
    var iniciar = document.getElementById("iniciar");
    atkpiccolo.disabled = true;
    atkgoku.disabled = false;

}

function ataqueGoku() {
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/ataquegoku.gif";
    arena.appendChild(img);
    var iniciar = document.getElementById("iniciar");
    atkgoku.disabled = true;
    atkpiccolo.disabled = false;
}

