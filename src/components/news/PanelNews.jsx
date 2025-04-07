import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { requestAuth } from "../../../utils/request";
import { getNewsByOffsetUrl, getNewsCountUrl } from "../../../constants/server";
import { useToken } from "../../providers/AdminTokenProvider";
import { Loader2 } from "lucide-react";
import NewsCard from "../cards/NewsCard";
import SelectCategory from "../select/SelectCategory";

const PanelNews = () => {
  const { token } = useToken();

  const [categorySelected, setCategorySelected] = useState("All");
  const [newsTotalPages, setNewsTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLoading, setTotalLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [news, setNews] = useState([]);

  const fetchNewsCount = async () => {
    setTotalLoading(true);
    const response = await requestAuth(
      getNewsCountUrl + `?category=${categorySelected}`,
      "GET",
      token
    );
    if (response.ok) {
      const result = await response.json();
      setNewsTotalPages(result.total);
    }

    setTotalLoading(false);
  };

  const fetchNews = async (customPage = null) => {
    setNewsLoading(true);
    const response = await requestAuth(
      getNewsByOffsetUrl +
        `?category=${categorySelected}&offset=${customPage ?? currentPage}`,
      "GET",
      token
    );
    if (response.ok) {
      const result = await response.json();
      setNews(result.news);
    }

    setNewsLoading(false);
  };

  useEffect(() => {
    fetchNewsCount();
    fetchNews();
    setCurrentPage(0);

    return () => {};
  }, []);

  useEffect(() => {
    fetchNewsCount();
    fetchNews(0);
    setCurrentPage(0);

    return () => {};
  }, [categorySelected]);

  return (
    <section>
      <header>
        <div className="flex flex-col gap-3 mb-2 w-fit ml-2">
          <h1 className="text-3xl font-medium">News</h1>
          <div className="flex items-center gap-3">
            <SelectCategory
              category={categorySelected}
              setCategory={setCategorySelected}
              className="w-fit"
            />
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => {
                fetchNewsCount();
                fetchNews(0);
                setCurrentPage(0);
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
        <hr />
      </header>

      <main className="my-4 flex flex-wrap gap-3">
        {newsLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" /> Please wait...
          </span>
        ) : news.length === 0 ? (
          <p>No news found</p>
        ) : (
          news.map((n) => <NewsCard data={n} key={n.id} />)
        )}
      </main>

      <footer className="mt-2 flex items-center gap-8">
        <Button
          variant="secondary"
          className="cursor-pointer"
          disabled={currentPage === 0}
          onClick={() => {
            fetchNews(currentPage - 1);
            setCurrentPage(currentPage - 1);
          }}
        >
          {totalLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Please wait...
            </span>
          ) : (
            <span>&larr; Previous</span>
          )}
        </Button>
        <Button
          variant="secondary"
          className="cursor-pointer"
          disabled={currentPage >= newsTotalPages - 1}
          onClick={() => {
            fetchNews(currentPage + 1);
            setCurrentPage(currentPage + 1);
          }}
        >
          {totalLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Please wait...
            </span>
          ) : (
            <span>Next &rarr;</span>
          )}
        </Button>
      </footer>
    </section>
  );
};

export default PanelNews;
