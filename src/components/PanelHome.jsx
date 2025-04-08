import React, { useEffect, useState } from "react";
import { requestAuth } from "../../utils/request";
import { getNewsUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard from "./cards/NewsCard";

const PanelHome = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useToken();

  const handleGetLatestNews = async () => {
    setLoading(true);
    const response = await requestAuth(getNewsUrl, "GET", token);

    const result = await response.json();
    if (response.ok) setLatestNews(result.news);
    setLoading(false);
  };

  useEffect(() => {
    handleGetLatestNews();

    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <span className="flex gap-2">
          <Loader2 className="animate-spin" />
          Please wait
        </span>
      ) : (
        <main>
          <PanelHomeSection
            title="Latest News Uploaded"
            data={latestNews}
            load={handleGetLatestNews}
          />
        </main>
      )}
    </>
  );
};

const PanelHomeSection = ({ title, data, load }) => {
  return (
    <section className="flex flex-col gap-2">
      <header className="flex gap-2 items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={load} className="cursor-pointer" variant="secondary">
          Refresh
        </Button>
      </header>

      <div className="flex flex-row flex-wrap gap-4 mt-2">
        {data.map((news) => (
          <NewsCard data={news} key={news.id} fetchNews={handleGetLatestNews} />
        ))}
        {data.length !== 0 ? null : <p>No News Found</p>}
      </div>
    </section>
  );
};

export default PanelHome;
