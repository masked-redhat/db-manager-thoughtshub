import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth } from "../../../utils/request";
import { forumsUploadUrl, getForumsUrl } from "../../../constants/server";
import { Button } from "@/components/ui/button";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import { useNavigate, useParams } from "react-router";
import { productionPath } from "../../../constants/path";
import PleaseWait from "../PleaseWait";
import SubmitRight from "../SubmitRight";

const PanelEditForum = () => {
  const { forumId } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [forumsUploading, setForumsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setForumsUploading(true);

    const data = { title, body, forumId };

    const response = await requestAuth(forumsUploadUrl, "PUT", token, data);

    const result = await response.json();
    if (response.ok) {
      toast("Forum updated", {
        description: `Forum updated with title ${title}`,
        action: {
          label: "Log",
          onClick: () => console.log(result),
        },
      });
      navigate(`${productionPath}/forums`);
    }

    setForumsUploading(false);
  };

  const getForumInfo = async () => {
    const response = await requestAuth(
      getForumsUrl + `/${forumId}`,
      "GET",
      token
    );

    if (response.ok) {
      const result = await response.json();
      setTitle(result.forum.title);
      setBody(result.forum.body);
    }
  };

  useEffect(() => {
    getForumInfo();
  }, []);

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">Edit Forum</h1>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2 flex flex-col gap-3">
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
            className="max-h-56 h-56"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <Button className="w-fit" disabled={forumsUploading}>
            {forumsUploading ? <PleaseWait /> : <SubmitRight />}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default PanelEditForum;
