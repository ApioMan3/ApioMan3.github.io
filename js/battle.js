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

var vidagoku = document.getElementById("vidagoku").textContent;
var kigoku = document.getElementById("kigoku").textContent;
var vidapiccolo = document.getElementById("vidapiccolo").textContent;
var kipiccolo = document.getElementById("kipiccolo").textContent;



function iniciarPelea() {
    desactivarBotones();
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/start.gif";
    arena.appendChild(img);
    var iniciar = document.getElementById("iniciar");
    setTimeout(standby, 1600);
}

function ataquePiccolo() {
    if (kipiccolo >= 10) {
        desactivarBotones();
        console.log(kipiccolo);
        var arena = document.getElementById("arena");
        arena.innerHTML = '';
        let img = document.createElement("img");
        img.src = "img/arena/ataquepiccolo.gif" + '?x=' + Date.now(); //El date es para recargar el gif
        arena.appendChild(img);
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
        desactivarBotones();
        console.log(kigoku);
        var arena = document.getElementById("arena");
        arena.innerHTML = '';
        let img = document.createElement("img");
        img.src = "img/arena/ataquegoku.gif" + '?x=' + Date.now(); //El date es para recargar el gif
        arena.appendChild(img);

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
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/carga.gif";
    arena.appendChild(img);
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
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/standby.png";
    arena.appendChild(img);
    atkgoku.disabled = false;
    atkpiccolo.disabled = false;
    recarga.disabled = false;
}

function piccoloWins() {
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/piccolowins.gif";
    arena.appendChild(img);
}

function gokuWins() {
    var arena = document.getElementById("arena");
    arena.innerHTML = '';
    let img = document.createElement("img");
    img.src = "img/arena/gokuwins.gif";
    arena.appendChild(img);
}

function desactivarBotones(){
    iniciar.disabled = true;
    atkgoku.disabled = true;
    atkpiccolo.disabled = true;
    recarga.disabled = true;
}

