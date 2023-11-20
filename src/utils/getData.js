export default async function getData(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return await res.json();;

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}