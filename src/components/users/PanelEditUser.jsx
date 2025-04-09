import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth } from "../../../utils/request";
import { getUserUrl } from "../../../constants/server";
import { Loader2 } from "lucide-react";
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
import { useNavigate, useParams } from "react-router";
import { productionPath } from "../../../constants/path";
import ImageUploader from "../ImageUploader";
import PleaseWait from "../PleaseWait";
import SubmitRight from "../SubmitRight";

const PanelEditUser = () => {
  const { id } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState(undefined);
  const [user, setUser] = useState({});

  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    const data = {
      userId: id,
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
      navigate(`${productionPath}/users`);
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
        <ImageUploader setImageUrl={setImageUrl} imageUrl={imageUrl} />
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
            {updating ? <PleaseWait /> : <SubmitRight />}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default PanelEditUser;
