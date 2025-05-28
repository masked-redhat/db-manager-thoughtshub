"use client";

import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ActivityCard from "@/components/cards/ActivityCard";

export default function Page() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);

  const getActivities = useCallback(async (withLoading = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", "/activity");
    if (result.ok) {
      setActivities(result.json.activities);
    } else
      toast("Activities fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getActivities(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <TitleWithRefreshBtn
        title="Activities"
        refreshing={refreshing}
        func={() => getActivities()}
      />

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : activities.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">
            No activities found
          </p>
        ) : (
          <div className="flex flex-col flex-wrap w-full">
            {activities.map((a) => {
              return <ActivityCard activity={a} key={a.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
