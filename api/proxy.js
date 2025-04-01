export default async function handler(req, res) {
  // Extract the target URL from query parameters or body
  const targetUrl = req.query.url || req.body.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing target URL" });
  }

  try {
    // Forward the request to the target API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["Content-Type"],
        auth_token: req.headers.auth_token ?? null,
      },
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    // Forward the response from the API to the client
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", success: false });
  }
}
