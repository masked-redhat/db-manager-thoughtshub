import { Div } from "@/components/global/Div";
import { ForumsSummarySection } from "@/sections/ForumsSummarySection";
import { ForumsUploadedSection } from "@/sections/ForumsUploadedSection";
import { InsightsSummarySection } from "@/sections/InsightsSummarySection";
import { InsightsUploadedSection } from "@/sections/InsightsUploadedSection";
import { ReactElement } from "react";

export const Insights_And_Forums = (): ReactElement => {
  return (
    <section className="w-full flex flex-col gap-5">
      <div className="w-full h-[30em] flex *:w-full gap-5">
        <Div title="Insights uploaded">
          <InsightsUploadedSection />
        </Div>
        <Div className="min-w-[30em] max-w-fit">
          <InsightsSummarySection />
        </Div>
      </div>
      <div className="w-full h-[30em] flex *:w-full gap-5">
        <Div title="Forums uploaded">
          <ForumsUploadedSection />
        </Div>
        <Div className="min-w-[30em] max-w-fit">
          <ForumsSummarySection />
        </Div>
      </div>
    </section>
  );
};
