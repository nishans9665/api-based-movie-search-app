async function loadMovie() {
    let params = new URLSearchParams(window.location.search);
    let movieID = params.get("id");

    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`;
    let res = await fetch(url);
    let data = await res.json();

    const container = document.getElementById("movieDetails");

     if (!container) {
        console.error("movieDetails element not found in HTML!");
        return;
    }

    container.innerHTML = `
        <img src="${data.Poster}" alt="${data.Title}">
        
        <div>
            <h1>${data.Title}</h1>
            <p><b>Year:</b> ${data.Year}</p>
            <p><b>Genre:</b> ${data.Genre}</p>
            <p><b>Director:</b> ${data.Director}</p>
            <p><b>Actors:</b> ${data.Actors}</p>
            <p><b>Plot:</b> ${data.Plot}</p>
            <p><b>IMDB Rating:</b> ⭐ ${data.imdbRating}</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadMovie);
