export const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmj7fVop9bB2pbgijqtXe-11FrMPjm9vF_DSML427s0o_Ju1jagIKpZJstXodyvOeDn6Gh55LfAkPe/pub?output=csv";

export let productos = [];

export function cargarCSV() {
  return new Promise((resolve, reject) => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: function (results) {
        productos = results.data.filter(p => p.Titulo);
        resolve(productos);
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}
