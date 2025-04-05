import React from "react";
import { useToken } from "./providers/AdminTokenProvider";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import { useDisabled } from "./providers/DIsableProvider";
import { Loader2 } from "lucide-react";

const App = () => {
  const { token } = useToken();
  const { disabled } = useDisabled();

  return (
    <>
      {disabled ? (
        <main className="w-screen h-screen flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" />
          <span>Please wait</span>
        </main>
      ) : token ? (
        <Panel />
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
