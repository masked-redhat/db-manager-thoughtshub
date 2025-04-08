import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth, uploadAuth } from "../../../utils/request";
import { getUsersUrl, getUserUrl, uploadUrl } from "../../../constants/server";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import { useParams } from "react-router";

const PanelEditUser = () => {
  const { id } = useParams();
  const { token } = useToken();

  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState(undefined);
  const [user, setUser] = useState({});
  const [profileId, setProfileId] = useState(null);

  const [updating, setUpdating] = useState(false);

  const resetForm = () => {
    setFile("");
    setImageUrl("");
    setFullName("");
    setAbout("");
    setGender(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    const data = {
      userId: id,
      profileId,
      fullName,
      about,
      gender,
      profileImageUrl: imageUrl,
    };

    const response = await requestAuth(getUserUrl, "PUT", token, data);

    const result = await response.json();
    if (response.ok) {
      toast("User updated", {
        description: `User updated with given information`,
        action: {
          label: "Log",
          onClick: () => console.log(result),
        },
      });
      resetForm();
    }

    setUpdating(false);
  };

  const getUserInfo = async () => {
    const response = await requestAuth(
      getUserUrl + `?userId=${id}`,
      "GET",
      token
    );

    if (response.ok) {
      const result = await response.json();
      setUser(result.user);
      setFullName(result.user?.fullName ?? "");
      setAbout(result.user?.about ?? "");
      setGender(result.user?.gender ?? undefined);
      setImageUrl(result.user?.profileImageUrl ?? "");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">
          Edit User{" "}
          <span className="font-manrope">{`[ @${user.username} ]`}</span>
        </h1>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2 flex flex-col gap-3">
        <UserImageUploader
          file={file}
          setFile={setFile}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />
        <div className="flex flex-col gap-3 w-full max-w-[540px]">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Textarea
            placeholder="About"
            className="max-h-56"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="w-fit" disabled={updating}>
            {updating ? (
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

const UserImageUploader = ({ file, setFile, setImageUrl, imageUrl }) => {
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
    setImageUrl("");
  };

  useEffect(() => {
    if (file) uploadFileAndShow();
    else setUploadedFile("");

    return () => {};
  }, [file]);

  useEffect(() => {
    setUploadedFile(imageUrl ?? "");
  }, [imageUrl]);

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
            <TooltipTrigger disabled={true}>
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

export default PanelEditUser;
