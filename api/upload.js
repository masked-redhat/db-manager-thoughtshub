import { formidable } from "formidable";
import FormData from "form-data";
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
    const form = formidable({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing file:", err);
        return res.status(500).json({ error: "File parsing error" });
      }

      const file = files.file?.[0]; // Ensure file field is correctly named
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("File received in Vercel:", file);

      const fileStream = fs.createReadStream(file.filepath);

      // ✅ Prepare FormData to send to backend
      const formData = new FormData();
      formData.append("file", fileStream, file.originalFilename);

      // ✅ Forward request to backend
      const backendResponse = await fetch("https://your-backend.com/upload", {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(), // ✅ Ensure headers are correct
      });

      const backendData = await backendResponse.json();
      console.log(backendData);
      res.status(backendResponse.status).json(backendData);
    });
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
