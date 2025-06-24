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
import { ReactNode } from "react";

interface LinkMenuButtonProps {
  href: string;
  name: string;
}

interface SidebarGroupProps {
  title: string;
  children?: ReactNode;
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGrp title="Application">
          <LinkMenuButton href="/" name="Dashboard" />
        </SidebarGrp>
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarGrp({ title, children }: SidebarGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroup>
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
