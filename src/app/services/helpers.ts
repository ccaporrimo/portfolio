export namespace ColorHelpers {
    const changeLuminance = (color: string, percent: number, isDarken = false): string => {
        percent = Math.abs(percent > 1 ? percent / 100 : percent);
        const operator = isDarken ? '-' : '+';
        return `oklch(from ${color} calc(l ${operator} ${percent}) c h)`;
    }

    export const lightenColor = (color: string, percent: number): string => changeLuminance(color, percent);
    export const darkenColor = (color: string, percent: number): string => changeLuminance(color, percent, true);
}