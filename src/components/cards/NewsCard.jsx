import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { newsUploadUrl } from "../../../constants/server";
import { useToken } from "../../providers/AdminTokenProvider";
import { requestAuth } from "../../../utils/request";
import { useNavigate } from "react-router";
import { productionPath } from "../../../constants/path";
import { Button } from "@/components/ui/button";

const NewsCard = ({ data, fetchNews }) => {
  const { token } = useToken();

  const [lang, setLang] = useState("English");

  return (
    <div className="lg:w-lg w-full border border-gray-300 rounded-xl shadow-md flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white gap-4 relative">
      <div className="absolute top-6 right-6 w-fit rounded-full p-0">
        <ActionBtn
          newsId={data.id}
          fetchNews={fetchNews}
          token={token}
          className="bg-gray-300 p-2"
        />
      </div>

      {/* Image */}
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
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        <div className="text-xs text-gray-500 break-all">
          {data.id.toUpperCase()}
        </div>
        <div className="text-2xl font-semibold">
          {lang === "English" ? data.title : data.titleHindi ?? data.title}
        </div>

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

        <Badge>{data.category}</Badge>

        <ScrollArea className="text-sm h-[150px]">
          {lang === "English" ? data.body : data.bodyHindi ?? data.body}
        </ScrollArea>

        <div className="flex gap-2 items-center *:cursor-pointer">
          <Button
            variant={lang === "English" ? "secondary" : "tertiary"}
            onClick={() => setLang("English")}
          >
            En
          </Button>
          <Button
            variant={lang === "Hindi" ? "secondary" : "tertiary"}
            onClick={() => setLang("Hindi")}
            className="font-bold"
          >
            हि
          </Button>
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({ newsId, token, fetchNews, className }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteNews = async () => {
    setDeleting(true);

    const response = await requestAuth(
      newsUploadUrl + `?newsId=${newsId}`,
      "DELETE",
      token
    );

    if (response.ok) {
      toast("News Deleted");
      fetchNews();
    } else toast("News couldn't be deleted");

    setDeleting(false);
  };

  return (
    <DropdownMenu className="rounded-full">
      <DropdownMenuTrigger
        className={
          "flex items-center justify-center p-1 rounded-full cursor-pointer " +
          className
        }
      >
        <HiOutlineDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => navigate(`${productionPath}/edit-news/${newsId}`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={deleting}
          onClick={handleDeleteNews}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewsCard;
