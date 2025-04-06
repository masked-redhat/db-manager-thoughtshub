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
        {data.map((d) => {
          return (
            <div className="p-3 gap-2 border rounded-md flex flex-col items-start">
              <h2 className="text-lg font-semibold">{d.title}</h2>

              <div className="flex gap-3">
                <figure className="overflow-hidden w-56 h-36 flex items-center justify-center border bg-black rounded-sm shadow-md min-w-56 border-gray-400">
                  <img
                    src={d.imageUrl}
                    alt="Error"
                    className="object-cover w-full h-full text-white"
                  />
                </figure>
                <p className="mb-2.5 break-all whitespace-normal break-words">
                  {d.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PanelHome;
