    setTimeout(function() {
        window.location.href = "index.html"
    }, 5000);

var nombre = localStorage.getItem("contacto");
var mensaje = document.getElementById("mensaje");
mensaje.innerHTML = "Gracias por comunicarte con nosotros "+nombre+".";

var conteo = document.getElementById("conteo");

setInterval(function(){
    var contador = parseInt(conteo.innerText);
    contador--;
    conteo.innerText = contador;
}, 1000);