import React from "react";
import PanelHeader from "../components/PanelHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "../components/Sidebar";

const Panel = () => {
  return (
    <>
      <PanelHeader />
      <main className="h-[calc(100vh-4.8em)] w-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={34} className="min-w-48">
            <ScrollArea className="h-full w-full">
              <Sidebar />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="min-w-[50%] p-2">Two</ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
};

export default Panel;
