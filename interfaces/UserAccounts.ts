import { GraphType } from "@/constants/graphTypes";

export interface SignupsData {
    rangeType: GraphType;
    data: {
        datetime: number;
        signups: number;
    }[]
}

export interface TotalUsersData {
    rangeType: GraphType;
    data: {
        datetime: number;
        users: number;
    }[]
}

export interface UsersNumbersData {
    totalLifetimeUsers: number;
    currentUsers: number;
    currentlyOnline: number;
    activeUsers: number;
    signupsInLast24Hours: number;
}