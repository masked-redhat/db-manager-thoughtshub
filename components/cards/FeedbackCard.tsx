"use client";

import { useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { Validate } from "@/services/ValidationService";
import Timestamps from "../Timestamps";
import Writer from "../Writer";
import { CardBody, CardScrollArea } from "../CardComponents";

export default function FeedbackCard({ feedback, refresh }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const writer = feedback.writer;

  return (
    <div className="rounded-lg shadow-md sm:w-md w-full overflow-hidden flex flex-col gap-2 group border-t border-black/5">
      <Writer writer={writer ?? {}} />
      <div className="px-4 pt-2 max-h-96 overflow-auto space-y-4">
        <Timestamps timestamps={feedback} />
        <CardScrollArea className="h-32">
          <CardBody body={feedback.message} />
        </CardScrollArea>
      </div>
    </div>
  );
}
