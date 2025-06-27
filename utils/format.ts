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


export const formatDatetime = (ts: number, locale: string = 'en-IN'): string => {
    const opts: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,        // 24-hour clock
        timeZone: 'Asia/Kolkata'
    };

    // Intl.DateTimeFormat gives us exactly what we need,
    // we just strip the comma after the year (if any).
    return new Intl.DateTimeFormat(locale, opts)
        .format(new Date(ts))
        .replace(',', '');
}