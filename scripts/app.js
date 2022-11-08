//********************************************************* RENDERIZAR TARJETAS *********************************************************

let suplementosStock = [
    {id: "creatina", nombre: "Creatina Monohidratada", precio: 11000, img: "../images/creatina.jpg"},
    {id: "proteina", nombre: "Proteína en Polvo", precio: 9000, img: "../images/proteina.jpg"},
    {id: "preentreno", nombre: "Preentreno", precio: 7500, img: "../images/preentreno.jpg"}
];

const creatina = suplementosStock[0]
const carritoContador = document.querySelector("#contadorCarrito")
const productosContainer = document.querySelector(".productos-container") 
const precioTotal = document.querySelector("#precioTotal")


suplementosStock.forEach( (suplemento) =>{


    const productoTarjeta = document.createElement("div")
    productoTarjeta.className = 'producto'

    productoTarjeta.innerHTML = `
                        <img src="${suplemento.img}" alt="Creatina">
                        <h4>${suplemento.nombre}</h4>
                        <p class="producto__precio">$${suplemento.precio}</p>
    `

    const button = document.createElement('button')
    button.className = 'boton-agregar'
    button.innerHTML = `Agregar <i class="fas fa-shopping-cart"></i>`
    
    button.addEventListener('click', () => {
        agregarCarrito(suplemento.id)
    })
    productoTarjeta.append(button)
    
    productosContainer.append(productoTarjeta)
}) 


//********************************************************* AGREGAR AL CARRITO *********************************************************

const carrito = []

const carritoContainer = document.querySelector("#carrito-container")

const agregarCarrito = (id) => {
    const producto = suplementosStock.find( (suplemento) => suplemento.id === id)
    carrito.push(producto)

    console.log(carrito)
    renderizarCarrito()
    
}


const renderizarCarrito = () => {

    carritoContainer.innerHTML = ''

    carrito.forEach(suplemento => {
        const div = document.createElement("div")
        div.className = "producto-carrito"
        div.innerHTML = `
                        <p>${suplemento.nombre}</p>
                        <p>Precio $${suplemento.precio}</p>
                        <button class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
    
        carritoContainer.append(div)
    })

    renderizarCantidad()
    renderizarTotal()
}

const renderizarCantidad = () => {
    carritoContador.innerText = carrito.length
}

const renderizarTotal = () => {

    let total = 0

    carrito.forEach((suplemento)=>{
        total += suplemento.precio
    })

    precioTotal.innerText = total
}

//********************************************************* MODAL DEL CARRITO *********************************************************

const modalContainer = document.getElementsByClassName("modal-container")[0]
const modalCarrito = document.getElementsByClassName("modal-carrito")[0]
const botonCerrar = document.getElementById("cerrarCarrito")     
const botonAbrir = document.getElementById("boton-carrito")



botonAbrir.addEventListener("click", ()=>(
    modalContainer.classList.toggle("modal-active")
))

botonCerrar.addEventListener("click", ()=>(
    modalContainer.classList.toggle("modal-active")
))

