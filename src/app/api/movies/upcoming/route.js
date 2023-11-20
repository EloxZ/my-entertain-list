import getData from "@/utils/getData";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    let page = searchParams.get('page')
    if (!page) page = 1;
    const data = await getData('http://api.themoviedb.org/3/movie/upcoming?api_key=' + process.env.TMDB_API + '&language=en-US&page=' + page);
    
    return Response.json({data});
}