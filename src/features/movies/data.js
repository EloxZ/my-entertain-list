import getData from "@/utils/getData";

async function getNowPlayingMovies(page) {
    return getData('http://localhost:3000/api/movies/playing?page='+page);
}

async function getPopularMovies(page) {
    return getData('http://localhost:3000/api/movies/popular?page='+page);
}

async function getTopRatedMovies(page) {
    return getData('http://localhost:3000/api/movies/top?page='+page);
}

async function getUpcomingMovies(page) {
    return getData('http://localhost:3000/api/movies/upcoming?page='+page);
}

async function getSearchMovies(query, page) {
    return getData('http://localhost:3000/api/movies?page='+page+'&query='+query);
}

export {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getSearchMovies
}