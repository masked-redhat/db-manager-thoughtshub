export default async function handler(req, res) {
  // Check if body exists and is already parsed
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  // Extract the target URL
  const targetUrl = body?.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing target URL" });
  }

  try {
    // Prepare headers
    const headers = {
      "Content-Type":
        req.headers["content-type"] || req.headers["Content-Type"],
    };

    // Only add auth_token if it exists
    if (req.headers.auth_token) {
      headers.auth_token = req.headers.auth_token;
    }

    // Forward the request to the target API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      return res.status(response.status).json({
        error: `API returned ${response.status}`,
        details: errorData,
      });
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    return res.status(500).json({
      error: "Proxy error",
      message: error.message,
      success: false,
    });
  }
}
