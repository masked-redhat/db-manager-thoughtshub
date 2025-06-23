export const PATH = {
    insight: "/news",
    categories: "/categories",
    category: "/category",
    forum: "/forums",
    forumAppreciation: "/forums/appreciation",
    forumComment: "/forums/comments",
    user: "/users",
    reportForum: "/report/forums",
    feedback: "/feedback",
    log: "/logs",
    activity: "/activity",
    imageConfig: "/upload-max-size-image-change",
    wordle: "/wordle",
    wordleWord: "/wordle/words",
    notification: "/notify"
}

class BackendService {
    static baseUrl = "https://api.thoughtshub.agency";

    constructor(private authToken: string | null) { }

    fetch = async (
        requestType: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD",
        pathname: string,
        body: Record<string, unknown> | null = null,
        query: Record<string, unknown> | null = null
    ): Promise<{ ok: boolean; json: any }> => {
        let queries = "";
        for (const q in query)
            queries += `${q}=${query[q]}`
        queries = encodeURIComponent(queries);
        pathname = pathname + (queries.length === 0 ? "" : `?${queries}`)

        try {
            const response = await fetch(BackendService.url(pathname), {
                method: requestType,
                headers: {
                    "Content-Type": "application/json",
                    auth_token: this.authToken ?? "",
                },
                ...(BackendService.noBodyRequest(requestType)
                    ? {}
                    : { body: JSON.stringify(body) }),
            });

            const result = await response.json();
            return { ok: response.ok, json: result };
        } catch (err) {
            console.error("API fetch error:", err);
            return { ok: false, json: {} };
        }
    };

    uploadFile = async (file: File): Promise<{ ok: boolean; json: any }> => {
        const data = new FormData();
        data.append("file", file);

        try {
            const response = await fetch(BackendService.url("/upload"), {
                method: "POST",
                headers: {
                    auth_token: this.authToken ?? "",
                },
                body: data,
            });

            const result = await response.json();
            return { ok: response.ok, json: result };
        } catch (err) {
            console.error("File upload error:", err);
            return { ok: false, json: {} };
        }
    };

    fetchAdmin = async (
        requestType: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD",
        pathname: string,
        body: Record<string, unknown> | null = null,
        query: Record<string, unknown> | null = null
    ): Promise<{ ok: boolean; json: any }> => {
        return this.fetch(requestType, `/admin${pathname}`, body, query);
    };

    checkAuthToken = async (): Promise<boolean> => {
        const result = await this.fetch("GET", "/profile/me");
        return (
            typeof result.json?.message === "string" &&
            result.json.message !== "Not logged In"
        );
    };

    static noBodyRequest = (method: string): boolean =>
        ["GET", "DELETE", "HEAD"].includes(method.toUpperCase());

    static url = (pathname: string): string => `${this.baseUrl}${pathname}`;

    static setAuthTokenInBrowser = (authToken: string): void => {
        if (typeof document === "undefined") return; // Guard for SSR
        const expires = new Date();
        expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000); // ~1 Hour
        document.cookie = `authToken=${encodeURIComponent(
            authToken
        )}; expires=${expires.toUTCString()}; path=/`;
    };

    static getAuthTokenFromBrowser = (): string | null => {
        if (typeof document === "undefined") return null; // Guard for SSR
        const name = "authToken=";
        const decodedCookies = decodeURIComponent(document.cookie).split(";");
        for (let cookie of decodedCookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name)) {
                return cookie.substring(name.length);
            }
        }
        return null;
    };
}

export const APIClient = BackendService;
