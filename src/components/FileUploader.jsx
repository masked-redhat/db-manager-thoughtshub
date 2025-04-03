import { useState } from "react";
import { inProduction } from "../../constants/env";
import { apiUrl, proxyUploadUrl, uploadUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";

export default function FileUploader({
  setUrl,
  file,
  setFile,
  uploaded,
  setUploaded,
}) {
  const { token } = useToken();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(uploadUrl, { method: "POST", body: formData });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      setUrl(`${apiUrl}${result.fileUrl}`);
      setUploaded(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md w-full">
      {file ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Selected File:</p>
          <p className="text-gray-600">{file.name}</p>
          <div className="flex gap-2">
            {uploaded ? (
              <p>Uploaded...</p>
            ) : (
              <>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => setFile(null)}
                >
                  Change File
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={(e) => handleUploadFile(e)}
                >
                  Upload File
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <input
          className="w-full cursor-pointer"
          type="file"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
}
