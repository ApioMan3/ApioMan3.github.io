import { cargarCSV } from './data.js';
import { construirFiltros } from './filtros.js';
import { aplicarFiltrosYMostrar } from './productos.js';

export async function iniciarTienda() {
  await cargarCSV();
  construirFiltros();
  aplicarFiltrosYMostrar();
  configurarEventos();
  configurarToggleFiltros();
}

function configurarEventos() {
  // Ordenar select
  const selectOrden = document.getElementById("ordenar");
  if (selectOrden) {
    selectOrden.addEventListener("change", () => {
      aplicarFiltrosYMostrar();
    });
  }
}

function configurarToggleFiltros() {
  const toggles = document.querySelectorAll(".btn-toggle");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const contenido = btn.nextElementSibling;
      if (contenido) {
        contenido.style.display = contenido.style.display === "block" ? "none" : "block";
      }
    });
  });
}
