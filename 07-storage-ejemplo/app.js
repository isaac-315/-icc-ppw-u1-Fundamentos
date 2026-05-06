'use strict';

// clave para el localStorage
const STORAGE_KEY = 'tareas';

// elementos del DOM (coinciden con el HTML)
const input = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector("#btn-agregar");
const lista = document.querySelector("#lista-tareas");
const btnLimpiar = document.querySelector("#btn-limpiar");

// memoria del listado
let tareas = [];

// =========================
// STORAGE
// =========================
function loadStorage() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

function saveTarea() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

// =========================
// LÓGICA
// =========================
function agregarTarea(descripcion) {
    if (!descripcion.trim()) return;

    const nuevaTarea = {
        id: Date.now(),
        descripcion: descripcion.trim(),
        completada: false
    };

    tareas.push(nuevaTarea);
    saveTarea();
    renderizar();

    input.value = '';
    input.focus();
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    saveTarea();
    renderizar();
}

function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
    }
    saveTarea();
    renderizar();
}

function clearAll() {
    if (tareas.length === 0) return;

    if (confirm('¿Estás seguro de eliminar todas las tareas?')) {
        tareas = [];
        saveTarea();
        renderizar();
    }
}

// =========================
// RENDER
// =========================
function renderizar() {

    lista.innerHTML = '';

    if (tareas.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'vacio';
        vacio.textContent = 'No hay tareas. ¡Agrega una!';
        lista.appendChild(vacio);
        btnLimpiar.disabled = true;
        return;
    }

    btnLimpiar.disabled = false;

    tareas.forEach(tarea => {
        const item = document.createElement('div');
        item.className = 'item-tarea';

        if (tarea.completada) {
            item.classList.add('completada');
        }

        const texto = document.createElement('span');
        texto.className = 'texto-tarea';
        texto.textContent = tarea.descripcion;

        texto.addEventListener('click', () => {
            toggleTarea(tarea.id);
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.textContent = 'Eliminar';

        btnEliminar.addEventListener('click', () => {
            eliminarTarea(tarea.id);
        });

        item.appendChild(texto);
        item.appendChild(btnEliminar);
        lista.appendChild(item);
    });
}

// =========================
// EVENTOS
// =========================
btnAgregar.addEventListener('click', () => {
    agregarTarea(input.value);
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea(input.value);
    }
});

btnLimpiar.addEventListener('click', clearAll);

// =========================
// INICIALIZACIÓN
// =========================
tareas = loadStorage();
renderizar();
input.focus();