const btnAgregar = document.getElementById("btnAgregar");
const productName = document.getElementById("Name");
const productQuantity = document.getElementById("Number");
const btnClear = document.getElementById("btnClear");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//Variables de resumen
const contadorProductos = document.getElementById("contadorProductos");
const totalProdutos = document.getElementById("productosTotal");
const totalPrecio = document.getElementById("precioTotal");
//Variables para la tabla
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let cont = 0;
let costoTotal = 0;
let totalproductos = 0;
//Variable para guardar los datos de la tabla
let datos = [];

function validarCantidad(){
    if (productQuantity.value.length <= 0){
        return false;
    }
    if(isNaN(productQuantity.value)){
        return false;
    }
    if (Number(productQuantity.value) <= 0){
        return false;
    }
    return true;
}

function getPrecio(){
    return Math.round((Math.random() * 10000))/100;
}

//Funcionalidad del boton agregar
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    
    let isValid = true;
    productName.value = productName.value.trim();
    productQuantity.value = productQuantity.value.trim();

    productQuantity.style.border = "";
    productName.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if(productName.value.length < 3){
        //1.- Mostrar la alerta en el error
        //2.- borde de color rojo
        productName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }
    if (!validarCantidad()){
        productQuantity.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }
    if (isValid){
        //Agregar datos a la tabla
        let precio = getPrecio();
        cont++;
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${productName.value}</td>
                    <td>${productQuantity.value}</td>
                    <td>${precio}</td> 
                    </tr>`;
        let elemento = {
            "cont": cont,
            "nombre": productName.value,
            "cantidad": productQuantity.value,
            "precio": precio
        };
        datos.push(elemento)
        localStorage.setItem("datos", JSON.stringify(datos));
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(productQuantity.value);
        totalPrecio.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalproductos += Number(productQuantity.value);
        totalProdutos.innerText = totalproductos;
        //Almacenamiento en el localStorage
        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("totalproductos", totalproductos);
        localStorage.setItem("cont", cont);
        productName.value = "";
        productQuantity.value = "";
        productName.focus();
    }
    //console.log("Click...")
});

//Funcionalidad del boton clear
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    productName.value = "";
    productQuantity.value = "";

    cont = 0;
    costoTotal = 0;
    totalproductos = 0;
    totalPrecio.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    cuerpoTabla.innerHTML = "";
    totalProdutos.innerText = totalproductos;
    productQuantity.style.border = "";
    productName.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
});

//Carga de pagina
window.addEventListener("load", function(event){
    if(this.localStorage.getItem("costoTotal") != null){
        costoTotal = Number(this.localStorage.getItem("costoTotal", costoTotal));
    }
    if(this.localStorage.getItem("totalproductos") != null){
        totalproductos = Number(this.localStorage.getItem("totalproductos"));
    }
    if(this.localStorage.getItem("cont") != null){
        cont = Number(this.localStorage.getItem("cont"));
    }
    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    
    datos.forEach((r) => {
        let row = `<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td> 
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
    totalPrecio.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    totalProdutos.innerText = totalproductos;
});