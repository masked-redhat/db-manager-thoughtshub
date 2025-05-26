"use client";

import { AppSidebar } from "@/components/AppSidebar";
import LoginForm from "@/components/LoginForm";
import LogoutBtn from "@/components/LogoutBtn";
import PleaseWait from "@/components/PleaseWait";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function Layout_({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { authToken, setAuthToken } = useAuthToken();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const checkAndSetAuthToken = async () => {
      setChecking(true);

      const authToken = APIClient.getAuthTokenFromBrowser();
      const client = new APIClient(authToken);
      const isOk = await client.checkAuthToken();
      if (isOk) setAuthToken(authToken);

      setChecking(false);
    };
    checkAndSetAuthToken();
  }, []);

  return (
    <div className="w-full h-full">
      {authToken === null ? (
        checking ? (
          <PleaseWait />
        ) : (
          <LoginForm />
        )
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="border-b border-b-gray-300 flex justify-between items-center p-2 sticky top-0 z-50 bg-gray-50">
              <div className="flex gap-2 items-center">
                <SidebarTrigger size={"lg"} />
                <Separator
                  orientation="vertical"
                  className="bg-gray-600 h-[12px!important]"
                />
                <p className="font-black font-urban">
                  Admin Panel - ThoughtsHub
                </p>
              </div>
              <LogoutBtn />
            </div>
            <div className="w-full h-[calc(100%-3.3rem)] md:pb-5 pb-3">{children}</div>
          </main>
        </SidebarProvider>
      )}
      <Toaster />
    </div>
  );
}
