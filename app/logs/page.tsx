"use client";

import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ActivityCard from "@/components/cards/ActivityCard";
import LogCard from "@/components/cards/LogCard";

export default function Page() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);

  const getLogs = useCallback(async (withLoading = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", "/logs");
    if (result.ok) {
      setLogs(result.json.logs);
    } else toast("Logs fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getLogs(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <TitleWithRefreshBtn
        title="Logs"
        refreshing={refreshing}
        func={() => getLogs()}
      />

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : logs.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">No logs found</p>
        ) : (
          <div className="flex flex-col flex-wrap w-full">
            {logs.map((l) => {
              return <LogCard log={l} key={l.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
