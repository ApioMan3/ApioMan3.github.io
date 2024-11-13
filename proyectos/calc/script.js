function pantalla(value) {
    document.getElementById('pantalla').value += value;
}

function limpiar() {
    document.getElementById('pantalla').value = '';
}

function calcular() {
    let pantallaValue = document.getElementById('pantalla').value;
    try {
        let result = eval(pantallaValue);
        document.getElementById('pantalla').value = result;
    } catch (error) {
        document.getElementById('pantalla').value = 'Error';
    }
}

function eliminar() {
    let newValue = document.getElementById('pantalla').value;
    newValue = newValue.slice(0, newValue.length - 1);
    document.getElementById('pantalla').value = newValue;
}

function raiz(){
    let pantallaValue = document.getElementById('pantalla').value;
    try {
        let result = eval(pantallaValue);
        document.getElementById('pantalla').value = Math.sqrt(result);
    } catch (error) {
        document.getElementById('pantalla').value = 'Error';
    } 
}

function potencia(){
    let pantallaValue = document.getElementById('pantalla').value;
    try {
        let result = eval(pantallaValue);
        document.getElementById('pantalla').value = Math.pow(result,2);
    } catch (error) {
        document.getElementById('pantalla').value = 'Error';
    } 
    
}

function handleKeydown(event) {
    event.preventDefault();
    switch (event.key) {
        case '0':
            pantalla('0');
            break;
        case '1':
            pantalla('1');
            break;
        case '2':
            pantalla('2');
            break;
        case '3':
            pantalla('3');
            break;
        case '4':
            pantalla('4');
            break;
        case '5':
            pantalla('5');
            break;
        case '6':
            pantalla('6');
            break;
        case '7':
            pantalla('7');
            break;
        case '8':
            pantalla('8');
            break;
        case '9':
            pantalla('9');
            break;
        case '.':
        case ',':
            pantalla('.');
            break;
        case '+':
            pantalla('+');
            break;
        case '-':
            pantalla('-');
            break;
        case '*':
        case 'x':
            pantalla('*');
            break;
        case '/':
            pantalla('/');
            break;
        case 'Enter':
        case '=':
            calcular();
            break;
        case 'c':
        case 'C':
        case 'Escape':
        case 'Delete':
            limpiar();
            break;
        case 'Backspace':
            eliminar();
            break;
        default:
            break;
    }
}
