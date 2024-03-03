//Mapa y música - INICIALIZACIÓN
var music = new Audio("img/arena/audio/music.mp3");
var ki = new Audio("img/arena/audio/carga.mp3");
music.loop = true;
music.volume = 0;
ki.volume = 0;
mapaActual = 0;
var listaMapas = [
    { nombre: "Torneo de las Artes Marciales",imagen: "img/arena/arenas/0.gif" },
    { nombre: "Yermos",imagen: "img/arena/arenas/1.gif" },
    { nombre: "Habitación del tiempo",imagen: "img/arena/arenas/2.gif" },
    { nombre: "Carretera",imagen: "img/arena/arenas/3.gif" },
    { nombre: "Páramos",imagen: "img/arena/arenas/4.gif" }
];

//Goku y Piccolo - INICIALIZACIÓN VIDA KI y AUDIO ATAQUE
var hppiccolo = 100;
var hpgoku = 100;
var kipiccolo = 100;
var kigoku = 100;
var piccolo = new Audio("img/arena/audio/makankosappo.mp3");
var goku = new Audio("img/arena/audio/kamehameha.mp3");
piccolo.volume = 0;
goku.volume = 0;


//INICIALIZACIÓN DE LOS BOTONES DE PELEA DESACTIVADOS.
var atkgoku = document.getElementById("atkgoku");
atkgoku.disabled = true;
var atkpiccolo = document.getElementById("atkpiccolo");
atkpiccolo.disabled = true;
var recarga = document.getElementById("recarga");
recarga.disabled = true;

//OBTENER VALORES INICIALES DE VIDA Y KI DE LOS PERSONAJES PARA USAR EN LOS MÉTODOS.
var vidagoku = document.getElementById("vidagoku").textContent;
var kigoku = document.getElementById("kigoku").textContent;
var vidapiccolo = document.getElementById("vidapiccolo").textContent;
var kipiccolo = document.getElementById("kipiccolo").textContent;



function iniciarPelea() {
    desactivarBotones();
    var arena = document.getElementById("pelea");
    arena.src = "img/arena/start.gif";
    var mapaizq = document.getElementById("mapaizq");
    mapaizq.disabled = true;
    var mapader = document.getElementById("mapader");
    mapader.disabled = true;
    music.play();
    setTimeout(standby, 1300);
}

function ataquePiccolo() {
    if (kipiccolo >= 10) {
        piccolo.play();
        desactivarBotones();
        var img = document.getElementById("pelea");
        img.src = "img/arena/ataquepiccolo.gif" + '?x=' + Date.now(); //El date es para recargar el gif
        //resta ki a Piccolo
        kipiccolo = (kipiccolo - 10);
        document.getElementById("kipiccolo").innerText = kipiccolo;

        //resta vida a Goku
        vidagoku = vidagoku - (Math.floor(Math.random() * 20) + 5);
        if (vidagoku <= 0) {
            //en caso de bajar a 0, evento de victoria de piccolo
            document.getElementById("vidagoku").innerText = 0;
            desactivarBotones();
            setTimeout(piccoloWins, 1900);
        } else {
            //bajar vida normalmente
            document.getElementById("vidagoku").innerText = vidagoku;
            setTimeout(standby, 2500);
        }
        
    } else {
        recargar()
    }
}

function ataqueGoku() {
    if (kigoku >= 10) {
        goku.play();
        desactivarBotones();
        console.log(kigoku);
        var img = document.getElementById("pelea");
        img.src = "img/arena/ataquegoku.gif" + '?x=' + Date.now(); //El date es para recargar el gif

        //resta ki a Goku
        kigoku = (kigoku - 10);
        document.getElementById("kigoku").innerText = kigoku;

        //resta vida a Piccolo
        vidapiccolo = vidapiccolo - (Math.floor(Math.random() * 20) + 5);
        if (vidapiccolo <= 0) {
            //en caso de bajar a 0, evento de victoria de Goku
            document.getElementById("vidapiccolo").innerText = 0;
            desactivarBotones();
            setTimeout(gokuWins, 1900);
        } else {
            //bajar vida normalmente
            document.getElementById("vidapiccolo").innerText = vidapiccolo;
            setTimeout(standby, 2700);
        }
       
    } else {
        recargar()
    }
}

function recargar() {
    desactivarBotones();
    ki.play();
    var img = document.getElementById("pelea");
    img.src = "img/arena/carga.gif";
    var iniciar = document.getElementById("iniciar");
    setTimeout(standby, 3000);
    
    //Generación de recuperación al azar.
    kigoku = (kigoku + parseInt((Math.floor(Math.random() * 5) + 5)));
    vidagoku = (vidagoku + parseInt((Math.floor(Math.random() * 30) + 5)));
    kipiccolo = (kipiccolo + parseInt((Math.floor(Math.random() * 5) + 5)));
    vidapiccolo = (vidapiccolo + parseInt((Math.floor(Math.random() * 30) + 5)));
    
    
    
    //Condicionales para que no pasen de 100.
    if(kigoku>100){
        document.getElementById("kigoku").innerText = 100;
        kigoku = 100;   
    }else{
    document.getElementById("kigoku").innerText = kigoku;
    }

    if(kipiccolo>100){
        document.getElementById("kipiccolo").innerText = 100;
        kipiccolo = 100;   
    }else{
    document.getElementById("kipiccolo").innerText = kipiccolo;
    }

    if(vidagoku>100){
        document.getElementById("vidagoku").innerText = 100;
        vidagoku = 100;   
    }else{
    document.getElementById("vidagoku").innerText = vidagoku;
    }

    if(vidapiccolo>100){
        document.getElementById("vidapiccolo").innerText = 100;
        vidapiccolo = 100;   
    }else{
    document.getElementById("vidapiccolo").innerText = vidapiccolo;
    }

}

function standby() {
    var img = document.getElementById("pelea");
    img.src = "img/arena/standby.png";
    atkgoku.disabled = false;
    atkpiccolo.disabled = false;
    recarga.disabled = false;
}

function piccoloWins() {
    var img = document.getElementById("pelea");
    img.src = "img/arena/piccolowins.gif";
}

function gokuWins() {
    var img = document.getElementById("pelea");
    img.src = "img/arena/gokuwins.gif";
}

function desactivarBotones(){
    iniciar.disabled = true;
    atkgoku.disabled = true;
    atkpiccolo.disabled = true;
    recarga.disabled = true;
}

function mapaIzquierda(){
    if(mapaActual == 0){
        mapaActual = listaMapas.length-1;
    }else{
        mapaActual--;
    }
    var arena = document.getElementById("arena");
    arena.style.backgroundImage = "url("+listaMapas[mapaActual].imagen+")";
}

function mapaDerecha(){
    if(mapaActual == (listaMapas.length-1)){
        mapaActual = 0;
    }else{
        mapaActual++;
    }
    var arena = document.getElementById("arena");
    arena.style.backgroundImage = "url("+listaMapas[mapaActual].imagen+")";
}


function cambiarVolumen() {
    var span = document.getElementById("volumen");
    if (span.innerHTML == "🔈") {
        span.innerHTML = "🔊"; // Cambiar icono a activado
        music.volume = 0.25;
        goku.volume = 0.6;
        piccolo.volume = 0.5;
        ki.volume = 0.5;
    } else {
        span.innerHTML = "🔈"; // Cambiar icono a desactivado
        music.volume = 0;
        goku.volume = 0;
        piccolo.volume = 0;
        ki.volume = 0;
    }
}

