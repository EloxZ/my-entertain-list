import getData from "@/utils/getData";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let page = searchParams.get('page');
    const query = searchParams.get('query');
    const id = searchParams.get('id');
    if (!page) page = 1;
    let data;
    if (id) {
        data = await getData('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + process.env.TMDB_API);
    } else {
        data = await getData('https://api.themoviedb.org/3/search/tv?api_key=' + process.env.TMDB_API + '&language=en-US&page=' + page + '&query=' + query);
    }
    
    
    return Response.json({data});
}