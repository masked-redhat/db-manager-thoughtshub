import { DataChart1 } from "@/components/global/charts/DataChart1";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { ForumsCommentedData } from "@/interfaces/Forums";
import { ReactElement } from "react";

export const exampleForumsCommented: ForumsCommentedData = {
  rangeType: graphType.LAST_DAY,
  data: [
    { datetime: 1750930200000, forumsCommented: 16 },
    { datetime: 1750933800000, forumsCommented: 5 },
    { datetime: 1750937400000, forumsCommented: 6 },
    { datetime: 1750941000000, forumsCommented: 3 },
    { datetime: 1750944600000, forumsCommented: 14 },
    { datetime: 1750948200000, forumsCommented: 1 },
    { datetime: 1750951800000, forumsCommented: 12 },
    { datetime: 1750955400000, forumsCommented: 9 },
    { datetime: 1750959000000, forumsCommented: 20 },
    { datetime: 1750962600000, forumsCommented: 0 },
    { datetime: 1750966200000, forumsCommented: 4 },
    { datetime: 1750969800000, forumsCommented: 7 },
    { datetime: 1750973400000, forumsCommented: 18 },
    { datetime: 1750977000000, forumsCommented: 10 },
    { datetime: 1750980600000, forumsCommented: 8 },
    { datetime: 1750984200000, forumsCommented: 2 },
    { datetime: 1750987800000, forumsCommented: 15 },
    { datetime: 1750991400000, forumsCommented: 11 },
    { datetime: 1750995000000, forumsCommented: 17 },
    { datetime: 1750998600000, forumsCommented: 6 },
    { datetime: 1751002200000, forumsCommented: 19 },
    { datetime: 1751005800000, forumsCommented: 13 },
    { datetime: 1751009400000, forumsCommented: 4 },
    { datetime: 1751013000000, forumsCommented: 7 },
  ],
};

const chartConfig = {
  forums: {
    label: "commented",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const ForumsCommentedSection = (): ReactElement => {
  return (
    <section className="flex gap-2 flex-col h-full">
      <header className="flex gap-2 px-1 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="flex items-center gap-3 pl-3">
          <span>Total :</span>
          <span className="font-bold font-fira">
            {exampleForumsCommented.data.reduce(
              (sum, { forumsCommented }) => sum + forumsCommented,
              0
            )}
          </span>
        </p>

        <div className="flex gap-2 items-center">
          {Object.values(graphType).map((t) => (
            <Button
              variant={
                t === exampleForumsCommented.rangeType ? "secondary" : "ghost"
              }
              size="sm"
              key={t}
            >
              {t}
            </Button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <DataChart1
          className="h-full w-full"
          data={exampleForumsCommented}
          chartConfig={chartConfig}
          XaxisDatakey="datetime"
          Datakey="forumsCommented"
          strokeColor={chartConfig.forums.color}
        />
      </div>
    </section>
  );
};
