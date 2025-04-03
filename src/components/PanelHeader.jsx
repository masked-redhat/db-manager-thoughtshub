import React from "react";
import { useToken } from "../providers/AdminTokenProvider";
import { logoutUrl, proxyUrl } from "../../constants/server";
import Cookies from "js-cookie";
import { inProduction } from "../../constants/env";

const PanelHeader = () => {
  const { token, set } = useToken();
  return (
    <header className="text-center w-full py-10 px-3 flex *:m-auto flex-col gap-3">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Admin Panel{token === null ? " - Login" : ""}
      </h1>
      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg font-normal text-gray-500">
          Manage Database online
        </p>
        {token !== null && (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3.5 py-1.5 text-center"
            onClick={() => {
              fetch(logoutUrl, { headers: { auth_token: token } });
              Cookies.remove("auth_token");
              set(null);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default PanelHeader;
