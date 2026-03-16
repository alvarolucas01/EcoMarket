// Selección de elementos
const lista = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const toast = document.getElementById("toast"); // Notificación

// Cargar carrito del localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar carrito al cargar la página
mostrarCarrito();

// ==============================
// FUNCIONES PRINCIPALES
// ==============================

// Mostrar carrito en HTML
function mostrarCarrito() {
    lista.innerHTML = ""; // limpiar
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío</p>";
        totalElemento.textContent = "0€";
        return;
    }

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio.toFixed(2)} €</p>
                <div class="cantidad">
                    <button onclick="cambiarCantidad(${index},-1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${index},1)">+</button>
                </div>
            </div>
            <button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        `;

        lista.appendChild(div);

        total += producto.precio * producto.cantidad;
    });

    totalElemento.textContent = total.toFixed(2) + " €";
}

// Cambiar cantidad de producto
function cambiarCantidad(index, valor) {
    carrito[index].cantidad += valor;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); // eliminar si cantidad <= 0
    }

    guardarCarrito();
}

// Eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

// Guardar carrito en localStorage y actualizar HTML
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Simular pago
function simularPago() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    alert("✅ Pago realizado con éxito\nGracias por tu compra.");
    vaciarCarrito();
    window.location.href = "index.html";
}

// ==============================
// AÑADIR PRODUCTOS DESDE INDEX.HTML
// ==============================

const botones = document.querySelectorAll(".add-to-cart");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = {
            nombre: boton.dataset.name,
            precio: parseFloat(boton.dataset.price),
            imagen: boton.dataset.image,
            cantidad: 1
        };

        // Si el producto ya existe, aumentar cantidad
        const existente = carrito.find(p => p.nombre === producto.nombre);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push(producto);
        }

        guardarCarrito();
        mostrarToast();
    });
});

// ==============================
// NOTIFICACIÓN "PRODUCTO AÑADIDO"
// ==============================

function mostrarToast() {
    if (!toast) return;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}