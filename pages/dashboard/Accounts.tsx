import { Div } from "@/components/global/Div";
import { SignupsSection } from "@/sections/SignupsSection";
import { UsersSummarySection } from "@/sections/UsersSummarySection";
import { ReactElement } from "react";

export const AccountsActitvity = (): ReactElement => {
  return (
    <section className="w-full">
      <div className="w-full h-[30em] flex *:w-full gap-5">
        <Div title="Signups">
          <SignupsSection />
        </Div>
        <Div className="min-w-[30em] max-w-fit">
          <UsersSummarySection />
        </Div>
      </div>
    </section>
  );
};
