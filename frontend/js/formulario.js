const $ = (id) => document.getElementById(id);
const urlBase = "http://localhost:3031/api/movies/";

window.onload = async () => {
  let query = new URLSearchParams(location.search);
  let id = query.has('id') && query.get('id');
  const qs = (search) => {
    return document.querySelector(search);
  };

  try {
    let response = await fetch(urlBase + id);
    let peliculas = await response.json();
    let { title, rating, awards, length: duracion, release_date, genre_id } =
      peliculas.data;
    let releaseDateFormatted = moment(release_date).format('YYYY-MM-DD');

    $('title').value = title;
    $('rating').value = rating;
    $('awards').value = awards;
    $('length').value = duracion;
    $('genre_id').value = genre_id;
    $('release_date').value = releaseDateFormatted;
  } catch (error) {
    console.error(error);
  }

  if (id) {
    document.querySelector('.boton-crear').disabled = true;
    document.querySelector('.boton-eliminar').disabled = false;
  } else {
    document.querySelector('.boton-crear').disabled = false;
    document.querySelector('.boton-eliminar').disabled = true;
  }

  document.querySelector('.boton-editar').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(urlBase + 'update/' + id, {
        method: 'PUT',
        body: JSON.stringify({
          title: $('title').value,
          rating: $('rating').value,
          awards: $('awards').value,
          length: $('length').value,
          genre_id: $('genre_id').value,
          release_date: $('release_date').value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let successMessage = 'Película editada con éxito';

      let body = qs('body');
      const edit = document.createElement('h2');
      edit.innerText = successMessage;
      body.appendChild(edit);

      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });

  document.querySelector('.boton-crear').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(urlBase + 'create', {
        method: 'POST',
        body: JSON.stringify({
          title: $('title').value,
          rating: $('rating').value,
          awards: $('awards').value,
          length: $('length').value,
          genre_id: $('genre_id').value,
          release_date: $('release_date').value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let successMessage = 'Película creada con éxito';

      let body = qs('body');
      const edit = document.createElement('h2');
      edit.innerText = successMessage;
      body.appendChild(edit);

      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });

  document.querySelector('.boton-eliminar').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(urlBase + 'delete/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    
      let successMessage = 'Película eliminada con éxito';

      let body = qs('body');
      const edit = document.createElement('h2');
      edit.innerText = successMessage;
      body.appendChild(edit);

      let result = await response.json();
      console.log(result);

      window.location.href = 'home.html'; // Redireccionar a home.html
    } catch (error) {
      console.log(error);
    }
  

  });
};
