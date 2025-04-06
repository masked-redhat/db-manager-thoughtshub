import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { requestAuth } from "../../utils/request";
import { deleteAllNewsUrl } from "../../constants/server";
import { useToken } from "../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

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
        <NavLink to="news" end>
          News
        </NavLink>
        <NavLink to="create-news" end>
          Create News
        </NavLink>
        <DeleteAllNews />
      </SideBarGroup>

      <hr />

      <SideBarGroup title="Logs">
        <li>Logs</li>
        <li>Infos</li>
        <li>Warnings</li>
        <li>Errors</li>
      </SideBarGroup>

      <Toaster />
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
        <ul className="flex flex-col gap-1 font-medium *:hover:border-gray-200 *:hover:bg-gray-200 *:transition-colors *:px-3 *:py-1 *:rounded-sm *:select-none *:cursor-pointer text-sm *:border *:border-gray-50 *:bg-gray-50">
          {children}
        </ul>
      </div>
    </section>
  );
};

const DeleteAllNews = () => {
  const { token } = useToken();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAllNews = async () => {
    setDeleting(true);

    try {
      const response = await requestAuth(deleteAllNewsUrl, "DELETE", token);

      if (response.ok) toast("Deleted All News");
    } catch (err) {
      toast("Error occured");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-left">Delete All News</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          {deleting ? (
            <Button disabled>
              <Loader2 className="animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button onClick={handleDeleteAllNews}>Delete</Button>
          )}
          <DialogClose>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Sidebar;
