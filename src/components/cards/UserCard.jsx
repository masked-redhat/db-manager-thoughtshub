import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserCard = ({ data, fetchUsers }) => {
  return (
    <div className="lg:w-lg w-full border border-gray-300 rounded-xl shadow-md flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white gap-3 relative">
      {console.log(data)}

      {/* Image */}
      {data.Profile.profileImageUrl ? (
        <img
          src={data.Profile.profileImageUrl}
          alt="Error"
          className="w-full h-64 object-contain rounded-md lg:mr-4 bg-black text-gray-500"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md lg:mr-4 text-5xl capitalize">
          {data.Profile.fullName}
        </div>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="uppercase text-xs">User Id: {data.id}</span>
          </TooltipTrigger>
          <TooltipContent>
            <span className="uppercase">Profile Id: {data.Profile.id}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <h2 className="text-xl font-black">{data.Profile.fullName}</h2>
      <p className="flex items-center gap-1 -mt-3.5">
        <span className="font-bold">@</span>
        {data.username}
      </p>
    </div>
  );
};

export default UserCard;
