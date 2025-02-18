const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
//El identificador es una clase falto el punto
const $n = document.querySelector('.name');
const $b = document.querySelector('.blog');
const $l = document.querySelector('.location');

//Agregue el modificador async
async function displayUser(username) {
  $n.textContent = 'cargando...';
  //Creo la variable Object en donde se guardaran los datos procesados del response
  let datos = {}
  //Borre la declaración de la variable por que no se puede usar previo a su declaración
  await fetch(`${usersEndpoint}/${username}`).then(response => response.json()).then(data => datos = data);
  //el nombre de usuario se encuentra en el campo name
  $n.textContent = `${datos.name}`;
  //el blog del usuario se encuentra en el campo blog
  $b.textContent = `${datos.blog}`;
  //la locacion del usuario se encuentra en el campo location
  $l.textContent = `${datos.location}`;
}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  n.textContent = `Algo salió mal: ${err}`
}
//No hay error aqui
displayUser('stolinski').catch(handleError);