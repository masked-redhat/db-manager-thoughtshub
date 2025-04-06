import React from "react";

const Sidebar = () => {
  return (
    <nav className="flex flex-col">
      <SideBarGroup title="Forums">
        <li>Forums</li>
        <li>Create Forum</li>
      </SideBarGroup>

      <hr />

      <SideBarGroup title="News">
        <li>News</li>
        <li>Create News</li>
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
      {title.length !== 0 && <header className="font-medium">{title}</header>}

      <div className="mt-2 rounded-sm bg-gray-100">
        <ul className="flex flex-col gap-1 font-light *:hover:bg-gray-300 *:transition-colors *:px-3 *:py-1 *:rounded-sm *:select-none *:cursor-pointer">
          {children}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
