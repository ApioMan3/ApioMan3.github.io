// js/tienda/data.js
import { productos } from './state.js';

const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmj7fVop9bB2pbgijqtXe-11FrMPjm9vF_DSML427s0o_Ju1jagIKpZJstXodyvOeDn6Gh55LfAkPe/pub?output=csv";

export function cargarCSV() {
  return new Promise((resolve, reject) => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: function (results) {
        productos.length = 0;
        productos.push(...results.data.filter(p => p.Titulo)); // Solo productos válidos
        resolve(productos);
      },
      error: reject,
    });
  });
}
