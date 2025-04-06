import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <nav className="flex flex-col">
      <SideBarGroup title="">
        <NavLink to="" end>
          Home
        </NavLink>
      </SideBarGroup>

      <hr />

      <SideBarGroup title="Forums">
        <li>Forums</li>
        <li>Create Forum</li>
      </SideBarGroup>

      <hr />

      <SideBarGroup title="News">
        <li>News</li>
        <NavLink to="create-news" end>
          {" "}
          Create News
        </NavLink>
      </SideBarGroup>

      <hr />

      <SideBarGroup title="Logs">
        <li>Logs</li>
        <li>Infos</li>
        <li>Warnings</li>
        <li>Errors</li>
      </SideBarGroup>
    </nav>
  );
};

const SideBarGroup = ({ title, children }) => {
  return (
    <section className="pt-2 pb-4 px-3">
      {title.length !== 0 && (
        <header className="bg-gray-100 rounded-sm px-2 text-sm">{title}</header>
      )}

      <div className="mt-2 rounded-sm ml-3">
        <ul className="flex flex-col gap-1 font-light *:hover:border-gray-200 *:hover:bg-gray-200 *:transition-colors *:px-3 *:py-1 *:rounded-sm *:select-none *:cursor-pointer text-sm *:border *:border-gray-50 *:bg-gray-50">
          {children}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
