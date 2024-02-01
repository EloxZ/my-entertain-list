import getData from "@/utils/getData";
import postData from "@/utils/postData";
import deleteData from "@/utils/deleteData";

const HOST = "https://myentertainlist.netlify.app";

async function getAiringTodayShows(page) {
    return getData(HOST + '/api/shows/airing_today?page='+page);
}

async function getOnTheAirShows(page) {
    return getData(HOST + '/api/shows/on_the_air?page='+page);
}

async function getPopularShows(page) {
    return getData(HOST + '/api/shows/popular?page='+page);
}

async function getTopRatedShows(page) {
    return getData(HOST + '/api/shows/top?page='+page);
}

async function getSearchShows(query, page) {
    return getData(HOST + '/api/shows?page='+page+'&query='+query);
}

async function getShowDetails(id) {
    return getData(HOST + '/api/shows?id='+id);
}

async function getShowTrailer(id) {
    return getData(HOST + '/api/shows/trailer?id='+id);
}

async function getListShows(userId, showId) {
    let query = HOST + '/api/list/shows?userId='+userId;
    if (showId) query += '&showId='+showId;
    return getData(query);
}

async function addShowToList(userId, show) {
    const headers = {
        'Content-Type': 'application/json',
        'userId': userId,
    }

    return postData(HOST + '/api/list/shows', headers, show);
}

async function deleteShowFromList(userId, showId) {
    const headers = {
        'Content-Type': 'application/json',
        'userId': userId,
        'showId': showId,
    }

    return deleteData(HOST + '/api/list/shows', headers, {});
}

export {
    getAiringTodayShows,
    getOnTheAirShows,
    getPopularShows,
    getTopRatedShows,
    getSearchShows,
    getShowTrailer,
    getShowDetails,
    getListShows,
    addShowToList,
    deleteShowFromList
}