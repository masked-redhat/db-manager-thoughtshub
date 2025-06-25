import { GraphType } from "@/constants/graphTypes";

export interface SignupsData {
    rangeType: GraphType;
    data: {
        datetime: number;
        signups: number;
    }[]
}

export interface UsersNumbersData {
    totalUsers: number;
    activeUsersWithin7Days: number;
    activeUsersWithin30Days?: number;
    totalAccountsDeleted?: number;
    lifetimeTotalUsers?: number;
}