import { renderizarEvent } from "./events.js";
import { mostrarMensaje } from "./ui.js";

export let productos = JSON.parse(localStorage.getItem("productos")) || [];
export let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
export let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
export let ultimosMovimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

let monedaPredeterminada = localStorage.getItem("moneda") || "MXN";
let formatoMoneda = localStorage.getItem("formato") || "es-MX";

let temaVisual = localStorage.getItem("tema") || "claro";

// Getters
export function getMoneda() {
    return monedaPredeterminada;
}
export function getFormato() {
    return formatoMoneda;
}

export function getTema(){
    return temaVisual;
}

// Setters
export function setMoneda(nuevaMoneda) {
    monedaPredeterminada = nuevaMoneda;
    localStorage.setItem("moneda", nuevaMoneda);
}
export function setFormato(nuevoFormato) {
    formatoMoneda = nuevoFormato;
    localStorage.setItem("formato", nuevoFormato);
}

export function setTema(nuevoTema){
    temaVisual = nuevoTema;
    localStorage.setItem("tema", nuevoTema);
}


// Guardar datos
export function guardarDatos(){
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("ventas", JSON.stringify(ventas));
    localStorage.setItem("gastos", JSON.stringify(gastos));
    localStorage.setItem("movimientos", JSON.stringify(ultimosMovimientos));
}

// Registrar movimiento
export function registrarMovimiento(action){
    const fecha = new Date().toISOString();
    ultimosMovimientos.unshift({ action, fecha });
    guardarDatos();
}

// Exportar datos
export function exportarDatos(){
    const datos = {
        productos,
        ventas,
        gastos,
        ultimosMovimientos
    };

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "BMrespaldo.json";
    a.click();

    URL.revokeObjectURL(url);

    registrarMovimiento("Datos exportados");
    mostrarMensaje("Exportación completada. Se descargó el archivo respaldo.json", "success");
    renderizarEvent();
}

// Importar datos
export function importarDatos(){
    const input = document.getElementById("fileImport");
    const archivo = input.files[0];

    if(!archivo){
        mostrarMensaje("No se seleccionó ningún archivo para importar", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const datos = JSON.parse(e.target.result);

            if(datos.productos) productos = datos.productos;
            if(datos.ventas) ventas = datos.ventas;
            if(datos.gastos) gastos = datos.gastos;
            if(datos.ultimosMovimientos) ultimosMovimientos = datos.ultimosMovimientos;

            guardarDatos();
            registrarMovimiento("Datos importados");
            mostrarMensaje("Importación completada. Los datos fueron restaurados correctamente", "success");
            renderizarEvent();
        } catch (error) {
            mostrarMensaje("Error al importar datos. El archivo no es válido", "error");
            console.error("Error al importar datos", error);
        } finally {
            input.value = "";
        }
    };

    reader.readAsText(archivo);
}