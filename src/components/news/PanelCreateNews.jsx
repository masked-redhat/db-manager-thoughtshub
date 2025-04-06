import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadAuth } from "../../../utils/request";
import { uploadUrl } from "../../../constants/server";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PanelCreateNews = () => {
  const [file, setFile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">Create News</h1>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2">
        <NewsImageUploader file={file} setFile={setFile} />
        <Input type="text" placeholder="Title" />
        <Textarea placeholder="Body" />
      </form>
    </section>
  );
};

const NewsImageUploader = ({ file, setFile }) => {
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  const uploadFileAndShow = async () => {
    setUploadingFile(true);

    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadAuth(uploadUrl, formData);

    const result = await response.json();

    if (response.ok) setUploadedFile(result.fileUrl);

    setUploadingFile(false);
  };

  const removeImage = () => {
    setUploadedFile("");
    setFile("");
    setUploadingFile(false);
  };

  useEffect(() => {
    uploadFileAndShow();

    return () => {};
  }, [file]);

  return (
    <div>
      <div className="w-96 h-56 bg-black rounded-md relative flex items-center justify-center text-white group">
        {uploadedFile.length !== 0 ? (
          <>
            <img
              src={uploadedFile}
              alt=""
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              className="absolute right-0 bottom-0 mx-3 my-3 bg-black/75 border-gray-500 cursor-pointer text-white shadow-sm  opacity-0 group-hover:opacity-100"
              onClick={removeImage}
            >
              Remove
            </Button>
          </>
        ) : uploadingFile ? (
          <p className="flex gap-2">
            <Loader2 className="animate-spin" /> <span>Uploading...</span>
          </p>
        ) : (
          <p>No Image selected</p>
        )}
      </div>
      {file ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="max-w-96 overflow-hidden truncate whitespace-nowrap">
                <span className="font-bold">Image:</span> {file.name}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-96">{file.name}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Input
          type="file"
          value={file}
          onChange={(e) => setFile(e.target.files?.[0])}
          accept="image/*"
          className="w-96"
        />
      )}
    </div>
  );
};

export default PanelCreateNews;
