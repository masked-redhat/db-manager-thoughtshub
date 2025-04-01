import React, { createContext, useContext, useState } from "react";

const AdminTokenContext = createContext();

const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  return (
    <AdminTokenContext.Provider value={{ token: authToken, set: setAuthToken }}>
      {children}
    </AdminTokenContext.Provider>
  );
};

export default AuthTokenProvider;

export const useToken = () => useContext(AdminTokenContext);
