import { DataChart1 } from "@/components/global/charts/DataChart1";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { ForumsLikedData } from "@/interfaces/Forums";
import { ReactElement } from "react";

export const exampleForumsLiked: ForumsLikedData = {
  rangeType: graphType.LAST_MONTH,
  data: [
    { datetime: 1748457000000, forumsLiked: 5 },
    { datetime: 1748543400000, forumsLiked: 79 },
    { datetime: 1748629800000, forumsLiked: 50 },
    { datetime: 1748716200000, forumsLiked: 73 },
    { datetime: 1748802600000, forumsLiked: 52 },
    { datetime: 1748889000000, forumsLiked: 46 },
    { datetime: 1748975400000, forumsLiked: 70 },
    { datetime: 1749061800000, forumsLiked: 32 },
    { datetime: 1749148200000, forumsLiked: 26 },
    { datetime: 1749234600000, forumsLiked: 68 },
    { datetime: 1749321000000, forumsLiked: 24 },
    { datetime: 1749407400000, forumsLiked: 45 },
    { datetime: 1749493800000, forumsLiked: 41 },
    { datetime: 1749580200000, forumsLiked: 80 },
    { datetime: 1749666600000, forumsLiked: 13 },
    { datetime: 1749753000000, forumsLiked: 83 },
    { datetime: 1749839400000, forumsLiked: 74 },
    { datetime: 1749925800000, forumsLiked: 95 },
    { datetime: 1750012200000, forumsLiked: 62 },
    { datetime: 1750098600000, forumsLiked: 59 },
    { datetime: 1750185000000, forumsLiked: 30 },
    { datetime: 1750271400000, forumsLiked: 39 },
    { datetime: 1750357800000, forumsLiked: 63 },
    { datetime: 1750444200000, forumsLiked: 92 },
    { datetime: 1750530600000, forumsLiked: 17 },
    { datetime: 1750617000000, forumsLiked: 58 },
    { datetime: 1750703400000, forumsLiked: 71 },
    { datetime: 1750789800000, forumsLiked: 37 },
    { datetime: 1750876200000, forumsLiked: 11 },
    { datetime: 1750962600000, forumsLiked: 84 },
  ],
};

const chartConfig = {
  forums: {
    label: "liked",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const ForumsLikesSection = (): ReactElement => {
  return (
    <section className="flex gap-2 flex-col h-full">
      <header className="flex gap-2 px-1 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="flex items-center gap-3 pl-3">
          <span>Total :</span>
          <span className="font-bold font-fira">
            {exampleForumsLiked.data.reduce(
              (sum, { forumsLiked }) => sum + forumsLiked,
              0
            )}
          </span>
        </p>

        <div className="flex gap-2 items-center">
          {Object.values(graphType).map((t) => (
            <Button
              variant={
                t === exampleForumsLiked.rangeType ? "secondary" : "ghost"
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
          data={exampleForumsLiked}
          chartConfig={chartConfig}
          XaxisDatakey="datetime"
          Datakey="forumsLiked"
          strokeColor={chartConfig.forums.color}
        />
      </div>
    </section>
  );
};
