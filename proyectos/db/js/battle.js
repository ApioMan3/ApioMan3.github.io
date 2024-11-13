//Mapa y música - INICIALIZACIÓN
var music = new Audio("img/arena/audio/music.mp3");
var ki = new Audio("img/arena/audio/carga.mp3");
music.loop = true;
music.volume = 0;
var listaMapas = [
  { nombre: "Torneo de las Artes Marciales", imagen: "img/arena/arenas/0.gif" },
  { nombre: "Yermos", imagen: "img/arena/arenas/1.gif" },
  { nombre: "Habitación del tiempo", imagen: "img/arena/arenas/2.gif" },
  { nombre: "Carretera", imagen: "img/arena/arenas/3.gif" },
  { nombre: "Páramos", imagen: "img/arena/arenas/4.gif" },
];
mapaActual = 0;

//Inicialización de audios de ataque para Goku y Piccolo
var piccolo = new Audio("img/arena/audio/makankosappo.mp3");
var goku = new Audio("img/arena/audio/kamehameha.mp3");

//Inicializar los botones de pelea desactivados.
var atkgoku = document.getElementById("atkgoku");
atkgoku.disabled = true;
var atkpiccolo = document.getElementById("atkpiccolo");
atkpiccolo.disabled = true;
var recarga = document.getElementById("recarga");
recarga.disabled = true;

//Obtener valores iniciales de vida y ki de los personajes para utilizarlos en los métodos.
var vidagoku = document.getElementById("vidagoku").textContent;
var kigoku = document.getElementById("kigoku").textContent;
var vidapiccolo = document.getElementById("vidapiccolo").textContent;
var kipiccolo = document.getElementById("kipiccolo").textContent;

//Obtener valores de volumen del Storage.
recuperarVolumen();

function iniciarPelea() {
  desactivarBotones();
  var arena = document.getElementById("pelea");
  arena.src = "img/arena/start.gif";
  var mapaizq = document.getElementById("mapaizq");
  mapaizq.disabled = true; //Desactiva el cambio de mapa.
  var mapader = document.getElementById("mapader");
  mapader.disabled = true; //Desactiva el cambio de mapa.
  music.play();
  setTimeout(standby, 1300);
}

function ataquePiccolo() {
  if (kipiccolo >= 10) {
    piccolo.play();
    desactivarBotones();
    var img = document.getElementById("pelea");
    img.src = "img/arena/ataquepiccolo.gif" + "?x=" + Date.now(); //El date es para recargar el gif generando una nueva URL para el mismo
    //Restar ki a Piccolo.
    kipiccolo = kipiccolo - 10;
    document.getElementById("kipiccolo").innerText = kipiccolo;

    //Restar vida a Goku.
    vidagoku = vidagoku - (Math.floor(Math.random() * 15) + 5);
    if (vidagoku <= 0) {
      //En caso de bajar a 0, evento de victoria de piccolo.
      document.getElementById("vidagoku").innerText = 0;
      desactivarBotones();
      setTimeout(piccoloWins, 1900);
    } else {
      //Bajar vida normalmente.
      document.getElementById("vidagoku").innerText = vidagoku;
      setTimeout(standby, 2500);
    }
  } else {
    recargar();
  }
}

function ataqueGoku() {
  if (kigoku >= 10) {
    goku.play();
    desactivarBotones();
    var img = document.getElementById("pelea");
    img.src = "img/arena/ataquegoku.gif" + "?x=" + Date.now(); //El date es para recargar el gif generando una nueva URL para el mismo

    //Restar ki a Goku
    kigoku = kigoku - 10;
    document.getElementById("kigoku").innerText = kigoku;

    //Restar vida a Piccolo
    vidapiccolo = vidapiccolo - (Math.floor(Math.random() * 15) + 5);
    if (vidapiccolo <= 0) {
      //En caso de bajar a 0, evento de victoria de Goku
      document.getElementById("vidapiccolo").innerText = 0;
      desactivarBotones();
      setTimeout(gokuWins, 1900);
    } else {
      //Bajar vida normalmente
      document.getElementById("vidapiccolo").innerText = vidapiccolo;
      setTimeout(standby, 2700);
    }
  } else {
    recargar();
  }
}

function recargar() {
  desactivarBotones();
  ki.play();
  var img = document.getElementById("pelea");
  img.src = "img/arena/carga.gif";
  setTimeout(standby, 3000);

  //Generación de recuperación al azar.
  kigoku = kigoku + parseInt(Math.floor(Math.random() * 10) + 5);
  vidagoku = vidagoku + parseInt(Math.floor(Math.random() * 20) + 5);
  kipiccolo = kipiccolo + parseInt(Math.floor(Math.random() * 10) + 5);
  vidapiccolo = vidapiccolo + parseInt(Math.floor(Math.random() * 20) + 5);

  //Condicionales para que no pasen de 100.
  if (kigoku > 100) {
    document.getElementById("kigoku").innerText = 100;
    kigoku = 100;
  } else {
    document.getElementById("kigoku").innerText = kigoku;
  }

  if (kipiccolo > 100) {
    document.getElementById("kipiccolo").innerText = 100;
    kipiccolo = 100;
  } else {
    document.getElementById("kipiccolo").innerText = kipiccolo;
  }

  if (vidagoku > 100) {
    document.getElementById("vidagoku").innerText = 100;
    vidagoku = 100;
  } else {
    document.getElementById("vidagoku").innerText = vidagoku;
  }

  if (vidapiccolo > 100) {
    document.getElementById("vidapiccolo").innerText = 100;
    vidapiccolo = 100;
  } else {
    document.getElementById("vidapiccolo").innerText = vidapiccolo;
  }
}

function standby() {
  var img = document.getElementById("pelea");
  img.src = "img/arena/standby.png";
  atkgoku.disabled = false;
  atkpiccolo.disabled = false;
  recarga.disabled = false;
  //Funcion de espera de acción. Reactiva los botones en un tiempo determinado y cambia la postura de los personajes a la espera.
}

function piccoloWins() {
  var img = document.getElementById("pelea");
  img.src = "img/arena/piccolowins.gif";
  removerBotones();
}

function gokuWins() {
  var img = document.getElementById("pelea");
  img.src = "img/arena/gokuwins.gif";
  removerBotones();
}

function desactivarBotones() {
  iniciar.disabled = true;
  atkgoku.disabled = true;
  atkpiccolo.disabled = true;
  recarga.disabled = true;
}

function mapaIzquierda() {
  if (mapaActual == 0) {
    mapaActual = listaMapas.length - 1;
  } else {
    mapaActual--;
  }
  var arena = document.getElementById("arena");
  arena.style.backgroundImage = "url(" + listaMapas[mapaActual].imagen + ")";
}

function mapaDerecha() {
  if (mapaActual == listaMapas.length - 1) {
    mapaActual = 0;
  } else {
    mapaActual++;
  }
  var arena = document.getElementById("arena");
  arena.style.backgroundImage = "url(" + listaMapas[mapaActual].imagen + ")";
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
  localStorage.setItem("musicVolume", music.volume);
  localStorage.setItem("gokuVolume", goku.volume);
  localStorage.setItem("piccoloVolume", piccolo.volume);
  localStorage.setItem("kiVolume", ki.volume);
}

function mostrarVentana() {
  var div = document.getElementById("miDiv");
  div.style.display = "block";
}

function cerrarVentana() {
  var div = document.getElementById("miDiv");
  div.style.display = "none";
}

function removerBotones() {
  iniciar.innerText = "Volver a jugar";
  iniciar.disabled = false;
  iniciar.onclick = function () {
    window.location.reload();
  };
}

function recuperarVolumen() {
  var span = document.getElementById("volumen");
  if (localStorage.getItem("musicVolume") !== null) {
    music.volume = parseFloat(localStorage.getItem("musicVolume"));
  }
  if (localStorage.getItem("gokuVolume") !== null) {
    goku.volume = parseFloat(localStorage.getItem("gokuVolume"));
  }
  if (localStorage.getItem("piccoloVolume") !== null) {
    piccolo.volume = parseFloat(localStorage.getItem("piccoloVolume"));
  }
  if (localStorage.getItem("kiVolume") !== null) {
    ki.volume = parseFloat(localStorage.getItem("kiVolume"));
  }
  if (localStorage.getItem("musicVolume") > 0) {
    span.innerHTML = "🔊";
  } else {
    span.innerHTML = "🔈";
  }
}
