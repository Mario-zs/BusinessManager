import { productos, ventas, gastos, ultimosMovimientos, registrarMovimiento, guardarDatos, setTema, getTema } from "./data.js";
import { getMoneda, getFormato } from "./data.js";

// ocultar todo
export function ocultarTodo() {
    document.querySelector(".dashboard").classList.add("oculto");
    document.querySelector(".productos").classList.add("oculto");
    document.querySelector(".modal").classList.add("oculto");
    document.querySelector(".ventas").classList.add("oculto");
    document.querySelector(".gastos").classList.add("oculto");
    document.querySelector(".resumen-financiero").classList.add("oculto");
    document.querySelector(".configuracion").classList.add("oculto");
    document.querySelector(".acerca-de").classList.add("oculto");
}

// Mostrar menu
export function toogleMenu() {
    document.querySelector(".sidebar").classList.toggle("visible");
}

export function cerrarMenu(){
    document.querySelector(".sidebar").classList.remove("visible");
}

// Mostrar el panel de menu principal
export function mostrarPrincipal() {
    ocultarTodo();
    document.querySelector(".dashboard").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel principal";
}

// Mostrar panel de productos
export function mostrarProductos() {
    ocultarTodo();
    document.querySelector(".productos").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel productos";
}

// Mostrar panel de ventas
export function mostrarVentas() {
    ocultarTodo();
    document.querySelector(".ventas").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel ventas";
}

// Mostrar panel de gastos
export function mostrarGastos() {
    ocultarTodo();
    document.querySelector(".gastos").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel gastos";
}

// Mostrar panel de resumen financiero
export function mostrarResumenFinanciero() {
    ocultarTodo();
    document.querySelector(".resumen-financiero").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel resumen financiero";
}

// Mostrar panel de configuracion
export function mostrarConfiguracion() {
    ocultarTodo();
    document.querySelector(".configuracion").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel configuración";
}

// Mostrar panel acerca de
export function mostrarAcercaDe() {
    ocultarTodo();
    document.querySelector(".acerca-de").classList.remove("oculto");
    document.getElementById("headerTittle").textContent = "Panel acerca de";
}

// Mostrar modal producto
export function mostrarModalProducto() {
    document.getElementById("modalProducto").classList.remove("oculto");
}

// Cerrar modal producto
export function cerrarModalProducto() {
    document.getElementById("modalProducto").classList.add("oculto");
}

// Mostrar modal venta
export function mostrarModalVenta() {
    document.getElementById("modalVenta").classList.remove("oculto");
}

// Cerrar modal venta
export function cerrarModalVenta() {
    document.getElementById("formVenta").reset();
    document.getElementById("modalVenta").classList.add("oculto");
}

// Mostrar modal gasto
export function mostrarModalGasto() {
    document.getElementById("modalGasto").classList.remove("oculto");
}

// Cerrar modal gasto
export function cerrarModalGasto() {
    document.getElementById("formGasto").reset();
    document.getElementById("modalGasto").classList.add("oculto");
}

// Mostrar modal editar
function mostrarModalEditar(producto) {
    const modalEditar = document.getElementById("modalProducto");

    // cambiar titulo
    document.getElementById("modalTitulo").textContent = "Editar producto";

    // Llenar modal
    document.getElementById("nombreProducto").value = producto.nombre;
    document.getElementById("precioProducto").value = producto.precio;
    document.getElementById("stockProducto").value = producto.cantidad;
    document.getElementById("costoProducto").value = producto.costo;
    document.getElementById("categoriaProducto").value = producto.categoria;

    modalEditar.dataset.id = producto.id;

    // Mostrar boton eliminar
    document.getElementById("btnEliminarProducto").classList.remove("oculto");

    modalEditar.classList.remove("oculto");
}

// Cerrar modal editar
export function cerrarModalEditar() {
    const modal = document.getElementById("modalProducto");
    const form = document.getElementById("formProducto");
    const btnEliminar = document.getElementById("btnEliminarProducto");

    modal.classList.add("oculto");

    if (form) form.reset();

    document.getElementById("modalTitulo").textContent = "Agregar producto";

    // Ocultar boton eliminar
    btnEliminar.classList.add("oculto");

    delete modal.dataset.id;
}

// Mostrar modal confirmar
export function mostrarModalConfirmacion() {
    document.getElementById("modalConfirmacion").classList.remove("oculto");
}

// Cerrar modal confirmar
export function cerrarModalConfirmacion() {
    document.getElementById("modalConfirmacion").classList.add("oculto");
}

// Renderizar KPIs
function renderKPIs() {
    const valorInventario = productos.reduce((acc, p) => acc + p.costo * p.cantidad, 0);
    const ingresosTotales = ventas.reduce((acc, v) => acc + v.total, 0);
    const gastosTotales = gastos.reduce((acc, g) => acc + g.monto, 0);
    const balance = ingresosTotales - gastosTotales;
    const productosInventario = productos.reduce((acc, p) => acc + p.cantidad, 0);
    const productosVendidos = ventas.reduce((acc, v) => acc + v.cantidad, 0);

    document.querySelector(".card:nth-child(1) p").textContent = formatearMoneda(valorInventario);
    document.querySelector(".card:nth-child(2) p").textContent = formatearMoneda(ingresosTotales);
    document.querySelector(".card:nth-child(3) p").textContent = formatearMoneda(gastosTotales);
    document.querySelector(".card:nth-child(4) p").textContent = formatearMoneda(balance);
    document.querySelector(".card:nth-child(5) p").textContent = productosInventario;
    document.querySelector(".card:nth-child(6) p").textContent = productosVendidos;
}

// Renderizar ultimos movimientos
function listaMovimientos() {
    const listaMovimientos = document.querySelector(".lista-movimientos");
    const mensajeVacioMovimientos = document.getElementById("mensajeVacioMovimientos");

    listaMovimientos.innerHTML = "";

    if (ultimosMovimientos.length === 0) {
        mensajeVacioMovimientos.classList.remove("oculto");
    } else {
        mensajeVacioMovimientos.classList.add("oculto");
    }

    const maxMovimientosVisibles = 20;
    const movimientosVisibles = ultimosMovimientos.slice(0, maxMovimientosVisibles);

    movimientosVisibles.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.action}</span>
            <span class="fecha">${new Date(item.fecha).toLocaleString()}</span>
        `;
        listaMovimientos.appendChild(li);
    });
}

// Renderizar lista de productos
export function listaProductos() {
    const listaProductos = document.querySelector(".lista-productos");
    const mensajeVacio = document.getElementById("mensajeVacioProductos");

    listaProductos.innerHTML = "";

    // Obtener filtros
    const filtroTexto = document.getElementById("buscarProducto").value.toLowerCase().trim();
    const categoria = document.getElementById("filtroCategoria").value;
    const soloStock = document.getElementById("filtroStock").checked;

    // Filtrar
    const filtrados = productos.filter(p => {
        const coincideTexto = p.nombre.toLowerCase().includes(filtroTexto);
        const coincideCategoria = !categoria || p.categoria === categoria;
        const coincideStock = !soloStock || p.cantidad > 0;
        return coincideTexto && coincideCategoria && coincideStock;
    });

    if (filtrados.length === 0) {
        mensajeVacio.classList.remove("oculto");
    } else {
        mensajeVacio.classList.add("oculto");
    }

    filtrados.slice().reverse().forEach((item) => {
        const indexReal = productos.findIndex(p => p.id === item.id);

        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${item.nombre}</strong> (${item.categoria}) | Precio de adqusición: ${formatearMoneda(item.precio)} | Stock: ${item.cantidad}</span>
        `;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn-editar");
        btnEditar.addEventListener("click", () => {
            mostrarModalEditar(item, indexReal);
        });

        li.appendChild(btnEditar);
        listaProductos.appendChild(li);
    });
}

// Renderizar datalist
function renderizarDataListProductos() {
    const dataList = document.getElementById("productosRegistrados");
    dataList.innerHTML = "";

    productos.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.nombre;
        dataList.appendChild(option);
    });
}

// Renderizar ventas
export function listaVentas() {
    const lista = document.querySelector(".lista-ventas");
    const mensajeVacio = document.getElementById("mensajeVacioVentas");

    const filtroTexto = document.getElementById("buscarVenta").value.toLowerCase().trim();
    const filtroFecha = document.getElementById("filtroFecha").value;

    lista.innerHTML = "";

    const hoy = new Date();
    let inicio = null;
    if (filtroFecha === "hoy") {
        inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    } else if (filtroFecha === "semana") {
        inicio = new Date(hoy);
        inicio.setDate(hoy.getDate() - 7);
    } else if (filtroFecha === "mes") {
        inicio = new Date(hoy);
        inicio.setMonth(hoy.getMonth() - 1);
    }

    const filtradas = ventas.filter(v => {
        const coincideTexto = v.producto.toLowerCase().includes(filtroTexto);
        const fechaVenta = new Date(v.fecha);
        const coincideFecha = !inicio || fechaVenta >= inicio;
        return coincideTexto && coincideFecha;
    });

    if (filtradas.length === 0) {
        mensajeVacio.classList.remove("oculto");
    } else {
        mensajeVacio.classList.add("oculto");
    }

    filtradas.slice().reverse().forEach((venta, index) => {
        const li = document.createElement("li");
        const fechaVenta = new Date(venta.fecha);
        li.innerHTML = `
            <span><strong>${venta.producto}</strong> | Cantidad: ${venta.cantidad} u. | Total: ${formatearMoneda(venta.total)}</span>
            <span class="fecha">${fechaVenta.toLocaleString()}</span>
        `;
        lista.appendChild(li);
    });
}

// Renderizar gastos
export function listaGastos() {
    const lista = document.querySelector(".lista-gastos");
    const mensajeVacio = document.getElementById("mensajeVacioGastos");

    const filtroTexto = document.getElementById("buscarGasto").value.toLowerCase().trim();
    const filtroFecha = document.getElementById("filtroFechaGasto").value;

    lista.innerHTML = "";

    const hoy = new Date();
    let inicio = null;
    if (filtroFecha === "hoy") {
        inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    } else if (filtroFecha === "semana") {
        inicio = new Date(hoy);
        inicio.setDate(hoy.getDate() - 7);
    } else if (filtroFecha === "mes") {
        inicio = new Date(hoy);
        inicio.setMonth(hoy.getMonth() - 1);
    }

    const filtrados = gastos.filter(g => {
        const coincideTexto = g.concepto.toLowerCase().includes(filtroTexto);
        const fechaGasto = new Date(g.fecha);
        const coincideFecha = !inicio || fechaGasto >= inicio;
        return coincideTexto && coincideFecha;
    });

    if (filtrados.length === 0) {
        mensajeVacio.classList.remove("oculto");
    } else {
        mensajeVacio.classList.add("oculto");
    }

    filtrados.slice().reverse().forEach((item) => {
        const li = document.createElement("li");
        const fechaGasto = new Date(item.fecha);
        li.innerHTML = `
            <span><strong>${item.concepto}</strong> | Monto: ${formatearMoneda(item.monto)}</span>
            <span class="fecha">${fechaGasto.toLocaleString()}</span>
        `;
        lista.appendChild(li);
    });
}

// Renderizar resumen financiero
let graficoFinanciero = null;

export function resumenFinanciero() {
    const periodo = document.getElementById("filtroPeriodo").value;
    const hoy = new Date();
    let inicio = null;

    if (periodo === "mes") {
        inicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
    } else if (periodo === "trimestre") {
        inicio = new Date(hoy.getFullYear(), hoy.getMonth() - 3, hoy.getDate());
    } else if (periodo === "anio") {
        inicio = new Date(hoy.getFullYear() - 1, hoy.getMonth(), hoy.getDate());
    }

    // Filtrar ventas y gastos
    const ventasFiltradas = ventas.filter(v => new Date(v.fecha) >= inicio);
    const gastosFiltrados = gastos.filter(g => new Date(g.fecha) >= inicio);

    // Calcular ingresos
    const ingresos = ventasFiltradas.reduce((acc, v) => acc + v.total, 0);

    // Calcular gastos
    const gastosTotales = gastosFiltrados.reduce((acc, g) => acc + g.monto, 0);

    // Balance
    const balance = ingresos - gastosTotales;

    // Margen de ganancia
    const margen = ingresos > 0 ? ((balance / ingresos) * 100).toFixed(2) : 0;

    // Producto mas vendido
    let productoMasVendido = "N/A";
    if (ventasFiltradas.length > 0) {
        const conteo = {};
        ventasFiltradas.forEach(v => {
            conteo[v.producto] = (conteo[v.producto] || 0) + v.cantidad;
        });
        productoMasVendido = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
    }

    // Actualizar KPIs
    document.getElementById("kpiIngresos").textContent = formatearMoneda(ingresos);
    document.getElementById("kpiGastos").textContent = formatearMoneda(gastosTotales);
    document.getElementById("kpiBalance").textContent = formatearMoneda(balance);
    document.getElementById("kpiMargen").textContent = `${margen}%`;
    document.getElementById("kpiProducto").textContent = productoMasVendido;

    // Dibujar grafico
    const ctx = document.getElementById("graficoFinanciero").getContext("2d");
    const datos = {
        labels: ["Ingresos", "Gastos", "Balance"],
        datasets: [{
            label: "Resumen financiero",
            data: [ingresos, gastosTotales, balance],
            backgroundColor: ["#4caf50", "#f44336", "#2196f3"]
        }]
    };

    if (graficoFinanciero) {
        graficoFinanciero.destroy();
    }

    graficoFinanciero = new Chart(ctx, {
        type: "bar",
        data: datos,
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });

    // Tabla
    const tablaBody = document.getElementById("tablaPeriodosBody");
    tablaBody.innerHTML = "";

    const agrupados = {};

    // Agrupar ventas por mes y año
    ventasFiltradas.forEach(v => {
        const fecha = new Date(v.fecha);
        const clave = `${fecha.toLocaleString("default", { month: "long" })} ${fecha.getFullYear()}`;
        agrupados[clave] = agrupados[clave] || { ingresos: 0, gastos: 0, year: fecha.getFullYear(), month: fecha.getMonth() };
        agrupados[clave].ingresos += v.total;
    });

    // Agrupar gastos por mes y año
    gastosFiltrados.forEach(g => {
        const fecha = new Date(g.fecha);
        const clave = `${fecha.toLocaleString("default", { month: "long" })} ${fecha.getFullYear()}`;
        agrupados[clave] = agrupados[clave] || { ingresos: 0, gastos: 0, year: fecha.getFullYear(), month: fecha.getMonth() };
        agrupados[clave].gastos += g.monto;
    });

    // Ordenar por año y mes descendente
    const mesesOrdenados = Object.keys(agrupados).sort((a, b) => {
        const fa = agrupados[a];
        const fb = agrupados[b];
        if (fb.year !== fa.year) return fb.year - fa.year;
        return fb.month - fa.month;
    });

    mesesOrdenados.forEach(mes => {
        const fila = document.createElement("tr");
        const ingresosMes = agrupados[mes].ingresos;
        const gastosMes = agrupados[mes].gastos;
        const balanceMes = ingresosMes - gastosMes;

        fila.innerHTML = `
            <td>${mes}</td>
            <td>$${ingresosMes.toFixed(2)}</td>
            <td>$${gastosMes.toFixed(2)}</td>
            <td>${balanceMes < 0 ? "- $" + Math.abs(balanceMes).toFixed(2) : "$" + balanceMes.toFixed(2)}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Notificaciones
export function mostrarMensaje(texto, tipo = "info") {
    const notf = document.getElementById("notificaciones");

    notf.className = "notificaciones";
    if (tipo === "success") notf.classList.add("success");
    else if (tipo === "error") notf.classList.add("error");
    else if (tipo === "warning") notf.classList.add("warning");

    notf.textContent = texto.trim();
    notf.style.display = "block";

    setTimeout(() => {
        notf.style.display = "none";
    }, 3000);
}

// Formato de moneda
export function formatearMoneda(valor) {
    return new Intl.NumberFormat(getFormato(), {
        style: "currency",
        currency: getMoneda()
    }).format(valor);
}

// Modo oscuro
export function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const nuevoTema = document.body.classList.contains("dark-mode") ? "oscuro" : "claro";
    setTema(nuevoTema);

    registrarMovimiento("Tema cambiado");
    guardarDatos();
    renderizar();
}

// Aplicar el tema guardado al niciar la app
export function aplicarTemaInicial() {
    if (getTema() === "oscuro") {
        document.body.classList.add("dark-mode");
    }
}

// Renderizar
export function renderizar() {
    renderKPIs();
    listaProductos();
    listaMovimientos();
    listaVentas();
    listaGastos();
    resumenFinanciero();
    renderizarDataListProductos();
}