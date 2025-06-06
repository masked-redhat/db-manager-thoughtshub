"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useTransfer } from "@/contexts/TransferCcontext";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/" name="Home" />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>News</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/news" name="Insights" />
            <LinkMenuButton href="/news/create" name="Create Insight" />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>News category</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/category" name="Categories" />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Forums</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/forums" name="Forums" />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Reports & Feedbacks</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/reports" name="Reports (forums)" />
            <LinkMenuButton href="/feedback" name="Feedbacks" />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Logs & Activities</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/activities" name="Activities" />
            <LinkMenuButton href="/logs" name="Logs" />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Wordle</SidebarGroupLabel>
          <SidebarMenu>
            <LinkMenuButton href="/wordle" name="Words" />
            <LinkMenuButton href="/wordle/create" name="Create Word" />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function LinkMenuButton({ href, name }: { href: string; name: string }) {
  const { setData } = useTransfer();

  return (
    <SidebarMenuButton className="p-[0px!important]">
      <Link
        href={href}
        className="w-full h-full flex items-center p-2 font-manrope font-medium tracking-wide"
        onClick={() => {
          setData(null);
        }}
      >
        {name}
      </Link>
    </SidebarMenuButton>
  );
}
