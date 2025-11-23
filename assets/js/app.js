const API_KEY = "2f426807";

async function searchMovie() {
    const query = document.getElementById("searchInput").value;
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.Search) {
        displayMovies(data.Search);
    } else {
        document.getElementById("results").innerHTML = "No movies found!";
    }
}

function displayMovies(list) {
    let html = "";
    list.forEach(movie => {
        html += `
        <div class="movie-card" onclick="openMovie('${movie.imdbID}')">
            <img src="${movie.Poster}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>`;
    });

    document.getElementById("results").innerHTML = html;
}

function openMovie(id) {
    window.location.href = `movie.html?id=${id}`;
}

// Random Movie
const randomList = ["batman", "avengers", "love", "war", "matrix"];

async function randomMovie() {
    const keyword = randomList[Math.floor(Math.random() * randomList.length)];
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.Search) {
        const random = data.Search[Math.floor(Math.random() * data.Search.length)];
        openMovie(random.imdbID);
    }
}

// Keyword Search
function keywordSearch(key) {
    document.getElementById("searchInput").value = key;
    searchMovie();
}