import { productos } from './data.js';
import { aplicarFiltrosYMostrar, paginaActual } from './productos.js';

// Estado global filtros
export let filtros = {
  principal: null,
  categoria: null,
  subcategoria: null,
  marcas: new Set(),
  variedades: new Set(),
};

// Construye filtros jerárquicos y checkboxes de marcas y variedades
// Recibe array productos filtrados según jerarquía para construir marcas/variedades correspondientes
export function construirFiltros(productosFiltrados = productos) {
  const panelFiltros = document.getElementById("panel-filtros");
  panelFiltros.innerHTML = ""; // limpiar

  // Construir mapa jerárquico (principal -> categoria -> subcategoria)
  const principalMap = new Map();

  productosFiltrados.forEach(p => {
    // Normalizar marca y variedad
    if (p.Marca === "--" || p.Marca === "") p.Marca = "Otras";
    else p.Marca = p.Marca.trim();

    if (p.Variedad === "--" || p.Variedad === "") p.Variedad = "Otras";
    else p.Variedad = p.Variedad.trim();

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

  // Crear contenedor filtros jerárquicos
  const contenedorFiltros = document.createElement("div");
  contenedorFiltros.classList.add("filtros-jerarquicos");

  // Botón reset filtros
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
    construirFiltros(productos);
  });
  contenedorFiltros.appendChild(btnVerTodos);

  // Construir jerarquía: principal -> categoria -> subcategoria
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
          construirFiltros(productosFiltrados);
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

    btnPrincipal.addEventListener("click", () => {
      contenidoPrincipal.style.display =
        contenidoPrincipal.style.display === "block" ? "none" : "block";
    });

    contenedorFiltros.appendChild(divPrincipal);
  });

  // Marcas (checkboxes)
  const marcasDiv = document.createElement("div");
  marcasDiv.classList.add("filtro-marcas");
  const tituloMarcas = document.createElement("h4");
  tituloMarcas.textContent = "MARCA";
  marcasDiv.appendChild(tituloMarcas);

  // Extraer marcas únicas de productos filtrados
  const marcasSet = new Set();
  productosFiltrados.forEach(p => marcasSet.add(p.Marca));

  marcasSet.forEach(marca => {
    const label = document.createElement("label");
    label.classList.add("checkbox-label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = marca;
    input.checked = filtros.marcas.has(marca);

    input.addEventListener("change", () => {
      if (input.checked) filtros.marcas.add(marca);
      else filtros.marcas.delete(marca);
      paginaActual = 1;
      aplicarFiltrosYMostrar();
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(marca));
    marcasDiv.appendChild(label);
  });

  contenedorFiltros.appendChild(marcasDiv);

  // Variedades (checkboxes)
  const variedadesDiv = document.createElement("div");
  variedadesDiv.classList.add("filtro-variedades");
  const tituloVariedades = document.createElement("h4");
  tituloVariedades.textContent = "VARIEDAD";
  variedadesDiv.appendChild(tituloVariedades);

  // Extraer variedades únicas de productos filtrados
  const variedadesSet = new Set();
  productosFiltrados.forEach(p => variedadesSet.add(p.Variedad));

  variedadesSet.forEach(variedad => {
    const label = document.createElement("label");
    label.classList.add("checkbox-label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = variedad;
    input.checked = filtros.variedades.has(variedad);

    input.addEventListener("change", () => {
      if (input.checked) filtros.variedades.add(variedad);
      else filtros.variedades.delete(variedad);
      paginaActual = 1;
      aplicarFiltrosYMostrar();
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(variedad));
    variedadesDiv.appendChild(label);
  });

  contenedorFiltros.appendChild(variedadesDiv);

  panelFiltros.appendChild(contenedorFiltros);
}
