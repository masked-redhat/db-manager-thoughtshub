import { DataChart1 } from "@/components/global/charts/DataChart1";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { InsightsUploadedData } from "@/interfaces/Insights";
import { ReactElement } from "react";

const exampleInsightsUploaded: InsightsUploadedData = {
  rangeType: graphType.LAST_MONTH, // "30 Days"
  data: [
    { datetime: 1748304000000, insightsUploaded: 142 }, // 27 May 2025
    { datetime: 1748390400000, insightsUploaded: 173 },
    { datetime: 1748476800000, insightsUploaded: 188 },
    { datetime: 1748563200000, insightsUploaded: 155 },
    { datetime: 1748649600000, insightsUploaded: 167 },
    { datetime: 1748736000000, insightsUploaded: 199 },
    { datetime: 1748822400000, insightsUploaded: 201 },
    { datetime: 1748908800000, insightsUploaded: 178 },
    { datetime: 1748995200000, insightsUploaded: 166 },
    { datetime: 1749081600000, insightsUploaded: 190 }, // 5 Jun 2025
    { datetime: 1749168000000, insightsUploaded: 185 },
    { datetime: 1749254400000, insightsUploaded: 212 },
    { datetime: 1749340800000, insightsUploaded: 194 },
    { datetime: 1749427200000, insightsUploaded: 180 },
    { datetime: 1749513600000, insightsUploaded: 157 },
    { datetime: 1749600000000, insightsUploaded: 169 },
    { datetime: 1749686400000, insightsUploaded: 175 },
    { datetime: 1749772800000, insightsUploaded: 187 },
    { datetime: 1749859200000, insightsUploaded: 203 },
    { datetime: 1749945600000, insightsUploaded: 101 }, // 15 Jun 2025
    { datetime: 1750032000000, insightsUploaded: 210 },
    { datetime: 1750118400000, insightsUploaded: 195 },
    { datetime: 1750204800000, insightsUploaded: 182 },
    { datetime: 1750291200000, insightsUploaded: 176 },
    { datetime: 1750377600000, insightsUploaded: 198 },
    { datetime: 1750464000000, insightsUploaded: 107 },
    { datetime: 1750550400000, insightsUploaded: 109 },
    { datetime: 1750636800000, insightsUploaded: 174 },
    { datetime: 1750723200000, insightsUploaded: 200 },
    { datetime: 1750809600000, insightsUploaded: 196 }, // 25 Jun 2025
  ],
};

const chartConfig = {
  insights: {
    label: "insights",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const InsightsUploadedSection = (): ReactElement => {
  return (
    <section className="flex gap-2 flex-col h-full">
      <header className="flex gap-2 px-1 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="flex items-center gap-3 pl-3">
          <span>Total :</span>
          <span className="font-bold font-fira">
            {exampleInsightsUploaded.data.reduce(
              (sum, { insightsUploaded }) => sum + insightsUploaded,
              0
            )}
          </span>
        </p>

        <div className="flex gap-2 items-center">
          {Object.values(graphType).map((t) => (
            <Button
              variant={
                t === exampleInsightsUploaded.rangeType ? "secondary" : "ghost"
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
          data={exampleInsightsUploaded}
          chartConfig={chartConfig}
          XaxisDatakey="datetime"
          Datakey="insightsUploaded"
          strokeColor={chartConfig.insights.color}
        />
      </div>
    </section>
  );
};
