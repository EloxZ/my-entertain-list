import getData from "@/utils/getData";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
        return Response.json({});
    }

    const data = await getData('http://api.themoviedb.org/3/tv/' + id + '/videos?api_key=' + process.env.TMDB_API);
    const res = data.results?.find(result => result.type === 'Trailer' && result.site === 'YouTube');
    return Response.json({res});
}