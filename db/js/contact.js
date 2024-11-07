function validar(){
    var formulario = document.forms["contacto"];
    var nombre = formulario.nombre.value;
    var apellido = formulario.apellido.value;
    var correo = formulario.correo.value;
    var comment = formulario.comentario.value;
    var mensaje = document.getElementById("mensaje");

    var patronName = /^[^\d\W_]+$/;
    var patronCorreo = /^\w+@\w+(\.\w{2,4})+$/;
    
    try{
        if(!patronName.test(nombre)||!patronName.test(apellido)) throw "Los datos en el nombre/apellido no son correctos";

        if(!patronCorreo.test(correo)) throw "Correo no válido";

        if(!comment) throw "Déjanos un comentario!!"
    }catch(err){
        mensaje.innerHTML = err;
        return false;
    }
    localStorage.setItem("contacto",nombre);
    return true;
}