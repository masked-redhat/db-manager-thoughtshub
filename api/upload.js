import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Important: Disable default body parser
  },
};

export default async function handler(req, res) {
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

  try {
    const form = formidable({ keepExtensions: true }); // ✅ Correct way to use formidable

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing file:", err);
        return res.status(500).json({ error: "File parsing error" });
      }

      const file = files.file; // Assuming frontend sends the file under "file"
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Read file content
      const fileStream = fs.createReadStream(file.filepath);

      // Create FormData to send to backend
      const formData = new FormData();
      formData.append("file", fileStream, file.originalFilename);

      // Forward request to your backend
      const backendResponse = await fetch(targetUrl, {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(), // Ensure correct headers
      });

      const backendData = await backendResponse.json();
      res.status(backendResponse.status).json(backendData);
    });
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
