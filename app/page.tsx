"use client";

import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PleaseWait from "@/components/PleaseWait";
import NewsCard from "@/components/cards/NewsCard";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3">
      <LatestNews />
    </div>
  );
}

function LatestNews() {
  const { authToken } = useAuthToken();
  const [news, setNews] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const client = new APIClient(authToken);

  const getNews = async (withLoading: boolean = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", "/news?status=Published&all=false");
    if (result.ok) setNews(result.json.news.slice(0, 10));
    else {
      toast("News fetch failed", { description: result.json.message });
    }

    setRefreshing(false);
    if (withLoading) setLoading(false);
  };

  useEffect(() => {
    getNews(true);

    return () => {};
  }, []);

  return (
    <div className="space-y-3">
      <TitleWithRefreshBtn
        title="Latest news published"
        refreshing={refreshing}
        func={() => getNews(false)}
      />
      {loading ? (
        <PleaseWait text={false} />
      ) : (
        <div className="flex md:gap-5 gap-3 flex-wrap f">
          {news.map((n) => {
            return <NewsCard news={n} key={n.id} refresh={getNews} />;
          })}
        </div>
      )}
    </div>
  );
}
