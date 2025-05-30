"use client";

import FeedbackCard from "@/components/cards/FeedbackCard";
import PleaseWait from "@/components/PleaseWait";
import StatusFilterBtn from "@/components/StatusFilterBtn";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { Button } from "@/components/ui/button";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const getFeedbacks = async (
    withLoading = false,
    useWithPriority: boolean = false,
    withPriority: string | null = null
  ) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    let statusToUse = useWithPriority ? withPriority : selectedStatus;

    const result = await client.fetchAdmin(
      "GET",
      `/feedback${statusToUse !== null ? `?status=${statusToUse}` : ""}`
    );
    if (result.ok) {
      setFeedbacks(result.json.feedbacks);
    } else
      toast("Feedbacks fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  };

  const updateSelectedStatus = (val: string) => {
    setSelectedStatus(val === selectedStatus ? null : val);
    getFeedbacks(false, true, val === selectedStatus ? null : val);
  };

  useEffect(() => {
    getFeedbacks(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <TitleWithRefreshBtn
        title="Feedbacks"
        refreshing={refreshing}
        func={() => getFeedbacks()}
      />
      <div className="flex gap-2 items-center *:cursor-pointer">
        <StatusFilterBtn
          func={updateSelectedStatus}
          status={selectedStatus}
          name="Pending"
        />
        <StatusFilterBtn
          func={updateSelectedStatus}
          status={selectedStatus}
          name="Checked"
        />
        <StatusFilterBtn
          func={updateSelectedStatus}
          status={selectedStatus}
          name="Used"
        />
      </div>

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : feedbacks.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">
            No feedbacks found
          </p>
        ) : (
          <div className="flex flex-wrap md:gap-5 gap-3">
            {feedbacks.map((f) => {
              return (
                <FeedbackCard key={f.id} feedback={f} refresh={getFeedbacks} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
