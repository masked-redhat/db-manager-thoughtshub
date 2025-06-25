import { DataChart1 } from "@/components/global/charts/DataChart1";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { ForumsUploadedData } from "@/interfaces/Forums";
import { ReactElement } from "react";

const exampleForumsUploaded: ForumsUploadedData = {
  rangeType: graphType.LAST_YEAR, // "1 Year"
  data: [
    { datetime: 1719792000000, forumsUploaded: 1345 }, // 1 Jul 2024
    { datetime: 1722470400000, forumsUploaded: 1876 }, // 1 Aug 2024
    { datetime: 1725148800000, forumsUploaded: 1420 }, // 1 Sep 2024
    { datetime: 1727740800000, forumsUploaded: 1983 }, // 1 Oct 2024
    { datetime: 1730419200000, forumsUploaded: 1675 }, // 1 Nov 2024
    { datetime: 1733011200000, forumsUploaded: 1764 }, // 1 Dec 2024
    { datetime: 1735689600000, forumsUploaded: 2012 }, // 1 Jan 2025
    { datetime: 1738368000000, forumsUploaded: 1850 }, // 1 Feb 2025
    { datetime: 1740787200000, forumsUploaded: 1934 }, // 1 Mar 2025
    { datetime: 1743465600000, forumsUploaded: 2143 }, // 1 Apr 2025
    { datetime: 1746057600000, forumsUploaded: 2088 }, // 1 May 2025
    { datetime: 1748736000000, forumsUploaded: 2211 }, // 1 Jun 2025
  ],
};

const chartConfig = {
  forums: {
    label: "forums",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const ForumsUploadedSection = (): ReactElement => {
  return (
    <section className="flex gap-2 flex-col h-full">
      <header className="flex gap-2 px-1 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="flex items-center gap-3 pl-3">
          <span>Total :</span>
          <span className="font-bold font-fira">
            {exampleForumsUploaded.data.reduce(
              (sum, { forumsUploaded }) => sum + forumsUploaded,
              0
            )}
          </span>
        </p>

        <div className="flex gap-2 items-center">
          {Object.values(graphType).map((t) => (
            <Button
              variant={
                t === exampleForumsUploaded.rangeType ? "secondary" : "ghost"
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
          data={exampleForumsUploaded}
          chartConfig={chartConfig}
          XaxisDatakey="datetime"
          Datakey="forumsUploaded"
          strokeColor={chartConfig.forums.color}
        />
      </div>
    </section>
  );
};
