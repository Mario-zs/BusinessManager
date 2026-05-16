import { toogleMenu, cerrarMenu } from "./ui.js";
import { mostrarPrincipal, mostrarProductos, mostrarVentas, mostrarGastos, mostrarResumenFinanciero, mostrarConfiguracion, mostrarAcercaDe } from "./ui.js"
import { mostrarModalProducto, cerrarModalProducto } from "./ui.js";
import { mostrarModalVenta, cerrarModalVenta } from "./ui.js";
import { mostrarModalGasto, cerrarModalGasto } from "./ui.js";
import { cerrarModalEditar } from "./ui.js";
import { listaProductos, listaVentas, listaGastos } from "./ui.js";
import { resumenFinanciero } from "./ui.js";
import { mostrarMensaje } from "./ui.js";
import { mostrarModalConfirmacion, cerrarModalConfirmacion } from "./ui.js";
import { renderizar } from "./ui.js";
import { toggleDarkMode } from "./ui.js";

import { productos, ventas, gastos, ultimosMovimientos, registrarMovimiento } from "./data.js";
import { guardarDatos } from "./data.js";
import { exportarDatos, importarDatos } from "./data.js";
import { setMoneda, setFormato, getMoneda, getFormato } from "./data.js";

export function showMenuevent() {
    const btnMenu = document.getElementById("btnMenu");
    btnMenu.addEventListener("click", () => {
        toogleMenu();
    });
}

export function showMenuWindows() {
    document.querySelectorAll("#sidebar nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const option = e.target.textContent.trim();

            switch (option) {
                case "Principal":
                    mostrarPrincipal();
                    cerrarMenu();
                    break;

                case "Productos":
                    mostrarProductos();
                    cerrarMenu();
                    break;

                case "Ventas":
                    mostrarVentas();
                    cerrarMenu();
                    break;

                case "Gastos":
                    mostrarGastos();
                    cerrarMenu();
                    break;

                case "Resumen financiero":
                    mostrarResumenFinanciero();
                    cerrarMenu();
                    break;

                case "Configuración":
                    mostrarConfiguracion();
                    cerrarMenu();
                    break;

                case "Acerca de":
                    mostrarAcercaDe();
                    cerrarMenu();
                    break;
            }
        });
    });
}

// Mostrar modal producto
export function showModalProductoEvent() {
    const btnAgregarProducto = document.getElementById("btnAgregarProducto");

    btnAgregarProducto.addEventListener("click", () => {
        mostrarModalProducto();
    });
}

// Cerrar modal producto
export function closeModalProductoEvent() {
    const btnCerrarModal = document.getElementById("btnCerrarModal");

    btnCerrarModal.addEventListener("click", () => {
        cerrarModalProducto();
        cerrarModalEditar();
    });
}

// Mostrar modal venta
export function showModalVentaEvent() {
    const btnAgregarVenta = document.getElementById("btnAgregarVenta");

    btnAgregarVenta.addEventListener("click", () => {
        mostrarModalVenta();
    });
}
// Cerrar modal venta
export function closeModalVentaEvent() {
    const btnCerrarModalVenta = document.getElementById("btnCerrarModalVenta");

    btnCerrarModalVenta.addEventListener("click", () => {
        cerrarModalVenta();
    });
}

// Mostrar modal gasto
export function showModalGastoEvent() {
    const btnAgregarGasto = document.getElementById("btnAgregarGasto");

    btnAgregarGasto.addEventListener("click", () => {
        mostrarModalGasto();
    });
}

// Cerrar modal gasto
export function closeModalGastoEvent() {
    const btnCerrarModalGasto = document.getElementById("btnCerrarModalGasto");

    btnCerrarModalGasto.addEventListener("click", () => {
        cerrarModalGasto();
    });
}

// Agregar/Editar producto
export function agregarProductoEvent() {
    const formAgregarProducto = document.getElementById("formProducto");

    formAgregarProducto.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = document.getElementById("modalProducto").dataset.id;

        let nombreProducto = document.getElementById("nombreProducto").value.trim();
        let precioProducto = parseFloat(document.getElementById("precioProducto").value.trim());
        let stockProducto = parseInt(document.getElementById("stockProducto").value.trim());
        let costoProducto = parseFloat(document.getElementById("costoProducto").value.trim());
        let categoriaProducto = document.getElementById("categoriaProducto").value.trim();

        if (
            nombreProducto === "" &&
            document.getElementById("precioProducto").value.trim() === "" &&
            document.getElementById("stockProducto").value.trim() === "" &&
            document.getElementById("costoProducto").value.trim() === ""
        ) {
            mostrarMensaje("Debes llenar todos los campos.", "error");
            return;
        }
        if (!nombreProducto) {
            mostrarMensaje("Debes ingresar el nombre del producto", "error");
            return;
        }
        if (isNaN(precioProducto) || precioProducto <= 0) {
            mostrarMensaje("El precio de adquisición debe ser mayor a 0", "error");
            return;
        }
        if (isNaN(stockProducto) || stockProducto < 0) {
            mostrarMensaje("El stock no puede ser negativo", "error");
            return;
        }
        if (isNaN(costoProducto) || costoProducto < 0) {
            mostrarMensaje("El costo unitario debe ser mayor o igual a 0", "error");
            return;
        }

        // Validar si ya existe el producto
        const existe = productos.some(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());

        if(existe){
            mostrarMensaje(`Ya existe un producto llamado ${nombreProducto}.`, "error");
            return;
        }

        if (id) {
            const index = productos.findIndex(p => p.id == id);

            if (index !== -1) {
                productos[index].nombre = nombreProducto;
                productos[index].precio = precioProducto;
                productos[index].cantidad = stockProducto;
                productos[index].costo = costoProducto;
                productos[index].categoria = categoriaProducto;

                registrarMovimiento(`Producto ${nombreProducto} editado`);
                mostrarMensaje(`Producto "${nombreProducto}" editado correctamente`, "success");
            }
        } else {
            // Crear objeto producto
            const nuevoProducto = {
                id: Date.now(),
                nombre: nombreProducto,
                precio: precioProducto,
                cantidad: stockProducto,
                costo: costoProducto,
                categoria: categoriaProducto
            };

            // Guardar en productos
            productos.push(nuevoProducto);
            // Registrar movimiento
            registrarMovimiento(`Producto ${nombreProducto} agregado`);
            // registrar gasto de adquisicion
            const nuevoGasto = {
                id: Date.now(),
                concepto: `Compra de ${nombreProducto}`,
                monto: precioProducto,
                fecha: new Date().toISOString()
            };
            gastos.push(nuevoGasto);
            registrarMovimiento(`Gasto registrado: Compra de ${nombreProducto} por $${precioProducto}`);

            mostrarMensaje(`Producto "${nombreProducto}" agregado correctamente`, "success");
        }

        // Guardar en localStorage
        guardarDatos();
        cerrarModalEditar();
        renderizarEvent();
    });
}

// Eliminar producto
export function inicializarEliminarProducto() {
    const btnEliminar = document.getElementById("btnEliminarProducto");
    const modalConfirmacion = document.getElementById("modalConfirmacion");
    const btnConfirmar = document.getElementById("btnConfirmarEliminar");
    const btnCancelar = document.getElementById("btnCancelarEliminar");
    const txtConfirmacion = document.getElementById("txtConfirmacion");

    btnEliminar.addEventListener("click", () => {
        const modal = document.getElementById("modalProducto");
        const id = modal.dataset.id;
        const producto = productos.find(p => p.id == id);

        if(producto){
            let mensaje = "Esta acción no se puede deshacer.";

            if(producto.cantidad > 0){
                mensaje += ` ⚠️ Este producto aún tiene ${producto.cantidad} en stock.`;
            }
            txtConfirmacion.textContent = mensaje;
        }

        mostrarModalConfirmacion();
    });

    btnCancelar.addEventListener("click", () => {
        cerrarModalConfirmacion();
    });

    btnConfirmar.addEventListener("click", () => {
        const modal = document.getElementById("modalProducto");
        const id = modal.dataset.id;
        const index = productos.findIndex(p => p.id == id);

        if (index !== -1) {
            const eliminado = productos.splice(index, 1)[0];
            registrarMovimiento(`Producto ${eliminado.nombre} eliminado`);
            guardarDatos();
            renderizarEvent();
            cerrarModalEditar();
            cerrarModalConfirmacion();
            mostrarMensaje(`Producto ${eliminado.nombre} eliminado correctamente.`, "success");
        }
    });
}

// Buscar producto
export function inicializarFiltrosProductos() {
    const buscar = document.getElementById("buscarProducto");
    const categoria = document.getElementById("filtroCategoria");
    const stock = document.getElementById("filtroStock");

    buscar.addEventListener("input", () => listaProductos());
    categoria.addEventListener("change", () => listaProductos());
    stock.addEventListener("change", () => listaProductos());
}

// Registrar venta
export function registrarVentaEvent() {
    const formVenta = document.getElementById("formVenta");

    formVenta.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombreProducto = document.getElementById("productoVenta").value.trim();
        const cantidad = parseInt(document.getElementById("cantidadVenta").value.trim());

        if (nombreProducto === "" || isNaN(cantidad) || cantidad < 0) {
            mostrarMensaje("Debes llenar todos los campos", "error");
            return;
        }

        const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
        if (!producto) {
            mostrarMensaje("Producto no encontrado en inventario", "error");
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            mostrarMensaje("La cantidad debe ser mayor a 0", "error");
            return;
        }

        if (cantidad > producto.cantidad) {
            mostrarMensaje("Stock insuficiente para completar la venta", "error");
            return;
        }

        // Reducir stock
        producto.cantidad -= cantidad;

        // Calcular total
        const total = cantidad * producto.costo;

        // Crear objeto venta
        const nuevaVenta = {
            id: Date.now(),
            producto: producto.nombre,
            cantidad,
            precioUnitario: producto.precio,
            total,
            fecha: new Date().toISOString()
        };

        ventas.push(nuevaVenta);

        registrarMovimiento(`Venta registrada: ${cantidad} ${producto.nombre} | Total: $${total}`);

        guardarDatos();
        renderizarEvent();
        cerrarModalVenta();
        mostrarMensaje(`Venta registrada: ${cantidad} ${producto.nombre} por $${total}`, "success");
    })
}

// Buscar venta
export function inicializarFiltrosVentas() {
    const buscar = document.getElementById("buscarVenta");
    const fecha = document.getElementById("filtroFecha");

    buscar.addEventListener("input", () => listaVentas());
    fecha.addEventListener("change", () => listaVentas());
}

// Registrar gasto
export function registrarGastoEvent() {
    const formGasto = document.getElementById("formGasto");

    formGasto.addEventListener("submit", (e) => {
        e.preventDefault();

        const concepto = document.getElementById("conceptoGasto").value.trim();
        const monto = parseFloat(document.getElementById("montoGasto").value.trim());

        if (!concepto || isNaN(monto) || monto <= 0) {
            mostrarMensaje("Debes llenar los campos correctamente", "error");
            return;
        }

        // Crear objeto gasto
        const nuevoGasto = {
            id: Date.now(),
            concepto,
            monto,
            fecha: new Date().toISOString()
        };

        gastos.push(nuevoGasto);

        registrarMovimiento(`Gasto registrado: ${concepto} | Monto: $${monto}`);

        guardarDatos();
        renderizarEvent();
        cerrarModalGasto();
        mostrarMensaje(`Gasto registrado: "${concepto}" por $${monto}`, "success");
    });
}

// Buscar gasto
export function inicializarFiltrosGastos() {
    const buscar = document.getElementById("buscarGasto");
    const fecha = document.getElementById("filtroFechaGasto");

    buscar.addEventListener("input", () => listaGastos());
    fecha.addEventListener("change", () => listaGastos());
}

export function inicializarResumenFinanciero() {
    const filtro = document.getElementById("filtroPeriodo");
    filtro.addEventListener("change", () => resumenFinanciero());
}

export function renderizarEvent() {
    renderizar();
}

export function exportarDatosEvent() {
    const btnExportar = document.querySelector(".btn-exportar");
    btnExportar.addEventListener("click", () => exportarDatos());
}

export function importarDatosEvent() {
    const btnImportar = document.querySelector(".btn-importar");
    btnImportar.addEventListener("click", () => importarDatos());
}

// Formato moneda
export function inicializarConfiguracion() {
    const selectMoneda = document.getElementById("moneda");
    const selectFormato = document.getElementById("formato");

    selectMoneda.value = getMoneda();
    selectFormato.value = getFormato();

    selectMoneda.addEventListener("change", (e) => {
        setMoneda(e.target.value);
        mostrarMensaje(`Moneda cambiada a ${getMoneda()}`, "success");
        registrarMovimiento(`Configuración: Moneda cambiada a ${getMoneda()}`);
        renderizarEvent();
    });

    selectFormato.addEventListener("change", (e) => {
        setFormato(e.target.value);
        mostrarMensaje(`Formato cambiado a ${getFormato()}`, "success");
        registrarMovimiento(`Configuración: Formato de moneda cambiado a ${getFormato()}`);
        renderizarEvent();
    });
}

export function darkModeEvent() {
    const btnDarkMode = document.getElementById("btnDarkMode");
    btnDarkMode.addEventListener("click", () => {
        toggleDarkMode();
    });
}