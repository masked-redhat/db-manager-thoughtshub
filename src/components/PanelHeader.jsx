import React from "react";
import { Button } from "@/components/ui/button";
import { logoutUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";
import { useDisabled } from "../providers/DIsableProvider";
import Cookies from "js-cookie";

const PanelHeader = () => {
  const { token, setToken } = useToken();
  const { setDisabled } = useDisabled();

  const handleLogout = async () => {
    setDisabled(true);

    try {
      const response = await fetch(logoutUrl, {
        headers: { auth_token: token },
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Logout successful");
        setToken(null);
        Cookies.remove("auth_token");
      } else console.log("Error occured : ", result.message);
    } catch (err) {
      console.log("Error occured : ", err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <header className="w-screen md:h-18 border flex items-center px-5 py-10 justify-between">
      <p
        id="logo"
        className="flex flex-col text-2xl font-semibold text-center w-fit"
      >
        <span>ThoughtsHub</span>
        <span className="text-lg font-light">Admin Panel</span>
      </p>

      <nav>
        <ul>
          <li>
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PanelHeader;
