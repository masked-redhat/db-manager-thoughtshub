import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth } from "../../../utils/request";
import { checkUsernameUrl, getUsersUrl } from "../../../constants/server";
import { Button } from "@/components/ui/button";
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
import { RxCross2 } from "react-icons/rx";
import { RxCheck } from "react-icons/rx";
import ImageUploader from "../ImageUploader";
import PleaseWait from "../PleaseWait";
import SubmitRight from "../SubmitRight";

const PanelCreateUser = () => {
  const { token } = useToken();

  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState(undefined);

  const [creating, setCreating] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const resetForm = () => {
    setImageUrl("");
    setUsername("");
    setPassword("");
    setFullName("");
    setAbout("");
    setGender(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreating(true);

    const data = {
      username,
      password,
      fullName,
      about,
      gender,
      profileImageUrl: imageUrl,
    };

    const response = await requestAuth(getUsersUrl, "POST", token, data);

    const result = await response.json();
    if (response.ok) {
      toast("User created", {
        description: `User created with username ${username}`,
        action: {
          label: "Log",
          onClick: () => console.log(result),
        },
      });
      resetForm();
    }

    setCreating(false);
  };

  const checkAvailablity = async () => {
    const response = await requestAuth(
      checkUsernameUrl + `?username=${username}`,
      "GET",
      token
    );

    if (response.ok) setUsernameAvailable(true);
    else setUsernameAvailable(false);
  };

  useEffect(() => {
    const timeout = setTimeout(checkAvailablity, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [username]);

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">Create User</h1>
        <p className="font-light">
          Cannot set Email/Mobile Here. Can be set once user is created in
          'Edit' section of Users.
        </p>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2 flex flex-col gap-3">
        <ImageUploader setImageUrl={setImageUrl} imageUrl={imageUrl} />
        <div className="flex flex-col gap-3 w-full max-w-[540px]">
          <div className="w-full relative flex items-center">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="text-xl absolute right-2">
              {usernameAvailable && username.length !== 0 ? (
                <RxCheck className="text-green-500" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
            </span>
          </div>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button className="w-fit" disabled={creating}>
            {creating ? <PleaseWait /> : <SubmitRight />}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default PanelCreateUser;
