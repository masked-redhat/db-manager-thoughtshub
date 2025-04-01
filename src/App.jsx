import React from "react";
import { useToken } from "./providers/AdminTokenProvider";
import PanelHeader from "./components/PanelHeader";
import PanelLoginForm from "./components/PanelLoginForm";
import Cookies from "js-cookie";
import NewsUploader from "./components/NewsUploader";

const App = () => {
  const { token, set } = useToken();

  return (
    <>
      <PanelHeader />
      {token === null ? (
        <PanelLoginForm />
      ) : (
        <div className="flex w-full justify-center items-center">
          <NewsUploader />
        </div>
      )}
    </>
  );
};

export default App;
