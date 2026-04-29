'use strict';

/* =========================
   SERVICIO DE STORAGE
========================= */

const TareaStorage = {
    CLAVE: 'tareas_lista',

    /**
     * Obtener todas las tareas desde localStorage
     * @returns {Array} Array de tareas
     */
    getAll() {
        try {
            const datos = localStorage.getItem(this.CLAVE);
            if (!datos) {
                return [];
            }
            return JSON.parse(datos);
        } catch (error) {
            console.error('Error al leer tareas:', error);
            return [];
        }
    },

    /**
     * Guardar todas las tareas en localStorage
     * @param {Array} tareas - Array de tareas
     */
    guardar(tareas) {
        try {
            localStorage.setItem(this.CLAVE, JSON.stringify(tareas));
        } catch (error) {
            console.error('Error al guardar tareas:', error);
        }
    },

    /**
   * TODO 4.2.1: Crear una nueva tarea
   */
    crear(texto) {
        // 4.2.1.1: Obtener todas las tareas con this.getAll()
        const tareas = this.getAll();

        // 4.2.1.2: Crear objeto nueva tarea
        const nuevaTarea = {
            id: Date.now(),
            texto: texto.trim(),
            completada: false
        };

        // 4.2.1.3: Agregar la nueva tarea al array con push()
        tareas.push(nuevaTarea);

        // 4.2.1.4: Guardar el array actualizado con this.guardar(tareas)
        this.guardar(tareas);

        // 4.2.1.5: Retornar el objeto nueva
        return nuevaTarea;
    },

    /**
     * TODO 4.2.2: Alternar estado completada/pendiente
     */
    toggleCompletada(id) {
        // 4.2.2.1: Obtener todas las tareas
        const tareas = this.getAll();

        // 4.2.2.2: Buscar la tarea con find()
        const tarea = tareas.find(t => t.id === id);

        // 4.2.2.3: Si existe, invertir su propiedad completada
        if (tarea) {
            tarea.completada = !tarea.completada;

            // 4.2.2.4: Guardar el array actualizado
            this.guardar(tareas);
        }
    },

    /**
     * TODO 4.2.3: Eliminar una tarea
     */
    eliminar(id) {
        // 4.2.3.1: Obtener todas las tareas
        const tareas = this.getAll();

        // 4.2.3.2: Filtrar el array para excluir la tarea con ese id
        const filtradas = tareas.filter(t => t.id !== id);

        // 4.2.3.3: Guardar el array filtrado
        this.guardar(filtradas);
    },

    /**
     * TODO 4.2.4: Eliminar todas las tareas
     */
    limpiarTodo() {
        // 4.2.4.1: Usar localStorage.removeItem(this.CLAVE)
        localStorage.removeItem(this.CLAVE);
    }
};

/* =========================
   SERVICIO DE TEMA
========================= */

const TemaStorage = {
    CLAVE: 'tema_app',

    getTema() {
        return localStorage.getItem(this.CLAVE) || 'claro';
    },

    setTema(tema) {
        localStorage.setItem(this.CLAVE, tema);
    }
};