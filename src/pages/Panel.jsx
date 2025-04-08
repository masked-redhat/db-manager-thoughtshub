import React from "react";
import PanelHeader from "../components/PanelHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

const Panel = () => {
  return (
    <>
      <PanelHeader />
      <main className="h-[calc(100vh-4.8em)] w-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel  className="min-w-48">
            <ScrollArea className="h-full w-full">
              <Sidebar />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85} className="min-w-[50%]">
            <ScrollArea className="h-full w-full p-3">
              <Outlet />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
};

export default Panel;
