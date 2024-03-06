var goku=document.getElementById("goku")

goku.addEventListener("mouseover",transformar)
goku.addEventListener("mouseout",resetear)

function transformar(evento){
goku.src = "img/gifgoku/GokuSSJ.png";
}

function resetear(){
    goku.src = "img/gifgoku/Goku.gif";
}