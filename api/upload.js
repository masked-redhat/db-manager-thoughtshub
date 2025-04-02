export default async function handler(req, res) {
  try {
    // Debugging: Log the incoming request
    console.log("Incoming request:", {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    let targetUrl = req.query.url;

    if (!targetUrl) {
      return res.status(400).json({ error: "Missing target URL" });
    }

    console.log("Proxying to:", targetUrl);

    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type":
          req.headers["Content-Type"] ?? req.headers["content-type"],
      },
    };

    // Handle body for non-GET requests
    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body = req.body;
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
