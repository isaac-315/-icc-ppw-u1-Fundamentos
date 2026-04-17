'use strict'
const nombre = 'Isaac';
const apellido = 'Mora';
let ciclo = 5;
const activo = true;

const direccion = {
    ciudad: 'Cuenca',
    provincia: 'Azuay',
}

console.table({ nombre, apellido, ciclo, activo, direccion })

const calcularPromedio = (notas) => {
    const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
}

const esMayorDeEdad = (edad) => edad >= 18;

const getSaludo = (nombre, hora) => {
    if (hora < 12) {
        return `Buenos días, ${nombre}`;
    } else if (hora < 18) {
        return `Buenas tardes, ${nombre}`;
    } else {
        return `Buenas noches, ${nombre}`;
    }
}

const getSaludo2 = (nombre, hora) => {
    return hora < 12
        ? `Buenos días, ${nombre}`
        : hora < 18
            ? `Buenas tardes, ${nombre}`
            : `Buenas noches, ${nombre}`;
}

//Mostrar en HTML
document.getElementById('nombre').textContent = `${nombre}`;
document.getElementById('apellido').textContent = `${apellido}`;
document.getElementById('ciclo').textContent = `${ciclo}`;