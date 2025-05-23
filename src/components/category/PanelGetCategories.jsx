import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { requestAuth } from "../../../utils/request";
import { createCategoryUrl } from "../../../constants/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete } from "react-icons/md";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import PleaseWait from "../PleaseWait";

const PanelGetCategories = () => {
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetCategories = async () => {
    setLoading(true);
    const response = await requestAuth(createCategoryUrl, "GET", token);

    if (response.ok) {
      const result = await response.json();
      setData(result.categories);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCategories();

    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <PleaseWait />
      ) : (
        <main>
          <PanelSection
            title="Categories"
            data={data}
            setData={setData}
            load={handleGetCategories}
          />
        </main>
      )}
    </>
  );
};

const PanelSection = ({
  title,
  data = [{ name: "Crime", value: "Crime" }],
  setData,
  load = null,
}) => {
  const handleRemove = (id) => {
    const tempData = [];
    for (const category of data)
      if (category.id !== id) tempData.push(category);
    setData(tempData);
  };

  return (
    <section className="flex flex-col gap-2">
      <header className="flex gap-2 items-center mb-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={load} className="cursor-pointer" variant="secondary">
          Refresh
        </Button>
      </header>

      <div className="flex flex-wrap gap-4">
        {data.map((d) => {
          return <Category category={d} key={d.id} remove={handleRemove} />;
        })}
        {data.length === 0 ? "No categories available to show" : null}
      </div>
      <Toaster />
    </section>
  );
};

const Category = ({ category, remove }) => {
  const { token } = useToken();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    const response = await requestAuth(
      createCategoryUrl + `?id=${category.id}`,
      "DELETE",
      token
    );

    if (response.ok) toast("Category deleted");

    setDeleting(false);
    remove(category.id);
  };

  return (
    <div className="border w-64 p-4 rounded-sm flex items-center justify-between">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{category.name}</TooltipTrigger>
          <TooltipContent>
            <p>{category.value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        className="bg-gray-700 cursor-pointer"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? <PleaseWait text={false} /> : <MdDelete />}
      </Button>
    </div>
  );
};

export default PanelGetCategories;
