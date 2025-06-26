import { DataChart1 } from "@/components/global/charts/DataChart1";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { TotalUsersData } from "@/interfaces/UserAccounts";
import { ReactElement } from "react";

// This section will be used for measuring new users coming
// and creating an account on the application

export const exampleTotalUsersData: TotalUsersData = {
  rangeType: "1 Hour",
  data: [
    { datetime: 1750933800000, users: 200 },
    { datetime: 1750933740000, users: 256 },
    { datetime: 1750933680000, users: 290 },
    { datetime: 1750933620000, users: 346 },
    { datetime: 1750933560000, users: 389 },
    { datetime: 1750933500000, users: 455 },
    { datetime: 1750933440000, users: 495 },
    { datetime: 1750933380000, users: 555 },
    { datetime: 1750933320000, users: 600 },
    { datetime: 1750933260000, users: 648 },
    { datetime: 1750933200000, users: 680 },
    { datetime: 1750933140000, users: 741 },
    { datetime: 1750933080000, users: 794 },
    { datetime: 1750933020000, users: 851 },
    { datetime: 1750932960000, users: 898 },
    { datetime: 1750932900000, users: 962 },
    { datetime: 1750932840000, users: 1017 },
    { datetime: 1750932780000, users: 1080 },
    { datetime: 1750932720000, users: 1123 },
    { datetime: 1750932660000, users: 1190 },
    { datetime: 1750932600000, users: 1255 },
    { datetime: 1750932540000, users: 1320 },
    { datetime: 1750932480000, users: 1389 },
    { datetime: 1750932420000, users: 1436 },
    { datetime: 1750932360000, users: 1500 },
    { datetime: 1750932300000, users: 1568 },
    { datetime: 1750932240000, users: 1604 },
    { datetime: 1750932180000, users: 1672 },
    { datetime: 1750932120000, users: 1720 },
    { datetime: 1750932060000, users: 1766 },
    { datetime: 1750932000000, users: 1830 },
    { datetime: 1750931940000, users: 1882 },
    { datetime: 1750931880000, users: 1930 },
    { datetime: 1750931820000, users: 1975 },
    { datetime: 1750931760000, users: 2020 },
    { datetime: 1750931700000, users: 1987 },
    { datetime: 1750931640000, users: 1920 },
    { datetime: 1750931580000, users: 1854 },
    { datetime: 1750931520000, users: 1820 },
    { datetime: 1750931460000, users: 1756 },
    { datetime: 1750931400000, users: 1705 },
    { datetime: 1750931340000, users: 1660 },
    { datetime: 1750931280000, users: 1600 },
    { datetime: 1750931220000, users: 1556 },
    { datetime: 1750931160000, users: 1510 },
    { datetime: 1750931100000, users: 1470 },
    { datetime: 1750931040000, users: 1420 },
    { datetime: 1750930980000, users: 1385 },
    { datetime: 1750930920000, users: 1340 },
    { datetime: 1750930860000, users: 1302 },
    { datetime: 1750930800000, users: 1275 },
    { datetime: 1750930740000, users: 1240 },
    { datetime: 1750930680000, users: 1215 },
    { datetime: 1750930620000, users: 1180 },
    { datetime: 1750930560000, users: 1150 },
    { datetime: 1750930500000, users: 1120 },
    { datetime: 1750930440000, users: 1095 },
    { datetime: 1750930380000, users: 1070 },
    { datetime: 1750930320000, users: 1045 },
    { datetime: 1750930260000, users: 1025 },
  ],
};

const chartConfig = {
  users: {
    label: "Users",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const TotalUsersSection = (): ReactElement => {
  return (
    <section className="flex gap-2 flex-col h-full">
      <header className="flex gap-2 px-1 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="flex items-center gap-3 pl-3">
          <span>Total :</span>
          <span className="font-bold font-fira">
            {exampleTotalUsersData.data.reduce(
              (sum, { users }) => sum + users,
              0
            )}
          </span>
        </p>

        <div className="flex gap-2 items-center">
          {Object.values(graphType).map((t) => (
            <Button
              variant={
                t === exampleTotalUsersData.rangeType ? "secondary" : "ghost"
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
          data={exampleTotalUsersData}
          chartConfig={chartConfig}
          XaxisDatakey="datetime"
          Datakey="users"
          strokeColor={chartConfig.users.color}
        />
      </div>
    </section>
  );
};
