//Creación del header
let header = document.getElementById("header")
let inicio = document.createElement("div");
let personajes = document.createElement("div");
let sobreNosotros = document.createElement("div");
let contacto = document.createElement("div");

inicio.innerHTML = '<a href="index.html">Inicio</a>';
personajes.innerHTML = '<a href="characters.html">Personajes</a>';
sobreNosotros.innerHTML = '<a href="about.html">Sobre Nosotros</a>';
contacto.innerHTML = '<a href="contact.html">Contacto</a>';

header.appendChild(inicio);
header.appendChild(personajes);   
header.appendChild(sobreNosotros);   
header.appendChild(contacto);


let footer = document.getElementById("footer");
let universidad = document.createElement("div");
universidad.innerHTML = 'Trabajo Práctico';
footer.appendChild(universidad);
