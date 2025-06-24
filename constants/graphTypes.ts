export const graphType = {
    LAST_HOUR: "1 Hour",
    LAST_DAY: "1 Day",
    LAST_7_DAYS: "7 Days",
    LAST_MONTH: "30 Days",
    LAST_YEAR: "1 Year",
    ALL_TIME: "All Time"
} as const;

export type GraphType = typeof graphType[keyof typeof graphType];