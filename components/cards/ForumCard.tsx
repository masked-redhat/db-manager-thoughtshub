"use client";

import { Validate } from "@/services/ValidationService";
import { useState } from "react";
import { TbError404 } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";
import PleaseWait from "../PleaseWait";
import DeleteBtn from "../DeleteBtn";

export default function ForumCard({ forum, refresh, small = false }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const writer = forum.writer;

  const deleteForum = async () => {
    setDeleting(true);

    const result = await client.fetchAdmin(
      "DELETE",
      `/forums?forumId=${forum.id}&profileId=${forum.profileId}`
    );
    if (result.ok) {
      toast("Forum deleted", { description: result.json.message });
      refresh();
    } else {
      toast("Forum deletion failed", { description: result.json.message });
    }

    setDeleting(false);
  };

  return (
    <div
      className={`rounded-lg shadow-md ${
        small ? "w-full pb-2" : "sm:w-md w-full md:min-h-[600px] min-h-[480px]"
      } overflow-hidden flex flex-col gap-2 group border-t border-black/5`}
    >
      <div className="pt-3 px-4 flex items-center gap-2">
        <figure className="w-9 h-9 bg-black flex items-center justify-center select-none rounded-full overflow-hidden">
          {!Validate.goodStringValue(writer.profileImageUrl) ? (
            <p className="text-gray-300 text-sm font-black font-urban">
              {writer.username[0]}
            </p>
          ) : (
            <img
              src={writer.profileImageUrl}
              className="w-full h-full object-contain"
            />
          )}
        </figure>
        <div className="text-sm">
          <p>{writer.fullName}</p>
          <p className="font-urban font-bold">@ {writer.username}</p>
        </div>
      </div>
      <figure
        className={`w-full md:h-64 h-54 bg-black flex items-center justify-center select-none`}
      >
        {!Validate.goodStringValue(forum.imageUrl) ? (
          <p className="text-gray-300 text-xl font-black font-urban">
            No Image
          </p>
        ) : (
          <img src={forum.imageUrl} className="w-full h-full object-contain" />
        )}
      </figure>
      <div className="flex flex-col gap-1 px-4 pb-2">
        <div className="md:flex hidden justify-between gap-2 items-center w-full">
          <p className="text-xs text-gray-500">
            {new Date(Number(forum.updateDate))
              .toISOString()
              .replace("T", " | ")
              .slice(0, -8)}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(Number(forum.createDate))
              .toISOString()
              .replace("T", " | ")
              .slice(0, -8)}
          </p>
        </div>

        <div className="max-h-[300px] overflow-auto">
          <div className="w-full">
            {Validate.goodStringValue(forum.title) ? (
              <h2 className={`md:text-2xl text-lg font-black`}>
                {forum.title}
              </h2>
            ) : (
              <div className="flex items-center gap-2 text-2xl font-black">
                <p>-</p>
                <TbError404 />
              </div>
            )}
          </div>
          <div className="w-full">
            {Validate.goodStringValue(forum.body) ? (
              <h2 className="text-gray-600 md:text-base text-sm whitespace-pre-line">
                {forum.body}
              </h2>
            ) : (
              <div className="flex items-center gap-2 text-gray-600 text-2xl font-black">
                <p>-</p>
                <TbError404 />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="!mt-auto px-4 pb-3 flex items-center justify-between">
        {small ? null : <DeleteBtn deleting={deleting} func={deleteForum} />}
      </div>
    </div>
  );
}
