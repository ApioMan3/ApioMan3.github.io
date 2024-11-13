function pantalla(value) {
    document.getElementById('pantalla').value += value;
  }
  
  function limpiar() {
    document.getElementById('pantalla').value = '';
  }
  
  function calcular() {
    var pantallaValue = document.getElementById('pantalla').value;
    try {
      var result = eval(pantallaValue);
      document.getElementById('pantalla').value = result;
    } catch (error) {
      document.getElementById('pantalla').value = 'Error';
    }
  }