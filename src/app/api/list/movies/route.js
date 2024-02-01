//6318cdd7b4629f715e57e8b6
import { headers } from 'next/headers'
import { MongoClient, ObjectId } from 'mongodb';
import { movieStatus } from '@/utils/status';
import getData from "@/utils/getData";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const movieId = searchParams.get('movieId');
    const mongodbUri = process.env.MONGODB_URI;
    if (!userId) return Response.json({ message: 'userId query param is missing' });

    let client;
    try {
        client = await MongoClient.connect(mongodbUri);
        const db = client.db();

        const users = db.collection('users');
        const userExist = await users.findOne({ _id: new ObjectId(userId) });
        if (!userExist) return Response.json({ message: 'User does not exist' });

        const collection = db.collection('lists');
        const result = await collection.findOne({ userId: new ObjectId(userId) });
    
        if (result) {
            const movies = ((movieId && !isNaN(parseInt(movieId)))? result.movies.find((dbmovie)=>dbmovie.id == parseInt(movieId)) : result.movies) || [];
            return Response.json({ movies: movies });
        } else {
            return Response.json({ movies: [] });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Response.json({ message: 'Internal error' });
    } finally {
        client?.close();
    }
}

export async function POST(request) {
    const headersList = headers();
    const userId = headersList.get('userId');
    const body = await request.json();
    const mongodbUri = process.env.MONGODB_URI;
    let client;

    try {
        client = await MongoClient.connect(mongodbUri);
        const db = client.db();
        
        const users = db.collection('users');
        const userExist = await users.findOne({ _id: new ObjectId(userId) });
        if (!userExist) return Response.json({ message: 'User does not exist' });

        let movie;
        if (await isBodyValid(body)) {
            movie = {
                id: body.id,
                score: body.score,
                status: body.status
            }
        } else {
            return Response.json({ message: 'Invalid body format' });
        }

        const collection = db.collection('lists');
        const existingDocument = await collection.findOne({ userId: new ObjectId(userId) });
        
        if (existingDocument) {
            const moviesWithoutNew = (existingDocument.movies)? existingDocument.movies.filter((dbmovie)=>dbmovie.id != movie.id) : [];
            const updatedmovies = [...moviesWithoutNew, movie];
            await collection.updateOne(
                { userId: new ObjectId(userId) },
                { $set: { movies: updatedmovies } }
            );

            return Response.json({ message: 'Movie added to list' });
        } else {
            await collection.insertOne({
                userId: new ObjectId(userId),
                movies: [movie],
            });

            return Response.json({ message: 'Movie added to list' });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Response.json({ message: 'Internal error' });
    } finally {
        client?.close();
    }
}

async function isBodyValid(body) {
    let isValid = body.id != undefined && Number.isInteger(body.id) && body.score != undefined && !isNaN(parseFloat(body.score)) && body.status != undefined && movieStatus.includes(body.status);

    if (isValid) {
        const apiRes = await getData('https://api.themoviedb.org/3/movie/' + body.id + '?api_key=' + process.env.TMDB_API);
        isValid = apiRes && apiRes.id;
    }
    
    return isValid;
}

export async function DELETE(request) {
    const headersList = headers();
    const userId = headersList.get('userId');
    const movieId = headersList.get('movieId');

    if (!userId || !movieId) return Response.json({ message: 'Parameters missing' });

    const mongodbUri = process.env.MONGODB_URI;
    let client;

    try {
        client = await MongoClient.connect(mongodbUri);
        const db = client.db();
        
        const users = db.collection('users');
        const userExist = await users.findOne({ _id: new ObjectId(userId) });
        if (!userExist) return Response.json({ message: 'User does not exist' });

        const collection = db.collection('lists');
        const query = { userId: new ObjectId(userId) };
        const update = {
            $pull: { movies: { id: parseInt(movieId) } }
        };
        
        const result = await collection.updateOne(query, update);

        if (result.modifiedCount == 0) {
            return Response.json({ message: 'Movie not found in list' });
        } else {
            return Response.json({ message: 'Movie removed from list' });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Response.json({ message: 'Internal error' });
    } finally {
        client?.close();
    }
}