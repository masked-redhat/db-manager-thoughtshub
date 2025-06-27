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

export interface Insight {
    id: string;
    createDate: number;
    updateDate: number;
    imageUrl: string | null;
    title: string | null;
    body: string | null;
    category: string | null;
    status: "Published" | "On Review" | "Draft"
}