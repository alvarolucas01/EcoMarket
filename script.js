const botones = document.querySelectorAll(".add-to-cart");
const toast = document.getElementById("toast");
const cartCount = document.getElementById("cart-count");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 👉 NUEVA FUNCIÓN
function actualizarContadorCarrito() {
  const total = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  cartCount.textContent = total;
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const producto = {
      nombre: boton.dataset.name,
      precio: parseFloat(boton.dataset.price),
      imagen: boton.dataset.image,
      cantidad: 1
    };

    const existente = carrito.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarToast();
    actualizarContadorCarrito(); // ✅ llamada correcta
  });
});

function mostrarToast() {
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// 👉 IMPORTANTE: actualizar al cargar la página
actualizarContadorCarrito();



// =======================
// BUSCADOR
// =======================

const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll(".product-card");

if(buscador){

buscador.addEventListener("keyup", () => {

const texto = buscador.value.toLowerCase();

productos.forEach(producto => {

const nombre = producto.querySelector("h3").textContent.toLowerCase();

if(nombre.includes(texto)){

producto.style.display = "block";

}else{

producto.style.display = "none";

}

});

});

}






// =======================
// FILTRO CATEGORIAS
// =======================

const selectCategoria = document.getElementById("categorias");

if(selectCategoria){

selectCategoria.addEventListener("change", () => {

const categoria = selectCategoria.value;

productos.forEach(producto => {

if(producto.dataset.category === categoria){

producto.style.display = "block";

}else{

producto.style.display = "none";

}

});

});

}






// =======================
// MODO OSCURO
// =======================

const botonDark = document.getElementById("dark-mode");

if(botonDark){

botonDark.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

});

}






// =======================
// ANIMACIONES SCROLL
// =======================

const elementos = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("mostrar");

}

});

});

elementos.forEach(el=>{

el.classList.add("oculto");

observer.observe(el);

});