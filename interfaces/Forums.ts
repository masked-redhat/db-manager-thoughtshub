import { GraphType } from "@/constants/graphTypes";

export interface ForumsUploadedData {
    rangeType: GraphType;
    data: {
        datetime: number;
        forumsUploaded: number;
    }[];
}

export interface ForumsLikedData {
    rangeType: GraphType;
    data: {
        datetime: number;
        forumsLiked: number;
    }[];
}

export interface ForumsCommentedData {
    rangeType: GraphType;
    data: {
        datetime: number;
        forumsCommented: number;
    }[];
}

export interface ForumsNumbersData {
    totalForums: number;
}