export function formatNumber(num: number): string {
    if (num === null || num === undefined) return "";
    if (num < 1000) return num.toString();

    const units = [
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "B" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" },
    ];

    for (const unit of units) {
        if (num >= unit.value) {
            const formatted = (num / unit.value).toFixed(1);
            return formatted.endsWith(".0")
                ? formatted.slice(0, -2) + unit.symbol
                : formatted + unit.symbol;
        }
    }
    return num.toString();
}
