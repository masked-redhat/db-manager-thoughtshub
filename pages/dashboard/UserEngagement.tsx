import { Div } from "@/components/global/Div";
import { ForumsCommentedSection } from "@/sections/ForumsCommentedSection";
import { ForumsLikesSection } from "@/sections/ForumsLikesSection";
import { ReactElement } from "react";

export const UserEngagement = (): ReactElement => {
  return (
    <section className="w-full flex flex-col gap-5">
      <div className="w-full h-[30em] flex *:w-full gap-5">
        <Div title="Likes on Forums">
          <ForumsLikesSection />
        </Div>
      </div>
      <div className="w-full h-[30em] flex *:w-full gap-5">
        <Div title="Comments on Forums">
          <ForumsCommentedSection />
        </Div>
      </div>
    </section>
  );
};
