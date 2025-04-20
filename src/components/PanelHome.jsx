import React, { useEffect, useState } from "react";
import { requestAuth } from "../../utils/request";
import { changeMaxSizeUrl, getNewsUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";
import { Button } from "@/components/ui/button";
import NewsCard from "./cards/NewsCard";
import PleaseWait from "./PleaseWait";
import { Input } from "@/components/ui/input";

const PanelHome = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sizeloading, setSizeLoading] = useState(false);
  const [size, setSize] = useState({ curr: 0, new: "" });

  const { token } = useToken();

  const handleGetLatestNews = async () => {
    setLoading(true);
    const response = await requestAuth(getNewsUrl, "GET", token);

    const result = await response.json();
    if (response.ok) setLatestNews(result.news);
    setLoading(false);
  };

  const handleGetMaxSize = async () => {
    setSizeLoading(true);
    const response = await requestAuth(changeMaxSizeUrl, "GET", token);

    const result = await response.json();
    if (response.ok) setSize({ ...size, curr: result.size });
    setSizeLoading(false);
  };

  const handleChangeMaxSize = async (e) => {
    e.preventDefault();

    setSizeLoading(true);
    const response = await requestAuth(changeMaxSizeUrl, "PUT", token, {
      size: size.new,
    });

    const result = await response.json();
    if (response.ok) setSize({ new: "", curr: result.size });
    setSizeLoading(false);
  };

  useEffect(() => {
    handleGetLatestNews();
    handleGetMaxSize();

    return () => {};
  }, []);

  return (
    <>
      <main className="space-y-3">
        <section className="flex flex-col gap-2">
          <header className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">Change Image Max Size</h1>
          </header>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold">Current Max Size :</p>
              {sizeloading ? <PleaseWait text={false} /> : `${size.curr} KB`}
            </div>
            <form
              className="flex flex-col gap-2 w-96"
              onSubmit={handleChangeMaxSize}
            >
              <div className="flex gap-2 items-center">
                <label className="whitespace-nowrap">New value (in KB) :</label>
                <Input
                  type="number"
                  value={size.new}
                  onChange={(e) => setSize({ ...size, new: e.target.value })}
                />
              </div>
              <Button
                className="cursor-pointer"
                disabled={sizeloading}
                type="submit"
              >
                {sizeloading ? <PleaseWait /> : "Change"}
              </Button>
            </form>
          </div>
        </section>

        <hr className="my-5" />

        {loading ? (
          <PleaseWait />
        ) : (
          <PanelHomeSection
            title="Latest News Uploaded"
            data={latestNews}
            load={handleGetLatestNews}
          />
        )}
      </main>
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
          <NewsCard data={news} key={news.id} fetchNews={load} />
        ))}
        {data.length !== 0 ? null : <p>No News Found</p>}
      </div>
    </section>
  );
};

export default PanelHome;
