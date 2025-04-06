import React, { useEffect, useState } from "react";
import { requestAuth } from "../../utils/request";
import { getNewsUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";
import { Loader2 } from "lucide-react";

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
          <PanelHomeSection title="Latest News Uploaded" data={latestNews} />
        </main>
      )}
    </>
  );
};

const PanelHomeSection = ({ title, data }) => {
  return (
    <section className="flex flex-col gap-2">
      <header>
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>

      <div className="flex flex-col gap-2.5">
        {data.map((news) => {
          return (<div className="w-full h-64 border border-gray-300 rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Image */}
            {news.imageUrl ? (
              <img
                src={news.imageUrl}
                alt="Error"
                className="w-full md:w-64 h-40 md:h-full object-cover rounded-md mb-4 md:mb-0 md:mr-4 bg-gray-200 text-gray-500"
              />
            ) : (
              <div className="w-full md:w-64 h-40 md:h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md mb-4 md:mb-0 md:mr-4">
                No Image
              </div>
            )}
      
            {/* Content */}
            <div className="flex-1 flex flex-col gap-2 overflow-auto">
              <div className="text-xs text-gray-500 break-all">ID: {news.id}</div>
              <div className="text-lg font-semibold">{news.title}</div>
              <div className="text-sm">{news.body}</div>
              <div className="text-sm text-gray-600 break-all">News URL: {news.newsUrl || 'N/A'}</div>
              <div className="text-sm">Category: <span className="font-medium">{news.category}</span></div>
              <div className="text-sm text-gray-500">
                Created: {new Date(Number(news.createDate)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Updated: {new Date(Number(news.updateDate)).toLocaleString()}
              </div>
            </div>
          </div>)
        })}
      </div>
    </section>
  );
};

export default PanelHome;
