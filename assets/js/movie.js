const API_KEY = "2f426807";

const params = new URLSearchParams(window.location.search);
const movieID = params.get("id");

async function loadMovie() {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`;
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("movieDetails").innerHTML = `
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

loadMovie();
