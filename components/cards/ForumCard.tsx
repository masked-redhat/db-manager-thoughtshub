"use client";

import { Validate } from "@/services/ValidationService";
import { useCallback, useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";
import DeleteBtn from "../DeleteBtn";
import Timestamps from "../Timestamps";
import Writer from "../Writer";
import { CardBody, CardScrollArea, CardTitle } from "../CardComponents";
import { BiComment, BiLike } from "react-icons/bi";

export default function ForumCard({ forum, refresh, small = false }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const writer = forum.writer;

  const deleteForum = useCallback(async () => {
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
  }, []);

  return (
    <div
      className={`rounded-lg shadow-md ${
        small ? "w-full pb-2" : "sm:w-md w-full md:min-h-[600px] min-h-[480px]"
      } overflow-hidden flex flex-col gap-2 group border-t border-black/5`}
    >
      <Writer writer={writer} />
      <ForumImage imageUrl={forum.imageUrl} />
      <div className="flex flex-col gap-1 px-4 pb-2">
        <Timestamps timestamps={forum} />
        <CardScrollArea>
          <CardTitle title={forum.title} />
          <CardBody body={forum.body} />
        </CardScrollArea>
      </div>
      <div className="!mt-auto px-4 pb-3 flex items-center justify-between">
        {small ? null : <DeleteBtn deleting={deleting} func={deleteForum} />}
        <ForumCounts likes={forum.appreciations} comments={forum.comments} />
      </div>
    </div>
  );
}

function ForumImage({ imageUrl }: { imageUrl: string | null | undefined }) {
  return (
    <figure
      className={`w-full md:h-64 h-54 bg-black flex items-center justify-center select-none`}
    >
      {!Validate.goodStringValue(imageUrl) ? (
        <p className="text-gray-300 text-xl font-black font-urban">No Image</p>
      ) : (
        typeof imageUrl === "string" && (
          <img src={imageUrl} className="w-full h-full object-contain" />
        )
      )}
    </figure>
  );
}

function ForumCounts({ likes, comments }: { likes: number; comments: number }) {
  return (
    <div className="flex gap-4 ml-auto *:flex items-center *:items-center *:gap-2 text-lg *:shadow *:rounded-full *:px-3 *:py-1 select-none">
      <div>
        <BiLike /> <p className="font-urban text-base font-bold">{likes}</p>
      </div>
      <div>
        <BiComment />{" "}
        <p className="font-urban text-base font-bold">{comments}</p>
      </div>
    </div>
  );
}
