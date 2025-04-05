import React from "react";
import { useToken } from "./providers/AdminTokenProvider";
import Login from "./pages/Login";

const App = () => {
  const { token, set } = useToken();

  return <>{token ? <p>Logged In, token: {token}</p> : <Login />}</>;
};

export default App;
