// CSV de productos
export const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmj7fVop9bB2pbgijqtXe-11FrMPjm9vF_DSML427s0o_Ju1jagIKpZJstXodyvOeDn6Gh55LfAkPe/pub?output=csv";

// Lista completa de productos (después de parsear el CSV)
export let productos = [];

// Objeto de filtros activos
export const filtros = {
  principal: null,
  categoria: null,
  subcategoria: null,
  marcas: new Set(),
  variedades: new Set(),
};

// Paginado
let paginaActual = 1;
export const PRODUCTOS_POR_PAGINA = 12;

export function getPaginaActual() {
  return paginaActual;
}

export function setPaginaActual(valor) {
  paginaActual = valor;
}

// Función para establecer los productos cargados
export function setProductos(data) {
  productos = data;
}
