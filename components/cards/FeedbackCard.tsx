"use client";

import { useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { Validate } from "@/services/ValidationService";

export default function FeedbackCard({ feedback, refresh }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const writer = feedback.writer;

  return (
    <div className="rounded-lg shadow-md sm:w-md w-full md:min-h-[300px] min-h-[180px] overflow-hidden flex flex-col gap-2 group border-t border-black/5">
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
      <div className="px-4 pt-2 max-h-96 overflow-auto">
        <p className="md:text-xl text-lg font-black whitespace-pre-line">
          {feedback.message}
        </p>
      </div>
    </div>
  );
}
