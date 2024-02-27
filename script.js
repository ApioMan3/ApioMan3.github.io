var container = document.getElementById("imagen");
for (var i = 1; i <= 144; i += 16) {
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("fila");
    for (var j = 0; j < 16; j++) {
        var imgNumber = i + j;
        var img = document.createElement("img");
        img.id = "img"+imgNumber.toString().padStart(2, "0");
        img.src = "img/imágenes/img_" + imgNumber.toString().padStart(2, "0") + ".gif";
        if (imgNumber === 73) {
            img.addEventListener("mouseenter", function () {
                this.src = "img/imágenes/wally.gif";
                detenerCronometro()
            });
            img.addEventListener("mouseleave", function () {
                this.src = "img/imágenes/img_73.gif";
            });
            img.addEventListener("click", function () {
                alert("¡FELICITACIONES!");
            });
        }
        rowDiv.appendChild(img);
    }
    container.appendChild(rowDiv);
}


var cronometro = setInterval(function (){
    var timer = document.getElementById("tiempo").textContent;
    if(timer-1>0){
        document.getElementById("tiempo").textContent = timer-1;}
        else{
            document.getElementById("tiempo").textContent = "!!!";
            document.getElementById("img73").src =  "img/imágenes/wally.gif";
            var img73 = document.getElementById("img73");
            var wally = img73.cloneNode(true);
            img73.parentNode.replaceChild(wally, img73);
        }
}, 1000);

function detenerCronometro(){
    clearInterval(cronometro);
}
        