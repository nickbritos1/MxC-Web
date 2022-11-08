let nombreUsuario = prompt("Ingrese su nombre")
if(nombreUsuario == ""){
    alert("Nombre de Usuario no Válido")
}  else {
    alert("Bienvenido/a " + nombreUsuario)
}

let suplemento = prompt("Tomas suplementos?\n(Si/No)")
if(suplemento == "si" || suplemento == "Si"){
    compra()
} else{
    alert("Lo sentimos " + nombreUsuario + ", no podemos ayudarte")
}

function compra(){

    let proteina = 8500;
    let creatina = 10500;
    let preentreno = 7000;
    let precioFinal = 0;
    let compraRealizada = true;

    function masEnvio(precio) {
        return precioFinal = (precio + 650)
    }

    let carrito = parseInt(prompt("Elige el número de lo que deseas comprar\n1. Proteina en Polvo\n2. Creatina\n3. Preentreno"))

    while (compraRealizada == true) {
        switch(carrito) {
            case 1: 
                masEnvio(proteina)
                alert("El precio de la Proteina en Polvo es de $" +precioFinal+ " con envío incluído")
                compraRealizada = false;
                break;
            case 2: 
                masEnvio(creatina)
                alert("El precio de la Creatina es de $" +precioFinal+ " con envío incluído")
                compraRealizada = false;
                break;
            case 3: 
                masEnvio(preentreno)
                alert("El precio del Preentreno es de $" +precioFinal+ " con envío incluído")
                compraRealizada = false;
                break;
            default:
                alert("Espero haberte ayudado " +nombreUsuario+", muchas gracias")
                compraRealizada = false;
                break;
        }
    }
}

