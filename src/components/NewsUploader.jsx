import { useState } from "react";
import { useToken } from "../providers/AdminTokenProvider";
import { newsUploadUrl, proxyUrl } from "../../constants/server";
import { inProduction } from "../../constants/env";
import FileUploader from "./FileUploader";

export default function NewsForm() {
  const { token } = useToken();
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    imageUrl: "",
    category: "",
    newsUrl: "",
  });
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const pullNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newsData = { ...formData };
    newsData.imageUrl = fileUrl;
    setFormData(newsData);
    console.log(newsData);
    console.log(fileUrl);

    try {
      const response = await fetch(newsUploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
        body: JSON.stringify({ ...newsData }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setFormData({
          title: "",
          body: "",
          imageUrl: "",
          category: "",
          newsUrl: "",
        });
        setFile(null);
        setUploaded(false);
        setNotification({
          type: "success",
          message: "News submitted successfully!",
        });
        pullNotification();
      } else {
        setNotification({ type: "error", message: "Failed to submit news." });
        pullNotification();
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setNotification({
        type: "error",
        message: "An error occurred while submitting.",
      });
      pullNotification();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Submit News</h2>
        {notification && (
          <div
            className={`p-2 mb-4 text-white text-center rounded ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Body"
            required
          />

          <FileUploader
            setUrl={setFileUrl}
            file={file}
            setFile={setFile}
            uploaded={uploaded}
            setUploaded={setUploaded}
          />

          <input
            className="w-full p-2 border rounded"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <input
            className="w-full p-2 border rounded"
            name="newsUrl"
            value={formData.newsUrl}
            onChange={handleChange}
            placeholder="News URL"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
