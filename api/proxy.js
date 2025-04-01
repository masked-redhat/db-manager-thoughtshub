export default async function handler(req, res) {
  try {
    // Debugging: Log the incoming request
    console.log("Incoming request:", {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    // Handle GET vs POST differently
    let targetUrl;
    if (req.method === "GET") {
      targetUrl = req.query.url;
    } else {
      // For POST/PUT/etc, body is already parsed by Vercel
      targetUrl = req.body?.url;

      // If body is a string (shouldn't happen with Vercel), parse it
      if (typeof req.body === "string") {
        try {
          targetUrl = JSON.parse(req.body).url;
        } catch (parseError) {
          console.error("Body parse error:", parseError);
          return res.status(400).json({ error: "Invalid JSON body" });
        }
      }
    }

    if (!targetUrl) {
      return res.status(400).json({ error: "Missing target URL" });
    }

    console.log("Proxying to:", targetUrl);

    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: {
        // Forward only specific headers
        "Content-Type": req.headers["content-type"] || "application/json",
      },
    };

    // Add auth header if present
    if (req.headers.auth_token) {
      fetchOptions.headers.auth_token = req.headers.auth_token;
    }

    // Handle body for non-GET requests
    if (req.method !== "GET" && req.method !== "HEAD") {
      // Clone the body object, removing the url property
      const { url, ...bodyWithoutUrl } = req.body;
      fetchOptions.body = JSON.stringify(bodyWithoutUrl);
    }

    // Make the proxied request
    const response = await fetch(targetUrl, fetchOptions);

    // Handle the response
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      return res.status(response.status).send(errorText);
    }

    // Try to parse as JSON, fallback to text
    try {
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (jsonError) {
      const textData = await response.text();
      return res.status(response.status).send(textData);
    }
  } catch (error) {
    console.error("Proxy execution error:", error.message);
    return res.status(500).json({
      error: "Proxy error",
      message: error.message,
      success: false,
    });
  }
}
