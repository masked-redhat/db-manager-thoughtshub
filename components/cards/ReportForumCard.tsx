"use client";

import { useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { Validate } from "@/services/ValidationService";
import ForumCard from "./ForumCard";
import Timestamps from "../Timestamps";
import Writer from "../Writer";
import { CardBody, CardScrollArea } from "../CardComponents";

export default function ReportForumCard({ report, refresh }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const writer = report.reporter;
  const forum = report.forum;

  return (
    <div className="rounded-lg shadow-md sm:w-lg w-full md:min-h-[400px] min-h-[280px] overflow-hidden flex flex-col gap-2 pb-6 group border-t border-black/5">
      <Writer writer={writer} />
      <div className="px-4 pt-2 space-y-4">
        <Timestamps timestamps={report} />
        <CardScrollArea minimum={true}>
          <CardBody body={report.reason} />
        </CardScrollArea>
        <div>
          <ForumCard forum={forum} refresh={refresh} small={true} />
        </div>
      </div>
    </div>
  );
}
