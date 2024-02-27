let arreglo = [
  {
    nombre: "Goku",
    img: "img/Goku.png",
    descripcion:
      "<p>Goku es un guerrero Saiyan que proviene del planeta Tierra.</p><p>Es conocido por ser uno de los luchadores más poderosos del universo.</p>",
  },
  {
    nombre: "Gohan",
    img: "img/Gohan.png",
    descripcion:
      "<p>Gohan es el hijo de Goku y Chi-Chi.</p><p>Es un poderoso guerrero que ha salvado la Tierra en varias ocasiones.</p>",
  },
  {
    nombre: "Vegeta",
    img: "img/Vegeta.png",
    descripcion:
      "<p>Vegeta es el príncipe de la raza Saiyan.</p><p>Al principio fue un enemigo de Goku, pero luego se convierte en su aliado y amigo.</p>",
  },
  {
    nombre: "Yamcha",
    img: "img/Yamcha.png",
    descripcion:
      "<p>Yamcha es un luchador que alguna vez fue un bandido del desierto.</p><p>Después se convierte en un aliado leal de Goku y sus amigos.</p>",
  },
  {
    nombre: "Ten",
    img: "img/Ten.png",
    descripcion:
      "<p>Ten es un humano que es un maestro en las artes marciales.</p><p>Es un amigo cercano de Goku y ha luchado en numerosos torneos de artes marciales.</p>",
  },
  {
    nombre: "Chaos",
    img: "img/Chaos.png",
    descripcion:
      "<p>Chaos es un pequeño ser azul con antenas que vive en la torre de Kamisama.</p><p>Es conocido por su gran sabiduría y habilidades místicas.</p>",
  },
  {
    nombre: "Krillin",
    img: "img/Krillin.png",
    descripcion:
      "<p>Krillin es uno de los amigos más cercanos de Goku y uno de los mejores guerreros humanos de la Tierra.</p><p>Ha luchado en muchas batallas junto a Goku y los otros Z Fighters.</p>",
  },
];

let pos = [arreglo.length - 1, 0, 1];

function cargarDescripcion(){
    var titulo = document.getElementById("nombrepj");
    titulo.textContent = arreglo[pos[1]].nombre;
    var descripcion = document.getElementById("descripción");
    descripcion.innerHTML = arreglo[pos[1]].descripcion;
}

var imgizq = document.getElementById("izquierda");
imgizq.src = arreglo[pos[0]].img;

var imgcen = document.getElementById("principal");
imgcen.src = arreglo[pos[1]].img;

var imgder = document.getElementById("derecha");
imgder.src = arreglo[pos[2]].img;
cargarDescripcion();

function imgIzquierda() {
    for (var i = 0; i < pos.length; i++) {
        if (pos[i] == 0) {
            pos[i] = arreglo.length - 1;
        } else {
            pos[i] = pos[i] - 1;
        }
    }
    imgizq.src = arreglo[pos[0]].img;
    imgcen.src = arreglo[pos[1]].img;
    imgder.src = arreglo[pos[2]].img;
   cargarDescripcion()
}

function imgDerecha() {
    for (var i = 0; i < pos.length; i++) {
        if (pos[i] == arreglo.length-1) {
            pos[i] = 0;
        } else {
            pos[i] = pos[i] + 1;
        }
    }
    imgizq.src = arreglo[pos[0]].img;
    imgcen.src = arreglo[pos[1]].img;
    imgder.src = arreglo[pos[2]].img;
    cargarDescripcion()
}


