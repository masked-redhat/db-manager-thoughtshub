"use client";

import ReportForumCard from "@/components/cards/ReportForumCard";
import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);

  const getReports = useCallback(async (withLoading = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", "/report/forums");
    if (result.ok) {
      setReports(result.json.reports);
    } else toast("Reports fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getReports(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <TitleWithRefreshBtn
        title="Reports (Forums)"
        refreshing={refreshing}
        func={() => getReports()}
      />

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : reports.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">No reports found</p>
        ) : (
          <div className="flex flex-wrap w-full md:gap-5 gap-3">
            {reports.map((r) => {
              return (
                <ReportForumCard key={r.id} report={r} refresh={getReports} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
