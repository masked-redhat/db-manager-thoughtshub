import { InsightCard } from "@/components/cards/Insight";
import PleaseWait from "@/components/global/PleaseWait";
import { Button } from "@/components/ui/button";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { Insight } from "@/interfaces/Insights";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const InsightsSection = (): ReactElement => {
  const { client } = useAuthToken();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagesOver, setPagesOver] = useState<boolean>(false);
  const [fetchingInsights, setFetchingInsights] = useState(false);

  const getInsights = useCallback(async ({ page }: { page: number }) => {
    setFetchingInsights(true);

    const result = await client.fetchAdmin("GET", "/news", null, { page });
    if (result.ok) {
      setInsights(result.json.news);
      setPage(page);
      setPagesOver(result.json.isOver);
    } else toast("Insights fetch failed", { description: result.json.message });

    setFetchingInsights(false);
  }, []);

  useEffect(() => {
    getInsights({ page });
    return () => {};
  }, []);

  return (
    <div className="relative flex flex-col gap-3">
      <div className="flex flex-wrap *:w-[30%] gap-3">
        {insights.map((i) => (
          <InsightCard data={i} key={i.id} />
        ))}
      </div>
      <div className="flex items-center gap-3 justify-between bg-white max-w-full w-fit mr-auto *:cursor-pointer *:w-24">
        <Button
          variant={"secondary"}
          className="!text-sm"
          disabled={fetchingInsights || page === 1}
          onClick={() => getInsights({ page: page - 1 })}
        >
          {fetchingInsights ? (
            <PleaseWait text={false} />
          ) : (
            <p>&larr; Previous</p>
          )}
        </Button>
        <Button
          variant={"secondary"}
          className="!text-sm"
          disabled={fetchingInsights || pagesOver}
          onClick={() => getInsights({ page: page + 1 })}
        >
          {fetchingInsights ? <PleaseWait text={false} /> : <p>Next &rarr;</p>}
        </Button>
      </div>
    </div>
  );
};
