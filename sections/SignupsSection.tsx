import { SignupsChart } from "@/components/SignupChart";
import { Button } from "@/components/ui/button";
import { graphType } from "@/constants/graphTypes";
import { SignupsData } from "@/interfaces/UserAccounts";
import { ReactElement } from "react";

interface SignupsSectionProps {
  className?: string;
}

const exampleSignupsData: SignupsData = {
  rangeType: graphType.LAST_7_DAYS,
  data: [
    { datetime: 1718755200000, signups: 12 }, // June 19, 2024
    { datetime: 1718841600000, signups: 15 },
    { datetime: 1718928000000, signups: 18 },
    { datetime: 1719014400000, signups: 14 },
    { datetime: 1719100800000, signups: 22 },
    { datetime: 1719187200000, signups: 19 },
    { datetime: 1719273600000, signups: 17 },
  ],
};

export const SignupsSection = ({
  className,
}: SignupsSectionProps): ReactElement => {
  return (
    <section
      className={`border rounded-sm px-2 py-3 shadow border-gray-200 flex flex-col gap-3 ${className}`}
    >
      <header className="flex gap-2 items-center justify-between max-w-full overflow-x-auto overflow-y-hidden">
        <p className="font-bold tracking-wide lg:text-2xl md:text-lg px-4">Signups</p>
        <div className="flex gap-1 items-center">
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
        <SignupsChart className="h-full w-full" data={exampleSignupsData} />
      </div>
    </section>
  );
};
