import getData from "@/utils/getData";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let page = searchParams.get('page');
    let query = searchParams.get('query');
    if (!page) page = 1;
    const data = await getData('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.TMDB_API + '&language=en-US&page=' + page + '&query=' + query);
    
    return Response.json({data});
}