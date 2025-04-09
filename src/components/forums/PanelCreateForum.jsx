import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth } from "../../../utils/request";
import { forumsUploadUrl } from "../../../constants/server";
import { Button } from "@/components/ui/button";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import PleaseWait from "../PleaseWait";
import SubmitRight from "../SubmitRight";

const PanelCreateForum = () => {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [forumsUploading, setForumsUploading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setBody("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setForumsUploading(true);

    const data = { title, body };

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
            {forumsUploading ? <PleaseWait /> : <SubmitRight />}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default PanelCreateForum;
