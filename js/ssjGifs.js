var goku=document.getElementById("goku");

goku.addEventListener("mouseover",transformar);
goku.addEventListener("mouseout",resetear);

function transformar(evento){
goku.src = "img/gifgoku/GokuSSJ.png";
}

function resetear(){
    goku.src = "img/gifgoku/Goku.gif";
}

var vegeta = document.getElementById("vegeta");

vegeta.addEventListener("mouseover", transform);
vegeta.addEventListener("mouseout", reset);

function transform(){
    vegeta.src = "img/gifvegeta/VegetaSSJ.png"
}

function reset(){
    vegeta.src = "img/gifvegeta/Vegeta.gif"
}