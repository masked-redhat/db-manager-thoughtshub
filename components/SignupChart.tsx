import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { graphType } from "@/constants/graphTypes";
import { SignupsData } from "@/interfaces/UserAccounts";
import { ReactElement } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface SignupsProps {
  className?: string;
  data: SignupsData;
}

const chartConfig = {
  signups: {
    label: "Signups",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const SignupsChart = ({
  className = "",
  data,
}: SignupsProps): ReactElement => {
  return (
    <div className={className}>
      <ChartContainer config={chartConfig} className="h-full w-full font-fira">
        <AreaChart
          accessibilityLayer
          data={data.data}
          margin={{
            left: 0,
            right: 30,
          }}
        >
          <CartesianGrid vertical={false} />
          <YAxis
            tick={{ fontSize: 12 }}
            width={35}
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
            domain={["dataMin ", "dataMax + 3"]}
          />
          <XAxis
            dataKey="datetime"
            tickLine={false}
            tick={{ textAnchor: "middle" }}
            tickMargin={10}
            axisLine={{ stroke: "#ccc" }}
            tickFormatter={(val) =>
              convertDateTimeToStr(
                val,
                data.rangeType === graphType.LAST_HOUR ||
                  data.rangeType === graphType.LAST_DAY
                  ? "time"
                  : "date"
              )
            }
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="signups"
            type="linear"
            fillOpacity={0}
            stroke="#60a5fa"
            strokeWidth={1.8}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

const convertDateTimeToStr = (
  val: number,
  type: "date" | "time",
  year: boolean = false
): string => {
  const dt = new Date(val);
  if (type === "date")
    return dt.toLocaleDateString("en-US", {
      ...(year ? { year: "numeric" } : {}),
      day: "numeric",
      month: "long",
    });
  else return dt.toISOString().slice(11, 16);
};
