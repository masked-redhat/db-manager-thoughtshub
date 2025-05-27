"use client";

import { useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import ForumCard from "./ForumCard";
import Timestamps from "../Timestamps";
import Writer from "../Writer";
import { CardBody, CardScrollArea } from "../CardComponents";
import { PiDotsThreeBold } from "react-icons/pi";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import PleaseWait from "../PleaseWait";
import { MdCancel, MdCheck, MdEdit } from "react-icons/md";
import Selection from "../Selection";

export default function ReportForumCard({ report, refresh }: any) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  //   const [deleting, setDeleting] = useState(false);
  const writer = report.reporter;
  const forum = report.forum;
  const [forumChecking, setForumChecking] = useState(false);

  return (
    <div className="rounded-lg shadow-md sm:w-lg w-full overflow-hidden flex flex-col gap-2 pb-4 group border-t border-black/5">
      <Writer writer={writer} />
      <div className="px-4 pt-2 space-y-4">
        <Timestamps timestamps={report} />
        <CardScrollArea minimum={true}>
          <CardBody body={report.reason} />
        </CardScrollArea>
        <PiDotsThreeBold
          size={40}
          className="bg-gray-200 w-12 h-6 rounded-full"
          onClick={() => setForumChecking(!forumChecking)}
        />
        {forumChecking && (
          <ForumCard forum={forum} refresh={refresh} small={true} />
        )}
        <UpdateStatusReport
          id={report.id}
          reportStatus={report.status}
          reportPriority={report.priority}
        />
      </div>
    </div>
  );
}

function UpdateStatusReport({
  id,
  reportPriority,
  reportStatus,
}: {
  id: string;
  reportPriority: string;
  reportStatus: string;
}) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [status, setStatus] = useState(reportStatus);
  const [priority, setPriority] = useState(reportPriority);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);

  const update = async () => {
    setUpdating(true);

    const result = await client.fetchAdmin("PUT", "/report/forums", {
      status,
      priority,
      reportId: id,
    });
    if (result.ok) {
      {
        toast("Report Updated", { description: result.json.message });
        setStatus(status);
        setPriority(priority);
        reportStatus = status;
        reportPriority = priority;
        setEditing(false);
      }
    } else {
      toast("Report update failed", { description: result.json.message });
      setPriority(priority);
      setStatus(status);
    }

    setUpdating(false);
  };

  return (
    <div
      className={
        "flex gap-3 justify-between w-full " +
        (editing ? "items-center" : "items-end")
      }
    >
      <div className="flex gap-2 items-center">
        {editing ? (
          <div className="w-full">
            <Selection
              className="w-full"
              items={[["Low"], ["Medium"], ["High"]]}
              placeholder="Choose a new priority"
              value={priority}
              onChange={(val) => setPriority(val)}
            />
          </div>
        ) : (
          <Badge className="!text-sm">{priority}</Badge>
        )}
        {editing ? (
          <div className="w-full">
            <Selection
              className="w-full"
              items={[["Ignored"], ["Pending"], ["Resolved"]]}
              placeholder="Choose a new status"
              value={status}
              onChange={(val) => setStatus(val)}
            />
          </div>
        ) : (
          <Badge className="!text-sm">{status}</Badge>
        )}
      </div>
      <div
        className={
          "cursor-pointer transition-opacity flex gap-2 items-center " +
          (editing ? "" : "opacity-0 group-hover:opacity-100")
        }
      >
        {editing ? (
          <>
            <div onClick={update} className="rounded-full">
              {updating ? (
                <PleaseWait text={false} />
              ) : (
                <MdCheck
                  className="shadow rounded-full p-2 bg-black text-white hover:bg-black/60"
                  size={35}
                />
              )}
            </div>
            <MdCancel
              className="shadow rounded-full p-2 bg-black text-white hover:bg-black/60"
              size={35}
              onClick={() => {
                setStatus(reportStatus);
                setPriority(reportPriority);
                setEditing(false);
              }}
            />
          </>
        ) : (
          <MdEdit
            className="shadow rounded-full p-2 bg-black text-white hover:bg-black/60"
            size={35}
            onClick={() => setEditing(true)}
          />
        )}
      </div>
    </div>
  );
}
