//Creación del header
let header = document.getElementById("header")
let inicio = document.createElement("div");
let personajes = document.createElement("div");
let sobreNosotros = document.createElement("div");
let battle = document.createElement("div");
let contacto = document.createElement("div");

inicio.innerHTML = '<a href="index.html">Inicio</a>';
battle.innerHTML = '<a href="battle.html">Torneo</a>';
personajes.innerHTML = '<a href="characters.html">Personajes</a>';
sobreNosotros.innerHTML = '<a href="about.html">Sobre Nosotros</a>';
contacto.innerHTML = '<a href="contact.html">Contacto</a>';

header.appendChild(inicio);
header.appendChild(battle);
header.appendChild(personajes);
header.appendChild(sobreNosotros);   
header.appendChild(contacto);


let footer = document.getElementById("footer");
let div1 = document.createElement("div");
div1.innerHTML = '<a href="https://github.com/Mettal94" target="_blank">Schembri Alan';
let div2 = document.createElement("div");
div2.innerHTML = '<a href="https://github.com/Marii0130" target="_blank">Villanueva María Belén';
let div3 = document.createElement("div");
div3.innerHTML = '<a href="https://github.com/ApioMan3" target="_blank">Winiarczyk Robinson';
let div4 = document.createElement("div");
div4.innerHTML = '<a href="https://github.com/JNZader" target="_blank">Zader Javier';
footer.appendChild(div1);
footer.appendChild(div2);
footer.appendChild(div3);
footer.appendChild(div4);
