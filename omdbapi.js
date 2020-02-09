const API_KEY = '938ba536';

export async function searchMovies(term, pageNumber) {
    return fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${term}&page=${pageNumber}`)
        .then(response => response.json());
}

export async function getMovieDetails(id) {
    return fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
        .then(response => response.json());
}