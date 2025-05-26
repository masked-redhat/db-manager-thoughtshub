class BackendService {
    static baseUrl = "https://api.thoughtshub.agency";

    constructor(private authToken: string | null) { }

    fetch = async (requestType: string, pathname: string, body: object | null = null) => {
        try {
            const response = await fetch(BackendService.url(pathname), {
                method: requestType,
                headers: {
                    "Content-Type": "application/json",
                    auth_token: this.authToken ?? ""
                },
                ...(BackendService.noBodyRequest(requestType)
                    ? {}
                    : { body: JSON.stringify(body) }),
            });
            const result = await response.json();
            return { ok: response.ok, json: result };
        } catch (err) {
            console.log(err);
            return { ok: false, json: {} };
        }
    };

    uploadFile = async (file: any) => {
        let data = new FormData()
        data.append('file', file)

        try {
            const response = await fetch(BackendService.url("/upload"), {
                method: "POST",
                headers: {
                    auth_token: this.authToken ?? ""
                },
                body: data
            });
            const result = await response.json();
            return { ok: response.ok, json: result };
        } catch (err) {
            console.log(err);
            return { ok: false, json: {} };
        }
    }

    fetchAdmin = async (requestType: string, pathname: string, body: object | null = null) =>
        this.fetch(requestType, "/admin" + pathname, body);

    static noBodyRequest = (type: string) =>
        ["GET", "DELETE", "HEAD"].includes(type);

    static url = (pathname: string) => this.baseUrl + pathname;

    checkAuthToken = async () => {
        const result = await this.fetch("GET", "/profile/me")
        return typeof result.json?.message === 'string' && result.json.message !== "Not logged In"
    }

    static setAuthTokenInBrowser = (authToken: string) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + 1000 * 24 * 60 * 60 * 1000);
        document.cookie = `authToken=${encodeURIComponent(authToken)}; expires=${expires.toUTCString()}; path=/`;
    }

    static getAuthTokenFromBrowser = () => {
        const name = "authToken=";
        const decodedCookies = decodeURIComponent(document.cookie).split(";");
        for (let cookie of decodedCookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name)) {
                return cookie.substring(name.length);
            }
        }
        return null;
    }
}

export const APIClient = BackendService;
