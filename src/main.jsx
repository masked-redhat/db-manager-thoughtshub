import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthTokenProvider from "./providers/AdminTokenProvider.jsx";
import DisableProvider from "./providers/DIsableProvider.jsx";
import LoadingProvider from "./providers/LoadingProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <DisableProvider>
        <AuthTokenProvider>
          <App />
        </AuthTokenProvider>
      </DisableProvider>
    </LoadingProvider>
  </StrictMode>
);
