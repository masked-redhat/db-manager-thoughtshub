import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import WriterCard from "./WriterCard";
import { getUsersUrl } from "../../../constants/server";
import { toast } from "sonner";
import { useToken } from "../../providers/AdminTokenProvider";
import { Badge } from "@/components/ui/badge";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { requestAuth } from "../../../utils/request";

const UserCard = ({ data, fetchUsers }) => {
  const { token } = useToken();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-96 border border-gray-300 rounded-xl shadow-md flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white gap-3 relative">
      <div className="flex flex-col gap-0.5 text-gray-500">
        <span className="text-xs uppercase font-medium"> {data.id}</span>
        <span className="text-xs uppercase font-medium">
          {data.Profile?.id ?? "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <WriterCard
          data={
            data.Profile ?? {
              ...data,
              username: data.username ?? data.email ?? data.mobile ?? "N/A",
              fullName: data.username ?? data.email ?? data.mobile ?? "N/A",
            }
          }
        />
        {data?.username === "admin" ? null : (
          <ActionBtn userId={data.id} fetchUsers={fetchUsers} token={token} />
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="secondary">
          {data.Profile === null ? "Not Profiled" : "Profiled"}
        </Badge>
      </div>

      <div className="flex flex-col">
        <span className="font-medium">
          <span className="font-light">Email : </span>
          {typeof data.email === "string" ? data.email : "N/A"}
        </span>
        <span className="font-medium">
          <span className="font-light">Mobile : </span>{" "}
          {typeof data.mobile === "string" ? data.mobile : "N/A"}
        </span>
      </div>

      <div>
        <span className="flex items-center gap-2 font-light">
          Password :
          <Button
            variant="secondary"
            className="flex gap-1 items-center cursor-pointer font-medium"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              data.password
            ) : (
              <>
                <span className="w-1 h-1 rounded-full bg-black"></span>
                <span className="w-1 h-1 rounded-full bg-black"></span>
                <span className="w-1 h-1 rounded-full bg-black"></span>
              </>
            )}
          </Button>
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-medium">
          <span className="font-light">Forums Uploaded : </span>
          {data.Profile?.forumsCount ?? "N/A"}
        </span>
        <span className="font-medium">
          <span className="font-light">Gender : </span>
          {data.Profile !== null
            ? typeof data.Profile?.gender === "string"
              ? data.Profile?.gender
              : "N/A"
            : "N/A"}
        </span>
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
                <div>{new Date(Number(data.updateDate)).toLocaleString()}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

const ActionBtn = ({ userId, token, fetchUsers }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteUser = async () => {
    setDeleting(true);

    const response = await requestAuth(
      getUsersUrl + `?userId=${userId}`,
      "DELETE",
      token
    );

    if (response.ok) {
      toast("User Deleted");
      fetchUsers();
    } else toast("User couldn't be deleted");

    setDeleting(false);
  };

  return (
    <DropdownMenu className="rounded-full">
      <DropdownMenuTrigger className="flex items-center justify-center p-1 rounded-full cursor-pointer">
        <HiOutlineDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={true}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={deleting}
          onClick={handleDeleteUser}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCard;
