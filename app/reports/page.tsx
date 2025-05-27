"use client";

import ReportForumCard from "@/components/cards/ReportForumCard";
import PleaseWait from "@/components/PleaseWait";
import StatusFilterBtn from "@/components/StatusFilterBtn";
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
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const getReports = useCallback(
    async (
      withLoading = false,
      useWith: { status: boolean; priority: boolean } = {
        status: false,
        priority: false,
      },
      with_: { status: string | null; priority: string | null } = {
        status: null,
        priority: null,
      }
    ) => {
      if (withLoading) setLoading(true);
      setRefreshing(true);

      let statusToUse = useWith.status ? with_.status : selectedStatus;
      let priorityToUse = useWith.priority ? with_.priority : selectedPriority;

      const result = await client.fetchAdmin(
        "GET",
        `/report/forums?${
          statusToUse === null ? "" : `&status=${statusToUse}`
        }${priorityToUse === null ? "" : `&priority=${priorityToUse}`}`
      );
      if (result.ok) {
        setReports(result.json.reports);
      } else
        toast("Reports fetch failed", { description: result.json.message });

      if (withLoading) setLoading(false);
      setRefreshing(false);
    },
    [selectedPriority, selectedStatus]
  );

  const updateSelectedStatus = (val: string) => {
    setSelectedStatus(val === selectedStatus ? null : val);
    getReports(
      false,
      { status: true, priority: false },
      { status: val === selectedStatus ? null : val, priority: null }
    );
  };

  const updateSelectedPriority = (val: string) => {
    setSelectedPriority(val === selectedPriority ? null : val);
    getReports(
      false,
      { status: false, priority: true },
      { priority: val === selectedPriority ? null : val, status: null }
    );
  };

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
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center *:cursor-pointer">
          <StatusFilterBtn
            func={updateSelectedPriority}
            status={selectedPriority}
            name="Low"
          />
          <StatusFilterBtn
            func={updateSelectedPriority}
            status={selectedPriority}
            name="Medium"
          />
          <StatusFilterBtn
            func={updateSelectedPriority}
            status={selectedPriority}
            name="High"
          />
        </div>

        <div className="border-r h-[60%] bg-black"></div>

        <div className="flex gap-2 items-center *:cursor-pointer">
          <StatusFilterBtn
            func={updateSelectedStatus}
            status={selectedStatus}
            name="Ignored"
          />
          <StatusFilterBtn
            func={updateSelectedStatus}
            status={selectedStatus}
            name="Pending"
          />
          <StatusFilterBtn
            func={updateSelectedStatus}
            status={selectedStatus}
            name="Resolved"
          />
        </div>
      </div>

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
