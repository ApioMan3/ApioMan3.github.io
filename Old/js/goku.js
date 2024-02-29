var goku=document.getElementById("goku")

goku.addEventListener("mouseover",transformar)
goku.addEventListener("mouseout",resetear)

function transformar(evento){
goku.src = "gif goku/GokuSSJ.png";
}

function resetear(){
    goku.src = "gif goku/Goku.gif";
}