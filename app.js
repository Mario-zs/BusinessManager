import { showMenuevent } from "./events.js";
import { showMenuWindows } from "./events.js";
import { showModalProductoEvent, closeModalProductoEvent } from "./events.js";
import { showModalVentaEvent, closeModalVentaEvent } from "./events.js";
import { showModalGastoEvent, closeModalGastoEvent } from "./events.js";
import { agregarProductoEvent } from "./events.js";
import { renderizarEvent } from "./events.js";
import { inicializarEliminarProducto } from "./events.js";
import { registrarVentaEvent } from "./events.js";
import { registrarGastoEvent } from "./events.js";
import { inicializarFiltrosProductos, inicializarFiltrosVentas, inicializarFiltrosGastos } from "./events.js";
import { inicializarResumenFinanciero } from "./events.js";
import { exportarDatosEvent } from "./events.js";
import { importarDatosEvent } from "./events.js";
import { inicializarConfiguracion } from "./events.js";
import { darkModeEvent } from "./events.js";

import { aplicarTemaInicial } from "./ui.js";

// tema inicial
function temaInicial(){
    aplicarTemaInicial();
}
temaInicial();

function showMenu(){
    showMenuevent();
}
showMenu();

function showWindows(){
    showMenuWindows();
}
showWindows();

// Mostrar modal producto
function showModalProducto(){
    showModalProductoEvent();
}
showModalProducto();

// Cerrar modal producto
function closeModalProducto(){
    closeModalProductoEvent();
}
closeModalProducto();

// Filtros productos
function filtrosProductos(){
    inicializarFiltrosProductos();
}
filtrosProductos();

// Mostrar modal venta
function showModalVenta(){
    showModalVentaEvent();
}
showModalVenta();

// Cerrar modal venta
function closeModalVenta(){
    closeModalVentaEvent();
}
closeModalVenta();

// Filtros ventas
function filtrosVentas(){
    inicializarFiltrosVentas();
}
filtrosVentas();

// Mostrar modal gasto
function showModalGasto(){
    showModalGastoEvent();
}
showModalGasto();

// Cerrar modal gasto
function closeModalGasto(){
    closeModalGastoEvent();
}
closeModalGasto();

// Filtros gastos
function filtrosGastos(){
    inicializarFiltrosGastos();
}
filtrosGastos();

// Agregar producto
function agregarProducto(){
    agregarProductoEvent();
}
agregarProducto();

// Eliminar producto
function eliminarProducto(){
    inicializarEliminarProducto();
}
eliminarProducto();

// Registrar venta
function registrarVenta(){
    registrarVentaEvent();
}
registrarVenta();

// Registrar gasto
function registrarGasto(){
    registrarGastoEvent();
}
registrarGasto();

// Resumen financiero
function resumenFinanciero(){
    inicializarResumenFinanciero();
}
resumenFinanciero();

// Exportar datos
function exportarDatos(){
    exportarDatosEvent()
}
exportarDatos();

// Importar datos
function importarDatos(){
    importarDatosEvent();
}
importarDatos();

// Formato y moneda
function formatoMoneda(){
    inicializarConfiguracion();
}
formatoMoneda();

// Dark mode
function darkMode(){
    darkModeEvent();
}
darkMode();

// Renderizar datos
function render(){
    renderizarEvent();
}
render();