window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    let response = await fetch("http://localhost:3031/api/movies");
    let peliculas = await response.json();
    let data = peliculas.data;

    let favoriteIds = JSON.parse(sessionStorage.getItem("ids")) || [];

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const a = document.createElement("a");
      a.setAttribute("href", "formulario.html?id=" + movie.id);
      a.setAttribute("class", "botonAgregar");
      a.textContent = "Ver más";
      card.appendChild(a);

      const addButton = document.createElement("button");
      addButton.setAttribute("class", "botonAgregar");
      addButton.textContent = "Agregar a Favoritos";
      card.appendChild(addButton);

      updateButtonState(addButton, movie.id)

      addButton.addEventListener("click", () => {{
        toggleFavorite(movie.id);
        updateButtonState(addButton, movie.id)
      }})

    });
  } catch (error) {
    console.error(error);
  }

  

  function toggleFavorite(movieId) {
    let favoriteIds = JSON.parse(sessionStorage.getItem("ids")) || [];
    const index = favoriteIds.indexOf(movieId);
    if (index > -1) {
      favoriteIds.splice(index, 1);
    } else {
      favoriteIds.push(movieId);
    }
    sessionStorage.setItem("ids", JSON.stringify(favoriteIds));
  }

  function updateButtonState(button, movieId) {
    let favoriteIds = JSON.parse(sessionStorage.getItem("ids")) || [];

    if(favoriteIds.includes(movieId)){
      button.classList.add("botonFavorito")
      button.textContent = "Remover de Favoritos";
    }else{
      button.classList.remove("botonFavorito");
      button.textContent = "Agregar a Favoritos";
    }
  }


  
};