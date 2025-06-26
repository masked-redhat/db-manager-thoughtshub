import { GraphType } from "@/constants/graphTypes";

export interface InsightsUploadedData {
    rangeType: GraphType;
    data: {
        datetime: number;
        insightsUploaded: number;
    }[]
}

export interface InsightsNumbersData {
    totalInsights: number;
}