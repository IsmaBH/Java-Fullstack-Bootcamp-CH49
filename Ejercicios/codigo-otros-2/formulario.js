//El identificador es una clase no un id y el nombre es formulario
var formulario = document.querySelector(".formulario");
//Los elementos del form es mejor importarlos con su id
const invitadoNombre = document.getElementById("name");
const invitadoEdad = document.getElementById("age");
const invitadoNacionalidad = document.getElementById("nationality");
//Aqui se declara el div contenedor de la lista de invitados
const listaInvitados = document.getElementById("listaInvitados");
//Para poder identificar al elemento de la tabla que eliminamos necesitamos una especie de id
let id = 0;

//Se crea un eventListener refactorizado para el boton que envia a guardar al invitado
formulario.addEventListener("submit", function(event) {
  event.preventDefault();
  let isValid = true;
  if (invitadoNombre.value.length < 3){
    invitadoNombre.style.border = "1px solid red";
    isValid = false;
  }
  if (Number(invitadoEdad.value) < 18 || Number(invitadoEdad.value) > 120){
    invitadoEdad.style.border = "1px solid red";
    isValid = false;
  }
  if (isValid){
    id += 1;
    agregarInvitado(id,invitadoNombre.value,invitadoEdad.value,invitadoNacionalidad.value);
    invitadoNombre.value = "";
    invitadoEdad.value = "";
    invitadoNombre.style.border = "";
    invitadoEdad.style.border = "";
    invitadoNombre.autofocus;
  }
});

//El boton eliminar invitado deberia ser creado a un lado del invitado que se va a eliminar

function agregarInvitado(id,nombre, edad, nacionalidad) {
  //Como la nacionalidad ya se tiene expandida desde el HTML ya no es necesario hacerlo aqui
  //El elemento de la lista de invitados deberia ser obtenido desde el principio
  //El elemento creado para los invitados deberia declarase como una variable html
  //Como es una lista seria bueno que se agregaran en una estructura de tabla por esto 
  //elementoInvitado sera un elemento tr y sus campos seran: Nombre,Edad,Nacionalidad y Acción
  //Accion sera el espacio en el que se pondra el boton eliminar
  let elementoInvitado = `<tr id="invitado_${id}">
                            <td>${nombre}</td>
                            <td>${edad}</td>
                            <td>${nacionalidad}</td>
                            <td><button onclick="eliminarInvitado(${id})" type="submit" value="${id}">Eliminar</button></td>
                          </tr>`;
  listaInvitados.insertAdjacentHTML("beforeend", elementoInvitado);
}

//Aqui se puede añadir la funionalidad de eliminar a un invitado de la lista
//Esta funcion se activa cada que se presiona el boton del invitado que se quiere eliminar
function eliminarInvitado(valor){
  const invitado = document.getElementById("invitado_"+valor);
  invitado.remove();
}