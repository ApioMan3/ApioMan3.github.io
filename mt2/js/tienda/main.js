// js/tienda/main.js
import { cargarCSV } from './data.js';
import { construirFiltros } from './filtros.js';
import { aplicarFiltrosYMostrar, configurarEventos } from './productos.js';
import { configurarToggleFiltros } from './utils.js';

export async function initTienda() {
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
