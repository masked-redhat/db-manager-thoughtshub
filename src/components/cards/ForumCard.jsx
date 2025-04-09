import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import WriterCard from "./WriterCard";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { requestAuth } from "../../../utils/request";
import { useToken } from "../../providers/AdminTokenProvider";
import { deleteForumUrl, upvoteForumsUrl } from "../../../constants/server";
import { Loader2 } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { productionPath } from "../../../constants/path";

const ForumCard = ({ data, fetchForums }) => {
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [isVoted, setIsVoted] = useState(data.isVoted);

  const handleUpvote = async () => {
    setLoading(true);

    const response = await requestAuth(upvoteForumsUrl, "POST", token, {
      forumId: data.id,
      value: !isVoted,
    });

    if (response.ok) {
      setIsVoted(!isVoted);
    }

    setLoading(false);
  };

  return (
    <div className="lg:w-lg w-full border border-gray-300 rounded-xl shadow-md flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white gap-4">
      <div className="flex items-center justify-between">
        <WriterCard data={data.writer} />
        <ActionBtn forumId={data.id} token={token} fetchForums={fetchForums} />
      </div>

      {/* Image
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt="Error"
          className="w-full h-64 object-contain rounded-md lg:mr-4 bg-black text-gray-500"
        />
      ) : (
        <div className="w-full lg:w-64 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md lg:mr-4">
          No Image
        </div>
      )} */}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        <div className="text-xs text-gray-500 break-all">
          {data.id.toUpperCase()}
        </div>
        <div className="text-2xl font-semibold">{data.title} </div>

        <div className="flex text-xs gap-3">
          <div className="text-gray-500">
            {new Date(Number(data.createDate)).toLocaleString()}
          </div>
          {data.createDate !== data.updateDate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>( Edited )</TooltipTrigger>
                <TooltipContent>
                  <div>
                    {new Date(Number(data.updateDate)).toLocaleString()}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <ScrollArea className="text-sm h-[150px]">{data.body}</ScrollArea>

        <div className="flex items-center gap-3 mt-auto">
          <Button
            variant="secondary"
            className="rounded-full py-2 w-14 text-lg cursor-pointer"
            onClick={handleUpvote}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isVoted ? (
              <BiSolidUpvote />
            ) : (
              <BiUpvote />
            )}
          </Button>
          <span className="text-xs">{isVoted ? "Voted" : null}</span>
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({ forumId, token, fetchForums }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteForum = async () => {
    setDeleting(true);

    const response = await requestAuth(
      deleteForumUrl + `?forumId=${forumId}`,
      "DELETE",
      token
    );

    if (response.ok) {
      toast("Forum Deleted");
      fetchForums();
    } else toast("Forum couldn't be deleted");

    setDeleting(false);
  };

  return (
    <DropdownMenu className="rounded-full">
      <DropdownMenuTrigger className="flex items-center justify-center p-1 rounded-full cursor-pointer">
        <HiOutlineDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => navigate(`${productionPath}/edit-forums/${forumId}`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={deleting}
          onClick={handleDeleteForum}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ForumCard;
