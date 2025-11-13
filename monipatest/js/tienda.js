// Configuración CSV (URL pública)
const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmj7fVop9bB2pbgijqtXe-11FrMPjm9vF_DSML427s0o_Ju1jagIKpZJstXodyvOeDn6Gh55LfAkPe/pub?output=csv";

// Variables globales
let productos = []; // Array de objetos con los productos
let filtros = {
  principal: null,
  categoria: null,
  subcategoria: null,
  marcas: new Set(),
  variedades: new Set(),
};
let paginaActual = 1;
const PRODUCTOS_POR_PAGINA = 12;

// Función para cargar y parsear CSV
function cargarCSV() {
  return new Promise((resolve, reject) => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: function (results) {
        productos = results.data.filter(p => p.Titulo); // filtrar filas vacías
        resolve(productos);
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}

// Función principal para inicializar la tienda
async function initTienda() {
  try {
    await cargarCSV();
    construirFiltros();
    aplicarFiltrosYMostrar();
    configurarEventos();
    configurarToggleFiltros();
  } catch (error) {
    console.error("Error cargando productos:", error);
    document.getElementById("tarjetas-productos").innerHTML = "<p>Error cargando productos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", initTienda);

// Construye el árbol de filtros jerárquicos y checkboxes para marca y variedad
function construirFiltros() {
  const panelFiltros = document.getElementById("panel-filtros");
  panelFiltros.innerHTML = "";

  const principalMap = new Map();
  const marcasPorSubcat = new Set();
  const variedadesPorSubcat = new Set();

  productos.forEach(p => {
    if (p.Marca === "--" || p.Marca === "") p.Marca = "Otras";
    else p.Marca = p.Marca.trim();

    if (p.Variedad === "--" || p.Variedad === "") p.Variedad = "Otras";
    else p.Variedad = p.Variedad.trim();

    if (
      filtros.subcategoria &&
      p.Principal === filtros.principal &&
      p.Categoria === filtros.categoria &&
      p.Subcategoria === filtros.subcategoria
    ) {
      marcasPorSubcat.add(p.Marca);
      variedadesPorSubcat.add(p.Variedad);
    }

    if (!principalMap.has(p.Principal)) {
      principalMap.set(p.Principal, new Map());
    }
    const catMap = principalMap.get(p.Principal);

    if (!catMap.has(p.Categoria)) {
      catMap.set(p.Categoria, new Set());
    }
    const subSet = catMap.get(p.Categoria);

    if (p.Subcategoria) subSet.add(p.Subcategoria);
  });

  const contenedorFiltros = document.createElement("div");
  contenedorFiltros.classList.add("filtros-jerarquicos");

  const btnVerTodos = document.createElement("button");
  btnVerTodos.textContent = "VER TODOS LOS PRODUCTOS";
  btnVerTodos.classList.add("btn-ver-todos");
  btnVerTodos.addEventListener("click", () => {
    filtros.principal = null;
    filtros.categoria = null;
    filtros.subcategoria = null;
    filtros.marcas.clear();
    filtros.variedades.clear();
    paginaActual = 1;
    aplicarFiltrosYMostrar();
    construirFiltros();
  });
  contenedorFiltros.appendChild(btnVerTodos);

  principalMap.forEach((catMap, principal) => {
    const divPrincipal = document.createElement("div");
    divPrincipal.classList.add("filtro-principal");

    const btnPrincipal = document.createElement("button");
    btnPrincipal.classList.add("btn-toggle");

    const spanName = document.createElement("span");
    spanName.classList.add("texto-span");
    spanName.textContent = principal;
    btnPrincipal.appendChild(spanName);

    const span1 = document.createElement("span");
    span1.classList.add("icono-flecha");
    span1.textContent = "▼";
    btnPrincipal.appendChild(span1);

    divPrincipal.appendChild(btnPrincipal);

    const contenidoPrincipal = document.createElement("div");
    contenidoPrincipal.classList.add("contenido-nivel");
    contenidoPrincipal.style.display = (filtros.principal === principal) ? "block" : "none";

    catMap.forEach((subSet, categoria) => {
      const divCategoria = document.createElement("div");
      divCategoria.classList.add("filtro-categoria");

      const btnCategoria = document.createElement("button");
      btnCategoria.classList.add("btn-toggle");
      const spanCat = document.createElement("span");
      spanCat.textContent = categoria;
      btnCategoria.appendChild(spanCat);
      const span2 = document.createElement("span");
      span2.classList.add("icono-flecha");
      span2.textContent = "▼";
      btnCategoria.appendChild(span2);
      divCategoria.appendChild(btnCategoria);

      const contenidoCategoria = document.createElement("div");
      contenidoCategoria.classList.add("contenido-nivel");
      contenidoCategoria.style.display = (filtros.categoria === categoria) ? "block" : "none";

      subSet.forEach(subcat => {
        const subcatEl = document.createElement("div");
        subcatEl.classList.add("filtro-subcategoria");
        subcatEl.textContent = subcat;

        subcatEl.addEventListener("click", () => {
          filtros.principal = principal;
          filtros.categoria = categoria;
          filtros.subcategoria = subcat;
          paginaActual = 1;
          aplicarFiltrosYMostrar();
          construirFiltros();
        });

        if (
          filtros.principal === principal &&
          filtros.categoria === categoria &&
          filtros.subcategoria === subcat
        ) {
          subcatEl.classList.add("seleccionado");
        }

        contenidoCategoria.appendChild(subcatEl);
      });

      divCategoria.appendChild(contenidoCategoria);

      btnCategoria.addEventListener("click", () => {
        contenidoCategoria.style.display =
          contenidoCategoria.style.display === "block" ? "none" : "block";
      });

      contenidoPrincipal.appendChild(divCategoria);
    });

    divPrincipal.appendChild(contenidoPrincipal);

    btnPrincipal.addEventListener("click", () => {
      contenidoPrincipal.style.display =
        contenidoPrincipal.style.display === "block" ? "none" : "block";
    });

    contenedorFiltros.appendChild(divPrincipal);
  });

  if (filtros.subcategoria) {
    const marcasDiv = document.createElement("div");
    marcasDiv.classList.add("filtro-marcas");

    const tituloMarcas = document.createElement("h4");
    tituloMarcas.textContent = "MARCA";
    marcasDiv.appendChild(tituloMarcas);

    marcasPorSubcat.forEach(marca => {
      const label = document.createElement("label");
      label.classList.add("checkbox-label");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = marca;
      input.checked = filtros.marcas.has(marca);

      input.addEventListener("change", () => {
        if (input.checked) {
          filtros.marcas.add(marca);
        } else {
          filtros.marcas.delete(marca);
        }
        paginaActual = 1;
        aplicarFiltrosYMostrar();
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(marca));
      marcasDiv.appendChild(label);
    });

    contenedorFiltros.appendChild(marcasDiv);

    const variedadesDiv = document.createElement("div");
    variedadesDiv.classList.add("filtro-variedades");

    const tituloVariedades = document.createElement("h4");
    tituloVariedades.textContent = "VARIEDAD";
    variedadesDiv.appendChild(tituloVariedades);

    variedadesPorSubcat.forEach(variedad => {
      const label = document.createElement("label");
      label.classList.add("checkbox-label");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = variedad;
      input.checked = filtros.variedades.has(variedad);

      input.addEventListener("change", () => {
        if (input.checked) {
          filtros.variedades.add(variedad);
        } else {
          filtros.variedades.delete(variedad);
        }
        paginaActual = 1;
        aplicarFiltrosYMostrar();
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(variedad));
      variedadesDiv.appendChild(label);
    });

    contenedorFiltros.appendChild(variedadesDiv);
  }

  panelFiltros.appendChild(contenedorFiltros);
}


// Aplica los filtros seleccionados y muestra los productos
function aplicarFiltrosYMostrar() {
  let filtrados = productos;

  if (filtros.principal) {
    filtrados = filtrados.filter(p => p.Principal === filtros.principal);
  }
  if (filtros.categoria) {
    filtrados = filtrados.filter(p => p.Categoria === filtros.categoria);
  }
  if (filtros.subcategoria) {
    filtrados = filtrados.filter(p => p.Subcategoria === filtros.subcategoria);
  }

  if (filtros.marcas.size > 0) {
    filtrados = filtrados.filter(p => filtros.marcas.has(p.Marca));
  }

  if (filtros.variedades.size > 0) {
    filtrados = filtrados.filter(p => filtros.variedades.has(p.Variedad));
  }

  const criterio = document.getElementById("ordenar")?.value || "az";
  filtrados = ordenarProductos(filtrados, criterio);

  mostrarProductosPaginados(filtrados);
}

// Ordena la lista de productos por criterio
function ordenarProductos(lista, criterio) {
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

// Agrupa productos por título, descripción, marca, etc.
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

// Muestra productos con paginación
function mostrarProductosPaginados(lista) {
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

// Construye el paginado
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

// Crear tarjeta producto con variantes y cantidad
function crearTarjetaProductoConVariantes(productoAgrupado) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta-producto");

  // Variante seleccionada (primera por defecto)
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

  // Crear botones para variantes
  productoAgrupado.variantes.forEach((variante, idx) => {
    const btnVar = document.createElement("button");
    btnVar.textContent = variante.Variedad;
    btnVar.classList.add("btn-variante");
    if (idx === 0) btnVar.classList.add("activo");

    btnVar.addEventListener("click", () => {
      varianteSeleccionada = variante;
      imgProducto.src = variante.Imagen;
      actualizarPrecio();
      contenedorVariantes.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
      btnVar.classList.add("activo");
    });

    contenedorVariantes.appendChild(btnVar);
  });

  // Actualizar precio basado en cantidad y variante
  function actualizarPrecio() {
    const total = varianteSeleccionada.Precio * cantidad;
    precioProducto.textContent = `Precio: $${total.toFixed(2)}`;
  }

  // Botones cantidad
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

  // Agregar producto al carrito
  btnAgregar.addEventListener("click", () => {
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

    cantidad = 1;
    inputCantidad.value = cantidad;
    actualizarPrecio();
  });

  return tarjeta;
}

// Obtener carrito desde localStorage
function obtenerCarrito() {
  const carritoJSON = localStorage.getItem("carrito") || "[]";
  return JSON.parse(carritoJSON);
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito (actualiza cantidad si ya existe)
function agregarAlCarrito(itemNuevo) {
  let carrito = obtenerCarrito();

  const index = carrito.findIndex(item =>
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

// Mostrar notificación temporal
function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion-carrito");
  noti.textContent = mensaje;
  noti.classList.add("mostrar");

  setTimeout(() => {
    noti.classList.remove("mostrar");
  }, 3000);
}
// Configura evento para el select de ordenamiento
function configurarEventos() {
  const selectOrden = document.getElementById("ordenar");
  if (selectOrden) {
    selectOrden.addEventListener("change", () => {
      paginaActual = 1;
      aplicarFiltrosYMostrar();
    });
  }
}

// Toggle para mostrar/ocultar filtros en móviles
function configurarToggleFiltros() {
  const btnFiltros = document.getElementById("btn-toggle-filtros");
  const panelFiltros = document.getElementById("panel-filtros");

  if (btnFiltros && panelFiltros) {
    btnFiltros.addEventListener("click", () => {
      panelFiltros.classList.toggle("show");
    });
  }
}

// Carga y parsea CSV usando PapaParse
function cargarCSV() {
  return new Promise((resolve, reject) => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: function (results) {
        productos = results.data.filter(p => p.Titulo); // filtro filas vacías
        resolve(productos);
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}

// Función principal para inicializar la tienda
async function initTienda() {
  try {
    await cargarCSV();
    construirFiltros();
    aplicarFiltrosYMostrar();
    configurarEventos();
    configurarToggleFiltros();
  } catch (error) {
    console.error("Error cargando productos:", error);
    document.getElementById("tarjetas-productos").innerHTML = "<p>Error cargando productos.</p>";
  }
}

// Ejecutar init al cargar el DOM
document.addEventListener("DOMContentLoaded", initTienda);

