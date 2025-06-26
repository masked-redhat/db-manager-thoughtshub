import { ReactElement } from "react";
import { InsightsNumbersData } from "@/interfaces/Insights";
import { formatNumber } from "@/utils/format";

const exampleData: InsightsNumbersData = {
  totalInsights: 465235,
};

export const InsightsSummarySection = (): ReactElement => {
  return (
    <section className="w-full h-full flex flex-col gap-4 items-center justify-center text-xl *:flex *:flex-col *:items-center *:justify-center">
      <div className="m-2 flex gap-1 items-center flex-col justify-center">
        <p className="font-fira text-8xl font-bold">
          {formatNumber(exampleData.totalInsights)}
        </p>
        <div className="flex flex-col text-xl gap-0.5 items-center">
          <p className="font-medium text-gray-600">Total Insights</p>
        </div>
      </div>
    </section>
  );
};
