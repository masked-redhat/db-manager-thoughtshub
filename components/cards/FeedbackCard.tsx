"use client";

import { useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import Timestamps from "../Timestamps";
import Writer from "../Writer";
import { CardBody, CardScrollArea } from "../CardComponents";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { MdCancel, MdCheck, MdEdit } from "react-icons/md";
import Selection from "../Selection";
import PleaseWait from "../PleaseWait";

export default function FeedbackCard({ feedback, refresh }: any) {
  //   const { authToken } = useAuthToken();
  //   const client = new APIClient(authToken);
  //   const [deleting, setDeleting] = useState(false);
  const writer = feedback.writer;

  //   const deleteFeedback = async () => {
  //     setDeleting(true);

  //     const result = await client.fetchAdmin(
  //       "DELETE",
  //       `/feedback?feedbackId=${feedback.id}`
  //     );
  //     if (result.ok) {
  //       toast("Feedback deleted", { description: result.json.message });
  //       refresh();
  //     } else {
  //       toast("Feedback deletion failed", { description: result.json.message });
  //     }

  //     setDeleting(false);
  //   };

  return (
    <div className="rounded-lg shadow-md sm:w-md w-full overflow-hidden flex flex-col gap-2 group border-t border-black/5">
      <Writer writer={writer ?? {}} />
      <div className="px-4 pt-2 pb-4 max-h-96 overflow-auto space-y-4">
        <Timestamps timestamps={feedback} />
        <CardScrollArea className="h-32">
          <CardBody body={feedback.message} />
        </CardScrollArea>
        <div className="w-full flex items-center gap-2">
          <UpdateStatusFeedback
            id={feedback.id}
            feedbackStatus={feedback.status}
          />
          {/* <DeleteBtn deleting={deleting} func={deleteFeedback} /> */}
        </div>
      </div>
    </div>
  );
}

function UpdateStatusFeedback({
  id,
  feedbackStatus,
}: {
  id: string;
  feedbackStatus: string;
}) {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [status, setStatus] = useState(feedbackStatus);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);

  const updateStatus = async () => {
    setUpdating(true);
    if (status === feedbackStatus) {
      setStatus(feedbackStatus);
      setEditing(false);
      setUpdating(false);
      return;
    }

    const result = await client.fetchAdmin("PUT", "/feedback", {
      status,
      feedbackId: id,
    });
    if (result.ok) {
      {
        toast("Status updated", { description: result.json.message });
        setStatus(status);
        feedbackStatus = status;
        setEditing(false);
      }
    } else {
      toast("Status update failed", { description: result.json.message });
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
      {editing ? (
        <div className="w-full">
          <Selection
            className="w-full"
            items={[["Pending"], ["Used"], ["Checked"]]}
            placeholder="Choose a new status"
            value={status}
            onChange={(val) => setStatus(val)}
          />
        </div>
      ) : (
        <Badge>{status}</Badge>
      )}
      <div
        className={
          "cursor-pointer transition-opacity flex gap-2 items-center " +
          (editing ? "" : "opacity-0 group-hover:opacity-100")
        }
      >
        {editing ? (
          <>
            <div onClick={updateStatus} className="rounded-full">
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
                setStatus(feedbackStatus);
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
