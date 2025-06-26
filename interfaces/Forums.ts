import { GraphType } from "@/constants/graphTypes";

export interface ForumsUploadedData {
    rangeType: GraphType;
    data: {
        datetime: number;
        forumsUploaded: number;
    }[];
}

export interface ForumsNumbersData {
    totalForums: number;
}