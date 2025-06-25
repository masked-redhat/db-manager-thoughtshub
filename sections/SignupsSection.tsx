import { DataChart1 } from "@/components/global/charts/DataChart1";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { SignupsData } from "@/interfaces/UserAccounts";
import { ReactElement } from "react";

// This section will be used for measuring new users coming
// and creating an account on the application

const exampleSignupsData: SignupsData = {
  rangeType: graphType.LAST_7_DAYS,
  data: [
    { datetime: 1718755200000, signups: 12 },
    { datetime: 1718841600000, signups: 15 },
    { datetime: 1718928000000, signups: 18 },
    { datetime: 1719014400000, signups: 14 },
    { datetime: 1719100800000, signups: 22 },
    { datetime: 1719187200000, signups: 19 },
    { datetime: 1719273600000, signups: 17 },
  ],
};

const chartConfig = {
  signups: {
    label: "Signups",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const SignupsSection = (): ReactElement => {
  return (
    <section className="flex gap-2 flex-col h-full">
      <header className="flex gap-2 px-1 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="flex items-center gap-3 pl-3">
          <span>Total :</span>
          <span className="font-bold font-fira">
            {exampleSignupsData.data.reduce(
              (sum, { signups }) => sum + signups,
              0
            )}
          </span>
        </p>

        <div className="flex gap-2 items-center">
          {Object.values(graphType).map((t) => (
            <Button
              variant={
                t === exampleSignupsData.rangeType ? "secondary" : "ghost"
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
          data={exampleSignupsData}
          chartConfig={chartConfig}
          XaxisDatakey="datetime"
          Datakey="signups"
          strokeColor={chartConfig.signups.color}
        />
      </div>
    </section>
  );
};
