import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NewsCard = ({ data }) => {
  return (
    <div className="lg:w-lg w-full border border-gray-300 rounded-xl shadow-md flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white gap-4">
      {/* Image */}
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt="Error"
          className="w-full h-64 object-contain rounded-md lg:mr-4 bg-black text-gray-500"
        />
      ) : (
        <div className="w-full lg:w-64 h-40 lg:h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md lg:mr-4">
          No Image
        </div>
      )}

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

        <Badge>{data.category}</Badge>

        <div className="text-sm">{data.body}</div>
      </div>
    </div>
  );
};

export default NewsCard;
