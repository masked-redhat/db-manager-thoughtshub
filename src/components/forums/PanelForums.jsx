import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { requestAuth } from "../../../utils/request";
import {
  getForumsByOffsetUrl,
  getForumsCountUrl,
} from "../../../constants/server";
import { useToken } from "../../providers/AdminTokenProvider";
import { Loader2 } from "lucide-react";
import ForumCard from "../cards/ForumCard";

const PanelForums = () => {
  const { token } = useToken();

  const [forumsTotalPages, setForumsTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLoading, setTotalLoading] = useState(false);
  const [forumsLoading, setForumsLoading] = useState(false);
  const [forums, setForums] = useState([]);

  const fetchForumsCount = async () => {
    setTotalLoading(true);
    const response = await requestAuth(getForumsCountUrl, "GET", token);
    if (response.ok) {
      const result = await response.json();
      setForumsTotalPages(result.total);
    }

    setTotalLoading(false);
  };

  const fetchForums = async (customPage = null) => {
    setForumsLoading(true);
    const response = await requestAuth(
      getForumsByOffsetUrl + `?offset=${customPage ?? currentPage}`,
      "GET",
      token
    );
    if (response.ok) {
      const result = await response.json();
      setForums(result.forums);
    }

    setForumsLoading(false);
  };

  useEffect(() => {
    fetchForumsCount();
    fetchForums();
    setCurrentPage(0);

    return () => {};
  }, []);

  return (
    <section>
      <header>
        <div className="flex flex-row gap-3 mb-2 w-fit ml-2">
          <h1 className="text-3xl font-medium">Forums</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => {
                fetchForumsCount();
                fetchForums(0);
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
        {forumsLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" /> Please wait...
          </span>
        ) : forums.length === 0 ? (
          <p>No forums found</p>
        ) : (
          forums.map((n) => (
            <ForumCard data={n} key={n.id} fetchForums={fetchForums} />
          ))
        )}
      </main>

      <footer className="mt-2 flex items-center gap-8">
        <Button
          variant="secondary"
          className="cursor-pointer"
          disabled={currentPage === 0}
          onClick={() => {
            fetchForums(currentPage - 1);
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
          disabled={currentPage >= forumsTotalPages - 1}
          onClick={() => {
            fetchForums(currentPage + 1);
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

export default PanelForums;
