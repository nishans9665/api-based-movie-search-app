let API_KEY = "2f426807";

// search movies (runs once)
function searchMovie() {
    let input = document.getElementById("searchInput");

    // Add event listener only once
    input.addEventListener("keyup", async function (event) {
        if (event.key === "Enter") {
            let query = this.value.trim();

            if (!query) {
                document.getElementById("results").innerHTML = "Please type a movie name !";
                return;
            }

            searchAndDisplay(query);
        }
    });
}

// main search funtion (used by Enter + keyword)
async function searchAndDisplay(query) {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    let res = await fetch(url);
    let data = await res.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        document.getElementById("results").innerHTML = "No movies found!";
    }
}

function displayMovies(list) {
    let html = "";

    let limitedList = list.slice(0, 8);

    limitedList.forEach(movie => {
        html += `
        <div class="movie-card" onclick="openMovie('${movie.imdbID}')">
            <img src="${movie.Poster}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>`;
    });

    document.getElementById("results").innerHTML = html;

    // Auto scroll to results
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}


function openMovie(id) {
    window.location.href = `movie.html?id=${id}`;
}


let randomList = ["thriller", "avengers", "love", "war", "matrix"];

async function randomMovie() {
    let keyword = randomList[Math.floor(Math.random() * randomList.length)];
    searchAndDisplay(keyword);
}

let topRateList = [
    "The Shawshank Redemption", "The Godfather", "The Dark Knight",
    "The Godfather Part II", "12 Angry Men", "Schindler's List",
    "The Lord of the Rings: The Return of the King", "Pulp Fiction",
    "The Good, the Bad and the Ugly", "Forrest Gump", "Fight Club",
    "Inception", "The Lord of the Rings: The Fellowship of the Ring",
    "The Matrix", "Goodfellas", "Star Wars: Episode V - The Empire Strikes Back",
    "Interstellar", "Spirited Away", "Saving Private Ryan",
    "The Green Mile", "Parasite", "Leon: The Professional",
    "The Silence of the Lambs", "Gladiator"
];


async function loadTopRatedMovies() {
    let container = document.getElementById("topMovies");
    container.innerHTML = "<p>Loading...</p>";

    let output = "";

    for (let title of topRateList) {
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;

        try {
            let res = await fetch(url);
            let data = await res.json();

            if (data.Response === "True") {
                output += `
                    <div class="movie-card" onclick="openMovie('${data.imdbID}')">
                        <img src="${data.Poster !== "N/A" ? data.Poster : 'assets/images/no-image.jpg'}" alt="${data.Title}">
                        <h4>${data.Title}</h4>
                        <p>⭐ ${data.imdbRating}</p>
                    </div>
                `;
            }
        } catch (error) {
            console.log("Error loading movie:", error);
        }
    }

    container.innerHTML = output;
}

// keyword search (no extra event listener)
function keywordSearch(key) {
    document.getElementById("searchInput").value = key;
    searchAndDisplay(key);
}

// run on load
document.addEventListener("DOMContentLoaded", loadTopRatedMovies);
document.addEventListener("DOMContentLoaded", searchMovie);

