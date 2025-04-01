import React from "react";
import { useToken } from "./providers/AdminTokenProvider";
import PanelHeader from "./components/PanelHeader";
import PanelLoginForm from "./components/PanelLoginForm";
import Cookies from "js-cookie";

const App = () => {
  const { token, set } = useToken();

  return (
    <>
      <PanelHeader />
      {token === null ? (
        <PanelLoginForm />
      ) : (
        <div className="flex w-full justify-center items-center">there could be news right now!!</div>
      )}
    </>
  );
};

export default App;
