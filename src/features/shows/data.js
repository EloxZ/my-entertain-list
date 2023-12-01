import getData from "@/utils/getData";

async function getAiringTodayShows(page) {
    return getData('http://localhost:3000/api/shows/airing_today?page='+page);
}

async function getOnTheAirShows(page) {
    return getData('http://localhost:3000/api/shows/on_the_air?page='+page);
}

async function getPopularShows(page) {
    return getData('http://localhost:3000/api/shows/popular?page='+page);
}

async function getTopRatedShows(page) {
    return getData('http://localhost:3000/api/shows/top?page='+page);
}

async function getSearchShows(query, page) {
    return getData('http://localhost:3000/api/shows?page='+page+'&query='+query);
}

async function getShowDetails(id) {
    return getData('http://localhost:3000/api/shows?id='+id);
}

async function getShowTrailer(id) {
    return getData('http://localhost:3000/api/shows/trailer?id='+id);
}

export {
    getAiringTodayShows,
    getOnTheAirShows,
    getPopularShows,
    getTopRatedShows,
    getSearchShows,
    getShowTrailer,
    getShowDetails
}