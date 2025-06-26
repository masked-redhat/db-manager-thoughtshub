import { UsersNumbersData } from "@/interfaces/UserAccounts";
import { ReactElement, ReactNode } from "react";
import { formatNumber } from "../utils/format";
import { Separator } from "@/components/ui/separator";

interface UserValueProps {
  value?: string | number;
  title: string;
  subtitle?: string | null;
  icon?: ReactNode;
}

export const exampleUsersNumbersData: UsersNumbersData = {
  totalLifetimeUsers: 12345678, // total users ever registered
  currentUsers: 9876543, // users currently counted (active + inactive)
  currentlyOnline: 15432, // users online right now
  activeUsers: 7654321, // users active in recent period (e.g. last month)
  signupsInLast24Hours: 4321, // new signups in last 24 hours
};

export const UsersSummarySection = (): ReactElement => {
  let data: { [K in keyof UsersNumbersData]?: string } = Object.fromEntries(
    Object.entries(exampleUsersNumbersData).map(([k, v]) => [
      k,
      formatNumber(v),
    ])
  );

  return (
    <section className="w-full h-full flex flex-col gap-4 items-center justify-start text-xl *:flex *:flex-col *:items-center *:justify-center">
      <UserValue value={data.currentlyOnline} title="Currently Online Users" />
      <div className="!flex !flex-row gap-2 items-center justify-center">
        <UserValue value={data.activeUsers} title="Total Active Users" />
        <Separator orientation="vertical" />
        <UserValue value={data.currentUsers} title="Total Users" />
      </div>

      <Separator />

      <UserValue
        value={data.signupsInLast24Hours}
        title="Signups"
        subtitle="Within last 24 hours"
      />

      <Separator />

      <UserValue value={data.totalLifetimeUsers} title="Total Lifetime Users" />
    </section>
  );
};

const UserValue = ({
  value,
  title,
  subtitle = null,
}: UserValueProps): ReactElement => {
  return (
    <div className="m-2 flex gap-1 items-center flex-col justify-center">
      <p className="font-fira text-5xl font-bold">{value}</p>
      <div className="flex flex-col text-xl gap-0.5 items-center">
        <p className="font-medium text-gray-600">{title}</p>
        {subtitle !== null && (
          <p className="text-sm text-gray-500">( {subtitle} )</p>
        )}
      </div>
    </div>
  );
};
