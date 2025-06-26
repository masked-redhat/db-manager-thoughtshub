import { Div } from "@/components/global/Div";
import { SignupsSection } from "@/sections/SignupsSection";
import { TotalUsersSection } from "@/sections/TotalUsersSection";
import { UsersSummarySection } from "@/sections/UsersSummarySection";
import { ReactElement } from "react";

export const AccountsActitvity = (): ReactElement => {
  return (
    <section className="w-full flex gap-5">
      <div className="w-full *:h-[30em] flex flex-col *:w-full gap-5">
        <Div title="Signups">
          <SignupsSection />
        </Div>
        <Div title="Total users">
          <TotalUsersSection />
        </Div>
      </div>
      <Div className="min-w-[30em] max-w-fit">
        <UsersSummarySection />
      </Div>
    </section>
  );
};
