import React, { useEffect, useState } from "react";
import { uploadAuth } from "../../utils/request";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { uploadUrl } from "../../constants/server";
import { toast } from "sonner";

const ImageUploader = ({ setImageUrl, imageUrl }) => {
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const [changedByimageUrl, setChangedByimageUrl] = useState(false);

  const uploadFileAndShow = async () => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadAuth(uploadUrl, formData);

    if (response.ok) {
      const result = await response.json();
      setUploadedFile(result.fileUrl);
      setImageUrl(result.fileUrl);
    } else {
      console.error(response);
      toast("Image couldn't be uploaded", { description: "Check Logs" });
    }

    setUploading(false);
  };

  const removeImage = () => {
    setUploadedFile("");
    setFile("");
    setUploadingFile(false);
    setImageUrl("");
  };

  useEffect(() => {
    if (file) uploadFileAndShow();
    else setUploadedFile("");

    return () => {};
  }, [file]);

  useEffect(() => {
    if (imageUrl === "") setFile("");
    else if (imageUrl !== "" && changedByimageUrl === false) {
      setUploadedFile(imageUrl);
      setChangedByimageUrl(true);
    }
  }, [imageUrl]);

  return (
    <div className="flex flex-col gap-1 items-center w-fit">
      <Image
        uploadedFile={uploadedFile}
        uploading={uploading}
        remove={removeImage}
      />
      {file ? (
        <ImageName name={file.name} />
      ) : (
        <FileInput value={file} set={setFile} />
      )}
    </div>
  );
};

const Image = ({ uploadedFile, uploading, remove }) => {
  return (
    <div className="w-96 h-56 bg-black rounded-md relative flex  items-center justify-center text-white group">
      {uploadedFile.length ? (
        <UploadedImage removeImage={remove} uploadedFile={uploadedFile} />
      ) : uploading ? (
        <UploadingLoader />
      ) : (
        "No Image selected"
      )}
    </div>
  );
};

const UploadedImage = ({ removeImage, uploadedFile }) => {
  return (
    <>
      <img src={uploadedFile} alt="" className="w-full h-full object-contain" />
      <Button
        variant="outline"
        className="absolute right-0 bottom-0 mx-3 my-3 bg-black/75 cursor-pointer text-white shadow-sm opacity-0 border-0 group-hover:opacity-100"
        onClick={removeImage}
      >
        Remove
      </Button>
    </>
  );
};

const UploadingLoader = () => {
  return (
    <p className="flex gap-2">
      <Loader2 className="animate-spin" /> <span>Uploading...</span>
    </p>
  );
};

const ImageName = ({ name }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <p
            className="max-w-96 overflow-hidden truncate whitespace-nowrap
          "
          >
            <span className="font-bold">Image:</span> {name}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-96">{name}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const FileInput = ({ value, set }) => {
  return (
    <Input
      type="file"
      value={value}
      onChange={(e) => set(e.target.files?.[0])}
      accept="image/*"
      className="w-96"
    />
  );
};

export default ImageUploader;
