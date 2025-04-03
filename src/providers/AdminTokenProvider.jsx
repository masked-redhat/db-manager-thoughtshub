import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { checkAdminUrl } from "../../constants/server";

const AdminTokenContext = createContext();

const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const checkAndApplyUserToken = async (authToken) => {
    const response = await fetch(checkAdminUrl, {
      method: "GET",
      headers: { auth_token: authToken },
    });

    const result = await response.json();
    if (result.success === true) setAuthToken(authToken);
  };

  useEffect(() => {
    if (Cookies.get("auth_token") !== null)
      checkAndApplyUserToken(Cookies.get("auth_token"));

    return () => {};
  }, []);

  return (
    <AdminTokenContext.Provider value={{ token: authToken, set: setAuthToken }}>
      {children}
    </AdminTokenContext.Provider>
  );
};

export default AuthTokenProvider;

export const useToken = () => useContext(AdminTokenContext);
