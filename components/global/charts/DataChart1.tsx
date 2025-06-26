import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GraphType, graphType } from "@/constants/graphTypes";
import { ReactElement } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface SignupsProps {
  className?: string;
  data: { rangeType: GraphType; data: Record<string, number>[] };
  chartConfig: ChartConfig;
  XaxisDatakey: string;
  Datakey: string;
  strokeColor: string;
}

export const DataChart1 = ({
  className = "",
  data,
  chartConfig,
  XaxisDatakey,
  Datakey,
  strokeColor,
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
            domain={["dataMin - 3", "dataMax + 40"]}
          />
          <XAxis
            dataKey={XaxisDatakey}
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
            dataKey={Datakey}
            type="monotoneX"
            fillOpacity={0}
            stroke={strokeColor}
            strokeWidth={2.8}
            label={"none"}
            isAnimationActive={false}
            animationDuration={0}
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
