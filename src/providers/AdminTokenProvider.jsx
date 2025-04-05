import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { checkAdminUrl } from "../../constants/server";
import { useDisabled } from "./DIsableProvider";

const AdminTokenContext = createContext();

const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const { setDisabled } = useDisabled();

  const checkAndApplyUserToken = async (authToken) => {
    setDisabled(true);
    const response = await fetch(checkAdminUrl, {
      method: "GET",
      headers: { auth_token: authToken },
    });

    const result = await response.json();
    if (result.success === true) setAuthToken(authToken);
    setDisabled(false);
  };

  useEffect(() => {
    if (Cookies.get("auth_token") !== null)
      checkAndApplyUserToken(Cookies.get("auth_token"));

    return () => {};
  }, []);

  return (
    <AdminTokenContext.Provider
      value={{ token: authToken, setToken: setAuthToken }}
    >
      {children}
    </AdminTokenContext.Provider>
  );
};

export default AuthTokenProvider;

export const useToken = () => useContext(AdminTokenContext);
