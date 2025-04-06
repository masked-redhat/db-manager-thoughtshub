import React, { useEffect, useState } from "react";
import { requestAuth } from "../../utils/request";
import { getNewsUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <NewsCard news={news} key={news.id} />
        ))}
        {data.length !== 0 ? null : <p>No News Found</p>}
      </div>
    </section>
  );
};

const NewsCard = ({ news }) => {
  return (
    <div className="lg:w-lg w-full h-max border border-gray-300 rounded-xl shadow-md flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white gap-4">
      {/* Image */}
      {news.imageUrl ? (
        <img
          src={news.imageUrl}
          alt="Error"
          className="w-full h-64 object-contain rounded-md lg:mr-4 bg-black text-gray-500"
        />
      ) : (
        <div className="w-full lg:w-64 h-40 lg:h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md lg:mr-4">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        <div className="text-xs text-gray-500 break-all">
          {news.id.toUpperCase()}
        </div>
        <div className="text-2xl font-semibold">{news.title} </div>

        <div className="flex text-xs gap-3">
          <div className="text-gray-500">
            {new Date(Number(news.createDate)).toLocaleString()}
          </div>
          {news.createDate !== news.updateDate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>( Edited )</TooltipTrigger>
                <TooltipContent>
                  <div>
                    {new Date(Number(news.updateDate)).toLocaleString()}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <Badge>{news.category}</Badge>

        <div className="text-sm">{news.body}</div>
      </div>
    </div>
  );
};

export default PanelHome;
