import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import { requestAuth } from "../../../utils/request";
import { createCategoryUrl } from "../../../constants/server";
import PleaseWait from "../PleaseWait";
import SubmitRight from "../SubmitRight";

const PanelCreateCategory = () => {
  const { token } = useToken();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [creating, setCreating] = useState(false);

  const resetForm = () => {
    setName("");
    setValue("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreating(true);

    const response = await requestAuth(createCategoryUrl, "POST", token, {
      name,
      value,
    });

    if (response.ok) toast("Category created");
    else {
      toast("Category couldn't be created");
      console.error(await response.json());
    }

    setCreating(false);
    resetForm();
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">Create New Category</h1>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2 flex flex-col gap-3">
        <div className="flex flex-col gap-3 w-full max-w-[540px]">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />

          <Button className="w-fit" disabled={creating}>
            {creating ? <PleaseWait /> : <SubmitRight />}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default PanelCreateCategory;
