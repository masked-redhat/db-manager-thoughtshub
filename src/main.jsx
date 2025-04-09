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
import PanelNews from "./components/news/PanelNews.jsx";
import PanelGetCategories from "./components/category/PanelGetCategories.jsx";
import PanelCreateCategory from "./components/category/PanelCreateCategory.jsx";
import PanelForums from "./components/forums/PanelForums.jsx";
import PanelCreateForum from "./components/forums/PanelCreateForum.jsx";
import PanelUsers from "./components/users/PanelUsers.jsx";
import PanelCreateUser from "./components/users/PanelCreateUser.jsx";
import { productionPath } from "../constants/path.js";
import PanelEditUser from "./components/users/PanelEditUser.jsx";
import PanelEditForum from "./components/forums/PanelEditForum.jsx";

const router = createBrowserRouter([
  {
    path: productionPath,
    Component: App,
    children: [
      { index: true, Component: PanelHome },
      { path: "create-news", Component: PanelCreateNews },
      { path: "news", Component: PanelNews },
      { path: "categories", Component: PanelGetCategories },
      { path: "create-new-category", Component: PanelCreateCategory },
      { path: "forums", Component: PanelForums },
      { path: "create-forums", Component: PanelCreateForum },
      { path: "edit-forums/:forumId", Component: PanelEditForum },
      { path: "users", Component: PanelUsers },
      { path: "create-user", Component: PanelCreateUser },
      { path: "edit-user/:id", Component: PanelEditUser },
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
