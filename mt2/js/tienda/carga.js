import { URL_CSV, setProductos } from './state.js';

export async function cargarCSV() {
  return new Promise((resolve, reject) => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: function (results) {
        const datosFiltrados = results.data.filter(p => p.Titulo);
        setProductos(datosFiltrados);
        resolve(datosFiltrados);
      },
      error: function (err) {
        reject(err);
      }
    });
  });
}
