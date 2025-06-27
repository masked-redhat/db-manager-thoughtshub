"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeaderBar } from "@/interfaces/PageHeaderBar";
import { AccountsActitvity } from "@/pages/dashboard/Accounts";
import { Insights_And_Forums } from "@/pages/dashboard/Insights&Forums";
import { UserEngagement } from "@/pages/dashboard/UserEngagement";

const barContent: PageHeaderBar[] = [
  { name: "Accounts Activity", element: <AccountsActitvity /> },
  { name: "Insights & Forums", element: <Insights_And_Forums /> },
  { name: "User Engagement", element: <UserEngagement /> },
  { name: "Reports & Feedback" },
  { name: "Server & API" },
];

export default function Home() {
  return (
    <section className="flex flex-col gap-5">
      <Tabs defaultValue={barContent[0].name} className="w-full">
        <div className="overflow-x-auto whitespace-nowrap mb-3">
          <TabsList className="inline-flex gap-1">
            {barContent.map((b) => (
              <TabsTrigger key={b.name} value={b.name} className="px-4 py-2">
                {b.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {barContent.map((b) => (
          <TabsContent value={b.name} key={b.name}>
            {b.element ?? b.name + " Page"}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
