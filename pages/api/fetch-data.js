export default async function handler(req, res) {
  const { url, method, headers, body } = req.body;

  try {
    const response = await fetch(url, {
      method: method, // The HTTP method (e.g., POST, GET, etc.)
      headers: headers, // The headers you want to send (like Content-Type, Authorization, etc.)
      body: JSON.stringify(body), // The body of the request (usually in JSON format)
    });
    const data = await response.json(); // Assuming JSON response from API

    console.log(data);

    return res.json(data);
  } catch (error) {
    return res.json({ success: false });
  }
}
