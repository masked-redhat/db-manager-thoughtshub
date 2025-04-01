import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthTokenProvider from "./providers/AdminTokenProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthTokenProvider>
      <App />
    </AuthTokenProvider>
  </StrictMode>
);
