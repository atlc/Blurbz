type SupportedMethods = "GET" | "POST" | "PUT" | "DELETE";

async function fetcher(url: string, method: SupportedMethods, rawData?: unknown) {
    const headers: HeadersInit = {};
    const options: RequestInit = {
        method,
        headers,
    };

    if (method === "POST" || method === "PUT") {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(rawData);
    }

    try {
        const res = await fetch(process.env.SERVER_URL + url, options);
        const data = await res.json();

        if (res.ok) {
            return data;
        } else {
            console.error(data);
            if (data.message) {
                alert(data.message);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export const GET = (url: string) => fetcher(url, "GET");
export const DELETE = (url: string) => fetcher(url, "DELETE");
export const PUT = (url: string, data: any) => fetcher(url, "PUT", data);
export const POST = (url: string, data: any) => fetcher(url, "POST", data);
