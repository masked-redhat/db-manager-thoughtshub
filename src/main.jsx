import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthTokenProvider from "./providers/AdminTokenProvider.jsx";
import DisableProvider from "./providers/DIsableProvider.jsx";
import LoadingProvider from "./providers/LoadingProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import PanelHome from "./components/PanelHome.jsx";
import PanelCreateNews from "./components/news/PanelCreateNews.jsx";

const router = createBrowserRouter([
  {
    path: "/dist",
    Component: App,
    children: [
      { index: true, Component: PanelHome },
      { path: "create-news", Component: PanelCreateNews },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <DisableProvider>
        <AuthTokenProvider>
          <RouterProvider router={router} />
        </AuthTokenProvider>
      </DisableProvider>
    </LoadingProvider>
  </StrictMode>
);
