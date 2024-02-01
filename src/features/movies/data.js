import getData from "@/utils/getData";
import postData from "@/utils/postData";
import deleteData from "@/utils/deleteData";

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

async function getMovieDetails(id) {
    return getData('http://localhost:3000/api/movies?id='+id);
}

async function getMovieTrailer(id) {
    return getData('http://localhost:3000/api/movies/trailer?id='+id);
}

async function getListMovies(userId, movieId) {
    let query = 'http://localhost:3000/api/list/movies?userId='+userId;
    if (movieId) query += '&movieId='+movieId;
    return getData(query);
}

async function addMovieToList(userId, movie) {
    const headers = {
        'Content-Type': 'application/json',
        'userId': userId,
    }

    return postData('http://localhost:3000/api/list/movies', headers, movie);
}

async function deleteMovieFromList(userId, movieId) {
    const headers = {
        'Content-Type': 'application/json',
        'userId': userId,
        'movieId': movieId,
    }

    return deleteData('http://localhost:3000/api/list/movies', headers, {});
}

export {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getSearchMovies,
    getMovieTrailer,
    getMovieDetails,
    getListMovies,
    addMovieToList,
    deleteMovieFromList
}