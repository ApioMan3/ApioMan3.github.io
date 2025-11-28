// Funciones para manejar carrito en localStorage

export function obtenerCarrito() {
  const carritoJSON = localStorage.getItem("carrito") || "[]";
  return JSON.parse(carritoJSON);
}

export function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function agregarAlCarrito(itemNuevo) {
  let carrito = obtenerCarrito();

  const index = carrito.findIndex((item) =>
    item.Titulo === itemNuevo.Titulo &&
    item.Descripcion === itemNuevo.Descripcion &&
    item.Principal === itemNuevo.Principal &&
    item.Categoria === itemNuevo.Categoria &&
    item.Subcategoria === itemNuevo.Subcategoria &&
    item.Marca === itemNuevo.Marca &&
    item.Variedad === itemNuevo.Variedad
  );

  if (index > -1) {
    carrito[index].Cantidad += itemNuevo.Cantidad;
  } else {
    carrito.push(itemNuevo);
  }

  guardarCarrito(carrito);
  mostrarNotificacion("Producto agregado al carrito");
}

function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion-carrito");
  noti.textContent = mensaje;
  noti.classList.add("mostrar");

  setTimeout(() => {
    noti.classList.remove("mostrar");
  }, 3000);
}
