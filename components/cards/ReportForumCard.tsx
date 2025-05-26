"use client";

import { useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { Validate } from "@/services/ValidationService";
import ForumCard from "./ForumCard";

export default function ReportForumCard({ report, refresh }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const writer = report.reporter;
  const forum = report.forum;
  const forumWriter = report.forum.writer;

  return (
    <div className="rounded-lg shadow-md sm:w-lg w-full md:min-h-[400px] min-h-[280px] overflow-hidden flex flex-col gap-2 pb-6 group border-t border-black/5">
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
      <div className="px-4 pt-2 space-y-2">
        <p className="md:text-lg font-black whitespace-pre-line">
          {report.reason}
        </p>
        <div>
          <ForumCard forum={forum} refresh={refresh} small={true} />
        </div>
      </div>
    </div>
  );
}
