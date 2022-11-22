const productosEnCarrito = JSON.parse(localStorage.getItem("productos"))

const textoCarritoVacio = document.querySelector("#carritoVacio")
const carritoProductos = document.querySelector(".carrito-productos")
const carritoAcciones = document.querySelector(".carrito-acciones")
const precioTotal = document.querySelector("#precioTotal")
const vaciarCarrito = document.querySelector("#vaciarCarrito")

if (productosEnCarrito) {
    textoCarritoVacio.classList.add("disabled")
    carritoProductos.classList.remove("disabled")
    
    
    productosEnCarrito.forEach(suplemento => {
        
        const div = document.createElement("div")
        div.classList.add("producto-carrito")
        
        div.innerHTML = `
        <p>${suplemento.nombre}</p>
        <p>Precio $${suplemento.precio}</p>
        <button id="${suplemento.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        
        carritoProductos.append(div)
        
    });
}
const btnEliminar = document.querySelectorAll(".boton-eliminar")

btnEliminar.forEach(boton => {

    boton.addEventListener("click", () => {
        eliminarCarrito(boton.id)



        Toastify({
            text: "Producto Eliminado",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, rgb(43, 0, 0), rgb(167, 16, 16))",
            }
            }).showToast();
    })
})

const renderizarPrecio = () => {
    let total = 0
    
    productosEnCarrito.reduce(suplemento => {
        total += suplemento.precio
    })
    precioTotal.innerText = total
}


vaciarCarrito.addEventListener("click", () => {
    carritoProductos.classList.add("disabled")
})


const eliminarCarrito = (id) => {
    const producto = productosEnCarrito.findIndex( (suplemento) => suplemento.id === id)
    productosEnCarrito.splice(producto, 1)
    
    console.log(productosEnCarrito)
//    renderizarCarrito()
    
    localStorage.setItem("productos", JSON.stringify(productosEnCarrito))
} 
