import { UsersNumbersData } from "@/interfaces/UserAccounts";
import { ReactElement } from "react";

const exampleUserNumber: UsersNumbersData = {
  totalUsers: 2033,
  activeUsersWithin7Days: 129,
};

export const UsersSummarySection = (): ReactElement => {
  return (
    <section className="w-full h-full flex flex-col gap-4 items-center justify-center text-xl *:flex *:flex-col *:items-center *:justify-center">
      <div>
        <p className="font-fira font-black text-8xl">
          {exampleUserNumber.totalUsers}
        </p>
        <p>Current Total Users</p>
      </div>
      <div>
        <p className="font-fira font-black text-8xl">
          {exampleUserNumber.activeUsersWithin7Days}
        </p>
        <p>
          Active Users <span className="text-sm">( within 7 days)</span>
        </p>
      </div>
    </section>
  );
};
