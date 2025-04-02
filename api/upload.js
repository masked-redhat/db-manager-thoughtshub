import formidable from "formidable";
import fs from "fs"

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

  const form = new formidable.IncomingForm();
  form.keepExtensions = true; // Keep file extensions

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing file:", err);
      return res.status(500).json({ error: "File parsing error" });
    }

    const file = files.file; // Assuming the frontend sends the file under "file"
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read file content
    const fileStream = fs.createReadStream(file.filepath);

    // Create a new FormData object to send to your backend
    const formData = new FormData();
    formData.append("file", fileStream, file.originalFilename);

    // Forward the request to your backend
    try {
      const backendResponse = await fetch(targetUrl, {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(), // Automatically set correct headers
      });

      const backendData = await backendResponse.json();
      res.status(backendResponse.status).json(backendData);
    } catch (error) {
      console.error("Error forwarding request:", error);
      res.status(500).json({ error: "Error forwarding request" });
    }
  });
}
