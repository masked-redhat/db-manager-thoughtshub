"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";
import PleaseWait from "../PleaseWait";

export default function CategoryCard({ category, refresh }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);

  const deleteCategory = async () => {
    setDeleting(true);

    const result = await client.fetchAdmin(
      "DELETE",
      `/category?categoryId=${category.id}`
    );
    if (result.ok) {
      toast("Category deleted", { description: result.json.message });
      refresh();
    } else {
      toast("Category deletion failed", { description: result.json.message });
    }

    setDeleting(false);
  };

  return (
    <div className="border flex gap-3 p-3 justify-between items-center group min-w-96 w-[30%] h-16">
      <div className="overflow-auto w-[calc(100%-2rem)]">
        <p className="md:text-xl text-lg font-black whitespace-nowrap">
          {category.name}
        </p>
      </div>
      <button
        onClick={deleteCategory}
        disabled={deleting}
        className={
          deleting ? "" : "opacity-0 group-hover:opacity-100 transition-opacity"
        }
      >
        {deleting ? (
          <PleaseWait text={false} />
        ) : (
          <MdDelete
            className="shadow rounded-full p-2 bg-black text-white"
            size={35}
          />
        )}
      </button>
    </div>
  );
}
