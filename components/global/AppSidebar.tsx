"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useTransfer } from "@/contexts/TransferCcontext";
import Link from "next/link";

interface LinkMenuButtonProps {
  href: string;
  name: string;
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col gap-2.5 py-4 px-2">
          <LinkMenuButton href="/" name="Dashboard" />
          <LinkMenuButton href="/insights" name="Insights" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function LinkMenuButton({ href, name }: LinkMenuButtonProps) {
  const { setData } = useTransfer();

  return (
    <SidebarMenuButton className="p-[0px!important]">
      <Link
        href={href}
        className="w-full h-full flex items-center p-2 font-medium tracking-wide"
        onClick={() => {
          setData(null);
        }}
      >
        {name}
      </Link>
    </SidebarMenuButton>
  );
}
