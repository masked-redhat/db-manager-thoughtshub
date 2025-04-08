import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth, uploadAuth } from "../../../utils/request";
import { forumsUploadUrl, uploadUrl } from "../../../constants/server";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";

const PanelCreateForum = () => {
  const { token } = useToken();

  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [forumsUploading, setForumsUploading] = useState(false);

  const resetForm = () => {
    setFile("");
    setImageUrl("");
    setTitle("");
    setBody("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setForumsUploading(true);

    const data = { title, body, imageUrl };

    const response = await requestAuth(forumsUploadUrl, "POST", token, data);

    const result = await response.json();
    if (response.ok) {
      toast("Forum uploaded", {
        description: `Forum created with title ${title}`,
        action: {
          label: "Log",
          onClick: () => console.log(result),
        },
      });
      resetForm();
    }

    setForumsUploading(false);
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">Create Forum</h1>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2 flex flex-col gap-3">
        {/* <ForumsImageUploader
          file={file}
          setFile={setFile}
          setImageUrl={setImageUrl}
        /> */}
        <div className="flex flex-col gap-3 w-full max-w-[540px]">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Body"
            className="max-h-56"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <Button className="w-fit" disabled={forumsUploading}>
            {forumsUploading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Please wait</span>
              </>
            ) : (
              <p>Submit &rarr;</p>
            )}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

const ForumsImageUploader = ({ file, setFile, setImageUrl }) => {
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  const uploadFileAndShow = async () => {
    setUploadingFile(true);

    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadAuth(uploadUrl, formData);

    const result = await response.json();

    if (response.ok) {
      setUploadedFile(result.fileUrl);
      setImageUrl(result.fileUrl);
    }

    setUploadingFile(false);
  };

  const removeImage = () => {
    setUploadedFile("");
    setFile("");
    setUploadingFile(false);
  };

  useEffect(() => {
    if (file) uploadFileAndShow();
    else setUploadedFile("");

    return () => {};
  }, [file]);

  return (
    <div className="flex flex-col gap-1 items-center w-fit">
      <div className="w-96 h-56 bg-black rounded-md relative flex  items-center justify-center text-white group">
        {uploadedFile.length !== 0 ? (
          <>
            <img
              src={uploadedFile}
              alt=""
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              className="absolute right-0 bottom-0 mx-3 my-3 bg-black/75 cursor-pointer text-white shadow-sm opacity-0 border-0 group-hover:opacity-100"
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
              <p
                className="max-w-96 overflow-hidden truncate whitespace-nowrap
              "
              >
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

export default PanelCreateForum;
