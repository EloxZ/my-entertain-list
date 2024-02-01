//6318cdd7b4629f715e57e8b6
import { headers } from 'next/headers'
import { MongoClient, ObjectId } from 'mongodb';
import { showStatus } from '@/utils/status';
import getData from "@/utils/getData";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const showId = searchParams.get('showId');
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
            const shows = ((showId && !isNaN(parseInt(showId)))? result.shows.find((dbShow)=>dbShow.id == parseInt(showId)) : result.shows) || [];
            return Response.json({ shows: shows });
        } else {
            return Response.json({ shows: [] });
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

        let show;
        if (await isBodyValid(body)) {
            show = {
                id: body.id,
                score: body.score,
                episodes: body.episodes,
                status: body.status
            }
        } else {
            return Response.json({ message: 'Invalid body format' });
        }

        const collection = db.collection('lists');
        const existingDocument = await collection.findOne({ userId: new ObjectId(userId) });
        
        if (existingDocument) {
            const showsWithoutNew = (existingDocument.shows)? existingDocument.shows.filter((dbShow)=>dbShow.id != show.id) : [];
            const updatedShows = [...showsWithoutNew, show];
            await collection.updateOne(
                { userId: new ObjectId(userId) },
                { $set: { shows: updatedShows } }
            );

            return Response.json({ message: 'Show added to list' });
        } else {
            await collection.insertOne({
                userId: new ObjectId(userId),
                shows: [show],
            });

            return Response.json({ message: 'Show added to list' });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Response.json({ message: 'Internal error' });
    } finally {
        client?.close();
    }
}

async function isBodyValid(body) {
    let isValid = body.id != undefined && Number.isInteger(body.id) && body.score != undefined && !isNaN(parseFloat(body.score)) && body.episodes != undefined && Number.isInteger(body.episodes) && body.status != undefined && showStatus.includes(body.status);

    if (isValid) {
        const apiRes = await getData('https://api.themoviedb.org/3/tv/' + body.id + '?api_key=' + process.env.TMDB_API);
        isValid = apiRes && apiRes.id;
    }
    
    return isValid;
}

export async function DELETE(request) {
    const headersList = headers();
    const userId = headersList.get('userId');
    const showId = headersList.get('showId');

    if (!userId || !showId) return Response.json({ message: 'Parameters missing' });

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
            $pull: { shows: { id: parseInt(showId) } }
        };
        
        const result = await collection.updateOne(query, update);

        if (result.modifiedCount == 0) {
            return Response.json({ message: 'Show not found in list' });
        } else {
            return Response.json({ message: 'Show removed from list' });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Response.json({ message: 'Internal error' });
    } finally {
        client?.close();
    }
}