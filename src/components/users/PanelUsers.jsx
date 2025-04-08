import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { requestAuth } from "../../../utils/request";
import { getUsersCountUrl, getUsersUrl } from "../../../constants/server";
import { useToken } from "../../providers/AdminTokenProvider";
import { Loader2 } from "lucide-react";
import ForumCard from "../cards/ForumCard";
import UserCard from "../cards/UserCard";

const PanelUsers = () => {
  const { token } = useToken();

  const [usersTotalPages, setUsersTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLoading, setTotalLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsersCount = async () => {
    setTotalLoading(true);
    const response = await requestAuth(getUsersCountUrl, "GET", token);
    if (response.ok) {
      const result = await response.json();
      setUsersTotalPages(result.total);
    }

    setTotalLoading(false);
  };

  const fetchUsers = async (customPage = null) => {
    setUsersLoading(true);
    const response = await requestAuth(
      getUsersUrl + `?offset=${customPage ?? currentPage}`,
      "GET",
      token
    );
    if (response.ok) {
      const result = await response.json();
      setUsers(result.users);
    }

    setUsersLoading(false);
  };

  useEffect(() => {
    fetchUsersCount();
    fetchUsers();
    setCurrentPage(0);

    return () => {};
  }, []);

  return (
    <section>
      <header>
        <div className="flex flex-row gap-3 mb-2 w-fit ml-2">
          <h1 className="text-3xl font-medium">Users</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => {
                fetchUsersCount();
                fetchUsers(0);
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
        {usersLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" /> Please wait...
          </span>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((n) => (
            <UserCard data={n} key={n.id} fetchUsers={fetchUsers} />
          ))
        )}
      </main>

      <footer className="mt-2 flex items-center gap-8">
        <Button
          variant="secondary"
          className="cursor-pointer"
          disabled={currentPage === 0}
          onClick={() => {
            fetchUsers(currentPage - 1);
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
          disabled={currentPage >= usersTotalPages - 1}
          onClick={() => {
            fetchUsers(currentPage + 1);
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

export default PanelUsers;
