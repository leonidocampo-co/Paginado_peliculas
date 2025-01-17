let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
let indicadorPaginado = document.getElementById("indicador");
console.log(btnSiguiente);

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    indicadorPaginado.innerHTML = pagina;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    indicadorPaginado.innerHTML = pagina;
    console.log(pagina);
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=54f64becfec75154281ec78ffab92988&page=${pagina}`
    );
    console.log(respuesta);

    //si la respuesta es correcta
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
               <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
               </div>
                `;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("error de autorizacion");
    } else if (respuesta.status === 404) {
      console.log("la pelicula no existe");
    } else {
      console.log("hubo un error indeterminado");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
