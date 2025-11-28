import { filtros, construirFiltros } from './filtros.js';
import { productos } from './data.js';

export let paginaActual = 1;
export const PRODUCTOS_POR_PAGINA = 12;

// Filtra productos según filtros y muestra la paginación y tarjetas
export function aplicarFiltrosYMostrar() {
  let filtrados = productos;

  // Filtros jerárquicos
  if (filtros.principal) filtrados = filtrados.filter(p => p.Principal === filtros.principal);
  if (filtros.categoria) filtrados = filtrados.filter(p => p.Categoria === filtros.categoria);
  if (filtros.subcategoria) filtrados = filtrados.filter(p => p.Subcategoria === filtros.subcategoria);

  // Actualizar filtros dinámicos de marcas y variedades con productos jerárquicamente filtrados
  construirFiltros(filtrados);

  // Filtros marcas y variedades
  if (filtros.marcas.size > 0) filtrados = filtrados.filter(p => filtros.marcas.has(p.Marca));
  if (filtros.variedades.size > 0) filtrados = filtrados.filter(p => filtros.variedades.has(p.Variedad));

  // Ordenar productos
  const ordenSeleccionado = document.getElementById("ordenar")?.value || "az";
  filtrados = ordenarProductos(filtrados, ordenSeleccionado);

  mostrarProductosPaginados(filtrados);
}

// Ordena productos según criterio
export function ordenarProductos(lista, criterio) {
  const copia = [...lista];
  switch (criterio) {
    case "az":
      copia.sort((a, b) => a.Titulo.localeCompare(b.Titulo));
      break;
    case "za":
      copia.sort((a, b) => b.Titulo.localeCompare(a.Titulo));
      break;
    case "precio-asc":
      copia.sort((a, b) => parseFloat(a.Precio) - parseFloat(b.Precio));
      break;
    case "precio-desc":
      copia.sort((a, b) => parseFloat(b.Precio) - parseFloat(a.Precio));
      break;
  }
  return copia;
}

// Mostrar productos con paginación
export function mostrarProductosPaginados(lista) {
  const panel = document.getElementById("tarjetas-productos");
  panel.innerHTML = "";

  const agrupados = agruparPorCampos(lista);

  const totalPaginas = Math.ceil(agrupados.length / PRODUCTOS_POR_PAGINA);
  if (paginaActual > totalPaginas) paginaActual = 1;

  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const fin = inicio + PRODUCTOS_POR_PAGINA;
  const pagProductos = agrupados.slice(inicio, fin);

  pagProductos.forEach(producto => {
    panel.appendChild(crearTarjetaProductoConVariantes(producto));
  });

  construirPaginado(totalPaginas);
}

// Agrupa productos por campos clave
function agruparPorCampos(lista) {
  const agrupados = new Map();

  lista.forEach(producto => {
    const clave = [
      producto.Titulo,
      producto.Descripcion,
      producto.Principal,
      producto.Categoria,
      producto.Subcategoria,
      producto.Marca
    ].join("|").toLowerCase();

    if (!agrupados.has(clave)) {
      agrupados.set(clave, {
        Titulo: producto.Titulo,
        Descripcion: producto.Descripcion,
        Principal: producto.Principal,
        Categoria: producto.Categoria,
        Subcategoria: producto.Subcategoria,
        Marca: producto.Marca,
        variantes: [],
      });
    }
    agrupados.get(clave).variantes.push(producto);
  });

  return Array.from(agrupados.values());
}

// Crear tarjeta producto con variantes
function crearTarjetaProductoConVariantes(productoAgrupado) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta-producto");

  let varianteSeleccionada = productoAgrupado.variantes[0];
  let cantidad = 1;

  tarjeta.innerHTML = `
    <img src="${varianteSeleccionada.Imagen}" alt="${productoAgrupado.Titulo}" class="img-producto" />
    <h3 class="titulo-producto">${productoAgrupado.Titulo}</h3>
    <p class="desc-producto">${productoAgrupado.Descripcion}</p>
    <div class="variantes-container"></div>
    <div class="cantidad-container">
      <button class="btn-cant-restar">-</button>
      <input type="number" class="input-cantidad" min="1" value="1" />
      <button class="btn-cant-sumar">+</button>
    </div>
    <p class="precio-producto"><strong>Precio: $${varianteSeleccionada.Precio}</strong></p>
    <button class="btn-agregar-carrito">Agregar al carrito</button>
  `;

  const contenedorVariantes = tarjeta.querySelector(".variantes-container");
  const precioProducto = tarjeta.querySelector(".precio-producto strong");
  const imgProducto = tarjeta.querySelector(".img-producto");
  const inputCantidad = tarjeta.querySelector(".input-cantidad");
  const btnRestar = tarjeta.querySelector(".btn-cant-restar");
  const btnSumar = tarjeta.querySelector(".btn-cant-sumar");
  const btnAgregar = tarjeta.querySelector(".btn-agregar-carrito");

  // Botones variantes
  productoAgrupado.variantes.forEach((variante, idx) => {
    const btnVar = document.createElement("button");
    btnVar.textContent = variante.Variedad;
    btnVar.classList.add("btn-variante");
    if (idx === 0) btnVar.classList.add("activo");

    btnVar.addEventListener("click", () => {
      varianteSeleccionada = variante;
      imgProducto.src = variante.Imagen;
      precioProducto.textContent = `Precio: $${(varianteSeleccionada.Precio * cantidad).toFixed(2)}`;

      contenedorVariantes.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
      btnVar.classList.add("activo");
    });

    contenedorVariantes.appendChild(btnVar);
  });

  function actualizarPrecio() {
    const total = varianteSeleccionada.Precio * cantidad;
    precioProducto.textContent = `Precio: $${total.toFixed(2)}`;
  }

  btnRestar.addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      inputCantidad.value = cantidad;
      actualizarPrecio();
    }
  });

  btnSumar.addEventListener("click", () => {
    cantidad++;
    inputCantidad.value = cantidad;
    actualizarPrecio();
  });

  inputCantidad.addEventListener("change", () => {
    let val = parseInt(inputCantidad.value);
    if (isNaN(val) || val < 1) val = 1;
    cantidad = val;
    inputCantidad.value = cantidad;
    actualizarPrecio();
  });

  // Agregar al carrito
  btnAgregar.addEventListener("click", () => {
    import('./carrito.js').then(({ agregarAlCarrito }) => {
      agregarAlCarrito({
        Titulo: productoAgrupado.Titulo,
        Descripcion: productoAgrupado.Descripcion,
        Principal: productoAgrupado.Principal,
        Categoria: productoAgrupado.Categoria,
        Subcategoria: productoAgrupado.Subcategoria,
        Marca: productoAgrupado.Marca,
        Variedad: varianteSeleccionada.Variedad,
        Precio: parseFloat(varianteSeleccionada.Precio),
        Cantidad: cantidad,
        Imagen: varianteSeleccionada.Imagen,
      });
    });

    cantidad = 1;
    inputCantidad.value = cantidad;
    actualizarPrecio();
  });

  return tarjeta;
}

// Construcción paginado
function construirPaginado(totalPaginas) {
  const pagDiv = document.getElementById("paginado");
  pagDiv.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === paginaActual) btn.classList.add("activo");
    btn.addEventListener("click", () => {
      paginaActual = i;
      aplicarFiltrosYMostrar();
    });
    pagDiv.appendChild(btn);
  }
}
