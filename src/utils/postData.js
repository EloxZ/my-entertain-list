export default async function postData(url, headers, body) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return await res.json();
    } catch (error) {
        console.error('Error posting data:', error);
    }
}