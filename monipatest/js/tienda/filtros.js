import { productos, filtros, setPaginaActual } from './state.js';
import { aplicarFiltrosYMostrar } from './productos.js';

export function construirFiltros() {
  const panelFiltros = document.getElementById("panel-filtros");
  panelFiltros.innerHTML = "";

  const principalMap = new Map();
  const marcasSet = new Set();
  const variedadesSet = new Set();

  productos.forEach(p => {
    p.Marca = normalizarTexto(p.Marca || "Otras");
    p.Variedad = normalizarTexto(p.Variedad || "Otras");

    marcasSet.add(p.Marca);
    variedadesSet.add(p.Variedad);

    if (!principalMap.has(p.Principal)) {
      principalMap.set(p.Principal, new Map());
    }
    const catMap = principalMap.get(p.Principal);

    if (!catMap.has(p.Categoria)) {
      catMap.set(p.Categoria, new Set());
    }
    if (p.Subcategoria) {
      catMap.get(p.Categoria).add(p.Subcategoria);
    }
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
    setPaginaActual(1);
    aplicarFiltrosYMostrar();
    construirFiltros();
  });
  contenedorFiltros.appendChild(btnVerTodos);

  principalMap.forEach((catMap, principal) => {
    const divPrincipal = document.createElement("div");
    divPrincipal.classList.add("filtro-principal");

    const btnPrincipal = document.createElement("button");
    btnPrincipal.classList.add("btn-toggle");
    btnPrincipal.innerHTML = `<span class="texto-span">${principal}</span><span class="icono-flecha">▼</span>`;
    divPrincipal.appendChild(btnPrincipal);

    const contenidoPrincipal = document.createElement("div");
    contenidoPrincipal.classList.add("contenido-nivel");
    contenidoPrincipal.style.display = (filtros.principal === principal) ? "block" : "none";

    catMap.forEach((subSet, categoria) => {
      const divCategoria = document.createElement("div");
      divCategoria.classList.add("filtro-categoria");

      const btnCategoria = document.createElement("button");
      btnCategoria.classList.add("btn-toggle");
      btnCategoria.innerHTML = `<span>${categoria}</span><span class="icono-flecha">▼</span>`;
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
          setPaginaActual(1);
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

      btnCategoria.addEventListener("click", () => {
        contenidoCategoria.style.display = (contenidoCategoria.style.display === "block") ? "none" : "block";
      });

      divCategoria.appendChild(contenidoCategoria);
      contenidoPrincipal.appendChild(divCategoria);
    });

    btnPrincipal.addEventListener("click", () => {
      contenidoPrincipal.style.display = (contenidoPrincipal.style.display === "block") ? "none" : "block";
    });

    divPrincipal.appendChild(contenidoPrincipal);
    contenedorFiltros.appendChild(divPrincipal);
  });

  contenedorFiltros.appendChild(crearCheckboxGrupo("MARCA", marcasSet, filtros.marcas));
  contenedorFiltros.appendChild(crearCheckboxGrupo("VARIEDAD", variedadesSet, filtros.variedades));

  panelFiltros.appendChild(contenedorFiltros);
}

function crearCheckboxGrupo(titulo, setValores, filtroSet) {
  const contenedor = document.createElement("div");
  contenedor.classList.add(`filtro-${titulo.toLowerCase()}`);

  const h4 = document.createElement("h4");
  h4.textContent = titulo;
  contenedor.appendChild(h4);

  Array.from(setValores).sort().forEach(valor => {
    const label = document.createElement("label");
    label.classList.add("checkbox-label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = valor;
    input.checked = filtroSet.has(valor);

    input.addEventListener("change", () => {
      if (input.checked) {
        filtroSet.add(valor);
      } else {
        filtroSet.delete(valor);
      }
      setPaginaActual(1);
      aplicarFiltrosYMostrar();
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(valor));
    contenedor.appendChild(label);
  });

  return contenedor;
}

function normalizarTexto(texto) {
  return texto.trim() === "--" || texto.trim() === "" ? "Otras" : texto.trim();
}
