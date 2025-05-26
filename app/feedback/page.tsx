"use client";

import FeedbackCard from "@/components/cards/FeedbackCard";
import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);

  const getFeedbacks = async (withLoading = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", "/feedback");
    if (result.ok) {
      setFeedbacks(result.json.feedbacks);
    } else toast("Feedbacks fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    getFeedbacks(true);

    return () => {};
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <TitleWithRefreshBtn
        title="Feedbacks"
        refreshing={refreshing}
        func={() => getFeedbacks()}
      />

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : feedbacks.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">No feedbacks found</p>
        ) : (
          <div className="flex flex-wrap md:gap-5 gap-3">
            {feedbacks.map((f) => {
              return <FeedbackCard key={f.id} feedback={f} refresh={getFeedbacks} />
            })}
          </div>
        )}
      </div>
    </div>
  );
}
