type SupportedMethods = "GET" | "POST" | "PUT" | "DELETE";

export const TOKEN_KEY = "token";

async function fetcher(url: string, method: SupportedMethods, rawData?: unknown) {
    const headers: HeadersInit = {};
    const options: RequestInit = {
        method,
        headers,
    };

    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (method === "POST" || method === "PUT") {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(rawData);
    }

    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(process.env.SERVER_URL + url, options);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                console.error(data);
                if (data.message) {
                    alert(data.message);
                }
                reject(data);
            }
        } catch (error) {
            const err = error as Error;
            console.error(error);
            reject(error);
            if (err.message) {
                alert(err.message);
            }
        }
    });
}

export const GET = (url: string) => fetcher(url, "GET");
export const DELETE = (url: string) => fetcher(url, "DELETE");
export const PUT = (url: string, data: any) => fetcher(url, "PUT", data);
export const POST = (url: string, data: any) => fetcher(url, "POST", data);
