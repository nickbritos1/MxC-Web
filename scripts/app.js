const tiendaContainer = document.querySelector(".productos-container")
const numerito = document.querySelector(".numerito")
const acciones = document.querySelector(".acciones")
const carritoBoton = document.querySelector(".carritoBoton")
const modal = document.querySelector(".modalContainer")
const cerrarCarrito = document.querySelector(".boton-cerrar-modal")
const productosEnCarrito = document.querySelector(".productosEnCarrito")
const precioTotal = document.querySelector("#precioTotal")
const btnVaciarCarrito = document.querySelector(".boton-vaciar")
const botonFinalizar = document.querySelector(".boton-finalizar")

carritoBoton.classList.add("desabilitado")
carritoBoton.classList.remove("carritoBoton")

modal.classList.add("desabilitado")
modal.classList.remove("modalContainer")

fetch("./scripts/productos.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        data.forEach(producto => {

            const productoTarjeta = document.createElement("div")
            productoTarjeta.className = "producto"

            productoTarjeta.innerHTML = `
                <div class="productoTitulo">${producto.nombre}</div>
                <div class="productoDesc">${producto.descripcion}</div>
                <img src="${producto.img}">
                <div class="acciones">
                    <div class="precio">$${producto.precio}</div>
                </div>
            `

            const botonAgregar = document.createElement("button")
            botonAgregar.className = "boton-agregar"
            botonAgregar.innerHTML = `Agregar <i class="fas fa-shopping-cart"></i>`

            botonAgregar.addEventListener("click", () => {
                agregarCarrito(data, producto.id)
                renderizarNumerito()
                renderizarProductos()


                carritoBoton.classList.remove("desabilitado")
                carritoBoton.classList.add("carritoBoton")
            })

            productoTarjeta.append(botonAgregar)

            tiendaContainer.append(productoTarjeta)
        });
    })


    
    let carrito
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos"))
    if (productosEnCarritoLS) {
        carrito = productosEnCarritoLS
        renderizarProductos()
        renderizarTotal()

        carritoBoton.classList.remove("desabilitado")
        carritoBoton.classList.add("carritoBoton")
    } else {
        carrito = []
    }
    
    const numeritoLS = JSON.parse(localStorage.getItem("numerito"))
    if (numeritoLS) {
        numerito.innerText = numeritoLS
    }

    
function agregarCarrito (data, id) {
    const producto = data.find( (producto) => producto.id === id)
    carrito.push(producto)
    console.log(carrito)
    renderizarTotal()


    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, rgb(43, 0, 0), rgb(167, 16, 16))",
        }
        }).showToast();

    localStorage.setItem("productos", JSON.stringify(carrito))
}

const renderizarNumerito = () => {
    numerito.innerText = carrito.length
    localStorage.setItem("numerito", JSON.stringify(carrito.length))
}


//******************************* MODAL */
function renderizarProductos() {
    
    productosEnCarrito.innerHTML = ''

    carrito.forEach(producto => {
        const productoContainer = document.createElement("div")
        productoContainer.className = "productoEnCarrito"
        productoContainer.innerHTML = `
                    <img src="${producto.img}" alt="">
                    <h5>${producto.nombre}</h5>
                    <p>$${producto.precio}</p>
        `

        const botonEliminar = document.createElement("button")
        botonEliminar.className = "eliminarProducto"
        botonEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`

        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(producto.id)
            renderizarNumerito()
            renderizarProductos()
            renderizarTotal()
        })

        productoContainer.append(botonEliminar)
        productosEnCarrito.append(productoContainer)
    })  
    
}


carritoBoton.addEventListener("click", () => {
    renderizarModal()
})

cerrarCarrito.addEventListener("click", ()=> {
    cerrarModal()
})


const renderizarModal = () => {
    modal.classList.remove("desabilitado")
    modal.classList.add("modalContainer")
}

const cerrarModal = () => {
    modal.classList.add("desabilitado")
    modal.classList.remove("modalContainer")
}

btnVaciarCarrito.addEventListener("click", () => {
    vaciarCarrito()
    renderizarTotal()
    modal.classList.add("desabilitado")
    modal.classList.remove("modalContainer")

        carritoBoton.classList.add("desabilitado")
        carritoBoton.classList.remove("carritoBoton")
})

botonFinalizar.addEventListener("click", () => {
    finalizarCompra()
    renderizarTotal()
        carritoBoton.classList.add("desabilitado")
        carritoBoton.classList.remove("carritoBoton")
})


function vaciarCarrito() {
    if (carrito.length >= 1) {
        carrito.length = 0
        localStorage.setItem("productos", JSON.stringify(carrito))
        console.log(carrito)
        renderizarNumerito()
        renderizarProductos()
        Swal.fire('Tu carrito se vació exitosamente.')
        modal.className = "desabilitado"
    }
} 



function eliminarDelCarrito (id) {
    const index = carrito.findIndex(producto => producto.id === id)
    carrito.splice(index, 1)
    renderizarNumerito()
    renderizarProductos()
    console.log(carrito)

    if (carrito.length === 0) {
        cerrarModal()
        carritoBoton.classList.add("desabilitado")
        carritoBoton.classList.remove("carritoBoton")   
        Swal.fire('Tu carrito se vació exitosamente.')
    }

    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, rgb(43, 0, 0), rgb(167, 16, 16))",
        }
        }).showToast();

    localStorage.setItem("productos", JSON.stringify(carrito))
}

function finalizarCompra() {
    if (carrito.length >= 1) {
        carrito.length = 0
        localStorage.setItem("productos", JSON.stringify(carrito))
        console.log(carrito)
        renderizarNumerito()
        renderizarProductos()
        Swal.fire('Tu compra se confirmó exitosamente.')
        modal.className = "desabilitado"
    }
} 

function renderizarTotal() {
    let total = 0 
    carrito.forEach((producto) => {
        total += producto.precio
    })

    precioTotal.innerText = "$" + total
}

