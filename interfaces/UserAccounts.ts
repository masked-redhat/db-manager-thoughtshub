import { GraphType } from "@/constants/graphTypes";

export interface SignupsData {
    rangeType: GraphType;
    data: {
        datetime: number;
        signups: number;
    }[]
}