export default async function deleteData(url, headers, body) {
    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return await res.json();
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}